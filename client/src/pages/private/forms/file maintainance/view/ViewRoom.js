import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../../component/input/FormInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DefaultButton } from "../../../../../component/button/DefaultButton";
import { DataControlView } from "../../../../../component/datacontrolview/DataControlView";
import { DataControlViewItem } from "../../../../../component/datacontrolview/DataControlViewItem";
import { LuFileEdit } from "react-icons/lu";
import { LuFolderArchive } from "react-icons/lu";
import { LinkButton } from "../../../../../component/button/LinkButton";
import useModal from "../../../../../hook/useModal";
import { PassiveModal } from "../../../../../component/modal/PassiveModal";
import useHandleChange from "../../../../../hook/useHandleChange";
import useValidation from "../../../../../hook/useValidation";
import useArchiveEntry from "../../../../../hook/useArchiveEntry";
import useDatabase from "../../../../../hook/useDatabase";
import { DataViewerTemplate } from "../../../../../layout/grid/DataViewerTemplate";
import { CollapseButton } from "../../../../../component/button/CollapsButton";
import { NoDisplay } from "../../../../../component/placeholder/NoDisplay";
import useConfiguration from "../../../../../hook/useConfiguration";
import { useToasty } from "../../../../../hook/useToasty";
import { DefaultToast } from "../../../../../component/toast/DefaultToast";
import { useRoomUsage } from "../../../../../hook/useRoomUsage";
import { ProgressBar } from "../../../../../component/progressbar/ProgressBar";

export function ViewRoom() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [getRoomUsage, getRoomUsageWeek] = useRoomUsage();
  const [get, post, data_get, data_post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [ArchiveEntry] = useArchiveEntry();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [data, setData] = useState([]);
  const [roomusage, setRoomUsage] = useState([]);
  const [roomMonday, setRoomMonday] = useState([]);
  const [roomTuesday, setRoomTuesday] = useState([]);
  const [roomWednesday, setRoomWednesday] = useState([]);
  const [roomThursday, setRoomThursday] = useState([]);
  const [roomFriday, setRoomFriday] = useState([]);
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState({
    Confirm: "",
  });
  const [dataChange] = useHandleChange(setConfirmCode);

  useEffect(() => {
    data_get("random-code-generator", setCode);
    data_post("room-target", { data: params.id }, setData);
    data_post("room-units", { data: params.id }, setRoomUsage);
    data_post(
      "room-units-day",
      { room: params.id, day: "Monday" },
      setRoomMonday
    );
    data_post(
      "room-units-day",
      { room: params.id, day: "Tuesday" },
      setRoomTuesday
    );
    data_post(
      "room-units-day",
      { room: params.id, day: "Wednesday" },
      setRoomWednesday
    );
    data_post(
      "room-units-day",
      { room: params.id, day: "Thursday" },
      setRoomThursday
    );
    data_post(
      "room-units-day",
      { room: params.id, day: "Friday" },
      setRoomFriday
    );
  }, []);

  const archiveEntry = (e) => {
    e.preventDefault();
    if (code === confirmCode.Confirm) {
      data_post("room-archive", { data: params.id }, setData);
      showToast(
        info.icons.others.info,
        "Room",
        `Room ${data[0].Room} is set to archive!`
      );
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    } else {
      showModal(
        "Modal",
        "Archive Entry",
        <p>
          <span>Type the code </span>
          <span className="fw-bold text-black">{code}</span>
          <span> to archive </span>
          <span className="fw-bold text-black">{data[0].Room}</span>
        </p>
      );
    }
  };

  return (
    <>
      <DataViewerTemplate
        title={"View A Room"}
        description={"This module views a room"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <LinkButton
              class="warning-color px-2"
              icon={info.icons.forms.edit}
              to={`/room/edit/${params.id}`}
              state={{ data: data }}
              text={"Edit"}
            />
            <DefaultButton
              class="danger-color px-2"
              icon={info.icons.forms.archive}
              function={() =>
                showModal(
                  "Modal",
                  "Archive Entry",
                  <p>
                    <span>Type the code </span>
                    <span className="fw-bold text-black">{code}</span>
                    <span> to archive </span>
                    <span className="fw-bold text-black">{data[0].Room}</span>
                  </p>
                )
              }
              text={"Archive"}
            />
          </>
        }
        extradata={<main className="h-100"></main>}
        content={
          <>
            {data &&
              data.map((item, i) => (
                <main key={i} className="px-0 py-3 m-0">
                  <header>
                    <h1 className="fw-bold primary-text pb-2">
                      {item.Room} <span>({item.Capacity})</span>
                    </h1>
                    <hr />
                  </header>
                  <main className="p-3">
                    <section>
                      <h6>{item.Facility}</h6>
                      <h6>
                        {item.Building} - {item.Floor}
                      </h6>
                      <main>
                        <main className="w-100 bg-white rounded shadow-sm p-2 mb-3">
                          <section className="d-flex justify-content-between align-items-center">
                            <h6 className="m-0">Total Room Usage</h6>
                            <h3
                              className={`m-0 ${
                                getRoomUsageWeek(roomusage.sum) >= 60
                                  ? "text-success"
                                  : getRoomUsageWeek(roomusage.sum) < 60 &&
                                    getRoomUsageWeek(roomusage.sum) >= 40
                                  ? "text-warning"
                                  : "text-danger"
                              }`}
                            >
                              {`${getRoomUsageWeek(roomusage.sum)}%`}
                            </h3>
                          </section>

                          <section className="mt-2">
                            <main>
                              <ProgressBar
                                state={
                                  getRoomUsageWeek(roomusage.sum) >= 60
                                    ? "success"
                                    : getRoomUsageWeek(roomusage.sum) < 60 &&
                                      getRoomUsageWeek(roomusage.sum) >= 40
                                    ? "warning"
                                    : "danger"
                                }
                                progress={getRoomUsageWeek(roomusage.sum)}
                              />
                            </main>
                          </section>
                        </main>
                        <main className="row m-0 p-2 row-cols-5 bg-white rounded shadow-sm">
                          <section className="col p-1">
                            <main className="bg-white rounded shadow-sm p-2 text-center">
                              <h6>Monday</h6>
                              <p
                                className={`m-0 ${
                                  getRoomUsage(roomMonday.sum) >= 60
                                    ? "text-success"
                                    : getRoomUsage(roomMonday.sum) < 60 &&
                                      getRoomUsage(roomMonday.sum) >= 40
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {roomMonday.sum !== null
                                  ? `${getRoomUsage(roomMonday.sum)}%`
                                  : 0}
                              </p>
                            </main>
                          </section>
                          <section className="col p-1">
                            <main className="bg-white rounded shadow-sm p-2 text-center">
                              <h6>Tuesday</h6>
                              <p
                                className={`m-0 ${
                                  getRoomUsage(roomTuesday.sum) >= 60
                                    ? "text-success"
                                    : getRoomUsage(roomTuesday.sum) < 60 &&
                                      getRoomUsage(roomTuesday.sum) >= 40
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {roomTuesday.sum !== null
                                  ? `${getRoomUsage(roomTuesday.sum)}%`
                                  : 0}
                              </p>
                            </main>
                          </section>
                          <section className="col p-1">
                            <main className="bg-white rounded shadow-sm p-2 text-center">
                              <h6>Wednesday</h6>
                              <p
                                className={`m-0 ${
                                  getRoomUsage(roomWednesday.sum) >= 60
                                    ? "text-success"
                                    : getRoomUsage(roomWednesday.sum) < 60 &&
                                      getRoomUsage(roomWednesday.sum) >= 40
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {roomWednesday.sum !== null
                                  ? `${getRoomUsage(roomWednesday.sum)}%`
                                  : 0}
                              </p>
                            </main>
                          </section>
                          <section className="col p-1">
                            <main className="bg-white rounded shadow-sm p-2 text-center">
                              <h6>Thursday</h6>
                              <p
                                className={`m-0 ${
                                  getRoomUsage(roomThursday.sum) >= 60
                                    ? "text-success"
                                    : getRoomUsage(roomThursday.sum) < 60 &&
                                      getRoomUsage(roomThursday.sum) >= 40
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {roomThursday.sum !== null
                                  ? `${getRoomUsage(roomThursday.sum)}%`
                                  : 0}
                              </p>
                            </main>
                          </section>
                          <section className="col p-1">
                            <main className="bg-white rounded shadow-sm p-2 text-center">
                              <h6>Friday</h6>
                              <p
                                className={`m-0 ${
                                  getRoomUsage(roomFriday.sum) >= 60
                                    ? "text-success"
                                    : getRoomUsage(roomFriday.sum) < 60 &&
                                      getRoomUsage(roomFriday.sum) >= 40
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {roomFriday.sum !== null
                                  ? `${getRoomUsage(roomFriday.sum)}%`
                                  : 0}
                              </p>
                            </main>
                          </section>
                        </main>
                      </main>
                      <footer className="mt-5">
                        <small>
                          <p className="text-secondary">
                            Date Created: {item.Created}
                          </p>
                        </small>
                      </footer>
                    </section>
                  </main>
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
              trigger={dataChange}
              value={confirmCode.Confirm}
              required={true}
            />
          </>
        }
        trigger={archiveEntry}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </>
  );
}
