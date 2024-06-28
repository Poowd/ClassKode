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
import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../component/button/LinkButton";

export function Schedule() {
  const navigate = useNavigate();
  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={<></>}
        control={
          <>
            <div className="w-100">
              <div className="w-100 d-flex gap-2 mb-2">
                <DefaultButton
                  class="btn-outline-primary"
                  icon={<PiGearSixFill />}
                  function={() => navigate(-1)}
                />

                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/utilities/schedule/room"}
                  text={"Room"}
                />
                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/utilities/schedule/section"}
                  text={"Coach"}
                />
                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/utilities/schedule/section"}
                  text={"Section"}
                />
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <DefaultInput placeholder="Search" />

                <Link to={"/institution/schedule/generate/0"}>
                  <DefaultButton
                    class="btn-outline-primary"
                    icon={<PiGearSixFill />}
                  />
                </Link>
                <Link to={"/institution/schedule/create/0"}>
                  <DefaultButton
                    class="btn-primary"
                    icon={<RiStickyNoteAddLine />}
                  />
                </Link>
              </div>
            </div>
          </>
        }
        list={<></>}
      />
    </>
  );
}
