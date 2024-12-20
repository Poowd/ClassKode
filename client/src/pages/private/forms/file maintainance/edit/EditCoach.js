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
import { RadioGroup } from "../../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../../component/radiogroup/RadioButton";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function EditCoach() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

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
    data_get("department-list", setDepartment);
    data_post("coach-target", { data: params.id }, setData);
  }, [coach]);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("image", file);
    data_post("upload", formdata, setRetrieved);
  }, [file]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("coach-edit", data, setData);
      setTimeout(() => {
        recordLog(
          "Modified an Coach Entry",
          "Coach Module",
          `A user modified an entry with an ID ${data.SCHLID}`
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
        title={info.text.moduleText.coach.edit}
        description={info.text.moduleText.coach.editDescrition}
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
              required={false}
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

            <MainInput
              label="Image"
              id="Image"
              trigger={dataChange}
              value={data.Image}
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
