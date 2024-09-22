import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";

export function EditCurriculum() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    CRRID: state.data[0].CRRID,
    CRR_Code: state.data[0].CRR_Code,
    Curriculum: state.data[0].Curriculum,
  });
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_post("sel-curr", curriculum, setCurriculum);
  }, [curriculum]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("upd-curr", data, setData);
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
