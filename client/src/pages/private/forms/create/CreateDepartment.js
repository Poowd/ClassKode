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
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateDepartment() {
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

  const [department, setDepartment] = useState([]);
  const [data, setData] = useState({
    DPT_Code: "",
    Department: "",
    DPT_Abbreviation: "",
    DPT_Description: "",
  });
  const [validation, setValidation] = useState({
    DPT_Code: Base(data.DPT_Code),
    Department: Base(data.Department),
    DPT_Abbreviation: Base(data.DPT_Abbreviation),
    DPT_Description: Base(data.DPT_Description),
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach,
    ValidateDepartment,
    ValidateProgram,
    ValidateCourse,
    ValidateRoom,
    ValidateCurriculum,
    ValidateAcademicYear,] =
    useValidate();

  useEffect(() => {
    post("department", department, setDepartment);
  }, [department]);

  useEffect(() => {
    ValidateDepartment(
      data.DPT_Code,
      data.Department,
      data.DPT_Abbreviation,
      data.DPT_Description,
      dpt_dupe(),
      setValidation
    );
  }, [data]);

  function dpt_dupe() {
    if (department.length > 0) {
      for (var i = 0; i < department.length; i++) {
        if (
          department[i].DPT_Code === data.DPT_Code &&
          department[i].DPTID !== data.DPTID
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
        if (
          validation.DPT_Code[0].Result &&
          validation.Department[0].Result &&
          validation.DPT_Abbreviation[0].Result
        ) {
          post("add-new-department", data, setData);
          navigate(-1);
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Department"}
        description={"This module creates a department"}
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
              label="Department Code"
              id="DPT_Code"
              alert={validation.DPT_Code[0].Message}
              class={validation.DPT_Code[0].State[0]}
              success={validation.DPT_Code[0].State[1]}
              trigger={dataChange}
              value={data.DPT_Code}
              required={true}
            />

            <MultipleFormInput
              label="Department"
              alert={
                <>
                  <span
                    className={"col p-0 " + validation.Department[0].State[1]}
                  >
                    {validation.Department[0].Message}
                  </span>
                  <span
                    className={
                      "col p-0 " + validation.DPT_Abbreviation[0].State[1]
                    }
                  >
                    {validation.DPT_Abbreviation[0].Message}
                  </span>
                </>
              }
              item={
                <>
                  <MultipleFormInputItem
                    id="Department"
                    placeholder="Department"
                    class={validation.Department[0].State[0]}
                    success={validation.Department[0].State[1]}
                    trigger={dataChange}
                    value={data.Department}
                    required={true}
                  />
                  <MultipleFormInputItem
                    id="DPT_Abbreviation"
                    placeholder="DPT_Abbreviation"
                    class={validation.DPT_Abbreviation[0].State[0]}
                    success={validation.DPT_Abbreviation[0].State[1]}
                    trigger={dataChange}
                    value={data.DPT_Abbreviation}
                    required={true}
                  />
                </>
              }
            />

            <FormInput
              label={
                <>
                  Description{" "}
                  <span className="text-secondary fw-regular">
                    ( Optional )
                  </span>
                </>
              }
              id="DPT_Description"
              alert={validation.DPT_Description[0].Message}
              class={validation.DPT_Description[0].State[0]}
              success={validation.DPT_Description[0].State[1]}
              trigger={dataChange}
              value={data.DPT_Description}
              required={false}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
