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
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function EditDepartment() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

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
      setTimeout(() => {
        recordLog(
          "Modified an Department Entry",
          "Department Module",
          `A user modified an entry with an Code ${data.Code}`
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
        title={info.text.moduleText.department.edit}
        description={info.text.moduleText.department.editDescrition}
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
