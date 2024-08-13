import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { MdOutlineAlarmOn } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";

export function Locator() {
  const [convertMinutes] = useTimeFormat();
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const d = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [coaches, setCoaches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [currcoach, setCurrCoach] = useState("n/a");
  const [time, setTime] = useState();

  useEffect(() => {
    post("sel-coach", coaches, setCoaches);
    post("sel-sched", schedules, setSchedules);
  }, []);

  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={
          <main className="p-2">
            <section>
              <h5>{`${days[d.getDay()]} - ${d.getHours()}:${
                d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
              } ${d.getHours() < 12 ? "AM" : "PM"}`}</h5>
              {time}
              <hr />
              <h6>
                {`ID: `} <span className="fw-normal">{currcoach}</span>
              </h6>
              <h6>
                {`Coach: `}
                <span className="fw-normal">
                  {coaches.length > 0
                    ? coaches.map((coach, i) =>
                        coach.SCHLID === currcoach
                          ? `${coach.LastName}, ${coach.FirstName} ${coach.MiddleInitial}`
                          : null
                      )
                    : null}
                </span>
              </h6>
            </section>
            <hr />
            <section>
              <h6>{`Schedule: `}</h6>
              {schedules.length > 0
                ? schedules.map((schedule, i) =>
                    schedule.SCHLID === currcoach ? (
                      schedule.Day === days[d.getDay()] ? (
                        schedule.StartTime <
                          d.getHours() * 60 + d.getMinutes() &&
                        d.getHours() * 60 + d.getMinutes() <
                          schedule.EndTime ? (
                          <main>
                            <section className="border px-5 py-3">
                              <header>
                                <h6 className="fw-bold text-success">
                                  ON CLASS
                                </h6>
                                <hr />
                              </header>
                              <h6>
                                {`Section: `}
                                <span className="fw-normal">
                                  {schedule.Section}
                                </span>
                              </h6>
                              <h6>
                                {`Course: `}
                                <span className="fw-normal">
                                  {schedule.Course}
                                </span>
                              </h6>
                              <h6>
                                {`Room: `}
                                <span className="fw-normal">
                                  {schedule.Room}
                                </span>
                              </h6>
                              <h6>
                                {`StartTime: `}
                                <span className="fw-normal">
                                  {convertMinutes(schedule.StartTime)}
                                </span>
                              </h6>
                              <h6>
                                {`EndTime: `}
                                <span className="fw-normal">
                                  {convertMinutes(schedule.EndTime)}
                                </span>
                              </h6>
                            </section>
                          </main>
                        ) : null
                      ) : null
                    ) : null
                  )
                : null}
            </section>
          </main>
        }
        control={
          <>
            <div className="w-100">
              <div className="d-flex gap-2 justify-content-end">
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
                  function={() => navigate(-1)}
                />
                <DefaultInput placeholder="Search" />
              </div>
            </div>
          </>
        }
        list={
          coaches.length > 0
            ? coaches.map((coach, i) => (
                <main className={"w-100 rounded shadow-sm p-3 mb-2 row m-0 "}>
                  <section className="col-2 p-0 m-0">
                    <h6 className="p-0 m-0">{coach.DPT_Abbreviation}</h6>
                  </section>
                  <section className="col-5 p-0 m-0">
                    <h5 className="p-0 m-0 custom-text-gradient fw-bold">{`${coach.LastName}, ${coach.FirstName} ${coach.MiddleInitial}`}</h5>
                    <small>
                      <p className="p-0 m-0 text-secondary fst-italic">
                        <span>{coach.Email}</span>
                      </p>
                    </small>
                  </section>
                  <section className="col-4 p-0 m-0">
                    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end border-end px-3">
                      <p className="p-0 m-0">{coach.SCHLID}</p>
                    </div>
                  </section>
                  <section className="col-1 p-0 m-0">
                    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
                      <DefaultButton
                        class="btn-info"
                        icon={<MdOutlineAlarmOn />}
                        function={() => {
                          setCurrCoach(coach.SCHLID);
                        }}
                      />
                    </div>
                  </section>
                </main>
              ))
            : null
        }
      />
    </>
  );
}
