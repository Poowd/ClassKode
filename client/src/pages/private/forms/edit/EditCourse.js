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

export function EditCourse() {
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
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [data, setData] = useState({
    CRSID: state.data[0].CRSID,
    CRS_Code: state.data[0].CRS_Code,
    Course: state.data[0].Course,
    PRG_Code: state.data[0].PRG_Code,
  });
  const [validation, setValidation] = useState({
    CRS_Code: Base(data.CRS_Code),
    Course: Base(data.Course),
    PRG_Code: Base(data.PRG_Code),
  });

  const [dataChange] = useHandleChange(setData);
  const [
    ValidateCoach,
    ValidateDepartment,
    ValidateProgram,
    ValidateCourse,
    ValidateRoom,
    ValidateCurriculum,
    ValidateAcademicYear,
  ] = useValidate();

  useEffect(() => {
    post("course", course, setCourse);
    post("academiclevel", academiclevel, setAcademicLevel);
    post("program", program, setProgram);
  }, [course]);

  useEffect(() => {
    ValidateCourse(data.CRS_Code, data.Course, crs_dupe(), setValidation);
  }, [data]);

  function crs_dupe() {
    if (course.length > 0) {
      for (var i = 0; i < course.length; i++) {
        if (
          course[i].CRS_Code === data.CRS_Code &&
          course[i].CRSID !== data.CRSID
        ) {
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
          post("update-existing-course", data, setData);
          navigate("/institution/course");
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
              label="Program"
              id="PRG_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) => (
                      <>
                        {option.PRG_Code === data.PRG_Code
                          ? option.Program
                          : ""}
                      </>
                    ))}
                  />
                  {program.map((option, i) => (
                    <>
                      {data.PRG_Code !== option.PRG_Code ? (
                        <SelectButtonItem
                          value={option.PRG_Code}
                          content={option.Program}
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
