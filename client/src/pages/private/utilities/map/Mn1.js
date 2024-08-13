import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PlotButton } from "../../../../component/button/PlotButton";
import { PassiveModal } from "../../../../component/modal/PassiveModal";
import useModal from "../../../../hook/useModal";
import useTimeFormat from "../../../../hook/useTimeFormat";
import useDatabase from "../../../../hook/useDatabase";
import { ViewModal } from "../../../../component/modal/ViewModal";
import { MdArrowBackIosNew } from "react-icons/md";
import { RoomCard } from "../../../../component/card/RoomCard";

export function Mn1() {
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [schedule, setSchedule] = useState([]);
  const [placement, setPlacement] = useState([]);
  const [convertMinutes] = useTimeFormat();
  useEffect(() => {
    post("sel-sched", schedule, setSchedule);
    post("sel-place", placement, setPlacement);
  }, []);
  return (
    <div className="h-100 row m-0 p-0 border rounded p-1">
      <div className="col-3 m-0 p-0"></div>
      <div className="col-6 m-0 p-0">
        <div className="h-25 p-1"></div>
        <div className="h-50 row m-0 p-1">
          <div className="col-6 h-100 m-0 p-0">
            <div className="h-100 p-1">
              <div className="h-100 border rounded p-1"></div>
            </div>
          </div>
          <div className="col-6 h-100 m-0 p-0">
            <div className="h-100 p-1">
              <div className="h-100 border rounded p-1"></div>
            </div>
          </div>
        </div>
        <div className="h-25 p-1"></div>
      </div>
      <div className="col-3 m-0 p-0"></div>
      <ViewModal
        id={"Modal"}
        title={modalcontent.Title}
        content={<>{modalcontent.Content}</>}
      />
    </div>
  );
}
