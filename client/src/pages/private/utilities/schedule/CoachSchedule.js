import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import useHandleChange from "../../../../hook/useHandleChange";
import useConfiguration from "../../../../hook/useConfiguration";

export function CoachSchedule() {
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
    if (search.Search === "") {
      for (var i = 0; i < coach.length; i++) {
        setCurrentCoach(coach[0].SCHLID);
      }
    } else {
      setCurrentCoach(search.Search);
    }
  }, [search]);

  useEffect(() => {
    coach.map((coach, i) =>
      i === 0 && currcoach === "n/a" ? setCurrentCoach(coach.SCHLID) : null
    );
  }, [coach]);

  function resetSearch() {
    setSearch({ Search: "" });
  }
  function previousSection() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].SCHLID === currcoach) {
        if (i - 1 >= 0) {
          setCurrentCoach(coach[i - 1].SCHLID);
        }
      }
      if (currcoach === "n/a") {
        setCurrentCoach(coach[0].SCHLID);
      }
    }
  }
  function nextSection() {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].SCHLID === currcoach) {
        if (i + 1 < coach.length) {
          setCurrentCoach(coach[i + 1].SCHLID);
        }
      }
      if (currcoach === "n/a") {
        setCurrentCoach(coach[0].SCHLID);
      }
    }
  }
  return (
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-9 h-100 p-0 m-0 pe-2 overflow-y-auto height-auto">
        <main className="h-100 w-100 d-flex align-items-center">
          <main>
            <DefaultButton
              class=""
              icon={info.icons.navigation.previous}
              function={() => {
                previousSection();
              }}
            />
          </main>
          <main className="h-100 flex-fill py-2">
            <header className="p-2">
              {coach.map((coach, o) =>
                coach.SCHLID === currcoach ? (
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
                <section className="w-100 d-flex height-auto">
                  {time.map((time, j) =>
                    schedule.length > 0
                      ? schedule.map((schedule, k) =>
                          schedule.SCHLID === currcoach ? (
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
                                    <p className="fw-semibold m-0 p-0">
                                      {schedule.Section}
                                    </p>
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
          </main>
          <main>
            <DefaultButton
              class=""
              icon={info.icons.navigation.next}
              function={() => nextSection()}
            />
          </main>
        </main>
      </section>
      <section className="col-lg-3 h-100 p-0 ps-2 m-0">
        <main className="h-100 position-relative overflow-y-auto px-1">
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
            {schedule.length > 0
              ? schedule.map((schedule, i) =>
                  schedule.SCHLID === currcoach ? (
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
