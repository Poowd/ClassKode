import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControlView } from "../../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../../component/datacontrolview/DataControlViewItem";
import { LuFileEdit } from "react-icons/lu";
import { LuFolderArchive } from "react-icons/lu";
import { LinkButton } from "../../../../../component/button/LinkButton";
import useModal from "../../../../../hook/useModal";
import { PassiveModal } from "../../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../../hook/useHandleChange";
import useValidation from "../../../../../hook/useValidation";
import useArchiveEntry from "../../../../../hook/useArchiveEntry";
import useDatabase from "../../../../../hook/useDatabase";
import { DataViewerTemplate } from "../../../../../layout/grid/DataViewerTemplate";
import { CollapseButton } from "../../../../../component/button/CollapsButton";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../../hook/useConfiguration";
import { useToasty } from "../../../../../hook/useToasty";
import { TextFormat2 } from "../../../../../component/textformat/TextFormat2";
import { useClipboard } from "../../../../../hook/useClipboard";

export function ViewAcademicYear() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [CopyClipboard] = useClipboard();

  const [curriculum, setCurriculum] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });

  const [dataChange] = useHandleChange(setConfirmCode);
  const [academicYearCode, setAYCode] = useState([]);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_get("curriculum-list", setCurriculum);
    data_get("current-academic-year-code", setAYCode);
  }, []);

  useEffect(() => {
    data_post("academic-year-target", { data: params.id }, setData);
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      data_post("academic-year-archive", { data: params.id }, setData);
      showToast(
        info.icons.others.info,
        "AcademicYear",
        `AcademicYear ${data[0].AcademicYear} is set to archive!`
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
          <span className="fw-bold text-black">{data[0].AcademicYear}</span>
        </p>
      );
    }
  };

  return (
    <>
      <DataViewerTemplate
        title={"View A Curriculum"}
        description={"This module views a curriculum"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="btn-warning px-2"
              icon={info.icons.forms.edit}
              to={"/curriculum/edit/" + params.id}
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
                      {data[0].AcademicYear}
                    </span>
                  </>
                )
              }
              text={"Archive"}
            />
          </>
        }
        additional={<main></main>}
        content={
          <>
            {data &&
              data.map((item, i) => (
                <main key={i} className="px-0 py-3 m-0">
                  <header>
                    <h1 className="fw-bold custom-text-gradient pb-2">
                      {item.AcademicYear}
                    </h1>
                    <hr />
                  </header>
                  <main className="p-3">
                    <section>
                      <main>
                        <TextFormat2 header="Academic Year" data={item.Code} />
                        <TextFormat2 header="Semester" data={item.Semester} />
                        <TextFormat2
                          header="Start-End Date"
                          data={`${item.StartDate} - ${item.EndDate}`}
                        />
                        <TextFormat2
                          header="Curriculum"
                          data={curriculum.map((curr, q) =>
                            curr.Code === item.Curriculum
                              ? curr.Curriculum
                              : null
                          )}
                        />
                      </main>
                      <main className="d-flex gap-2 align-items-center mt-3">
                        <button
                          className="btn w-100 p-0"
                          type="button"
                          onClick={() => {
                            CopyClipboard(academicYearCode.AcademicCode);
                            showToast(
                              info.icons.others.info,
                              "Clipboard",
                              "Copied!"
                            );
                          }}
                        >
                          <section className="w-100 p-2 bg-white rounded shadow-sm px-3 d-flex justify-content-between align-items-center">
                            <p className="m-0">Academic Codepass</p>
                            <h3 className="m-0 fw-semibold">
                              {academicYearCode.AcademicCode}
                            </h3>
                          </section>
                        </button>
                      </main>
                      <footer className="mt-5">
                        <small>
                          <p className="text-secondary">
                            Date Created: {item.Created}
                          </p>
                        </small>
                      </footer>
                    </section>
                  </main>
                  {/* <CollapseButton
                        id="AcademicYearDetails"
                        title="Academic Year Details"
                        content={
                          <DataControlView
                            content={
                              <>
                                <DataControlViewItem
                                  label={"Year Date"}
                                  content={
                                    <>
                                      <DataControlViewItem
                                        label={"Start Year"}
                                        content={item.StartDate}
                                      />
                                      <DataControlViewItem
                                        label={"End Year"}
                                        content={item.EndDate}
                                      />
                                    </>
                                  }
                                />
                              </>
                            }
                          />
                        }
                      /> */}
                </main>
              ))}
          </>
        }
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
