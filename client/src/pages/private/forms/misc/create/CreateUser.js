import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function CreateUser() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [ValiAI, trueValiAIBool] = useValidation();
  const [roomName, setRoomName] = useState("");
  const [data, setData] = useState({
    SchoolID: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Type: "",
    PermissionLevel: "",
  });

  const [permLevel, setPermLevel] = useState([
    {
      type: "User",
      title: "User Student",
      level: 0,
    },
    {
      type: "User",
      title: "User Coach",
      level: 1,
    },
    {
      type: "Admin",
      title: "Admin-1",
      level: 0,
    },
    {
      type: "Admin",
      title: "Admin-2",
      level: 1,
    },
    {
      type: "Admin",
      title: "Admin-3",
      level: 2,
    },
    {
      type: "Manager",
      title: "Manager",
      level: 0,
    },
  ]);
  const [userType, setUserType] = useState(["Manager", "Admin", "User"]);

  const [dataChange] = useHandleChange(setData);
  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    data_get("room-list-raw", setRoom);
    data_get("facility-list", setFacility);
    data_get("building-list", setBuilding);
    data_get("floor-list", setFloor);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("user-insert", data, setData);
      showToast(
        info.icons.others.info,
        "User",
        `User ${data.SchoolID} is updated!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };
  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A User"}
        description={"This module creates a user"}
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
              label="SchoolID"
              id="SchoolID"
              trigger={dataChange}
              value={data.SchoolID}
              required={true}
            />
            <MainInput
              label="Firstname"
              id="Firstname"
              trigger={dataChange}
              value={data.Firstname}
              required={true}
            />
            <MainInput
              label="Lastname"
              id="Lastname"
              trigger={dataChange}
              value={data.Lastname}
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
              label="Type"
              id="Type"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={userType.map((option, i) => (
                      <>{option === data.Type ? option : ""}</>
                    ))}
                  />
                  {userType.map((option, i) =>
                    data.Type !== option ? (
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
                        ? option.type === data.Type || data.Type === null
                          ? option.title
                          : ""
                        : ""
                    )}
                  />
                  {permLevel.map((option, i) =>
                    data.PermissionLevel !== option.level ? (
                      option.type === data.Type || data.Type === "" ? (
                        <SelectButtonItem
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
    </form>
  );
}
