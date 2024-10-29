import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";

export function StudentSchedule() {
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

  const [studentSection, setStudentSection] = useState([]);
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [currsection, setCurrentSection] = useState(
    search.Search === "" ? "n/a" : search.Search
  );

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

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
    data_get("class-schedule-list", setSchedule);
    data_post(
      "student-section",
      { data: loggeduser.SCHLID },
      setStudentSection
    );
  }, []);

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

  return (
    <main className="h-100 row m-0 p-2">
      <main className="h-100 w-100 d-flex align-items-center">
        <main className="h-100 flex-fill py-2">
          <header className="p-2">
            {section.map((section, o) =>
              section.Section === studentSection.Section ? (
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
                        schedule.Section === studentSection.Section ? (
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
      </main>
    </main>
  );
}
