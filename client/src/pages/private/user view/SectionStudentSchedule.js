import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";

export function SectionStudentSchedule() {
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
  const [academicYearCode, setAYCode] = useState([]);

  const [day, setDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [time, setTime] = useState([
    420, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870,
    900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1200, 1260,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("project-list", setSection);
    data_get("course-list", setCourse);
    data_get("current-academic-year-code", setAYCode);
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

  return (
    <main className="h-100 row m-0 p-2">
      <section className="col-9 h-100 p-0 m-0 pe-2 overflow-y-auto">
        <main className="h-100 w-100 d-flex align-items-center">
          <main>
            <DefaultButton
              class="border"
              icon={info.icons.navigation.previous}
              function={() => {
                previousSection();
              }}
            />
          </main>
          <main className="h-100 flex-fill py-2">
            <header className="p-2">
              {section.map((section, o) =>
                section.Section === currsection &&
                section.AcademicYear === academicYearCode.AcademicCode ? (
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
                                    schedule.Component.includes("Minor")
                                      ? "border border-white gradient-bg-yellow custom-text-blue rounded p-3 w-100"
                                      : "border border-white gradient-bg-light-blue rounded p-3 w-100"
                                  }
                                  onClick={() => {
                                    alert(schedule.Course);
                                  }}
                                >
                                  <small>
                                    <h6 className="fw-bold m-0 p-0">
                                      {course.map((course, i) =>
                                        course.Code === schedule.Course ? (
                                          <span key={i}>{course.Course}</span>
                                        ) : null
                                      )}
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
          </main>
          <main>
            <DefaultButton
              class="border"
              icon={info.icons.navigation.next}
              function={() => nextSection()}
            />
          </main>
        </main>
      </section>
      <section className="col-3 h-100 p-0 ps-2 m-0">
        <main className="h-100 overflow-y-auto px-1">
          <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex w-100">
                <DefaultButton
                  class=""
                  icon={info.icons.navigation.back}
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
            {schedule.length > 0
              ? schedule.map((schedule, i) =>
                  schedule.Section === currsection ? (
                    <>
                      <main className="p-3 shadow-sm rounded mb-2">
                        <main className="row m-0 p-0">
                          <section className="col-12 p-0 m-0">
                            <section>
                              <h6 className="p-0 m-0">
                                <span>{schedule.Course}</span>
                              </h6>
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
