import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import usePost from "../../../../hook/usePost";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateRoom() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
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

  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [program, setProgram] = useState([]);
  const [data, setData] = useState({
    Room: "",
    Capacity: "",
    Facility: "",
    Building: "",
    Floor: "",
  });
  const [validation, setValidation] = useState({
    Room: Base(data.Room),
    Capacity: Base(data.Capacity),
    Facility: Base(data.Facility),
    Building: Base(data.Building),
    Floor: Base(data.Floor),
  });

  const [dataChange] = useHandleChange(setData);
  const [ValidateCoach, ValidateDepartment, ValidateProgram, ValidateCourse] =
    useValidate();

  useEffect(() => {
    post("facility", facility, setFacility);
    post("building", building, setBuilding);
    post("room", room, setRoom);
    post("floor", floor, setFloor);
  }, []);

  useEffect(() => {
    // ValidateProgram(
    //   data.Room,
    //   data.Capacity,
    //   prg_dupe(),
    //   setValidation
    // );
  }, [data]);

  function rom_dupe() {
    if (program.length > 0) {
      for (var i = 0; i < program.length; i++) {
        if (program[i].PRG_Code === data.PRG_Code) {
          return false;
        }
      }
    }
    return true;
  }

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

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      Room: roomName,
    }));
  }, [roomName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (true) {
          post("add-new-room", data, setData);
          navigate(-1);
        }
      }}
    >
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
        content={
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
        additional={<></>}
      />
    </form>
  );
}
