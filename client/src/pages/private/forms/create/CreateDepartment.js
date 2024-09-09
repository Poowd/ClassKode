import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";
import { MainInput } from "../../../../component/input/MainInput";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import { useToasty } from "../../../../hook/useToasty";
import useConfiguration from "../../../../hook/useConfiguration";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { MainSelect } from "../../../../component/dropdown/select/MainSelect";

export function CreateDepartment() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [data, setData] = useState({
    DPTID: "",
    Code: "",
    Department: "",
    Abbrev: "",
    AcademicLevel: "",
    Description: "",
  });

  const [dataChange] = useHandleChange(setData);
  const [department, setDepartment] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);

  useEffect(() => {
    get("department/list", setDepartment);
    get("academic-level/list", setAcademicLevel);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("department/insert", data, setData);
      showToast(
        info.icons.calendar,
        "Department",
        `Department ${data.Department} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 1000); // 2 second delay
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
              icon={info.icons.back}
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
              label="Code"
              id="Code"
              trigger={dataChange}
              value={data.Code}
              required={true}
            />
            <MainInput
              label="Department"
              id="Department"
              trigger={dataChange}
              value={data.Department}
              required={true}
            />
            <MainInput
              label="Abbrev"
              id="Abbrev"
              trigger={dataChange}
              value={data.Abbrev}
              required={true}
            />
            <MainSelect
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
