import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import useValidation from "../../../../../hook/useValidation";
import { StatusModal } from "../../../../../component/modal/StatusModal";
import { useLogs } from "../../../../../hook/useLogs";
import useModal from "../../../../../hook/useModal";

export function CreateDepartment() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [data, setData] = useState({
    DPTID: "",
    Code: "",
    Department: "",
    Abbrev: "",
    Description: "",
  });
  const [validation, setValidation] = useState({
    DPTID: "",
    Code: "",
    Department: "",
    Abbrev: "",
    Description: "",
  });

  const [department, setDepartment] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("department-list", setDepartment);
  }, []);

  const checkDuplicateCode = (code) => {
    for (var i = 0; i < department.length; i++) {
      if (department[i].Code === code) {
        setValidation((prev) => ({
          ...prev,
          Code: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const checkDuplicateAbbrev = (abbrev) => {
    for (var i = 0; i < department.length; i++) {
      if (department[i].Abbrev === abbrev) {
        setValidation((prev) => ({
          ...prev,
          Abbrev: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const submitForm = (e) => {
    e.preventDefault();
    setValidation((prev) => ({
      ...prev,
      Department: ValiAI("Name", data.Department),
      Abbrev: ValiAI("Abbrev", data.Abbrev),
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("Name", data.Department) &&
      trueValiAIBool("Abbrev", data.Abbrev) &&
      !checkDuplicateCode(data.Code) &&
      !checkDuplicateAbbrev(data.Abbrev)
    ) {
      data_post("department-insert", data, setData);
      setTimeout(() => {
        recordLog(
          "Saved an Department Entry",
          "Department Module",
          `A user saved an entry with an Code ${data.Code}`
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
        title={info.text.moduleText.department.create}
        description={info.text.moduleText.department.createDescrition}
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
              class={`${validation.Department[0]}`}
              label="Department"
              id="Department"
              trigger={dataChange}
              value={data.Department}
              feedbackstatus={`${validation.Department[1]}`}
              feedback={`${
                validation.Department[2] !== undefined
                  ? validation.Department[2]
                  : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.Abbrev[0]}`}
              label="Abbrev"
              id="Abbrev"
              trigger={dataChange}
              value={data.Abbrev}
              feedbackstatus={`${validation.Abbrev[1]}`}
              feedback={`${
                validation.Abbrev[2] !== undefined ? validation.Abbrev[2] : ""
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
        entry={<main className="p-3"></main>}
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
