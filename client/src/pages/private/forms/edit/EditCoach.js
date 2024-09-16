import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";
import useConfiguration from "../../../../hook/useConfiguration";
import { MainInput } from "../../../../component/input/MainInput";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MainSelect } from "../../../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";

export function EditCoach() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [data, setData] = useState({
    SCHLID: null,
    FirstName: null,
    MiddleInitial: null,
    LastName: null,
    Gender: null,
    Department: null,
    Email: null,
    Phone: null,
    Image: null,
    Link: null,
  });

  const [dataChange] = useHandleChange(setData);
  const [department, setDepartment] = useState([]);
  const [coach, setCoach] = useState();
  const [file, setFile] = useState([]);
  const [retrieve, setRetrieved] = useState([]);

  useEffect(() => {
    get("department/list", setDepartment);
    post("coach/target", { data: params.id }, setData);
  }, [coach]);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("image", file);
    post("upload", formdata, setRetrieved);
  }, [file]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("coach/edit", data, setData);
      showToast(
        info.icons.calendar,
        "Coach",
        `Coach  ${data.FirstName} ${data.LastName} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Edit A Coach"}
        description={"This module edits a coach"}
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
              label="SCHLID"
              id="SCHLID"
              trigger={dataChange}
              value={data.SCHLID}
              required={true}
            />
            <MainInput
              label="FirstName"
              id="FirstName"
              trigger={dataChange}
              value={data.FirstName}
              required={true}
            />
            <MainInput
              label="MiddleInitial"
              id="MiddleInitial"
              trigger={dataChange}
              value={data.MiddleInitial}
              required={true}
            />
            <MainInput
              label="LastName"
              id="LastName"
              trigger={dataChange}
              value={data.LastName}
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

            <MainInput
              label="Email"
              id="Email"
              trigger={dataChange}
              value={data.Email}
              required={true}
            />

            <MainInput
              label="Phone"
              id="Phone"
              trigger={dataChange}
              value={data.Phone}
              required={true}
            />

            <MainInput
              label="Link"
              id="Link"
              trigger={dataChange}
              value={data.Link}
              required={true}
            />
            {/* <main className="w-100 row mb-2 ms-0">
              <section className="col-2 p-0 m-0 ">
                <label htmlFor="what">
                  <span className="fw-semibold">Image</span>
                </label>
              </section>
              <section className="col-10 p-0 m-0">
                <input
                  type="file"
                  className="form-control"
                  id="what"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />
              </section>
              {data.Image}
            </main> */}
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
