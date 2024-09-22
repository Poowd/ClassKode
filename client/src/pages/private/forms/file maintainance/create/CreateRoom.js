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

export function CreateRoom() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [toasty, showToast] = useToasty();
  const [info] = useConfiguration();
  const [roomName, setRoomName] = useState("");
  const [data, setData] = useState({
    Room: "",
    Capacity: "",
    Facility: "",
    Building: "",
    Floor: "",
  });

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
  }, [room]);

  var temp = [];
  var roomList = [];
  var buildin = "";

  useEffect(() => {
    for (var f = 0; f < room.length; f++) {
      if (room[f].Building === data.Building && room[f].Floor === data.Floor) {
        temp.push(room[f].Room);
      }
    }

    for (var i = 0; i < floor.length; i++) {
      roomList.push(floor[i].Floor);
    }

    for (var i = 0; i < building.length; i++) {
      if (building[i].Building === data.Building) {
        buildin = building[i].Abbrev;
      }
    }

    setRoomName(
      roomList.indexOf(data.Floor) + 1 + "0" + (temp.length + 1) + "" + buildin
    );
  }, [data.Facility, data.Building, data.Floor]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      Room: roomName,
    }));
  }, [roomName]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("room-insert", data, setData);
      showToast(info.icons.calendar, "Room", `Room ${data.Room} is updated!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };
  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Create A Room"}
        description={"This module creates a room"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.back}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <MainSelect
              label="Building"
              id="Building"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={building.map((option, i) => (
                      <>
                        {option.Building === data.Building
                          ? option.Building
                          : ""}
                      </>
                    ))}
                  />
                  {building.map((option, i) => (
                    <>
                      {data.Building !== option.Building ? (
                        <SelectButtonItem
                          value={option.Building}
                          content={option.Building}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Floor"
              id="Floor"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={floor.map((option, i) => (
                      <>{option.Floor === data.Floor ? option.Floor : ""}</>
                    ))}
                  />
                  {floor.map((option, i) => (
                    <>
                      {data.Floor !== option.Floor ? (
                        <SelectButtonItem
                          value={option.Floor}
                          content={option.Floor}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainSelect
              label="Facility"
              id="Facility"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={facility.map((option, i) => (
                      <>
                        {option.Facility === data.Facility
                          ? option.Facility
                          : ""}
                      </>
                    ))}
                  />
                  {facility.map((option, i) => (
                    <>
                      {data.Facility !== option.Facility ? (
                        <SelectButtonItem
                          value={option.Facility}
                          content={option.Facility}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
            <MainInput
              label="Capacity"
              id="Capacity"
              trigger={dataChange}
              value={data.Capacity}
              required={true}
            />
            <MainInput
              label="Room"
              id="Room"
              trigger={dataChange}
              value={data.Room}
              required={false}
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
