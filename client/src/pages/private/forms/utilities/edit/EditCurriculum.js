import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";
import useConfiguration from "../../../../../hook/useConfiguration";

export function EditCurriculum() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();

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
      setTimeout(() => {
        recordLog(
          "Modified an Curriculum Entry",
          "Curriculum Module",
          `A user modified an entry with a Curriculum ${data.Curriculum}`
        );
        showModal(
          "StatusModal",
          "",
          <main className="d-flex flex-column">
            <section className="text-center">
              <h1 className="text-success">{info.icons.status.success}</h1>
              <h3 className="text-success fw-bold">Success</h3>
              <button
                type="button"
                class="btn safe-color mt-3"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </section>
          </main>
        );
        navigate(-1);
      }, 1000); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={info.text.moduleText.curriculum.edit}
        description={info.text.moduleText.curriculum.editDescrition}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="safe-color px-2"
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
