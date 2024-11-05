import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import useDatabase from "../../../../hook/useDatabase";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import useHandleChange from "../../../../hook/useHandleChange";
import useConfiguration from "../../../../hook/useConfiguration";

export function SectionSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [search, setSearch] = useState({
    Search: "",
  });

  const [dataChange] = useHandleChange(setSearch);
  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [currsection, setCurrentSection] = useState(
    search.Search === "" ? "n/a" : search.Search
  );

  const [day, setDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [time, setTime] = useState([
    420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840,
    870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230,
    1260,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("project-list", setSection);
    data_get("course-list", setCourse);
    if (search.Search === "") {
      for (var i = 0; i < section.length; i++) {
        setCurrentSection(section[0].Section);
      }
    } else {
      setCurrentSection(search.Search);
    }
  }, [search]);

  useEffect(() => {
    section.map((section, i) =>
      i === 0 && currsection === "n/a"
        ? setCurrentSection(section.Section)
        : null
    );
  }, [section]);

  function resetSearch() {
    setSearch({ Search: "" });
  }
  function previousSection() {
    for (var i = 0; i < section.length; i++) {
      if (section[i].Section === currsection) {
        if (i - 1 >= 0) {
          setCurrentSection(section[i - 1].Section);
        }
      }
      if (currsection === "n/a") {
        setCurrentSection(section[0].Section);
      }
    }
  }
  function nextSection() {
    for (var i = 0; i < section.length; i++) {
      if (section[i].Section === currsection) {
        if (i + 1 < section.length) {
          setCurrentSection(section[i + 1].Section);
        }
      }
      if (currsection === "n/a") {
        setCurrentSection(section[0].Section);
      }
    }
  }

  function getAllScheduleOf(day) {
    var schedules = [];
    schedule.forEach((scheds) => {
      if (scheds.Section === currsection) {
        if (scheds.Day === day) {
          schedules.push(scheds);
        }
      }
    });
    schedules.sort((a, b) => a.Time - b.Time);
    return schedules;
  }

  return (
    <main className="h-100 w-100 row m-0 p-2">
      <section className="col-lg-9 h-100 p-0 m-0 pe-2 overflow-y-auto height-auto">
        <main className="h-100 w-100 d-flex align-items-center">
          <main>
            <DefaultButton
              class="border-0"
              icon={info.icons.navigation.previous}
              function={() => {
                previousSection();
              }}
            />
          </main>
          <main className="flex-fill h-100 pb-2">
            <table
              className="h-100 w-100 rounded"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <td
                    className="p-1 border"
                    colSpan={2}
                    style={{ width: "10%" }}
                  >
                    Day / Time
                  </td>
                  {day.map((daytime, index) => (
                    <td className="p-1 text-center border">{daytime}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {time.map((timeslot, timeindex) => (
                  <tr>
                    <td className="p-1 text-center border">
                      {convertMinutes(timeslot)}
                    </td>
                    <td className="p-1 text-center border">
                      {convertMinutes(timeslot + 30)}
                    </td>
                    {day.map((daytime, dayindex) => (
                      <td
                        className={`border-end ${
                          (timeindex - 1) % 2 == 0 ? "border-bottom" : ""
                        }`}
                      >
                        {getAllScheduleOf(daytime).map((schedule, item) =>
                          schedule.Day === daytime ? (
                            +schedule.StartTime === timeslot ? (
                              <div
                                className={`p-2 h-100 w-100 d-flex align-items-center text-truncate text-start text-break text-wrap ${
                                  schedule.Component.includes("Minor") ||
                                  schedule.Component.includes("Basic")
                                    ? "plotted1-2"
                                    : "plotted1"
                                }`}
                                onClick={() => alert(schedule.Course)}
                              >
                                <small className="fw-bold">
                                  {` ${
                                    schedule.Room.includes("Laboratory")
                                      ? "LAB"
                                      : "LEC"
                                  } : ${schedule.Course}`}
                                </small>
                              </div>
                            ) : +schedule.StartTime +
                                60 * (schedule.Units - 0.5) ===
                              timeslot ? (
                              <div
                                className={`h-100 w-100 d-flex align-items-center ${
                                  schedule.Component.includes("Minor") ||
                                  schedule.Component.includes("Basic")
                                    ? "plotted2-2"
                                    : "plotted2"
                                }`}
                                onClick={() => alert(schedule.Course)}
                              >
                                <small></small>
                              </div>
                            ) : +schedule.StartTime +
                                60 * (schedule.Units - 0.5) >
                                timeslot && +schedule.StartTime < timeslot ? (
                              <div
                                className={`h-100 w-100 d-flex align-items-center ${
                                  schedule.Component.includes("Minor") ||
                                  schedule.Component.includes("Basic")
                                    ? "plotted2-2"
                                    : "plotted2"
                                }`}
                                onClick={() => alert(schedule.Course)}
                              >
                                <small></small>
                              </div>
                            ) : null
                          ) : null
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="border-top" colSpan={6}></td>
                </tr>
              </tbody>
            </table>
          </main>
          {/* <main className="h-100 flex-fill py-2">
            <header className="p-2">
              {section.map((section, o) =>
                section.Section === currsection ? (
                  <>
                    <h3>{`${section.Section}`}</h3>
                    <p className="m-0">{`Number of Students: ${section.Population} student/s`}</p>
                  </>
                ) : null
              )}
              <hr />
            </header>
            {day.map((day, i) => (
              <main className="p-2">
                <section>
                  <h6>{day}</h6>
                </section>
                <section className="w-100 d-flex">
                  {time.map((time, j) =>
                    schedule.length > 0
                      ? schedule.map((schedule, k) =>
                          schedule.Section === currsection ? (
                            schedule.Day === day ? (
                              +schedule.StartTime === time ? (
                                <section
                                  className={
                                    schedule.Component.includes("Minor") ||
                                    schedule.Component.includes("Basic")
                                      ? "border border-white gradient-bg-yellow custom-text-blue rounded p-3 w-100"
                                      : "border border-white gradient-bg-light-blue rounded p-3 w-100"
                                  }
                                  onClick={() => {
                                    alert(schedule.Course);
                                  }}
                                >
                                  <small>
                                    <h6 className="fw-bold m-0 p-0">
                                      {schedule.Course}
                                    </h6>
                                    <p className="fw-semibold m-0 p-0">
                                      {`${convertMinutes(
                                        schedule.StartTime
                                      )} : ${convertMinutes(schedule.EndTime)}`}
                                    </p>
                                    <p className="fw-semibold m-0 p-0">
                                      {schedule.Room}
                                    </p>
                                  </small>
                                </section>
                              ) : (
                                ""
                              )
                            ) : null
                          ) : null
                        )
                      : null
                  )}
                </section>
              </main>
            ))}
          </main> */}
          <main>
            <DefaultButton
              class="border-0"
              icon={info.icons.navigation.next}
              function={() => nextSection()}
            />
          </main>
        </main>
      </section>
      <section className="col-lg-3 h-100 p-0 ps-2 m-0 height-auto">
        <main className="h-100 overflow-y-auto px-1">
          <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex w-100">
                <DefaultButton
                  class="px-2"
                  icon={info.icons.navigation.back}
                  text="Back"
                  function={() => navigate(-1)}
                />
                <DefaultInput
                  name="Search"
                  placeholder="Search"
                  trigger={dataChange}
                />
              </div>
            </div>
          </section>
          <section>
            <header className="p-2">
              {section.map((section, o) =>
                section.Section === currsection ? (
                  <>
                    <h3>{`${section.Section}`}</h3>
                    <p className="m-0">{`Number of Students: ${section.Population} student/s`}</p>
                  </>
                ) : null
              )}
              <hr />
            </header>
            {schedule.length > 0
              ? schedule.map((schedule, i) =>
                  schedule.Section === currsection ? (
                    <>
                      <main className="p-3 shadow-sm rounded mb-2 hover-darken">
                        <main className="row m-0 p-0">
                          <section className="col-12 p-0 m-0">
                            <section>
                              <h6 className="p-0 m-0">{schedule.Course}</h6>
                            </section>
                            <section>
                              <small>
                                <p className="p-0 m-0 text-secondary fst-italic">
                                  {schedule.Room}
                                </p>
                                <p className="p-0 m-0 text-secondary fst-italic">
                                  <span>
                                    {`${schedule.Day} - ${convertMinutes(
                                      schedule.StartTime
                                    )} : ${convertMinutes(schedule.EndTime)}`}
                                  </span>
                                </p>
                              </small>
                            </section>
                          </section>
                        </main>
                      </main>
                    </>
                  ) : null
                )
              : null}
          </section>
        </main>
      </section>
    </main>
  );
}
