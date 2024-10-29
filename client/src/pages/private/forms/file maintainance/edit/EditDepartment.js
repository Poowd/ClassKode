import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import useConfiguration from "../../../../../hook/useConfiguration";
import { MainInput } from "../../../../../component/input/MainInput";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";

export function EditDepartment() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [data, setData] = useState({
    Code: null,
    Department: null,
    Abbrev: null,
    Description: null,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_post("department-target", { data: params.id }, setData);
  }, []);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("department-edit", data, setData);
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
        title={"Edit A Department"}
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
