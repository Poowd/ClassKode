import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import "./Map.css";
import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../component/button/LinkButton";
import { ScheduleList } from "../../../component/card/ScheduleList";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";

export function Schedule() {
  const navigate = useNavigate();
  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={<></>}
        control={
          <>
            <div className="w-100">
              <div className="d-flex gap-2 justify-content-end">
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
                  function={() => navigate(-1)}
                />
                <DefaultInput placeholder="Search" />
                <DefaultDropdown
                  class="border px-2 btn-primary"
                  reversed={true}
                  icon={<LuCalendarClock />}
                  text={"Load"}
                  dropdownitems={
                    <>
                      <DefaultDropdownItem
                        title={"Room"}
                        trigger={() => navigate("/utilities/schedule/room")}
                      />
                      <DefaultDropdownItem
                        title={"Coach"}
                        trigger={() => navigate("/utilities/schedule/section")}
                      />
                      <DefaultDropdownItem
                        title={"Section"}
                        trigger={() => navigate("/utilities/schedule/section")}
                      />
                    </>
                  }
                />
                <Link to={"/institution/schedule/generate/0"}>
                  <DefaultButton class="btn-primary" icon={<PiGearSixFill />} />
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
        list={
          <>
            <ScheduleList
              slot1={"Section"}
              slot2={"Course Code - Course"}
              slot3={"Day : Start Time - End Time"}
              slot4={"Room : 0 / 5"}
              slot5={"Coach"}
              slot6={"Lecture Type"}
              link={null}
              state={null}
              custom={null}
            />
          </>
        }
      />
    </>
  );
}
