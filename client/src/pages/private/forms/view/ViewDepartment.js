import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { LuFileEdit } from "react-icons/lu";
import { LuFolderArchive } from "react-icons/lu";
import { LinkButton } from "../../../../component/button/LinkButton";
import useModal from "../../../../hook/useModal";
import { PassiveModal } from "../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useArchiveEntry from "../../../../hook/useArchiveEntry";
import useDatabase from "../../../../hook/useDatabase";
import useConfiguration from "../../../../hook/useConfiguration";
import { DataViewerTemplate } from "../../../../layout/grid/DataViewerTemplate";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";
import { CollapseButton } from "../../../../component/button/CollapsButton";
import { DataControlView } from "../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../component/datacontrolview/DataControlViewItem";

export function ViewDepartment() {
  const navigate = useNavigate();
  const params = useParams();
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    get("random-code-generator", setCode);
    post("department/target", { data: params.id }, setData);
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      post("department/archive", { data: params.id }, setData);
      showToast(
        info.icons.calendar,
        "Department",
        `Department ${data[0].Department} is set to archive!`
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
          <span className="fw-bold text-black">{data[0].Department}</span>
        </p>
      );
    }
  };

  return (
    <>
      <DataViewerTemplate
        title={"View A Department"}
        description={"This module views a department"}
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
              to={`/department/edit/${params.id}`}
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
                  <p>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].Department}
                    </span>
                  </p>
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
                      {item.Department} <span>({item.Abbrev})</span>
                    </h1>
                    <hr />
                  </header>
                  <main className="p-3">
                    <section>
                      <h6>{item.Code}</h6>
                      <p>
                        {item.Description !== null ? item.Description : "None"}
                      </p>
                      <footer className="mt-5">
                        <small>
                          <p className="text-secondary">
                            Date Created: {item.Created}
                          </p>
                        </small>
                      </footer>
                    </section>
                  </main>
                  {/* <CollapseButton id="aasdasdas" title="hello" content="bye" /> */}
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
