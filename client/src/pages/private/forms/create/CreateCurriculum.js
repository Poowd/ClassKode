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

export function CreateCurriculum() {
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
    CRR_Code: "",
    Curriculum: "",
  });
  const [validation, setValidation] = useState({
    CRR_Code: Base(data.CRR_Code),
    Curriculum: Base(data.Curriculum),
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

  useEffect(() => {
    ValidateCurriculum(data.CRR_Code, data.Curriculum, crr_dupe(), setValidation);
  }, [data]);

  function crr_dupe() {
    if (curriculum.length > 0) {
      for (var i = 0; i < curriculum.length; i++) {
        if (curriculum[i].CRR_Code === data.CRR_Code) {
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
        if (validation.CRR_Code[0].Result && validation.Curriculum[0].Result) {
          post("add-new-curriculum", data, setData);
          navigate("/utilities/curriculum");
        }
      }}
    >
      <DataControllerTemplate
        title={"Create A Curriculum"}
        description={"This module creates a curriculum"}
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
              label="Course Code"
              id="CRR_Code"
              alert={validation.CRR_Code[0].Message}
              class={validation.CRR_Code[0].State[0]}
              success={validation.CRR_Code[0].State[1]}
              trigger={dataChange}
              value={data.CRR_Code}
              required={true}
            />

            <FormInput
              label="Curriculum"
              id="Curriculum"
              alert={validation.Curriculum[0].Message}
              class={validation.Curriculum[0].State[0]}
              success={validation.Curriculum[0].State[1]}
              trigger={dataChange}
              value={data.Curriculum}
              required={false}
            />
          </>
        }
        additional={<></>}
      />
    </form>
  );
}
