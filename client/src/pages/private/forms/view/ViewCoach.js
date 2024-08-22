import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { DataControlView } from "../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../component/datacontrolview/DataControlViewItem";
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

export function ViewCoach() {
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

  const [data, setData] = useState([state.data]);
  const [assigment, setAssignment] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [academicyear, setAcademicYear] = useState([]);
  const [code, setCode] = useState("");
  const [image, setImage] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [validation, setValidation] = useState({
    Confirm: ValidateCode(confirmCode.Confirm),
  });

  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, [data]);

  useEffect(() => {
    try {
      post("sel-cur-ay", academicyear, setAcademicYear);
      post("sel-coach-asgn", { SCHLID: data[0].SCHLID }, setAssignment);
      post("sel-coach-spl", { SCHLID: data[0].SCHLID }, setSpecialization);
    } catch (err) {
      navigate(-1);
    }
  }, [assigment, specialization, academicyear]);

  useEffect(() => {
    setValidation({
      Confirm: ValidateCode(confirmCode.Confirm, 4, 4, code),
    });
  }, [confirmCode]);

  return (
    <>
      <DataViewerTemplate
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
                    <span className="fw-bold text-black">{code}</span>
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
                  <h6>{item.SCHLID}</h6>
                  <h1 className="fw-bold custom-text-gradient pb-2">
                    {`${item.FirstName} ${
                      item.MiddleInitial !== (null || "")
                        ? " " + item.MiddleInitial + ". "
                        : " "
                    } ${item.LastName}`}
                  </h1>
                  <hr />
                </header>
                <main className="p-3">
                  <section>
                    <CollapseButton
                      id="details"
                      title="Coach's Details"
                      content={
                        <DataControlView
                          content={
                            <>
                              <DataControlViewItem
                                label={"Department"}
                                content={item.Department}
                              />
                              <DataControlViewItem
                                label={"Contacts"}
                                content={
                                  <ul className="p-0 m-0">
                                    <li className="p-0 m-0">
                                      <DataControlViewItem
                                        label={"Phone Number:"}
                                        content={item.Phone}
                                      />
                                    </li>
                                    <li className="p-0 m-0">
                                      <DataControlViewItem
                                        label={"School Email:"}
                                        content={item.Email}
                                      />
                                    </li>
                                    <li className="p-0 m-0">
                                      <DataControlViewItem
                                        label={"Facebook Acc:"}
                                        content={
                                          <Link
                                            to={item.Facebook}
                                            target="_blank"
                                          >
                                            {item.Facebook}
                                          </Link>
                                        }
                                      />
                                    </li>
                                  </ul>
                                }
                              />
                              <DataControlViewItem
                                label={"Availability"}
                                content={
                                  assigment.length > 0
                                    ? assigment.map((item, i) =>
                                        item.ACY_Code ===
                                        academicyear[0].ACY_Code
                                          ? item.CoachType
                                          : "Not Available"
                                      )
                                    : "Not Available"
                                }
                              />
                            </>
                          }
                        />
                      }
                    />
                    <CollapseButton
                      id="history"
                      title="Coach's History"
                      content={
                        assigment.length > 0
                          ? assigment.map((item, i) => (
                              <li className="d-flex gap-2">
                                <span className="fw-semibold">
                                  {item.ACY_Code}
                                </span>
                                <span className="">-</span>
                                <span className="">{item.CoachType}</span>
                              </li>
                            ))
                          : "None"
                      }
                    />
                    <CollapseButton
                      id="specialized"
                      title="Coach's Specialization"
                      content={
                        specialization.length > 0
                          ? specialization.map((item, i) => (
                              <li className="d-flex gap-2">
                                <span className="fw-semibold">
                                  {item.ACY_Code}
                                </span>
                                <span className="">-</span>
                                <span className="">{item.Course}</span>
                              </li>
                            ))
                          : "None"
                      }
                    />
                    <small>
                      <p className="text-secondary">
                        Date Created: {item.CCH_Created}
                      </p>
                    </small>
                  </section>
                </main>
              </main>
            ))}
          </>
        }
        extradata={
          <>
            <img
              className="h-100 w-100 rounded object-fit-cover"
              src={`http://localhost:8081/images/${data[0].Photo}`}
            ></img>
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
            "archive-existing-coach",
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
