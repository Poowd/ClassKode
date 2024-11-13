import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";
import { CollapseButton } from "../../../component/button/CollapsButton";

export function CoachViewExaminations() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [search, setSearch] = useState({
    Search: "",
  });

  const [dataChange] = useHandleChange(setSearch);
  const [schedule, setSchedule] = useState([]);
  const [exams, setExamniations] = useState([]);
  const [coach, setCoach] = useState([]);
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
    data_get("assign-list", setCoach);
    data_get("class-schedule-list", setSchedule);
    data_post(
      "student-section",
      { data: loggeduser.SCHLID },
      setStudentSection
    );
    data_get("exam-schedule-list", setExamniations);
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
          <header className="p-2 text-center">
            {coach.map((coach, o) =>
              coach.SCHLID === loggeduser.SCHLID ? (
                <>
                  <h1>{`${coach.LastName}, ${coach.FirstName}`}</h1>
                  <p className="m-0 fst-italic">{`${coach.Department}`}</p>
                </>
              ) : null
            )}
            <hr />
          </header>
          {day.map((day, i) => (
            <CollapseButton
              id={i}
              width={"w-100 mb-2"}
              background={"shadow-sm rounded text-center w-100 p-3"}
              title={day}
              content={
                <section className="w-100 d-flex">
                  {time.map((time, j) =>
                    exams.length > 0
                      ? exams.map((schedule, k) =>
                          schedule.Coach === loggeduser.SCHLID ? (
                            schedule.Day === day ? (
                              +schedule.StartTime === time ? (
                                <section
                                  className={
                                    schedule.Component.includes("General")
                                      ? "border border-white plotted2-2 rounded p-3 w-100"
                                      : "border border-white plotted2 rounded p-3 w-100"
                                  }
                                  onClick={() => {
                                    alert(schedule.Course);
                                  }}
                                >
                                  <small>
                                    <h6 className="fw-bold m-0 p-0">
                                      <span>{schedule.Course}</span>
                                    </h6>
                                    <p className="fw-normal m-0 p-0">
                                      {`${schedule.Component}`}
                                    </p>
                                    <p className="fw-normal m-0 p-0">
                                      {`${schedule.Day}, ${convertMinutes(
                                        schedule.StartTime
                                      )} : ${convertMinutes(schedule.EndTime)}`}
                                    </p>
                                    <p className="fw-normal m-0 p-0">
                                      {schedule.Room}
                                    </p>
                                    <p className="fw-normal m-0 p-0">
                                      {`${schedule.Population} students`}
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
              }
            />
          ))}
        </main>
      </main>
    </main>
  );
}
