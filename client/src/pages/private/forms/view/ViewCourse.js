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

export function ViewCourse() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();

  const [
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
  ] = useValidation();

  const [data, setData] = useState([state.data]);
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [getdata, setGetData, getServer] = useGet();

  const [coach, setCoach, getCoach] = usePost();

  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    getServer("random-code-generator");
  }, []);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(
        confirmCode.Confirm,
        4,
        4,
        getdata,
        confirmCode.Confirm
      ),
    });
  }, [confirmCode]);

  const formSubmit = (e) => {
    e.preventDefault();
    if (getdata === confirmCode.Confirm) {
      getCoach("archive-existing-coach", data[0]);
      navigate(-1);
    }
  };

  return (
    <>
      <DataControllerTemplate
        title={"View A Program"}
        description={"This module views a program"}
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
              to={"/institution/coach/edit/" + params.id}
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
                    <span className="fw-bold text-black">{getdata}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">
                      {data[0].FirstName.concat(" ", data[0].LastName)}
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
                    <span>{item.Course}</span>
                  </h1>
                </header>

                <DataControlView
                  content={
                    <>
                      <DataControlViewItem
                        label={"Course Code"}
                        content={item.CRS_Code}
                      />
                      <DataControlViewItem
                        label={"Level"}
                        content={item.AcademicLevel}
                      />
                      <DataControlViewItem
                        label={"Created"}
                        content={item.CRS_Created}
                      />
                    </>
                  }
                />
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
              alert={validation.Confirm[0].Message}
              class={validation.Confirm[0].State[0]}
              success={validation.Confirm[0].State[1]}
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={formSubmit}
      />
    </>
  );
}
