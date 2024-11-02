import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { ViewModal } from "../../../../../src/component/modal/ViewModal";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";
import useConfiguration from "../../../../hook/useConfiguration";

export function GenerateExaminations() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();

  const [schedule, setSchedule] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);
  const [room, setRooms] = useState([]);
  const [sections, setSection] = useState([]);
  const [ay, setAY] = useState([]);
  const [data, setData] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Friday",
  ]);

  useEffect(() => {
    data_get("current-academic-year", setAY);
    data_get("class-schedule-list", setSchedule);
    data_get("room-list", setRooms);
    data_get("section-list", setSection);
  }, []);

  const [availRoom, setAvailRoom] = useState([]);

  useEffect(() => {
    setAvailRoom([]);
    days.forEach((day) => {
      room.forEach((rom) => {
        if (rom.Facility.includes("Lecture")) {
          setAvailRoom((prev) => [
            ...prev,
            { Room: rom.Room, Day: day, Exams: [] },
          ]);
        }
      });
    });
  }, [room]);

  const [tertiary, setTertiary] = useState([]);
  const [noDuplicateTertiary, setNoDuplicateTeriary] = useState(null);
  const [shs, setSHS] = useState([]);
  const [noDuplicateSHS, setNoDuplicateSHS] = useState(null);

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
      const key = `${entry.Code}-${entry.Section}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  useEffect(() => {
    setNoDuplicateTeriary(removeDuplicates(tertiary));
    setNoDuplicateSHS(removeDuplicates(shs));
  }, [tertiary, shs]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in examSchedule) {
        for (var j in examSchedule[i].Exams) {
          do {
            try {
              const response = await fetch(
                `${info.conn.server}exam-schedule-insert`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    CourseCode: examSchedule[i].Exams[j].CourseCode,
                    Course: examSchedule[i].Exams[j].Course,
                    Section: examSchedule[i].Exams[j].Section,
                    Component: examSchedule[i].Exams[j].Component,
                    Time: examSchedule[i].Exams[j].Time,
                    Level: examSchedule[i].Exams[j].Level,
                    Population: examSchedule[i].Exams[j].Population,
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
      }
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
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
                    class="btn-primary"
                    reversed={false}
                    icon={info.icons.others.package}
                    function={() => {}}
                    toggle="modal"
                    target="#ExpectedClass"
                  />
                  <DefaultButton
                    class="btn-primary px-2"
                    icon={info.icons.forms.add}
                    function={submitForm}
                  />
                  <DefaultButton
                    class="btn-primary px-2"
                    text="Generate Tertiary"
                    function={() => {
                      data_post(
                        "gen-exam-ter",
                        {
                          schedule: removeDuplicates(schedule),
                          room: room,
                          section: sections,
                        },
                        setExamSchedule
                      );
                    }}
                  />
                  <DefaultButton
                    class="btn-primary px-2"
                    text="Generate SHS"
                    function={() => {
                      data_post(
                        "gen-exam-shs",
                        {
                          schedule: removeDuplicates(schedule),
                          room: room,
                          section: sections,
                        },
                        setExamSchedule
                      );
                    }}
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
                  ? examSchedule.map((item, i) =>
                      item.Exams.map((examSchedule, p) => (
                        <tr key={i}>
                          <td className="py-3">{examSchedule.CourseCode}</td>
                          <td className="py-3 text-start">
                            {examSchedule.Course}
                          </td>
                          <td className="py-3">{`${item.Room} ( ${examSchedule.Population}/${item.Capacity} )`}</td>
                          <td className="py-3">{examSchedule.Section}</td>
                          <td className="py-3">{examSchedule.Component}</td>
                          <td className="py-3">{item.Day}</td>
                          <td className="py-3">
                            {convertMinutes(examSchedule.Time)}
                          </td>
                          <td className="py-3">
                            {convertMinutes(examSchedule.Time + 90)}
                          </td>
                        </tr>
                      ))
                    )
                  : null}
              </tbody>
            </table>
          </section>
        </main>
        <ViewModal
          id={"ExpectedClass"}
          title={
            <h6 className="text-center text-black">
              List of Expected Examination
            </h6>
          }
          content={
            <main>
              <header className="py-2 px-3 border rounded mb-2">
                <section>
                  <p className="p-0 m-0">{`Total Classes: ${
                    noDuplicateTertiary &&
                    noDuplicateSHS &&
                    noDuplicateTertiary.length + noDuplicateSHS.length
                  }`}</p>
                </section>
              </header>
              <main>
                <ol className="list-group list-group-numbered">
                  <h6 className="mt-2">Tertiary</h6>
                  {tertiary.map((schedule, o) => (
                    <li key={o} className="list-group-item d-flex">
                      <main className="ms-2 d-flex flex-column justify-content-between align-items-start">
                        <p className="m-0 fw-bold">{schedule.Course}</p>
                        <p className="m-0">{schedule.Component}</p>
                      </main>
                    </li>
                  ))}
                  <h6 className="mt-2">SHS</h6>
                  {shs.map((schedule, o) => (
                    <li key={o} className="list-group-item d-flex">
                      <main className="ms-2 d-flex flex-column justify-content-between align-items-start">
                        <p className="m-0 fw-bold">{schedule.Course}</p>
                        <p className="m-0">{schedule.Component}</p>
                      </main>
                    </li>
                  ))}
                </ol>
              </main>
            </main>
          }
        />
      </main>
    </>
  );
}
