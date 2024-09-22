import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { LinkButton } from "../../../../../component/button/LinkButton";
import useModal from "../../../../../hook/useModal";
import { PassiveModal } from "../../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../../hook/useHandleChange";
import useArchiveEntry from "../../../../../hook/useArchiveEntry";
import useDatabase from "../../../../../hook/useDatabase";
import { DataViewerTemplate } from "../../../../../layout/grid/DataViewerTemplate";
import useConfiguration from "../../../../../hook/useConfiguration";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";

export function ViewProgram() {
  const navigate = useNavigate();
  const params = useParams();
  const [get, post, data_get, data_post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_get("department-list", setDepartment);
    data_post("program-target", { data: params.id }, setData);
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      data_post("program-archive", { data: params.id }, setData);
      showToast(
        info.icons.calendar,
        "Program",
        `Program ${data[0].Program} is set to archive!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    } else {
      showModal(
        "Modal",
        "Archive Entry",
        <p>
          <span>Type the code </span>
          <span className="fw-bold text-black">{code}</span>
          <span> to archive </span>
          <span className="fw-bold text-black">{data[0].Program}</span>
        </p>
      );
    }
  };

  return (
    <>
      <DataViewerTemplate
        title={"View A Program"}
        description={"This module views a program"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={info.icons.back}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="btn-warning px-2"
              icon={info.icons.forms.edit}
              to={`/program/edit/${params.id}`}
              state={{ data: data }}
              text={"Edit"}
            />
            <DefaultButton
              class="btn-danger px-2"
              icon={info.icons.forms.archive}
              function={() =>
                showModal(
                  "Modal",
                  "Archive Entry",
                  <>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].Program}
                    </span>
                  </>
                )
              }
              text={"Archive"}
            />
          </>
        }
        content={
          <>
            {data &&
              data.map((item, i) => (
                <main key={i} className="px-0 py-3 m-0">
                  <header>
                    <h1 className="fw-bold custom-text-gradient pb-2">
                      {item.Program} <span>({item.Abbrev})</span>
                    </h1>
                    <hr />
                  </header>
                  <main className="p-3">
                    <section>
                      <h6>{item.Code}</h6>
                      <p>{item.Description && item.Description}</p>
                      <ul className="m-0 mt-3 p-0 d-flex">
                        <li className="border m-0 p-2 rounded">
                          <p className="m-0 p-0">
                            {department &&
                              department.map((dept) =>
                                dept.Code === item.Department
                                  ? dept.Department
                                  : null
                              )}
                          </p>
                        </li>
                      </ul>
                      <footer className="mt-5">
                        <small>
                          <p className="text-secondary">
                            Date Created: {item.Created}
                          </p>
                        </small>
                      </footer>
                    </section>
                  </main>
                </main>
              ))}
          </>
        }
        additional={<></>}
      />
      <PassiveModal
        id={"Modal"}
        title={modalcontent.Title}
        content={
          <>
            {modalcontent.Content}
            <FormInput
              hidden={true}
              id="Confirm"
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={archiveEntry}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </>
  );
}
