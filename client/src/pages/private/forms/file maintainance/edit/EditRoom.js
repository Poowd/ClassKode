import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../../../component/input/FormInput";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../../hook/useHandleChange";
import useDatabase from "../../../../../hook/useDatabase";
import { MainInput } from "../../../../../component/input/MainInput";
import { MainSelect } from "../../../../../component/dropdown/select/MainSelect";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import useConfiguration from "../../../../../hook/useConfiguration";
import { useToasty } from "../../../../../hook/useToasty";
import useModal from "../../../../../hook/useModal";
import { useLogs } from "../../../../../hook/useLogs";
import { StatusModal } from "../../../../../component/modal/StatusModal";

export function EditRoom() {
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [data, setData] = useState({
    ROMID: null,
    Room: null,
    Capacity: null,
    Facility: null,
    Building: null,
    Floor: null,
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_post("room-target", { data: params.id }, setData);
    data_get("facility-list", setFacility);
    data_get("building-list", setBuilding);
    data_get("floor-list", setFloor);
  }, []);

  useEffect(() => {
    data[0] && data.map((item) => setData(item));
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (true) {
      data_post("room-edit", data, setData);
      setTimeout(() => {
        recordLog(
          "Modified an Room Entry",
          "Room Module",
          `A user modified an entry with an Room ${data.Room}`
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
        title={info.text.moduleText.room.edit}
        description={info.text.moduleText.room.editDescrition}
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
