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
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  "https://pgcztzkowuxixfyiqera.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnY3p0emtvd3V4aXhmeWlxZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODQ0MTUsImV4cCI6MjA0MTA2MDQxNX0.ryLXhP4sBBhO5_JVgQ4YJ9BlpdlD2NQM2mjDRbkc3NY"
);

const CDNURL =
  "https://pgcztzkowuxixfyiqera.supabase.co/storage/v1/object/public/images/";

export function Locator() {
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const daytoday = new Date();
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
    data_get("assign-list", setCoaches);
    data_get("department-list", setDepartment);
    data_get("class-schedule-list", setSchedules);
  }, []);

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
      if (schedules[i].Day === days[daytoday.getDay()]) {
        if (
          schedules[i].StartTime <
            daytoday.getHours() * 60 + daytoday.getMinutes() &&
          daytoday.getHours() * 60 + daytoday.getMinutes() <
            schedules[i].EndTime
        ) {
          if (schedules[i].Coach === coach) {
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
                      schedule.Coach === currcoach ? (
                        schedule.StartTime <
                          daytoday.getHours() * 60 + daytoday.getMinutes() &&
                        daytoday.getHours() * 60 + daytoday.getMinutes() <
                          schedule.EndTime ? (
                          schedule.Day === days[daytoday.getDay()] ? (
                            <main className="border rounded p-3">
                              <header>
                                <h6 className="fw-bold text-success">
                                  ON GOING
                                </h6>
                              </header>
                              <main>
                                <section className="px-3">
                                  <section className="m-0 p-0">
                                    <h6>{" ".concat(schedule.Coach)}</h6>
                                    <h5>
                                      {coaches.map((coach, i) =>
                                        coach.SCHLID === currcoach
                                          ? ` ${coach.LastName}, ${coach.FirstName}`
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
                      <h6 className="fw-normal text-secondary m-0 p-0">
                        Select a Coach
                      </h6>
                    </header>
                  </main>
                ) : null}
              </section>
            </main>
            <main className="border rounded py-1 px-2 text-secondary">
              <small className="d-flex align-items-center gap-2">
                {info.icons.pages.utilities.schedule}
                <span>{`${days[daytoday.getDay()]} - ${time} ${
                  daytoday.getHours() < 12 ? "AM" : "PM"
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
                  icon={info.icons.navigation.back}
                  function={() => navigate(-1)}
                />
                <DefaultInput placeholder="Search" />
                <DefaultDropdown
                  class="border p-2"
                  reversed={true}
                  icon={info.icons.forms.filter}
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
                              key={i}
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
                    icon={info.icons.navigation.close}
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
                    icon={info.icons.navigation.close}
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
              ? coaches.map((coach, i) =>
                  filter.setbyClass === "" ||
                  checkClassStatus(coach.SCHLID) === filter.setbyClass ? (
                    filter.setbyDepartment === "" ||
                    coach.Department === filter.setbyDepartment ? (
                      <section
                        className="col-md-6 col-12 col-lg-4 p-1 m-0"
                        key={i}
                        style={{ height: "15em" }}
                      >
                        <main className="h-100 bg-white rounded shadow-sm row m-0 p-0">
                          <section className="col-6 h-100 d-flex flex-column align-items-center py-2">
                            <header className="h-100 w-100 d-flex justify-content-center">
                              <figure className="h-100">
                                <img
                                  src={`${CDNURL}${coach.Image}`}
                                  alt="..."
                                  className="w-100 h-100 object-fit-cover rounded"
                                  style={{ objectPosition: "top" }}
                                />
                              </figure>
                            </header>
                          </section>
                          <section className="col-6">
                            <main className="h-100 w-100 d-flex flex-column align-items-between justify-content-center py-3">
                              <small className="h-100">
                                <h4 className="w-100 text-truncate custom-text-gradient fw-bold m-0 p-0">{`${coach.LastName}`}</h4>
                                <h6 className="w-100 text-truncate m-0 p-0">{`${coach.FirstName}`}</h6>
                                <p className="p-0 pt-1 m-0 fw-normal text-secondary">{`${coach.Department}`}</p>
                              </small>
                              <main>
                                <section className="d-flex gap-1">
                                  <DefaultButton
                                    class="w-100 btn-info text-white"
                                    icon={info.icons.pages.utilities.schedule}
                                    text={
                                      checkClassStatus(coach.SCHLID) ===
                                      "On Going"
                                        ? schedules.length > 0
                                          ? schedules.map((schedule, i) =>
                                              schedule.Coach === coach.SCHLID
                                                ? schedule.StartTime <
                                                    daytoday.getHours() * 60 +
                                                      daytoday.getMinutes() &&
                                                  daytoday.getHours() * 60 +
                                                    daytoday.getMinutes() <
                                                    schedule.EndTime
                                                  ? schedule.Day ===
                                                    days[daytoday.getDay()]
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
                                    icon={info.icons.pages.utilities.schedule}
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
                )
              : null}
          </main>
        }
      />
      <ViewModal
        id={"CoachSchedule"}
        title={<h6 className="text-center text-black">Coach's Load</h6>}
        content={
          <main className="p-3">
            <header>
              <section className="m-0 p-0">
                <h6>{" ".concat(selcoach.SCHLID)}</h6>
                <h5>{` ${selcoach.LastName}, ${selcoach.FirstName}`}</h5>
              </section>
              <hr />
            </header>
            <main>
              {schedules.length > 0
                ? schedules.map((item, i) =>
                    item.Coach === selcoach.SCHLID ? (
                      item.Day === days[daytoday.getDay()] ? (
                        <RoomCard
                          key={i}
                          section={item.Section}
                          course={item.Course}
                          time={`${item.Day} - ${convertMinutes(
                            item.StartTime
                          )} - ${convertMinutes(item.EndTime)}`}
                        />
                      ) : null
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
