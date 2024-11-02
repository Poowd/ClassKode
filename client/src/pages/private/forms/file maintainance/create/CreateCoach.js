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
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { RadioGroup } from "../../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../../component/radiogroup/RadioButton";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import useValidation from "../../../../../hook/useValidation";

const supabase = createClient(
  "https://pgcztzkowuxixfyiqera.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnY3p0emtvd3V4aXhmeWlxZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODQ0MTUsImV4cCI6MjA0MTA2MDQxNX0.ryLXhP4sBBhO5_JVgQ4YJ9BlpdlD2NQM2mjDRbkc3NY"
);

const CDNURL =
  "https://pgcztzkowuxixfyiqera.supabase.co/storage/v1/object/public/images/";

export function CreateCoach() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [info] = useConfiguration();
  const [coach, setCoach] = useState([]);
  const [data, setData] = useState({
    SCHLID: "",
    FirstName: "",
    MiddleInitial: "",
    LastName: "",
    Gender: "",
    Department: "",
    AcademicLevel: "",
    Email: "",
    Phone: "",
    Image: "",
    Link: "",
    Status: "",
  });
  const [validation, setValidation] = useState({
    SCHLID: "",
    FirstName: "",
    MiddleInitial: "",
    LastName: "",
    Gender: "",
    Department: "",
    AcademicLevel: "",
    Email: "",
    Phone: "",
    Image: "",
    Link: "",
    Status: "",
  });
  const [dataChange] = useHandleChange(setData);
  const [department, setDepartment] = useState([]);
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [retrieve, setRetrieved] = useState([]);
  const [images, setImages] = useState([]);
  const [currentUUID, setCurrentUUID] = useState(null);
  const [academicLevel, setAcademicLevel] = useState([]);

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_get("coach-list", setCoach);
    data_get("academic-level-list", setAcademicLevel);
  }, []);

  useEffect(() => {
    setCurrentUUID(uuidv4());
  }, [images]);

  console.log(data);

  async function uploadFile(e) {
    const imageFile = file;
    console.log("Upload");
    const { error } = await supabase.storage
      .from("images")
      .upload(currentUUID + ".jpg", imageFile);
    if (error) {
      console.log(error);
      alert("Error");
    }
  }

  const checkDuplicateSCHLID = (schlid) => {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].SCHLID === schlid) {
        setValidation((prev) => ({
          ...prev,
          SCHLID: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const checkDuplicateEmail = (email) => {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].Email === email) {
        setValidation((prev) => ({
          ...prev,
          Email: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const checkDuplicatePhone = (phone) => {
    for (var i = 0; i < coach.length; i++) {
      if (coach[i].Phone === phone) {
        setValidation((prev) => ({
          ...prev,
          Phone: ["is-invalid", "invalid-feedback", "Looks Bad!"],
        }));
        return true;
      }
    }
    return false;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setValidation((prev) => ({
      ...prev,
      SCHLID: ValiAI("SCHLID", data.SCHLID),
      FirstName: ValiAI("Name", data.FirstName),
      MiddleInitial: ValiAI("Initial", data.MiddleInitial),
      LastName: ValiAI("Name", data.LastName),
      Department: ["is-valid", "valid-feedback", "Looks Good!"],
      AcademicLevel: ["is-valid", "valid-feedback", "Looks Good!"],
      Email: ValiAI("SchoolEmail", data.Email),
      Phone: ValiAI("Phone", data.Phone),
      Link: ["is-valid", "valid-feedback", "Looks Good!"],
      Image: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("SCHLID", data.SCHLID) &&
      trueValiAIBool("Name", data.FirstName) &&
      trueValiAIBool("Initial", data.MiddleInitial) &&
      trueValiAIBool("Name", data.LastName) &&
      trueValiAIBool("SchoolEmail", data.Email) &&
      trueValiAIBool("Phone", data.Phone) &&
      !checkDuplicateSCHLID(data.SCHLID) &&
      !checkDuplicatePhone(data.Phone) &&
      !checkDuplicateEmail(data.Email)
    ) {
      try {
        const response = await fetch(`${info.conn.server}coach-insert`, {
          method: "POST",
          body: JSON.stringify({
            SCHLID: data.SCHLID,
            FirstName: data.FirstName,
            MiddleInitial: data.MiddleInitial.toUpperCase(),
            LastName: data.LastName,
            Gender: data.Gender,
            Department: data.Department,
            AcademicLevel: data.AcademicLevel,
            Email: data.Email,
            Phone: data.Phone,
            Link: data.Link,
            Image: `${currentUUID}.jpg`,
          }),
        });
        const entry = await response.json();
        if (entry.Status === "Success") {
          uploadFile();
          data_post("coach-status-insert", { data: entry.id }, setData);
        }
      } catch (error) {
        console.log(error);
      }
      showToast(
        info.icons.others.info,
        "Coach",
        `Coach ${data.FirstName} ${data.LastName} is saved!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Coach"}
        description={"This module creates a coach"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.navigation.back}
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
            <MainInput
              class={`${validation.SCHLID[0]}`}
              label="SCHLID"
              id="SCHLID"
              trigger={dataChange}
              value={data.SCHLID}
              feedbackstatus={`${validation.SCHLID[1]}`}
              feedback={`${
                validation.SCHLID[2] !== undefined ? validation.SCHLID[2] : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.FirstName[0]}`}
              label="FirstName"
              id="FirstName"
              trigger={dataChange}
              value={data.FirstName}
              feedbackstatus={`${validation.FirstName[1]}`}
              feedback={`${
                validation.FirstName[2] !== undefined
                  ? validation.FirstName[2]
                  : ""
              }`}
              required={true}
            />
            <MainInput
              class={`${validation.MiddleInitial[0]}`}
              label="MiddleInitial"
              id="MiddleInitial"
              trigger={dataChange}
              value={data.MiddleInitial}
              feedbackstatus={`${validation.MiddleInitial[1]}`}
              feedback={`${
                validation.MiddleInitial[2] !== undefined
                  ? validation.MiddleInitial[2]
                  : ""
              }`}
              required={false}
            />
            <MainInput
              class={`${validation.LastName[0]}`}
              label="LastName"
              id="LastName"
              trigger={dataChange}
              value={data.LastName}
              feedbackstatus={`${validation.LastName[1]}`}
              feedback={`${
                validation.LastName[2] !== undefined
                  ? validation.LastName[2]
                  : ""
              }`}
              required={true}
            />
            <RadioGroup
              label="Gender"
              selection={
                <>
                  <RadioButton
                    id="male"
                    option="Male"
                    group="Gender"
                    label="Male"
                    trigger={dataChange}
                    checked={data.Gender === "Male"}
                  />
                  <RadioButton
                    id="female"
                    option="Female"
                    group="Gender"
                    label="Female"
                    trigger={dataChange}
                    checked={data.Gender === "Female"}
                  />
                </>
              }
            />
            <MainSelect
              class={`${validation.Department[0]}`}
              label="Department"
              id="Department"
              trigger={dataChange}
              required={true}
              feedbackstatus={`${validation.Department[1]}`}
              feedback={`${
                validation.Department[2] !== undefined
                  ? validation.Department[2]
                  : ""
              }`}
              option={
                <>
                  <SelectButtonItemSelected
                    content={department.map((option, i) =>
                      option.Code === data.Department ? option.Department : null
                    )}
                  />
                  {department.map((option, i) =>
                    data.Code !== option.Department ? (
                      <SelectButtonItem
                        value={option.Code}
                        content={option.Department}
                      />
                    ) : null
                  )}
                </>
              }
            />
            <MainSelect
              class={`${validation.AcademicLevel[0]}`}
              label="AcademicLevel"
              id="AcademicLevel"
              trigger={dataChange}
              required={true}
              feedbackstatus={`${validation.AcademicLevel[1]}`}
              feedback={`${
                validation.AcademicLevel[2] !== undefined
                  ? validation.AcademicLevel[2]
                  : ""
              }`}
              option={
                <>
                  <SelectButtonItemSelected
                    content={
                      <>
                        {academicLevel.map((option, i) =>
                          option.AcademicLevel === data.AcademicLevel
                            ? option.AcademicLevel
                            : null
                        )}
                        {data.AcademicLevel === "Both" ? "Both" : null}
                      </>
                    }
                  />
                  {academicLevel.map((option, i) =>
                    data.AcademicLevel !== option.AcademicLevel ? (
                      <SelectButtonItem
                        value={option.AcademicLevel}
                        content={option.AcademicLevel}
                      />
                    ) : null
                  )}
                  {data.AcademicLevel !== "Both" ? (
                    <SelectButtonItem value={"Both"} content={"Both"} />
                  ) : null}
                </>
              }
            />
            <MainInput
              class={`${validation.Email[0]}`}
              label="Email"
              id="Email"
              trigger={dataChange}
              value={data.Email}
              feedbackstatus={`${validation.Email[1]}`}
              feedback={`${
                validation.Email[2] !== undefined ? validation.Email[2] : ""
              }`}
              required={true}
            />

            <MainInput
              class={`${validation.Phone[0]}`}
              label="Phone"
              id="Phone"
              trigger={dataChange}
              value={data.Phone}
              feedbackstatus={`${validation.Phone[1]}`}
              feedback={`${
                validation.Phone[2] !== undefined ? validation.Phone[2] : ""
              }`}
              required={true}
            />

            <MainInput
              class={`${validation.Link[0]}`}
              label="Link"
              id="Link"
              trigger={dataChange}
              value={data.Link}
              required={true}
            />

            <main className="w-100 row mb-2 ms-0">
              <section className="col-2 p-0 m-0 ">
                <label htmlFor="what">
                  <span className="fw-semibold">Image</span>
                </label>
              </section>
              <section className="col-10 p-0 m-0">
                <input
                  type="file"
                  className={`form-control ${validation.Image[0]}`}
                  id="what"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFile(file);
                      const reader = new FileReader();
                      reader.onload = () => {
                        setPreviewUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/png, image/jpeg"
                  required="true"
                />
              </section>
            </main>
          </>
        }
        entry={<main className="p-3"></main>}
        additional={
          <figure className="p-5">
            <img
              className="h-100 w-100 rounded object-fit-cover"
              src={previewUrl}
            ></img>
          </figure>
        }
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}
