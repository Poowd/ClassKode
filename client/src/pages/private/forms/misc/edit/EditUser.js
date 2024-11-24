import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { useToasty } from "../../../../../hook/useToasty";
import useConfiguration from "../../../../../hook/useConfiguration";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { MainInput } from "../../../../../component/input/MainInput";
import useValidation from "../../../../../hook/useValidation";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function EditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();
  const [info] = useConfiguration();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [data, setData] = useState({
    UUID: null,
    SCHLID: null,
    FirstName: null,
    LastName: null,
    Email: null,
    Password: null,
    UserType: null,
    PermissionLevel: null,
  });

  const [permLevel, setPermLevel] = useState([
    {
      type: "User",
      title: "User Student",
      level: "0",
    },
    {
      type: "User",
      title: "User Coach",
      level: "1",
    },
    {
      type: "Admin",
      title: "Admin-1",
      level: "0",
    },
    {
      type: "Admin",
      title: "Admin-2",
      level: "1",
    },
    {
      type: "Admin",
      title: "Admin-3",
      level: "2",
    },
    {
      type: "Manager",
      title: "Manager",
      level: "0",
    },
  ]);
  const [userType, setUserType] = useState(["Manager", "Admin", "User"]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_post("user-target", { data: params.id }, setData);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("user-edit", data, setData);
      setTimeout(() => {
        recordLog(
          "Modified an User Entry",
          "User Module",
          `A user modified an entry with an ID ${data.SchoolID}`
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
        title={info.text.moduleText.user.edit}
        description={info.text.moduleText.user.editDescrition}
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
              label="SCHLID"
              id="SCHLID"
              trigger={dataChange}
              value={data.SCHLID}
              required={true}
            />
            <MainInput
              label="FirstName"
              id="FirstName"
              trigger={dataChange}
              value={data.FirstName}
              required={true}
            />
            <MainInput
              label="LastName"
              id="LastName"
              trigger={dataChange}
              value={data.LastName}
              required={true}
            />
            <MainInput
              label="Email"
              id="Email"
              trigger={dataChange}
              value={data.Email}
              required={true}
            />
            <MainSelect
              label="UserType"
              id="UserType"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={userType.map((option, i) => (
                      <>{option === data.UserType ? option : ""}</>
                    ))}
                  />
                  {userType.map((option, i) =>
                    data.UserType !== option ? (
                      <SelectButtonItem value={option} content={option} />
                    ) : (
                      ""
                    )
                  )}
                </>
              }
            />
            <MainSelect
              label="PermissionLevel"
              id="PermissionLevel"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={permLevel.map((option, i) =>
                      option.level === data.PermissionLevel
                        ? option.type === data.UserType ||
                          data.UserType === null
                          ? option.title
                          : ""
                        : ""
                    )}
                  />
                  {permLevel.map((option, i) =>
                    data.PermissionLevel != option.level ? (
                      option.type === data.UserType ||
                      data.UserType === null ? (
                        <SelectButtonItem
                          key={i}
                          value={option.level}
                          content={option.title}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  )}
                </>
              }
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
