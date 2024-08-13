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

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    CRR_Code: "",
    Curriculum: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-curr", curriculum, setCurriculum);
  }, [curriculum]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("ins-curr", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
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
        entryform={
          <>
            <FormInput
              label="Curriculum Code"
              id="CRR_Code"
              trigger={dataChange}
              value={data.CRR_Code}
              required={true}
            />

            <FormInput
              label="Curriculum"
              id="Curriculum"
              trigger={dataChange}
              value={data.Curriculum}
              required={false}
            />
          </>
        }
      />
    </form>
  );
}
