import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { DataControlView } from "../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../component/datacontrolview/DataControlViewItem";
import { GrView } from "react-icons/gr";
import usePost from "../../../../hook/usePost";
import { LuFileEdit } from "react-icons/lu";
import { LuFolderArchive } from "react-icons/lu";
import { LinkButton } from "../../../../component/button/LinkButton";
import useModal from "../../../../hook/useModal";
import { PassiveModal } from "../../../../component/modal/PassiveModal";
import useGet from "../../../../hook/useGet";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import { ViewCard } from "../../../../component/card/ViewCard";
import useArchiveEntry from "../../../../hook/useArchiveEntry";
import useDatabase from "../../../../hook/useDatabase";

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

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  useEffect(() => {
    post("academicyear-current", academicyear, setAcademicYear);
  }, [academicyear]);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(confirmCode.Confirm, 4, 4, code),
    });
  }, [confirmCode]);

  return (
    <>
      <DataControllerTemplate
        title={"View A Curriculum"}
        description={"This module views a curriculum"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={<IoMdArrowRoundBack />}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="btn-warning px-2"
              icon={<LuFileEdit />}
              to={"/institution/curriculum/edit/" + params.id}
              state={{ data: data }}
              text={"Edit"}
            />
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
                  <h1>
                    <span>{item.Curriculum}</span>
                  </h1>
                </header>

                <DataControlView
                  content={
                    <>
                      <DataControlViewItem
                        label={"Course Code"}
                        content={item.CRR_Code}
                      />
                      <DataControlViewItem
                        label={"Created"}
                        content={item.CRR_Created}
                      />
                    </>
                  }
                />
              </main>
            ))}
          </>
        }
        additional={
          <>
            <ViewCard
              height="20vh"
              title="Academic Year"
              content={
                academicyear.length > 0
                  ? academicyear.map((item, i) =>
                      item.CRR_Code === data[0].CRR_Code ? (
                        <li className="d-flex gap-2">
                          <span className="fw-semibold">{item.ACY_Code}</span>
                          <span className="">-</span>
                          <span className="">{item.CRR_Code}</span>
                        </li>
                      ) : null
                    )
                  : "None"
              }
            />
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
