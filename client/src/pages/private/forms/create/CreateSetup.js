import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateSetup() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

  const [yearlevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [course, setCourse] = useState([]);
  const [component, setComponent] = useState([]);
  const [program, setProgram] = useState([]);
  const [data, setData] = useState({
    PRG_Code: state.program,
    DPT_Code: state.department,
    CRR_Code: state.curriculum.CRR_Code,
    CRS_Code: "",
    Component: "",
    YearLevel: "",
    Semester: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("sel-crs", course, setCourse);
    post("sel-compt", component, setComponent);
    post("sel-prg", program, setProgram);
    post("sel-sem", semester, setSemester);
    post("sel-yrlvl", yearlevel, setYearLevel);
  }, []);

  useEffect(() => {
    // ValidateProgram(
    //   data.Room,
    //   data.Capacity,
    //   prg_dupe(),
    //   setValidation
    // );
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-setup", data, setData);
      navigate(-1);
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
              icon={<IoMdArrowRoundBack />}
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
                {data.DPT_Code.concat(" - ", data.PRG_Code)}
              </span>
              <label className="p-0 m-0">
                <small>
                  <span className="fw-semibold">Curriculum</span>
                </small>
              </label>
              <span className="border p-2 rounded w-100 mb-2 d-block">
                {data.CRR_Code}
              </span>
            </div>
            <SelectButton
              label="Course"
              id="CRS_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={course.map((option, i) => (
                      <>
                        {option.CRS_Code === data.CRS_Code ? option.Course : ""}
                      </>
                    ))}
                  />
                  {course.map((option, i) => (
                    <>
                      {data.CRS_Code !== option.CRS_Code ? (
                        <SelectButtonItem
                          value={option.CRS_Code}
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
                        ? program.map((prg, k) =>
                            prg.PRG_Code === data.PRG_Code &&
                            prg.AcademicLevel === option.AcademicLevel ? (
                              <SelectButtonItem
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
    </form>
  );
}
