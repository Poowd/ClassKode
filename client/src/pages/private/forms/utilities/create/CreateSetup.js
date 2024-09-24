import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../../hook/useConfiguration";

export function CreateSetup() {
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();

  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [course, setCourse] = useState([]);
  const [component, setComponent] = useState([]);
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    Program: state.program,
    Department: state.department,
    Curriculum: state.curriculum,
    Course: "",
    Component: "",
    YearLevel: "",
    Semester: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("course-list", setCourse);
    data_get("component-list", setComponent);
    data_get("program-list", setProgram);
    data_get("semester-list", setSemester);
    data_get("year-level-list", setYearLevel);
    data_get("academic-level-list", setAcademicLevel);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("setup-insert", data, setData);
      showToast(
        info.icons.calendar,
        "Setup",
        `Setup ${data.Course} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Setup"}
        description={"This module creates a setup"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.back}
              function={() => navigate(-1, { data: "COSC" })}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <div className="w-100">
              <label className="p-0 m-0">
                <small>
                  <span className="fw-semibold">Program</span>
                </small>
              </label>
              <span className="border p-2 rounded w-100 mb-2 d-block">
                <span>{data.Department}</span> <span>{data.Program}</span>
              </span>
              <label className="p-0 m-0">
                <small>
                  <span className="fw-semibold">Curriculum</span>
                </small>
              </label>
              <span className="border p-2 rounded w-100 mb-2 d-block">
                {data.Curriculum}
              </span>
            </div>
            <SelectButton
              label="Course"
              id="Course"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={course.map((option, i) => (
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

            <SelectButton
              label="Component"
              id="Component"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={component.map((option, i) => (
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
                          content={option.Component}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />

            <SelectButton
              label="YearLevel"
              id="YearLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={yearlevel.map((option, i) => (
                      <>
                        {option.YearLevel === data.YearLevel
                          ? option.YearLevel
                          : ""}
                      </>
                    ))}
                  />
                  {yearlevel.map((option, i) => (
                    <>
                      {data.YearLevel !== option.YearLevel
                        ? program.map((prg) =>
                            prg.Code === data.Program &&
                            prg.AcademicLevel === option.AcademicLevel ? (
                              <SelectButtonItem
                                key={i}
                                value={option.YearLevel}
                                content={option.YearLevel}
                              />
                            ) : null
                          )
                        : ""}
                    </>
                  ))}
                </>
              }
            />

            <SelectButton
              label="Semester"
              id="Semester"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={semester.map((option, i) => (
                      <>
                        {option.Semester === data.Semester
                          ? option.Semester
                          : ""}
                      </>
                    ))}
                  />
                  {semester.map((option, i) => (
                    <>
                      {data.Semester !== option.Semester ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Semester}
                          content={option.Semester}
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
        additional={<></>}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}
