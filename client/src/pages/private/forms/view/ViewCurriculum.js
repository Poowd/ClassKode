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
import { DataViewerTemplate } from "../../../../layout/grid/DataViewerTemplate";
import { CollapseButton } from "../../../../component/button/CollapsButton";

export function ViewCurriculum() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

  const [academicyear, setAcademicYear] = useState([]);
  const [data, setData] = useState([state.data]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [dataChange] = useHandleChange(setConfirmCode);

  const [currentcrr, setCurrentCRR] = useState([]);
  const [currentCurriculum, setCurrentCurriculum] = useState([]);
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    post("curriculum-current", currentcrr, setCurrentCRR);
    post("curriculum", curriculum, setCurriculum);
  }, []);

  useEffect(() => {
    currentcrr.map((crr, i) => setCurrentCurriculum(crr));
  }, [currentcrr]);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  useEffect(() => {
    post("sel-cur-ay", academicyear, setAcademicYear);
  }, [academicyear]);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(confirmCode.Confirm, 4, 4, code),
    });
  }, [confirmCode]);

  return (
    <>
      <DataViewerTemplate
        title={"View A Curriculum"}
        description={"This module views a curriculum"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            {data[0].CRR_Code === currentCurriculum.CRR_Code ? (
              <LinkButton
                class="btn-warning px-2"
                icon={<LuFileEdit />}
                to={"/institution/curriculum/edit/" + params.id}
                state={{ data: data }}
                text={"Edit"}
              />
            ) : null}
            <DefaultButton
              class="btn-danger px-2"
              icon={<LuFolderArchive />}
              function={() =>
                showModal(
                  "Modal",
                  "Archive Entry",
                  <>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].Curriculum}
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
            {data.map((item, i) => (
              <main key={i} className="px-0 py-3 m-0">
                <header>
                  <h6>{item.CRR_Code}</h6>
                  <h1 className="fw-bold custom-text-gradient pb-2">
                    {item.Curriculum}
                  </h1>
                  <hr />
                </header>
                <main className="p-3">
                  <section>
                    <CollapseButton
                      id="CurriculumHistory"
                      title="Curriculum History"
                      content={
                        academicyear.length > 0
                          ? academicyear.map((item, i) =>
                              item.CRR_Code === data[0].CRR_Code ? (
                                <li className="d-flex gap-2">
                                  <span className="fw-semibold">
                                    {item.ACY_Code}
                                  </span>
                                  <span className="">-</span>
                                  <span className="">{item.CRR_Code}</span>
                                </li>
                              ) : null
                            )
                          : "none"
                      }
                    />
                    <small>
                      <p className="text-secondary">
                        Date Created: {item.CRR_Created}
                      </p>
                    </small>
                  </section>
                </main>
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
              alert={validation.Confirm[0].Message}
              class={validation.Confirm[0].State[0]}
              success={validation.Confirm[0].State[1]}
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={() =>
          ArchiveEntry(
            "archive-existing-curriculum",
            post,
            code,
            confirmCode.Confirm,
            data[0]
          )
        }
      />
    </>
  );
}
