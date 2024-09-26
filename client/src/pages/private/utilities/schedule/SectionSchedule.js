import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import "../Map.css";
import useDatabase from "../../../../hook/useDatabase";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import useHandleChange from "../../../../hook/useHandleChange";

export function SectionSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();

  const [search, setSearch] = useState({
    Search: "",
  });

  const [dataChange] = useHandleChange(setSearch);
  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [section, setSection] = useState([]);
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
    480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900,
    930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1200,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("project-list", setSection);
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
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-8 h-100 p-0 m-0 pe-2 overflow-y-auto">
        <main className="h-100 w-100 d-flex align-items-center">
          <main>
            <DefaultButton
              class=""
              icon={<MdArrowBackIosNew />}
              function={() => {
                previousSection();
              }}
            />
          </main>
          <main className="h-100 row m-0 p-0 py-3 flex-fill">
            <section className="col m-0 p-0">
              <table className="w-100">
                <thead>
                  <tr>
                    <td className="text-center fw-semibold pb-2 custom-text-gradient">
                      {currsection}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {time.map((time, i) => (
                    <tr>
                      <td className="border fw-light p-2">
                        {convertMinutes(time)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            {day.map((day, i) => (
              <section className="col m-0 p-0 ">
                <table className="w-100">
                  <thead>
                    <tr>
                      <td></td>
                      <td className="text-center fw-semibold text-secondary pb-2">
                        {day}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {time.map((time, j) => (
                      <tr>
                        <td
                          className="border border-white py-2"
                          style={{ width: "0" }}
                        >
                          &nbsp;
                        </td>
                        {schedule.length > 0
                          ? schedule.map((schedule, k) =>
                              schedule.Section === currsection ? (
                                schedule.Day === day ? (
                                  +schedule.StartTime === time ? (
                                    <td
                                      rowSpan={
                                        (schedule.EndTime -
                                          schedule.StartTime) /
                                        30
                                      }
                                      className={
                                        schedule.Component.includes("General")
                                          ? "border border-white bg-secondary-subtle custom-text-blue rounded text-center"
                                          : "border border-white gradient-bg-light-blue rounded text-center"
                                      }
                                      onClick={() => {
                                        alert(schedule.Course);
                                      }}
                                    >
                                      <main className="p-1">
                                        <p className="fw-semibold m-0 p-0">
                                          {`${schedule.Course} ( ${schedule.Room} )`}
                                        </p>
                                      </main>
                                    </td>
                                  ) : (
                                    ""
                                  )
                                ) : null
                              ) : null
                            )
                          : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </main>
          <main>
            <DefaultButton
              class=""
              icon={<MdArrowBackIosNew />}
              function={() => nextSection()}
            />
          </main>
        </main>
      </section>
      <section className="col-lg-4 h-100 p-0 ps-2 m-0 border-start">
        <main className="h-100 position-relative overflow-y-auto px-1">
          <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex w-100">
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
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
                          <section className="col-3 p-0 m-0">
                            <section>
                              <h6 className="p-0 m-0">{schedule.Section}</h6>
                            </section>
                          </section>
                          <section className="col-9 p-0 m-0">
                            <section>
                              <h6 className="p-0 m-0">
                                {schedule.Section === null
                                  ? schedule.CRS_Code
                                  : schedule.Course}
                              </h6>
                            </section>
                            <section>
                              <small>
                                <p className="p-0 m-0 text-secondary fst-italic">
                                  <span>
                                    {" "}
                                    {schedule.Day +
                                      " " +
                                      convertMinutes(schedule.StartTime) +
                                      " - " +
                                      convertMinutes(schedule.EndTime)}
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
