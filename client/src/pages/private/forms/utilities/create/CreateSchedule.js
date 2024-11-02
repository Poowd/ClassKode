import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { MainInput } from "../../../../../component/input/MainInput";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import useTimeFormat from "../../../../../hook/useTimeFormat";

export function CreateSchedule() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [convertMinutes] = useTimeFormat();

  const [curriculum, setCurriculum] = useState([]);
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [room, setRoom] = useState([]);
  const [component, setComponent] = useState([]);
  const [coach, setCoach] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [academicYear, setCurrentAcademicYear] = useState([]);
  const [data, setData] = useState({
    Section: "",
    YearLevel: "",
    Population: "",
    Course: "",
    Component: "",
    Units: "",
    Day: "",
    StartTime: "",
    EndTime: "",
    Room: "",
    Capacity: "",
    Coach: "",
    AcademicYear: "",
  });

  const [dataChange] = useHandleChange(setData);

  const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const Time = [
    420, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870,
    900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1200, 1260,
  ];

  useEffect(() => {
    setData((prev) => ({ ...prev, AcademicYear: academicYear.Code }));
    section.map((option, i) =>
      data.Section === option.Section
        ? setData((prev) => ({ ...prev, YearLevel: option.YearLevel }))
        : null
    );
    section.map((option, i) =>
      data.Section === option.Section
        ? setData((prev) => ({ ...prev, Population: option.Population }))
        : null
    );
    room.map((option, i) =>
      data.Room === option.Room
        ? setData((prev) => ({ ...prev, Capacity: option.Capacity }))
        : null
    );
    component.map((option, i) =>
      data.Component === option.Component
        ? setData((prev) => ({ ...prev, Units: option.MaxUnits }))
        : null
    );
  }, [data.Component, academicYear, data.Room, data.Section]);

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
    data_get("course-list", setCourse);
    data_get("project-list", setSection);
    data_get("year-level-list", setYearLevel);
    data_get("room-list", setRoom);
    data_get("component-list", setComponent);
    data_get("assign-list", setCoach);
    data_get("current-academic-year", setCurrentAcademicYear);
    data_get("class-schedule-list", setSchedules);
  }, [curriculum]);

  useEffect(() => {
    setData((prev) => ({ ...prev, EndTime: +data.StartTime + data.Units * 60 }));
  }, [data.StartTime, data.Units]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("class-schedule-insert-manual", data, setData);
      showToast(info.icons.others.info, "Schedule", `Schedule is added!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Schedule"}
        description={`This module creates a schedule ${academicYear.AcademicYear}`}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        additional={
          <main className="">
            <section className="p-2">
              {schedules &&
                schedules.map((schedule, i) =>
                  schedule.Day === data.Day ? (
                    schedule.Room === data.Room ? (
                      +schedule.StartTime > +data.StartTime ? (
                        <main className="bg-white rounded shadow-sm p-3 mb-2 hover-darken">
                          <section>
                            <h6 className="m-0">{schedule.Course}</h6>
                            <p className="m-0">
                              {schedule.FirstName !== null &&
                              schedule.LastName !== null
                                ? `${schedule.LastName}, ${schedule.FirstName}`
                                : "No Coach"}
                            </p>
                            <p className="m-0">{`${convertMinutes(
                              schedule.StartTime
                            )} : ${convertMinutes(schedule.EndTime)}`}</p>
                          </section>
                        </main>
                      ) : null
                    ) : null
                  ) : null
                )}
            </section>
          </main>
        }
        entryform={
          <>
            <MainSelect
              label="Section"
              id="Section"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={section.map((option) => (
                      <>
                        {option.Section === data.Section ? option.Section : ""}
                      </>
                    ))}
                  />
                  {section.map((option, i) => (
                    <>
                      {data.Section !== option.Section ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Section}
                          content={option.Section}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Course"
              id="Course"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={course.map((option) => (
                      <>{option.Code === data.Course ? option.Course : ""}</>
                    ))}
                  />
                  {course.map((option, i) => (
                    <>
                      {data.Course !== option.Code ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Code}
                          content={option.Course}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Component"
              id="Component"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={component.map((option) => (
                      <>
                        {option.Component === data.Component
                          ? option.Component
                          : ""}
                      </>
                    ))}
                  />
                  {component.map((option, i) => (
                    <>
                      {data.Component !== option.Component ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Component}
                          content={`${option.Component} ( ${option.MaxUnits} )`}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Day"
              id="Day"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={Days.map((option) => (
                      <>{option === data.Day ? option : ""}</>
                    ))}
                  />
                  {Days.map((option, i) => (
                    <>
                      {data.Day !== option ? (
                        <SelectButtonItem
                          key={i}
                          value={option}
                          content={option}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="StartTime"
              id="StartTime"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={Time.map((option) => (
                      <>
                        {option === data.StartTime
                          ? convertMinutes(option)
                          : ""}
                      </>
                    ))}
                  />
                  {Time.map((option, i) => (
                    <>
                      {data.StartTime !== option ? (
                        <SelectButtonItem
                          key={i}
                          value={option}
                          content={convertMinutes(option)}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <main className="w-100 d-flex justify-content-end m-0 p-0">
              <section>
                <small className="text-secondary fst-italic">{`should end at ${convertMinutes(
                  +data.StartTime + data.Units * 60
                )} based from ${data.Component} with ${
                  data.Units
                } units`}</small>
              </section>
            </main>
            <MainSelect
              label="EndTime"
              id="EndTime"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={Time.map((option) => (
                      <>
                        {option === data.EndTime ? convertMinutes(option) : ""}
                      </>
                    ))}
                  />
                  {Time.map((option, i) => (
                    <>
                      {data.EndTime !== option ? (
                        option > data.StartTime ? (
                          <SelectButtonItem
                            key={i}
                            value={option}
                            content={convertMinutes(option)}
                          />
                        ) : null
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Room"
              id="Room"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={room.map((option) => (
                      <>{option.Room === data.Room ? option.Room : ""}</>
                    ))}
                  />
                  {room.map((option, i) => (
                    <>
                      {data.Room !== option.Room ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Room}
                          content={`${option.Room} ( ${option.Capacity} )`}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Coach"
              id="Coach"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={coach.map((option) => (
                      <>
                        {option.SCHLID === data.Coach
                          ? `${option.LastName}, ${option.FirstName}`
                          : ""}
                      </>
                    ))}
                  />
                  {coach.map((option, i) => (
                    <>
                      {data.Coach !== option.SCHLID ? (
                        <SelectButtonItem
                          key={i}
                          value={option.SCHLID}
                          content={`${option.LastName}, ${option.FirstName}`}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
          </>
        }
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}