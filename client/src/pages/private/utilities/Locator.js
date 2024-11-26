import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { Link, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import useConfiguration from "../../../hook/useConfiguration";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { ViewModal } from "../../../component/modal/ViewModal";
import { RoomCard } from "../../../component/card/RoomCard";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { TextFormat2 } from "../../../component/textformat/TextFormat2";

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
  const [isLoading, setIsLoading] = useState(true);
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
  const [test, setTest] = useState([]);
  const [department, setDepartment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selcoach, setSelCoach] = useState([]);
  const [currcoach, setCurrCoach] = useState("n/a");
  const [coachStatus, setCoachStatus] = useState([]);
  const [academicLevel, setAcademicLevel] = useState([]);
  const [time, setTime] = useState();
  const [filter, setFilter] = useState({
    setbyDepartment: "",
    setbyClass: "",
    setbyAcademicLevel: "",
  });

  useEffect(() => {
    data_get("assign-list", setCoaches);
    data_get("department-list", setDepartment);
    data_get("academic-level-list", setAcademicLevel);
    data_get("class-schedule-list", setSchedules);
    data_get("all-coach-status", setCoachStatus);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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

  const resetStatus = (status) => {};

  function checkClassStatus(coach) {
    for (var i = 0; i < schedules.length; i++) {
      if (schedules[i].Day === days[daytoday.getDay()]) {
        if (
          schedules[i].StartTime <
            daytoday.getHours() * 60 + daytoday.getMinutes() &&
          daytoday.getHours() * 60 + daytoday.getMinutes() <
            schedules[i].EndTime
        ) {
          if (schedules[i].SCHLID === coach) {
            return "On Campus";
          }
        }
      }
    }
    return "Off Campus";
  }

  const [classStatus, setClassStatus] = useState([
    "ONCLASS",
    "NOTINCLASS",
    "OFFHOURS",
    "ABSENT",
  ]);

  const checkStatusHours = (status) => {
    if (status === "On Campus") {
      return "bg-success";
    }
    if (status === "Off Campus") {
      return "bg-warning";
    }
    if (status === "Absent") {
      return "bg-danger";
    }
    if (status === "Not Set") {
      return "bg-secondary-subtle";
    }
  };

  return (
    <>
      <FileMaintainanceTemplate
        loader={isLoading}
        sidepanel={
          <main className="h-100 d-flex flex-column justify-content-between">
            <main>
              <section>
                {schedules.length > 0
                  ? schedules.map((schedule, i) =>
                      schedule.SCHLID === currcoach ? (
                        schedule.StartTime <
                          daytoday.getHours() * 60 + daytoday.getMinutes() &&
                        daytoday.getHours() * 60 + daytoday.getMinutes() <
                          schedule.EndTime ? (
                          schedule.Day === days[daytoday.getDay()] ? (
                            <main className="border rounded p-3">
                              <header>
                                <h6 className="fw-bold text-success">
                                  On Campus
                                </h6>
                              </header>
                              <main>
                                <section>
                                  <section className="m-0 p-0">
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
                                  <TextFormat2
                                    header="Section"
                                    data={schedule.Section}
                                  />
                                  <TextFormat2
                                    header="Course"
                                    data={schedule.Course}
                                  />
                                  <TextFormat2
                                    header="Room"
                                    data={schedule.Room}
                                  />
                                  <TextFormat2
                                    header="Time"
                                    data={`${convertMinutes(
                                      schedule.StartTime
                                    )} - ${convertMinutes(schedule.EndTime)}`}
                                  />
                                  <TextFormat2
                                    header="Population"
                                    data={`${schedule.Population} students`}
                                  />
                                </section>
                              </main>
                            </main>
                          ) : null
                        ) : null
                      ) : null
                    )
                  : null}

                {checkClassStatus(currcoach) === "Off Campus" ? (
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
            <main className="border rounded py-1 px-2 text-secondary mt-3">
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
                  class="px-2"
                  icon={info.icons.navigation.back}
                  text="Back"
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
                      <main className="d-flex">
                        <section>
                          <DefaultDropdownItem
                            title={"On Campus"}
                            trigger={() =>
                              setFilter((prev) => ({
                                ...prev,
                                setbyClass: "On Campus",
                              }))
                            }
                          />
                          <DefaultDropdownItem
                            title={"Off Campus"}
                            trigger={() =>
                              setFilter((prev) => ({
                                ...prev,
                                setbyClass: "Off Campus",
                              }))
                            }
                          />
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
                          <hr />
                          {academicLevel.map((item, i) => (
                            <DefaultDropdownItem
                              key={i}
                              title={item.AcademicLevel}
                              trigger={() =>
                                setFilter((prev) => ({
                                  ...prev,
                                  setbyAcademicLevel: item.AcademicLevel,
                                }))
                              }
                            />
                          ))}
                          <DefaultDropdownItem
                            title={"Both"}
                            trigger={() =>
                              setFilter((prev) => ({
                                ...prev,
                                setbyAcademicLevel: "Both",
                              }))
                            }
                          />
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
                    class="primary-outline-gradient px-2"
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
                    class="primary-outline-gradient px-2"
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
                {filter.setbyAcademicLevel !== "" ? (
                  <DefaultButton
                    class="primary-outline-gradient px-2"
                    reversed={true}
                    icon={info.icons.navigation.close}
                    text={filter.setbyAcademicLevel}
                    function={() =>
                      setFilter((prev) => ({
                        ...prev,
                        setbyAcademicLevel: "",
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
                    filter.setbyAcademicLevel === "" ||
                    filter.setbyAcademicLevel === coach.AcademicLevel ? (
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
                              <main className="h-100 w-100 d-flex flex-column align-items-between justify-content-center py-3 overflow-hidden">
                                <small className="h-100">
                                  {coachStatus.map((status, q) =>
                                    status.SCHLID === coach.SCHLID ? (
                                      <main className="d-flex">
                                        <small>
                                          <section
                                            className={`px-3 py-1 rounded-pill ${checkStatusHours(
                                              status.ClassStatus
                                            )}`}
                                          >
                                            <small>
                                              <p
                                                className={`p-0 m-0 fw-semibold text-white`}
                                              >
                                                {status.ClassStatus}
                                              </p>
                                            </small>
                                          </section>
                                        </small>
                                      </main>
                                    ) : null
                                  )}
                                  <h4 className="w-100 text-truncate primary-text fw-bold m-0 p-0">{`${coach.LastName}`}</h4>
                                  <h6 className="w-100 text-truncate m-0 p-0">{`${coach.FirstName}`}</h6>
                                  {coachStatus.map((status, q) =>
                                    status.SCHLID === coach.SCHLID ? (
                                      <main>
                                        <quote className="p-0 pt-1 m-0 fw-normal text-secondary fst-italic">
                                          "{status.Description}"
                                        </quote>
                                      </main>
                                    ) : null
                                  )}
                                </small>
                                <main>
                                  <section className="d-flex gap-1 w-100">
                                    <button
                                      className={`btn w-100 btn-sm d-flex align-items-center justify-content-start gap-2 p-2 primary-gradient`}
                                      disabled={
                                        checkClassStatus(coach.SCHLID) ===
                                        "On Campus"
                                          ? false
                                          : true
                                      }
                                      onClick={() => {
                                        setCurrCoach(coach.SCHLID);
                                      }}
                                    >
                                      <span className="text-white">
                                        {info.icons.pages.utilities.schedule}
                                      </span>
                                      <span className="text-start fw-bold text-white">
                                        {checkClassStatus(coach.SCHLID) ===
                                        "On Campus"
                                          ? schedules.length > 0
                                            ? schedules.map((schedule, i) =>
                                                schedule.SCHLID === coach.SCHLID
                                                  ? schedule.StartTime <
                                                      daytoday.getHours() * 60 +
                                                        daytoday.getMinutes() &&
                                                    daytoday.getHours() * 60 +
                                                      daytoday.getMinutes() <
                                                      schedule.EndTime
                                                    ? schedule.Day ===
                                                      days[daytoday.getDay()]
                                                      ? schedule.Room.replace(
                                                          "Computer Laboratory",
                                                          "ComLab"
                                                        )
                                                      : null
                                                    : null
                                                  : null
                                              )
                                            : null
                                          : "No Class"}
                                      </span>
                                    </button>
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
              <section className="w-50 m-0 p-0">
                <h5>{` ${selcoach.LastName}, ${selcoach.FirstName}`}</h5>
                <main>
                  <TextFormat2 header="Department" data={selcoach.Department} />
                  <TextFormat2 header="Email" data={selcoach.Email} />
                  <TextFormat2
                    header="Link"
                    data={
                      <Link to={selcoach.Link} target="_blank">
                        {selcoach.Link}
                      </Link>
                    }
                  />
                </main>
              </section>
              <hr />
            </header>
            <main>
              {schedules.length > 0
                ? schedules.map((item, i) =>
                    item.SCHLID === selcoach.SCHLID ? (
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
