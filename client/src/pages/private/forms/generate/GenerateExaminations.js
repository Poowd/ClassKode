import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { ViewModal } from "../../../../../src/component/modal/ViewModal";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";
import useConfiguration from "../../../../hook/useConfiguration";
import useModal from "../../../../hook/useModal";
import { LoaderModal } from "../../../../component/modal/LoaderModal";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";
import { MainSelect } from "../../../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../hook/useHandleChange";
import { StatusModal } from "../../../../component/modal/StatusModal";

export function GenerateExaminations() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();
  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [schedule, setSchedule] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);
  const [room, setRooms] = useState([]);
  const [sections, setSection] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [ay, setAY] = useState([]);
  const [genSelection, setGenSelection] = useState("");
  const [data, setData] = useState([]);
  const [schedulestatus, setScheduleStatus] = useState([]);
  const [dataChange] = useHandleChange(setGenSelection);

  useEffect(() => {
    data_get("current-academic-year", setAY);
    data_get("class-schedule-list", setSchedule);
    data_get("academic-level-list", setAcademicLevel);
    data_get("room-list", setRooms);
    data_get("section-list", setSection);
  }, []);

  const [tertiary, setTertiary] = useState([]);
  const [shs, setSHS] = useState([]);

  useEffect(() => {
    setTertiary([]);
    setSHS([]);
    schedule.forEach((schedule) => {
      if (schedule.AcademicLevel === "Tertiary") {
        setTertiary((prev) => [...prev, schedule]);
      } else {
        setSHS((prev) => [...prev, schedule]);
      }
    });
  }, [schedule]);

  const removeDuplicates = (data) => {
    const uniqueEntries = new Map();
    data.forEach((entry) => {
      const key = `${entry.CourseID}-${entry.Section}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in examSchedule) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}exam-schedule-insert`,
              {
                method: "POST",
                body: JSON.stringify({
                  CourseCode: examSchedule[i].CourseCode,
                  Course: examSchedule[i].Course,
                  Section: examSchedule[i].Section,
                  Component: examSchedule[i].Component,
                  Time: examSchedule[i].StartTime,
                  Level: examSchedule[i].Level,
                  Population: examSchedule[i].Population,
                  Room: examSchedule[i].Room,
                  Day: examSchedule[i].Day,
                  Capacity: examSchedule[i].Capacity,
                }),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      setTimeout(() => {
        data_post(
          "set-exam-status",
          { data: ay.Code, level: genSelection },
          setScheduleStatus
        );
        showModal(
          "StatusModal",
          "",
          <main className="d-flex flex-column">
            <section className="text-center">
              <h1 className="text-success">{info.icons.status.success}</h1>
              <h3 className="text-success fw-bold">Success</h3>
              <button
                type="button"
                class="btn btn-success mt-3"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </section>
          </main>
        );
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <>
      <main>
        <main className="h-100 position-relative overflow-y-auto px-1">
          <header>
            <h3 className="m-0 p-0">Generate Schedule</h3>
            <p className="m-0 p-0 text-secondary">
              Please Generate me a new Schedule
            </p>
            <hr className="p-0 mx-0 my-2" />
          </header>
          <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
            <div className="d-flex justify-content-end gap-2">
              <div className="w-100 d-flex justify-content-between">
                <div className="d-flex gap-2 ">
                  <DefaultButton
                    class="px-2"
                    icon={info.icons.navigation.back}
                    text="Back"
                    function={() => navigate(-1)}
                  />
                </div>
                <div className="d-flex gap-2 ">
                  <DefaultButton
                    class="border px-2"
                    reversed={false}
                    icon={info.icons.others.list}
                    function={() => {}}
                    toggle="modal"
                    target="#ExpectedClass"
                  />
                  <DefaultButton
                    class={`px-2 btn-primary`}
                    icon={info.icons.forms.add}
                    text="Save"
                    function={submitForm}
                    disabled={examSchedule.length < 1 ? true : false}
                  />
                  <DefaultButton
                    class="btn-primary px-2"
                    text="Tertiary"
                    icon={info.icons.forms.generate}
                    function={() => {
                      showModal("AwaitModal", "", "Schedules are being made.");
                      setGenSelection("Tertiary");
                      data_post(
                        "gen-exam-ter",
                        {
                          schedule: removeDuplicates(schedule),
                          room: room,
                          section: sections,
                        },
                        setExamSchedule
                      );
                      setTimeout(() => {
                        hideModal();
                      }, 2500); // 2 second delay
                    }}
                    disabled={ay.GeneratedTertiaryExams === true ? true : false}
                  />
                  <DefaultButton
                    class="btn-primary px-2"
                    text="SHS"
                    icon={info.icons.forms.generate}
                    function={() => {
                      showModal("AwaitModal", "", "Schedules are being made.");
                      setGenSelection("SHS");
                      data_post(
                        "gen-exam-shs",
                        {
                          schedule: removeDuplicates(schedule),
                          room: room,
                          section: sections,
                        },
                        setExamSchedule
                      );
                      setTimeout(() => {
                        hideModal();
                      }, 2500); // 2 second delay
                    }}
                    disabled={ay.GeneratedSHSExams === true ? true : false}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th className="p-3">Code</th>
                  <th className="text-start py-3">Course</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Component</th>
                  <th className="p-3">Day</th>
                  <th className="p-3">Time Start</th>
                  <th className="p-3">Time End</th>
                </tr>
              </thead>
              <tbody>
                {examSchedule.length > 0
                  ? examSchedule.map((item, i) => (
                      <tr key={i}>
                        <td className="py-3">{item.CourseCode}</td>
                        <td className="py-3 text-start">{item.Course}</td>
                        <td className="py-3">{`${item.Room} ( ${item.Population}/${item.Capacity} )`}</td>
                        <td className="py-3">{item.Section}</td>
                        <td className="py-3">{item.Component}</td>
                        <td className="py-3">{item.Day}</td>
                        <td className="py-3">
                          {convertMinutes(item.StartTime)}
                        </td>
                        <td className="py-3">{convertMinutes(item.EndTime)}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </section>
        </main>
        <ViewModal
          id={"ExpectedClass"}
          title={
            <h6 className="text-center text-black">List of Expected Classes</h6>
          }
          content={
            <main>
              <header className="py-2 px-3 border rounded mb-2">
                <section>
                  <p className="p-0 m-0">{`Total Classes: ${
                    removeDuplicates(tertiary) &&
                    removeDuplicates(shs) &&
                    removeDuplicates(tertiary).length +
                      removeDuplicates(shs).length
                  }`}</p>
                </section>
              </header>
              <main className="row m-0 p-0">
                <section className="col-lg-6 pe-1 p-0 m-0">
                  <header className="mt-2">
                    <h6>Tertiary</h6>
                  </header>
                  <ol className="list-group list-group-numbered">
                    {removeDuplicates(tertiary).map((schedule, o) => (
                      <li
                        key={o}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{schedule.Course}</div>
                          {schedule.Component}
                        </div>
                        <span className="badge text-bg-primary rounded-pill">
                          {schedule.Population}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
                <section className="col-lg-6 ps-1 p-0 m-0">
                  <header className="mt-2">
                    <h6>Senior High School</h6>
                  </header>
                  <ol className="list-group list-group-numbered">
                    {removeDuplicates(shs).map((schedule, o) => (
                      <li
                        key={o}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{schedule.Course}</div>
                          {schedule.Component}
                        </div>
                        <span className="badge text-bg-primary rounded-pill">
                          {schedule.Population}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              </main>
            </main>
          }
        />
      </main>
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main>{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
      <LoaderModal id={"AwaitModal"} content={<>{modalcontent.Content}</>} />
    </>
  );
}
