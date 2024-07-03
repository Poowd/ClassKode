import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PiGearSixFill } from "react-icons/pi";
import { MdArrowBackIosNew } from "react-icons/md";
import { ScheduleList } from "../../../../component/card/ScheduleList";
import { TbListDetails } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";

export function GenerateSchedule() {
  const navigate = useNavigate();
  return (
    <main>
      <main className="h-100 position-relative overflow-y-auto px-1">
        <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
          <div className="d-flex justify-content-end gap-2">
            <div className="w-100 d-flex justify-content-between">
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
                  function={() => navigate(-1)}
                />
              </div>
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<TbListDetails />}
                />
                <DefaultButton class="btn-primary px-2" icon={<FaFilter />} />
                <DefaultButton class="btn-primary px-2" icon={<FaRegSave />} />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Generate"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
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
        </section>
      </main>
    </main>
  );
}
