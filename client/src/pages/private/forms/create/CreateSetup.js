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
import usePost from "../../../../hook/usePost";
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

  const [course, setCourse] = useState([]);
  const [component, setComponent] = useState([]);
  const [program, setProgram] = useState([]);
  const [data, setData] = useState({
    PRG_Code: state.program,
    DPT_Code: state.department,
    CRR_Code: state.curriculum.CRR_Code,
    CRS_Code: "",
    Component: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("course", course, setCourse);
    post("component", component, setComponent);
    post("program", program, setProgram);
  }, []);

  useEffect(() => {
    // ValidateProgram(
    //   data.Room,
    //   data.Capacity,
    //   prg_dupe(),
    //   setValidation
    // );
  }, [data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
          post("add-new-setup", data, setData);
          navigate("/utilities/curriculum");
        }
      }}
    >
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
        content={
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
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
