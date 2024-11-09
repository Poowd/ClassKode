import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useHandleChange from "../../../hook/useHandleChange";

export function CoachViewSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();

  const [search, setSearch] = useState({
    Search: "",
  });

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const [dataChange] = useHandleChange(setSearch);
  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [coach, setCoach] = useState([]);
  const [course, setCourse] = useState([]);
  const [currcoach, setCurrentCoach] = useState(
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
    420, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870,
    900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1200, 1260,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("assign-list", setCoach);
    data_get("course-list", setCourse);
    console.log(loggeduser.SCHLID);
  }, [search]);

  useEffect(() => {
    coach.map((coach, i) =>
      i === 0 && currcoach === "n/a" ? setCurrentCoach(coach.SCHLID) : null
    );
  }, [coach]);

  function resetSearch() {
    setSearch({ Search: "" });
  }
  return (
    <main className="h-100 w-100 d-flex align-items-center">
      <main className="h-100 flex-fill py-2">
        <header className="p-2">
          {coach.map((coach, o) =>
            coach.SCHLID === loggeduser.SCHLID ? (
              <>
                <h3>{`${coach.LastName}, ${coach.FirstName}`}</h3>
                <p className="m-0">{`${coach.Department}`}</p>
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
                      schedule.Coach === currcoach ? (
                        schedule.Day === day ? (
                          +schedule.StartTime === time ? (
                            <section
                              className={
                                schedule.Component.includes("General")
                                  ? "border border-white gradient-bg-yellow custom-text-blue rounded p-3 w-100"
                                  : "border border-white gradient-bg-light-blue rounded p-3 w-100"
                              }
                              onClick={() => {
                                alert(schedule.Course);
                              }}
                            >
                              <small>
                                <p className="fw-semibold m-0 p-0">
                                  {schedule.Section}
                                </p>
                                <h6 className="fw-bold m-0 p-0">
                                  <span>{schedule.Course}</span>
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
  );
}
