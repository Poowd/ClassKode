import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function CreateCourse() {
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
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    CRS_Code: "",
    Course: "",
    AcademicLevel: "",
  });
  const [validation, setValidation] = useState({
    CRS_Code: Base(data.CRS_Code),
    Course: Base(data.Course),
    AcademicLevel: Base(data.AcademicLevel),
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("course", course, setCourse);
    post("academiclevel", academiclevel, setAcademicLevel);
  }, [course]);

  useEffect(() => {
    ValidateCourse(data.CRS_Code, data.Course, crs_dupe(), setValidation);
  }, [data]);

  function crs_dupe() {
    if (course.length > 0) {
      for (var i = 0; i < course.length; i++) {
        if (course[i].CRS_Code === data.CRS_Code) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validation.CRS_Code[0].Result && validation.Course[0].Result) {
          post("add-new-course", data, setData);
          navigate(-1);
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Course"}
        description={"This module creates a course"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
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
            <FormInput
              label="Program Code"
              id="CRS_Code"
              alert={validation.CRS_Code[0].Message}
              class={validation.CRS_Code[0].State[0]}
              success={validation.CRS_Code[0].State[1]}
              trigger={dataChange}
              value={data.CRS_Code}
              required={true}
            />

            <FormInput
              label="Course"
              id="Course"
              alert={validation.Course[0].Message}
              class={validation.Course[0].State[0]}
              success={validation.Course[0].State[1]}
              trigger={dataChange}
              value={data.Course}
              required={false}
            />

            <SelectButton
              label="Academic Level"
              id="AcademicLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={academiclevel.map((option, i) => (
                      <>
                        {option.AcademicLevel === data.AcademicLevel
                          ? option.AcademicLevel
                          : ""}
                      </>
                    ))}
                  />
                  {academiclevel.map((option, i) => (
                    <>
                      {data.AcademicLevel !== option.AcademicLevel ? (
                        <SelectButtonItem
                          value={option.AcademicLevel}
                          content={option.AcademicLevel}
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
