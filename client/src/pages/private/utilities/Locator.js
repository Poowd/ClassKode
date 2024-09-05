import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import useConfiguration from "../../../hook/useConfiguration";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { ViewModal } from "../../../component/modal/ViewModal";
import { RoomCard } from "../../../component/card/RoomCard";

export function Locator() {
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();
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

  const [department, setDepartment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selcoach, setSelCoach] = useState([]);
  const [currcoach, setCurrCoach] = useState("n/a");
  const [time, setTime] = useState();
  const [filter, setFilter] = useState({
    setbyDepartment: "",
    setbyClass: "",
  });

  useEffect(() => {
    post("sel-coach", coaches, setCoaches);
    post("sel-dept", department, setDepartment);
    post("sel-sched", schedules, setSchedules);
  }, [coaches, department, schedules]);

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();
      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();
      const currentTime = `${hour}:${minute}:${second}`;
      setTime(currentTime);
    }, 1000);
  }, []);

  function checkClassStatus(coach) {
    for (var i = 0; i < schedules.length; i++) {
      if (schedules[i].Day === days[d.getDay()]) {
        if (
          schedules[i].StartTime < d.getHours() * 60 + d.getMinutes() &&
          d.getHours() * 60 + d.getMinutes() < schedules[i].EndTime
        ) {
          if (schedules[i].SCHLID === coach) {
            return "On Going";
          }
        }
      }
    }
    return "No Class";
  }

  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={
          <main className="h-100 p-1 d-flex flex-column justify-content-between">
            <main>
              <section>
                {schedules.length > 0
                  ? schedules.map((schedule, i) =>
                      schedule.SCHLID === currcoach ? (
                        schedule.StartTime <
                          d.getHours() * 60 + d.getMinutes() &&
                        d.getHours() * 60 + d.getMinutes() <
                          schedule.EndTime ? (
                          schedule.Day === days[d.getDay()] ? (
                            <main className="border rounded p-3">
                              <header>
                                <h6 className="fw-bold text-success">
                                  ON GOING
                                </h6>
                              </header>
                              <main>
                                <section className="px-3">
                                  <section className="m-0 p-0">
                                    <h6>{" ".concat(schedule.SCHLID)}</h6>
                                    <h5>
                                      {coaches.map((coach, i) =>
                                        coach.SCHLID === currcoach
                                          ? ` ${coach.LastName}, ${coach.FirstName} ${coach.MiddleInitial}`
                                          : null
                                      )}
                                    </h5>
                                  </section>
                                  <hr />
                                  <h6>Schedule Details</h6>
                                  <main className="row m-0 p-0 ">
                                    <section className="col-3 m-0 p-0">
                                      <span className="fw-semibold">
                                        Section:
                                      </span>
                                    </section>
                                    <section className="col-9 m-0 p-0">
                                      {schedule.Section}
                                    </section>
                                  </main>
                                  <main className="row m-0 p-0 ">
                                    <section className="col-3 m-0 p-0">
                                      <span className="fw-semibold">
                                        Course:
                                      </span>
                                    </section>
                                    <section className="col-9 m-0 p-0">
                                      {schedule.Course}
                                    </section>
                                  </main>
                                  <main className="row m-0 p-0 ">
                                    <section className="col-3 m-0 p-0">
                                      <span className="fw-semibold">Room:</span>
                                    </section>
                                    <section className="col-9 m-0 p-0">
                                      {schedule.Room}
                                    </section>
                                  </main>
                                  <main className="row m-0 p-0 ">
                                    <section className="col-3 m-0 p-0">
                                      <span className="fw-semibold">Time:</span>
                                    </section>
                                    <section className="col-9 m-0 p-0">
                                      {`${convertMinutes(
                                        schedule.StartTime
                                      )} - ${convertMinutes(schedule.EndTime)}`}
                                    </section>
                                  </main>
                                </section>
                              </main>
                            </main>
                          ) : null
                        ) : null
                      ) : null
                    )
                  : null}

                {checkClassStatus(currcoach) === "No Class" ? (
                  <main className="border rounded p-3">
                    <header>
                      <h6 className="fw-bold text-primary m-0 p-0">NO CLASS</h6>
                    </header>
                    {/* <main>
                      <section className="px-3">
                        <section className="m-0 p-0">
                          <h6>{" ".concat(currcoach)}</h6>
                          <h5 className="">
                            {coaches.map((coach, i) =>
                              coach.SCHLID === currcoach
                                ? ` ${coach.LastName}, ${coach.FirstName} ${coach.MiddleInitial}`
                                : null
                            )}
                          </h5>
                        </section>
                        <hr />
                        <p className="m-0 p-0 text-secondary text-center border p-1 rounded">
                          No Classes
                        </p>
                      </section>
                    </main> */}
                  </main>
                ) : null}
              </section>
            </main>
            <main className="border rounded py-1 px-2 text-secondary">
              <small className="d-flex align-items-center gap-2">
                {info.icons.schedule}
                <span>{`${days[d.getDay()]} - ${time} ${
                  d.getHours() < 12 ? "AM" : "PM"
                }`}</span>
              </small>
            </main>
          </main>
        }
        control={
          <>
            <div className="w-100">
              <div className="d-flex gap-2 justify-content-end">
                <DefaultButton
                  class=""
                  icon={info.icons.back}
                  function={() => navigate(-1)}
                />
                <DefaultInput placeholder="Search" />
                <DefaultDropdown
                  class="border p-2"
                  reversed={true}
                  icon={info.icons.filter}
                  dropdownitems={
                    <>
                      <DefaultDropdownItem
                        title={"All"}
                        trigger={() =>
                          setFilter((prev) => ({
                            ...prev,
                            setbyDepartment: "",
                          }))
                        }
                      />
                      <hr />
                      <main className="d-flex pb-3">
                        <section>
                          <DefaultDropdownItem
                            title={"On Going"}
                            trigger={() =>
                              setFilter((prev) => ({
                                ...prev,
                                setbyClass: "On Going",
                              }))
                            }
                          />
                          <DefaultDropdownItem
                            title={"No Class"}
                            trigger={() =>
                              setFilter((prev) => ({
                                ...prev,
                                setbyClass: "No Class",
                              }))
                            }
                          />
                        </section>
                        <section>
                          {department.map((item, i) => (
                            <DefaultDropdownItem
                              title={item.Department}
                              trigger={() =>
                                setFilter((prev) => ({
                                  ...prev,
                                  setbyDepartment: item.Department,
                                }))
                              }
                            />
                          ))}
                        </section>
                      </main>
                    </>
                  }
                />
              </div>
            </div>
          </>
        }
        list={
          <main className="row m-0 p-0">
            <main className="my-1">
              <section className="d-flex gap-1">
                {filter.setbyClass !== "" ? (
                  <DefaultButton
                    class="btn-outline-primary px-2"
                    reversed={true}
                    icon={info.icons.close}
                    text={filter.setbyClass}
                    function={() =>
                      setFilter((prev) => ({
                        ...prev,
                        setbyClass: "",
                      }))
                    }
                  />
                ) : null}
                {filter.setbyDepartment !== "" ? (
                  <DefaultButton
                    class="btn-outline-primary px-2"
                    reversed={true}
                    icon={info.icons.close}
                    text={filter.setbyDepartment}
                    function={() =>
                      setFilter((prev) => ({
                        ...prev,
                        setbyDepartment: "",
                      }))
                    }
                  />
                ) : null}
              </section>
            </main>
            {coaches.length > 0
              ? coaches.map(
                  (coach, i) =>
                    filter.setbyClass === "" ||
                    checkClassStatus(coach.SCHLID) === filter.setbyClass ? (
                      filter.setbyDepartment === "" ||
                      coach.Department === filter.setbyDepartment ? (
                        <section className="col-3 p-1 m-0">
                          <main className="h-100 bg-white rounded shadow-sm ratio ratio-1x1">
                            <section className="h-100 d-flex flex-column align-items-center">
                              <header className="h-50 w-100 d-flex justify-content-center pt-3 px-2">
                                <figure className="h-100 w-50 ratio ratio-1x1">
                                  <img
                                    src={`http://localhost:8081/images/${coach.Photo}`}
                                    alt="..."
                                    className="w-100 h-100 object-fit-cover rounded"
                                    style={{ objectPosition: "top" }}
                                  />
                                </figure>
                              </header>
                              <main className="h-50 w-50 d-flex flex-column text-center align-items-between py-3">
                                <small className="h-100">
                                  <h4 className="w-100 text-truncate custom-text-gradient m-0 p-0">{`${coach.LastName}`}</h4>
                                  <h6 className="w-100 text-truncate m-0 p-0">{`${coach.FirstName}`}</h6>
                                  <p className="p-0 pt-1 m-0 fw-bold text-secondary">{`${coach.DPT_Abbreviation}`}</p>
                                </small>
                                <main>
                                  <section className="d-flex gap-1">
                                    <DefaultButton
                                      class="w-100 btn-info text-white"
                                      icon={info.icons.schedule}
                                      text={
                                        checkClassStatus(coach.SCHLID) ===
                                        "On Going"
                                          ? schedules.length > 0
                                            ? schedules.map((schedule, i) =>
                                                schedule.SCHLID === coach.SCHLID
                                                  ? schedule.StartTime <
                                                      d.getHours() * 60 +
                                                        d.getMinutes() &&
                                                    d.getHours() * 60 +
                                                      d.getMinutes() <
                                                      schedule.EndTime
                                                    ? schedule.Day ===
                                                      days[d.getDay()]
                                                      ? schedule.Room
                                                      : null
                                                    : null
                                                  : null
                                              )
                                            : null
                                          : "No Class"
                                      }
                                      function={() => {
                                        setCurrCoach(coach.SCHLID);
                                      }}
                                      disabled={
                                        checkClassStatus(coach.SCHLID) ===
                                        "On Going"
                                          ? false
                                          : true
                                      }
                                    />
                                    <DefaultButton
                                      class="border px-2"
                                      reversed={true}
                                      icon={info.icons.schedule}
                                      function={() => {
                                        setSelCoach(coach);
                                      }}
                                      toggle="modal"
                                      target="#CoachSchedule"
                                    />
                                  </section>
                                </main>
                              </main>
                            </section>
                          </main>
                        </section>
                      ) : null
                    ) : null
                  // <main className={"w-100 rounded shadow-sm p-3 mb-2 row m-0 "}>
                  //   <section className="col-2 p-0 m-0">
                  //     <h6 className="p-0 m-0">{coach.DPT_Abbreviation}</h6>
                  //   </section>
                  //   <section className="col-5 p-0 m-0">
                  //     <h6 className="p-0 m-0 custom-text-gradient fw-bold">{`${coach.LastName}, ${coach.FirstName} ${coach.MiddleInitial}`}</h5>
                  //     <small>
                  //       <p className="p-0 m-0 text-secondary fst-italic">
                  //         <span>{coach.Email}</span>
                  //       </p>
                  //     </small>
                  //   </section>
                  //   <section className="col-4 p-0 m-0">
                  //     <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end border-end px-3">
                  //       <p className="p-0 m-0">{coach.SCHLID}</p>
                  //     </div>
                  //   </section>
                  //   <section className="col-1 p-0 m-0">
                  //     <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-end">
                  //       <DefaultButton
                  //         class="btn-info text-white"
                  //         icon={info.icons.schedule}
                  //         function={() => {
                  //           setCurrCoach(coach.SCHLID);
                  //         }}
                  //       />
                  //     </div>
                  //   </section>
                  // </main>
                )
              : null}
          </main>
        }
      />
      <ViewModal
        id={"CoachSchedule"}
        title={<h6 className="text-center text-black">Quick Navigation</h6>}
        content={
          <main className="p-3">
            <header>
              <section className="m-0 p-0">
                <h6>{" ".concat(selcoach.SCHLID)}</h6>
                <h5>{` ${selcoach.LastName}, ${selcoach.FirstName} ${selcoach.MiddleInitial}`}</h5>
              </section>
              <hr />
            </header>
            <main>
              {schedules.length > 0
                ? schedules.map((item, i) =>
                    item.SCHLID === selcoach.SCHLID ? (
                      <RoomCard
                        section={item.Section}
                        course={item.Course}
                        time={`${item.Day} - ${convertMinutes(
                          item.StartTime
                        )} - ${convertMinutes(item.EndTime)}`}
                      />
                    ) : null
                  )
                : null}
            </main>
          </main>
        }
      />
    </>
  );
}
