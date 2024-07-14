import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateAcademicYear() {
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

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    ACY_Code: "",
    AcademicYear: "",
    CRR_Code: "",
    StartDate: "",
    EndDate: "",
  });
  const [validation, setValidation] = useState({
    ACY_Code: Base(data.ACY_Code),
    AcademicYear: Base(data.AcademicYear),
    CRR_Code: Base(data.CRR_Code),
    StartDate: Base(data.StartDate),
    EndDate: Base(data.EndDate),
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
    post("curriculum", curriculum, setCurriculum);
  }, [curriculum]);

  // useEffect(() => {
  //   ValidateCurriculum(
  //     data.CRR_Code,
  //     data.Curriculum,
  //     crr_dupe(),
  //     setValidation
  //   );
  // }, [data]);

  // function crr_dupe() {
  //   if (curriculum.length > 0) {
  //     for (var i = 0; i < curriculum.length; i++) {
  //       if (curriculum[i].CRR_Code === data.CRR_Code) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
          post("add-new-academicyear", data, setData);
          navigate("/utilities/academicyear");
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Academic Year"}
        description={"This module creates a academic year"}
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
              label="Academic Year Code"
              id="ACY_Code"
              trigger={dataChange}
              value={data.ACY_Code}
              required={true}
            />

            <FormInput
              label="Academic Year"
              id="AcademicYear"
              trigger={dataChange}
              value={data.AcademicYear}
              required={true}
            />

            <SelectButton
              label="Curriculum"
              id="CRR_Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={curriculum.map((option, i) => (
                      <>
                        {option.CRR_Code === data.CRR_Code
                          ? option.Curriculum
                          : ""}
                      </>
                    ))}
                  />
                  {curriculum.map((option, i) => (
                    <>
                      {data.CRR_Code !== option.CRR_Code ? (
                        <SelectButtonItem
                          value={option.CRR_Code}
                          content={option.Curriculum}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />

            <FormInput
              label="Start Date"
              id="StartDate"
              trigger={dataChange}
              value={data.StartDate}
              required={true}
            />

            <FormInput
              label="End Date"
              id="EndDate"
              trigger={dataChange}
              value={data.EndDate}
              required={true}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
