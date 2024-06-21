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

export function CreateDepartment() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    DPT_Code: "",
    Department: "",
    DPT_Abbreviation: "",
    DPT_Description: "",
  });

  const [department, setDepartment, getDepartment] = usePost();
  const [coach, setCoach, getCoach] = usePost();
  const [
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
  ] = useValidation();

  const [dataChange] = useHandleChange(setData);

  const [validation, setValidation] = useState({
    DPT_Code: ValidateCodeID(data.DPT_Code),
    Department: ValidateName(data.Department),
    DPT_Abbreviation: ValidateName(data.DPT_Abbreviation),
    DPT_Description: ValidateName(data.DPT_Description),
  });

  useEffect(() => {
    getDepartment("department");
  }, [department]);

  useEffect(() => {
    setValidation({
      DPT_Code: ValidateCodeID(data.DPT_Code, 3, 25, dpt_dupe()),
      Department: ValidateName(data.Department, 5, 100),
      DPT_Abbreviation: ValidateName(data.DPT_Abbreviation, 2, 25),
      DPT_Description: ValidateName(data.DPT_Description, 0, 255),
    });
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
    } else {
    }
    return true;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          ValidateCodeID(data.DPT_Code, 10, 25, dpt_dupe()) &&
          ValidateName(data.Department, 5, 100) &&
          ValidateName(data.DPT_Abbreviation, 2, 25) &&
          ValidateName(data.DPT_Description, 0, 255)
        ) {
          getCoach("add-new-department", data);
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

            <FormInput
              label="Department"
              id="Department"
              alert={validation.Department[0].Message}
              class={validation.Department[0].State[0]}
              success={validation.Department[0].State[1]}
              trigger={dataChange}
              value={data.Department}
              required={true}
            />

            <FormInput
              label="Abbreviation"
              id="DPT_Abbreviation"
              alert={validation.DPT_Abbreviation[0].Message}
              class={validation.DPT_Abbreviation[0].State[0]}
              success={validation.DPT_Abbreviation[0].State[1]}
              trigger={dataChange}
              value={data.DPT_Abbreviation}
              required={true}
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
