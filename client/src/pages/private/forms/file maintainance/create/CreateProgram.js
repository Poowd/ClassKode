import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useValidation from "../../../../../hook/useValidation";
import { useLogs } from "../../../../../hook/useLogs";
import useModal from "../../../../../hook/useModal";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function CreateProgram() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();
  const [info] = useConfiguration();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [data, setData] = useState({
    Program: "",
    Abbrev: "",
    Department: "",
    AcademicLevel: "",
    Description: "",
  });
  const [validation, setValidation] = useState({
    Program: "",
    Abbrev: "",
    Department: "",
    AcademicLevel: "",
    Description: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);

  useEffect(() => {
    data_get("academic-level-list", setAcademicLevel);
  }, [academiclevel]);

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_get("program-list", setProgram);
  }, [department]);

  const checkDuplicateAbbrev = (abbrev) => {
    for (var i = 0; i < program.length; i++) {
      if (program[i].Abbrev === abbrev) {
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
      Program: ValiAI("Name", data.Program),
      Abbrev: ValiAI("Abbrev", data.Abbrev),
      Department: ["is-valid", "valid-feedback", "Looks Good!"],
      AcademicLevel: ["is-valid", "valid-feedback", "Looks Good!"],
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("Name", data.Program) &&
      trueValiAIBool("Abbrev", data.Abbrev) &&
      !checkDuplicateAbbrev(data.Abbrev)
    ) {
      data_post("program-insert", data, setData);
      setTimeout(() => {
        recordLog(
          "Saved an Program Entry",
          "Program Module",
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
        title={info.text.moduleText.program.create}
        description={info.text.moduleText.program.createDescrition}
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
              class={`${validation.Program[0]}`}
              label="Program"
              id="Program"
              trigger={dataChange}
              value={data.Program}
              feedbackstatus={`${validation.Program[1]}`}
              feedback={`${
                validation.Program[2] !== undefined ? validation.Program[2] : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.Abbrev[0]}`}
              label="SectionAbbrev"
              id="Abbrev"
              trigger={dataChange}
              value={data.Abbrev}
              feedbackstatus={`${validation.Abbrev[1]}`}
              feedback={`${
                validation.Abbrev[2] !== undefined ? validation.Abbrev[2] : ""
              }`}
              required={true}
            />
            <MainSelect
              class={`${validation.Department[0]}`}
              label="Department"
              id="Department"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) =>
                      option.Code === data.Department ? option.Department : null
                    )}
                  />
                  {department.map((option, i) => (
                    <>
                      {data.Department !== option.Code ? (
                        <SelectButtonItem
                          value={option.Code}
                          content={option.Department}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              class={`${validation.AcademicLevel[0]}`}
              label="AcademicLevel"
              id="AcademicLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={academiclevel.map((option, i) =>
                      option.AcademicLevel === data.AcademicLevel
                        ? option.AcademicLevel
                        : null
                    )}
                  />
                  {academiclevel.map((option, i) =>
                    data.AcademicLevel !== option.AcademicLevel ? (
                      <SelectButtonItem
                        value={option.AcademicLevel}
                        content={option.AcademicLevel}
                      />
                    ) : null
                  )}
                </>
              }
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
