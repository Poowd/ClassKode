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

export function CreateDepartment() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
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
      Code: ValiAI("Code", data.Code),
      Department: ValiAI("Name", data.Department),
      Abbrev: ValiAI("Abbrev", data.Abbrev),
      Description: ["is-valid", "valid-feedback", "Looks Good!"],
    }));
    if (
      trueValiAIBool("Code", data.Code) &&
      trueValiAIBool("Name", data.Department) &&
      trueValiAIBool("Abbrev", data.Abbrev) &&
      !checkDuplicateCode(data.Code) &&
      !checkDuplicateAbbrev(data.Abbrev)
    ) {
      data_post("department-insert", data, setData);
      showToast(
        info.icons.others.info,
        "Department",
        `Department ${data.Department} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Department"}
        description={"This module creates a department"}
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
              class={`${validation.Code[0]}`}
              label="Code"
              id="Code"
              trigger={dataChange}
              value={data.Code}
              feedbackstatus={`${validation.Code[1]}`}
              feedback={`${
                validation.Code[2] !== undefined ? validation.Code[2] : ""
              }`}
              required={true}
            />
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
    </form>
  );
}
