import React, { useRef, useEffect, useState } from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import useDatabase from "../../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import useHandleChange from "../../../../hook/useHandleChange";
import useConfiguration from "../../../../hook/useConfiguration";
import { createFileName, useScreenshot } from "use-react-screenshot";

export function SectionSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpg",
    quality: 1.0,
  });

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

  const [day, setDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [time, setTime] = useState([
    420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840,
    870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230,
    1260,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("project-list", setSection);
    data_get("course-list", setCourse);
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

  function getAllScheduleOf(day) {
    var schedules = [];
    schedule.forEach((scheds) => {
      if (scheds.Section === currsection) {
        if (scheds.Day === day) {
          schedules.push(scheds);
        }
      }
    });
    schedules.sort((a, b) => a.Time - b.Time);
    return schedules;
  }

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => {
    takeScreenshot(ref.current).then(download);
  };

  return (
    <main className="h-100 w-100 row m-0 p-2">
      <section
        className="h-100 col-lg-9 h-100 p-1 m-0 pe-2 overflow-y-auto height-auto"
        ref={ref}
      >
        <main className="w-100 d-flex justify-content-end">
          <section className="d-flex align-items-center gap-2 mb-2">
            <DefaultButton
              class="px-2 border"
              icon={info.icons.others.camera}
              function={getImage}
            />
            <DefaultButton
              class="border-0"
              icon={info.icons.navigation.previous}
              function={() => {
                previousSection();
              }}
            />
            <h6 className="m-0 p-0">{currsection}</h6>
            <DefaultButton
              class="border-0"
              icon={info.icons.navigation.next}
              function={() => nextSection()}
            />
          </section>
        </main>
        <main className="flex-fill h-100">
          <table
            className="h-100 w-100 rounded"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr className="fw-bold">
                <td
                  className="p-1 border text-center"
                  colSpan={2}
                  style={{ width: "15%" }}
                >
                  Day / Time
                </td>
                {day.map((daytime, index) => (
                  <td className="p-1 text-center border">{daytime}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {time.map((timeslot, timeindex) => (
                <tr>
                  <td className="p-1 text-center border">
                    <small>{convertMinutes(timeslot)}</small>
                  </td>
                  <td className="p-1 text-center border">
                    <small>{convertMinutes(timeslot + 30)}</small>
                  </td>
                  {day.map((daytime, index) => (
                    <td
                      className={`border-end position-relative overflow-hidden  ${
                        (timeindex - 1) % 2 == 0 ? "border-bottom" : ""
                      }`}
                    >
                      {getAllScheduleOf(daytime).map((schedule, item) =>
                        schedule.Day === daytime ? (
                          +schedule.StartTime === timeslot ? (
                            <div
                              className={`p-2 z-2 w-100 d-flex align-items-center justify-content-center position-absolute top-0 text-break text-wrap border-top border-dark border-start border-end text-center ${
                                schedule.Component.includes("Minor") ||
                                schedule.Component.includes("General")
                                  ? "plotted2-2"
                                  : "plotted2"
                              }`}
                              onClick={() => alert(schedule.Course)}
                            >
                              <main className="">
                                <small className="fw-bold">
                                  <p className="m-0">{`${schedule.Course}`}</p>
                                </small>
                              </main>
                            </div>
                          ) : +schedule.StartTime +
                              60 * (schedule.Units - 0.5) ===
                            timeslot ? (
                            <div
                              className={`h-100 w-100 d-flex align-items-center border-bottom border-dark border-start border-end ${
                                schedule.Component.includes("Minor") ||
                                schedule.Component.includes("General")
                                  ? "plotted2-2"
                                  : "plotted2"
                              }`}
                              onClick={() => alert(schedule.Course)}
                            >
                              <small></small>
                            </div>
                          ) : +schedule.StartTime +
                              60 * (schedule.Units - 0.5) >
                              timeslot && +schedule.StartTime < timeslot ? (
                            <div
                              className={`h-100 w-100 d-flex align-items-center border-dark border-start border-end ${
                                schedule.Component.includes("Minor") ||
                                schedule.Component.includes("General")
                                  ? "plotted2-2"
                                  : "plotted2"
                              }`}
                              onClick={() => alert(schedule.Course)}
                            >
                              <small></small>
                            </div>
                          ) : null
                        ) : null
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="border-top" colSpan={7}>
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </section>
      <section className="col-lg-3 h-100 p-0 ps-2 m-0 height-auto">
        <main className="h-100 position-relative overflow-y-auto rounded shadow-sm p-3">
          <header className="p-2">
            {section.map((section, o) =>
              section.Section === currsection ? (
                <>
                  <p className="m-0">{`Population: ${section.Population} Student/s`}</p>
                  <h3 className="m-0">{`${section.Section}`}</h3>
                </>
              ) : null
            )}
          </header>
          <section className="w-100 bg-white rounded shadow-sm p-2 mb-2">
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
                  schedule.Section === currsection ? (
                    <>
                      <main className="p-3 shadow-sm rounded mb-2 hover-darken">
                        <main className="row m-0 p-0">
                          <section className="col-12 p-0 m-0">
                            <section>
                              <h6 className="p-0 m-0">{schedule.CourseID}</h6>
                              <h6 className="p-0 m-0">{schedule.Course}</h6>
                            </section>
                            <section>
                              <small>
                                <p className="p-0 m-0 text-secondary fst-italic">
                                  <span>
                                    {`${schedule.Day} - ${convertMinutes(
                                      schedule.StartTime
                                    )} : ${convertMinutes(schedule.EndTime)}`}
                                  </span>
                                </p>
                                <p className="p-0 m-0 text-secondary fst-italic">
                                  {schedule.Room}
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
