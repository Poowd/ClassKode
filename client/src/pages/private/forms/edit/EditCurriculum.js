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

export function EditCurriculum() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    CRRID: state.data[0].CRRID,
    CRR_Code: state.data[0].CRR_Code,
    Curriculum: state.data[0].Curriculum,
  });
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-curr", curriculum, setCurriculum);
  }, [curriculum]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("upd-curr", data, setData);
      navigate(-1);
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Edit A Curriculum"}
        description={"This module edit a curriculum"}
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
        additional={<></>}
      />
    </form>
  );
}
