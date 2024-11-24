import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import useValidation from "../../../../../hook/useValidation";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function CreateAcademicYear() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [curriculum, setCurriculum] = useState([]);
  const [semester, setSemester] = useState([]);
  const [academicCode, setAcademicCode] = useState("");
  const [ValiAI, trueValiAIBool] = useValidation();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [data, setData] = useState({
    AcademicYear: "",
    Curriculum: "",
    Semester: "",
    StartDate: "",
    EndDate: "",
    AcademicCode: "",
    Description: "",
  });
  const [validation, setValidation] = useState({
    AcademicYear: "",
    Curriculum: "",
    Semester: "",
    StartDate: "",
    EndDate: "",
    AcademicCode: "",
    Description: "",
  });
  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
    data_get("semester-list", setSemester);
  }, []);

  const generateAcademicCode = (e) => {
    e.preventDefault();
    data_get("academic-code-generator", setAcademicCode);
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, AcademicCode: academicCode }));
  }, [academicCode]);

  const submitForm = async (e) => {
    e.preventDefault();
    setValidation((prev) => ({
      ...prev,
      AcademicYear: ValiAI("Name", data.AcademicYear),
      Curriculum: ["is-valid", "valid-feedback", "Looks Good!"],
      Semester: ["is-valid", "valid-feedback", "Looks Good!"],
      StartDate: ["is-valid", "valid-feedback", "Looks Good!"],
      EndDate: ["is-valid", "valid-feedback", "Looks Good!"],
      AcademicCode: ValiAI("Name", data.AcademicCode),
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("Name", data.AcademicYear) &&
      trueValiAIBool("Name", data.AcademicCode)
    ) {
      try {
        const response = await fetch(
          `${info.conn.server}academic-year-insert`,
          {
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const entry = await response.json();
        console.log(entry);
        if (entry.Status === "Success") {
          data_post("academic-year-code-insert", entry.data, setData);
        }
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        recordLog(
          "Added an Academic Year Entry",
          "Academic Year Module",
          `A user added an entry with an Code ${data.AcademicCode}`
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
        title={"Create A Academic Year"}
        description={"This module creates a academic year"}
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
              class={`${validation.AcademicYear[0]}`}
              label="AcademicYear"
              id="AcademicYear"
              trigger={dataChange}
              value={data.AcademicYear}
              feedbackstatus={`${validation.AcademicYear[1]}`}
              feedback={`${
                validation.AcademicYear[2] !== undefined
                  ? validation.AcademicYear[2]
                  : ""
              }`}
              required={true}
            />
            <MainSelect
              class={`${validation.Curriculum[0]}`}
              label="Curriculum"
              id="Curriculum"
              trigger={dataChange}
              required={true}
              feedbackstatus={`${validation.Curriculum[1]}`}
              feedback={`${
                validation.Curriculum[2] !== undefined
                  ? validation.Curriculum[2]
                  : ""
              }`}
              option={
                <>
                  <SelectButtonItemSelected
                    content={curriculum.map((option) =>
                      option.Code === data.Curriculum ? option.Curriculum : null
                    )}
                  />
                  {curriculum.map((option, i) => (
                    <>
                      {data.Curriculum !== option.Code ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Code}
                          content={option.Curriculum}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              class={`${validation.Semester[0]}`}
              label="Semester"
              id="Semester"
              trigger={dataChange}
              required={true}
              feedbackstatus={`${validation.Semester[1]}`}
              feedback={`${
                validation.Semester[2] !== undefined
                  ? validation.Semester[2]
                  : ""
              }`}
              option={
                <>
                  <SelectButtonItemSelected
                    content={semester.map((option) =>
                      option.Semester === data.Semester ? option.Semester : null
                    )}
                  />
                  {semester.map((option, i) => (
                    <>
                      {data.Semester !== option.Semester ? (
                        <SelectButtonItem
                          key={i}
                          value={option.Semester}
                          content={option.Semester}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              }
            />
            <MainInput
              class={`${validation.StartDate[0]}`}
              label="StartDate"
              id="StartDate"
              type="date"
              trigger={dataChange}
              value={data.StartDate}
              feedbackstatus={`${validation.StartDate[1]}`}
              feedback={`${
                validation.StartDate[2] !== undefined
                  ? validation.StartDate[2]
                  : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.EndDate[0]}`}
              label="EndDate"
              id="EndDate"
              type="date"
              trigger={dataChange}
              value={data.EndDate}
              feedbackstatus={`${validation.EndDate[1]}`}
              feedback={`${
                validation.EndDate[2] !== undefined ? validation.EndDate[2] : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.AcademicCode[0]}`}
              label="AcademicCode"
              id="AcademicCode"
              trigger={dataChange}
              feedbackstatus={`${validation.AcademicCode[1]}`}
              feedback={`${
                validation.AcademicCode[2] !== undefined
                  ? validation.AcademicCode[2]
                  : ""
              }`}
              value={data.AcademicCode}
              required={true}
            />
            <main className="w-100 d-flex justify-content-end mb-2">
              <DefaultButton
                class="primary-gradient px-2 py-2"
                type="button"
                text="Generate Code"
                function={generateAcademicCode}
              />
            </main>
            <MainInput
              class={`${validation.Description[0]}`}
              label="Description"
              id="Description"
              trigger={dataChange}
              value={data.Description}
              feedbackstatus={`${validation.Description[1]}`}
              feedback={`${
                validation.Description[2] !== undefined
                  ? validation.Description[2]
                  : ""
              }`}
              required={false}
            />
          </>
        }
        additional={<></>}
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
