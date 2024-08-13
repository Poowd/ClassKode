import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function EditRoom() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [program, setProgram] = useState([]);
  const [data, setData] = useState({
    ROMID: state.data[0].ROMID,
    Room: state.data[0].Room,
    Capacity: state.data[0].Capacity,
    Facility: state.data[0].Facility,
    Building: state.data[0].Building,
    Floor: state.data[0].Floor,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("sel-fac", facility, setFacility);
    post("sel-buil", building, setBuilding);
    post("sel-flor", floor, setFloor);
    post("sel-rom", room, setRoom);
  }, []);

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
        buildin = building[i].BLG_Short;
      }
    }

    setRoomName(
      roomList.indexOf(data.Floor) + 1 + "0" + (temp.length + 1) + "" + buildin
    );
  }, [data.Facility, data.Building, data.Floor]);

  // useEffect(() => {
  //   setData((prev) => ({
  //     ...prev,
  //     Room: roomName,
  //   }));
  // }, [roomName]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      post("upd-room", data, setData);
      navigate(-1);
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
              icon={<IoMdArrowRoundBack />}
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
            <SelectButton
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

            <SelectButton
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

            <SelectButton
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

            <FormInput
              label="Capacity"
              id="Capacity"
              trigger={dataChange}
              value={data.Capacity}
              required={true}
            />

            <FormInput
              label="Room"
              id="Room"
              trigger={dataChange}
              value={data.Room}
              required={false}
            />
          </>
        }
        entry={
          <main className="p-3">
            <section>
              <h6>{data.Facility.length > 0 ? data.Facility : "Facility"}</h6>
              <h3>
                {data.Room.length > 0 ? data.Room : "Room"}{" "}
                <span>
                  (
                  {data.Capacity.length > 0
                    ? `${data.Capacity} Students`
                    : "0 Students"}
                  )
                </span>
              </h3>
              <hr />
              <main className="row m-0 p-0 mt-3 mb-2">
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Building:{" "}
                    {data.Building.length > 0 ? data.Building : "Building"}
                  </p>
                </section>
                <section className="col m-0 p-0">
                  <p className="m-0 p-0">
                    Floor: {data.Floor.length > 0 ? data.Floor : "Floor"}
                  </p>
                </section>
              </main>
            </section>
          </main>
        }
      />
    </form>
  );
}
