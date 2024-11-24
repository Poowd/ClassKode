import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { ViewModal } from "../../../../component/modal/ViewModal";
import useConfiguration from "../../../../hook/useConfiguration";
import useModal from "../../../../hook/useModal";
import { LoaderModal } from "../../../../component/modal/LoaderModal";
import { StatusModal } from "../../../../component/modal/StatusModal";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";
import { useLogs } from "../../../../hook/useLogs";

export function GenerateSchedule() {
  const bootstrap = require("bootstrap");
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();
  const [recordLog] = useLogs();

  const [expected, setExpected] = useState([]);
  const [room, setRoom] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [coach, setCoach] = useState([]);
  const [section, setSection] = useState([]);
  const [schedulestatus, setScheduleStatus] = useState([]);
  const [data, setData] = useState({
    currentSemester: "",
  });

  const [search, setSearch] = useState({
    Search: "",
    setbyAcademicLevel: "",
  });

  const [weekly, setWeekly] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [specialize, setSpecialize] = useState([]);
  const [ay, setAY] = useState([]);

  useEffect(() => {
    data_get("current-academic-year", setAY);
    data_get("room-list", setRoom);
    data_get("academic-level-list", setAcademicLevel);
    data_get("project-list", setSection);
    data_get("assign-list", setCoach);
    data_get("coach-type-list", setCoachType);
    data_get("weekly-event-list", setWeekly);
    data_get("specialization-list", setSpecialize);
    data_post("expected-class-list", { data: ay.Code }, setExpected);
  }, []);

  const checkConflict = (start_time, end_time, target_coach, target_day) => {
    schedule.forEach((sche) => {
      if (
        !(
          (+start_time < +sche.STR_TME && +end_time <= +sche.STR_TME) ||
          (+start_time > +sche.STR_TME &&
            +end_time >= +sche.STR_TME &&
            +sche.END_TME <= +start_time)
        ) &&
        sche.CCH === target_coach &&
        sche.DAY === target_day
      ) {
        return "bg-danger";
      }
    });
    return "";
  };

  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
    });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in schedule) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}class-schedule-insert`,
              {
                method: "POST",
                body: JSON.stringify(schedule[i]),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        data_post("set-schedule-status", { data: ay.Code }, setScheduleStatus);
        recordLog(
          "Saved a Generated Schedule",
          "Class Schedule Module",
          "A user saved a set of Class Schedules"
        );
        showModal(
          "StatusModal",
          "",
          <main className="d-flex flex-column">
            <section className="text-center">
              <h1 className="text-success">{info.icons.status.success}</h1>
              <h3 className="text-success fw-bold">Success</h3>
              <p className="m-0">
                Generation of Schedules is Temporarily Disabled
              </p>
              <button
                type="button"
                class="btn safe-color mt-3"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </section>
          </main>
        );
        navigate(-1);
      }, 500); // 2 second delay
    }
  };

  return (
    <>
      <main className="h-100 position-relative p-1">
        <main className="h-100 bg-white rounded shadow-sm p-3 overflow-y-auto">
          <header>
            <h1 className="fw-bold primary-text pb-2">
              {info.text.moduleText.classSchedule.generate}
            </h1>
            <p className="text-secondary">
              {info.text.moduleText.classSchedule.generateDescrition}
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
                  <DefaultDropdown
                    class="border p-2"
                    reversed={true}
                    icon={info.icons.forms.filter}
                    dropdownitems={
                      <main className="d-flex gap-2 p-3">
                        <section>
                          <h6>Academic Level</h6>
                          {academiclevel &&
                            academiclevel.map((item, i) => (
                              <DefaultDropdownItem
                                title={item.AcademicLevel}
                                trigger={() =>
                                  setSearch((prev) => ({
                                    ...prev,
                                    setbyAcademicLevel: item.AcademicLevel,
                                  }))
                                }
                              />
                            ))}
                        </section>
                      </main>
                    }
                  />
                  <DefaultButton
                    class="border px-2"
                    reversed={false}
                    icon={info.icons.others.list}
                    function={() => {}}
                    toggle="modal"
                    target="#ExpectedClass"
                  />
                  <DefaultButton
                    class={`px-2 primary-gradient`}
                    icon={info.icons.forms.add}
                    text="Save"
                    function={submitForm}
                    disabled={schedule.length < 1 ? true : false}
                  />
                  <DefaultButton
                    class={`px-2 primary-gradient`}
                    icon={info.icons.forms.generate}
                    text="Generate"
                    function={() => {
                      showModal(
                        "AwaitModal",
                        "",
                        "Schedules are being made. This may take a while."
                      );
                      data_post(
                        "gen-class",
                        {
                          classes: expected,
                          rooms: room,
                          coaches: coach,
                          sections: section,
                          coachtype: coachtype,
                          specialize: specialize,
                          academicyear: ay,
                        },
                        setSchedule
                      );
                      setTimeout(() => {
                        recordLog(
                          "Generated a Set of Schedule",
                          "Class Schedule Module",
                          "A user generated a set of Class Schedules"
                        );
                        hideModal();
                      }, 2000); // 2 second delay
                    }}
                    disabled={ay.GeneratedSchedules === true ? true : false}
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <ul className="p-0 m-0 mb-2 d-flex gap-2 flex-wrap">
              <li className={search.Search === "" ? "visually-hidden" : ""}>
                <DefaultButton
                  class="primary-outline-gradient px-2"
                  text={search.Search}
                  function={() => {
                    document.getElementById(`Search`).value = "";
                    setSearch((prev) => ({
                      ...prev,
                      Search: "",
                    }));
                  }}
                />
              </li>
              <li
                className={
                  search.setbyAcademicLevel === "" ? "visually-hidden" : ""
                }
              >
                <DefaultButton
                  class="primary-outline-gradient px-2"
                  text={search.setbyAcademicLevel}
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyAcademicLevel: "",
                    }))
                  }
                />
              </li>
            </ul>
          </section>
          <section className="table-responsive">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th className="p-3">Course Code</th>
                  <th className="text-start p-3">Course</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Course Level</th>
                  <th className="p-3">Day</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Component</th>
                  <th className="p-3">Coach</th>
                  <th className="p-3">Population</th>
                </tr>
              </thead>
              <tbody>
                {schedule.length > 0
                  ? schedule.map((sc, i) =>
                      search.setbyAcademicLevel === "" ||
                      search.setbyAcademicLevel === sc.ACDLVL ? (
                        <tr
                          key={i}
                          className={`${
                            sc.CCH == "n/a" ? "bg-warning" : ""
                          } ${checkConflict(
                            sc.STR_TME,
                            sc.END_TME,
                            sc.CCH,
                            sc.DAY
                          )}`}
                        >
                          <td className="bg-transparent py-3">{sc.CRS_CODE}</td>
                          <td className="bg-transparent text-start py-3">
                            {sc.CRS}
                          </td>
                          <td className="bg-transparent py-3">{sc.SCT}</td>
                          <td className="bg-transparent py-3">{sc.YRLVL}</td>
                          <td className="bg-transparent py-3">{sc.DAY}</td>
                          <td className="bg-transparent py-3">
                            {`${convertMinutes(sc.STR_TME)} - ${convertMinutes(
                              sc.END_TME
                            )}`}
                          </td>
                          <td className="bg-transparent py-3">{sc.ROM}</td>
                          <td className="bg-transparent py-3">{sc.CPT}</td>
                          <td className="bg-transparent py-3">{sc.CCH}</td>
                          <td className="bg-transparent py-3">{`${sc.PPL} out of ${sc.CPC}`}</td>
                        </tr>
                      ) : null
                    )
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
                  <p className="p-0 m-0">{`Total Classes: ${expected.length}`}</p>
                </section>
              </header>
              <main className="row m-0 p-0">
                <section className="col-lg-6 pe-1 p-0 m-0">
                  <header className="mt-2">
                    <h6>Tertiary</h6>
                  </header>
                  <ol className="list-group list-group-numbered">
                    {expected.map((item, i) =>
                      item.AcademicLevel === "Tertiary" ? (
                        <li
                          key={i}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.Section}</div>
                            {item.Course}
                          </div>
                          <span className="badge text-primary-gradient rounded-pill">
                            {item.Population}
                          </span>
                        </li>
                      ) : null
                    )}
                  </ol>
                </section>
                <section className="col-lg-6 ps-1 p-0 m-0">
                  <header className="mt-2">
                    <h6>Senior High School</h6>
                  </header>
                  <ol className="list-group list-group-numbered">
                    {expected.map((item, i) =>
                      item.AcademicLevel === "Senior High School" ? (
                        <li
                          key={i}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.Section}</div>
                            {item.Course}
                          </div>
                          <span className="badge text-primary-gradient rounded-pill">
                            {item.Population}
                          </span>
                        </li>
                      ) : null
                    )}
                  </ol>
                </section>
              </main>
            </main>
          }
        />
      </main>
      <ViewModal
        id={"Modal"}
        title={modalcontent.Title}
        content={
          <>
            <main>
              <section>{modalcontent.Content}</section>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </main>
          </>
        }
        trigger={() => {}}
      />
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main className="text-center">{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
      <LoaderModal id={"AwaitModal"} content={<>{modalcontent.Content}</>} />
    </>
  );
}
