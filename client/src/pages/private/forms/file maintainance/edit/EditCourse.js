import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../../hook/useHandleChange";
import useValidation from "../../../../../hook/useValidation";
import useDatabase from "../../../../../hook/useDatabase";
import useConfiguration from "../../../../../hook/useConfiguration";
import { useToasty } from "../../../../../hook/useToasty";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { MainInput } from "../../../../../component/input/MainInput";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function EditCourse() {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [department, setDepartment] = useState([]);
  const [data, setData] = useState({
    CRSID: null,
    Code: null,
    Course: null,
    Department: null,
    Description: null,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_post("course-target", { data: params.id }, setData);
  }, []);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("course-edit", data, setData);
      setTimeout(() => {
        recordLog(
          "Modified an Course Entry",
          "Course Module",
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
        title={info.text.moduleText.course.edit}
        description={info.text.moduleText.course.editDescrition}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={<IoMdArrowRoundBack />}
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
              label="Course"
              id="Course"
              trigger={dataChange}
              value={data.Course}
              required={true}
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
