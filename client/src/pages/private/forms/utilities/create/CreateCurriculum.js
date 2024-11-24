import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { MainInput } from "../../../../../component/input/MainInput";
import useValidation from "../../../../../hook/useValidation";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function CreateCurriculum() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState({
    Curriculum: "",
    Description: "",
  });
  const [validation, setValidation] = useState({
    Curriculum: "",
    Description: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setValidation((prev) => ({
      ...prev,
      Curriculum: ValiAI("Name", data.Curriculum),
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (trueValiAIBool("Name", data.Curriculum) === true) {
      data_post("curriculum-insert", data, setData);
      showToast(
        info.icons.others.info,
        "Curriculum",
        `Curriculum ${data.Curriculum} is updated!`
      );
      setTimeout(() => {
        recordLog(
          "Added an Curriculum Entry",
          "Curriculum Module",
          `A user added an entry with an Curriculum ${data.Curriculum}`
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
        title={"Create A Curriculum"}
        description={"This module creates a curriculum"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="safe-color px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <MainInput
              class={`${validation.Curriculum[0]}`}
              label="Curriculum"
              id="Curriculum"
              trigger={dataChange}
              value={data.Curriculum}
              feedbackstatus={`${validation.Curriculum[1]}`}
              feedback={`${
                validation.Curriculum[2] !== undefined
                  ? validation.Curriculum[2]
                  : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.Description[0]}`}
              label="Description"
              id="Description"
              trigger={dataChange}
              value={data.Description}
              required={false}
            />
          </>
        }
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
      <StatusModal
        id={"StatusModal"}
        title={modalcontent.Title}
        content={
          <>
            <main>{modalcontent.Content}</main>
          </>
        }
        trigger={() => {}}
      />
    </form>
  );
}
