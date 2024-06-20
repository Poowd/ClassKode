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

export function ViewCoach() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();

  const [data, setData] = useState([state.data]);
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [getdata, setGetData, getServer] = useGet();

  const [coach, setCoach, getCoach] = usePost();
  const [coachstatus, setCoachStatus, getCoachStatus] = usePost();
  const [coachspecialization, setCoachSpecilization, getCoachSpecilization] =
    usePost();

  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [dataChange] = useHandleChange(setConfirmCode);

  const [
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
  ] = useValidation();

  useEffect(() => {
    getCoachStatus("coach-status", {
      SCHLID: data[0].SCHLID,
      ACY_Code: "AY2425",
    });
    getCoachSpecilization("coach-specialization", {
      SCHLID: data[0].SCHLID,
      ACY_Code: "AY2425",
    });
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
        title={"View A Coach"}
        description={"This module views a coach"}
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
                    <span>{item.Gender === "Male" ? "Mr. " : "Ms. "}</span>
                    <span>{item.FirstName}</span>
                    <span>
                      {item.MiddleInitial !== (null || "")
                        ? " " + item.MiddleInitial + ". "
                        : " "}
                    </span>
                    <span>{item.LastName}</span>
                  </h1>
                </header>

                <DataControlView
                  content={
                    <>
                      <DataControlViewItem
                        label={"School ID"}
                        content={item.SCHLID}
                      />
                      <DataControlViewItem
                        label={"Department"}
                        content={item.Department}
                      />
                      <DataControlViewItem
                        label={"Contacts"}
                        content={
                          <>
                            <span className="d-block">{item.Phone}</span>
                            <span className="d-block">{item.Email}</span>
                            <span className="d-block">
                              <a href={item.Facebook} target="_blank">
                                {item.Facebook}
                              </a>
                            </span>
                          </>
                        }
                      />
                      <DataControlViewItem
                        label={"Created"}
                        content={item.CCH_Created}
                      />
                      <DataControlViewItem
                        label={"Status"}
                        content={
                          coachstatus.length > 0
                            ? coachstatus.map((item, i) => item.CoachType)
                            : "Not Available"
                        }
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
            <h6>Coach Specialization</h6>
            {coachspecialization.length > 0
              ? coachspecialization.map((item, i) => (
                  <div className="p-2 shadow-sm mb-2 rounded">
                    {item.Course}
                  </div>
                ))
              : "None"}
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
        trigger={formSubmit}
      />
    </>
  );
}
