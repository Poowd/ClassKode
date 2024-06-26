import React, { useEffect, useState } from "react";
import { UtilitiesTemplate } from "../../../layout/grid/UtilitiesTemplate";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import "./Map.css";
import STIMap1 from "../../../media/images/STI MAP 1.drawio.png";
import { Label } from "../../../component/map/Label";
import useDatabase from "../../../hook/useDatabase";
import { RoomSchedule } from "./schedule/RoomSchedule";
import { Link } from "react-router-dom";

export function Schedule() {
  return (
    <>
      <Link to={"/utilities/schedule/room"}>
        <button className="btn btn-outline-primary">Room Schedule</button>
      </Link>
      <Link to={"/utilities/schedule/room"}>
        <button className="btn btn-outline-primary">Coach Schedule</button>
      </Link>
      <Link to={"/utilities/schedule/section"}>
        <button className="btn btn-outline-primary">Section Schedule</button>
      </Link>
    </>
  );
}
