import React, { useEffect, useState } from "react";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import "../Map.css";
import STIMap1 from "../../../../media/images/STI MAP 1.drawio.png";
import STIMap2 from "../../../../media/images/STI MAP 2.drawio.png";
import STIMap3 from "../../../../media/images/STI MAP 3.drawio.png";
import { Label } from "../../../../component/map/Label";
import useDatabase from "../../../../hook/useDatabase";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SiLevelsdotfyi } from "react-icons/si";
import { NoDisplay } from "../../../../component/placeholder/NoDisplay";

export function SectionSchedule() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  return (
    <main className="h-100 overflow-y-auto">
      <main className="h-100">
        <main className="row h-100 m-0">
          <section className="col-lg-3 h-100 p-2">
            <main className="h-100 bg-white rounded shadow-sm p-2">
              <NoDisplay />
            </main>
          </section>
          <section className="col-lg-9 p-2 h-100">
            <main className="h-100 bg-white rounded shadow-sm p-2">
              <NoDisplay />
            </main>
          </section>
        </main>
      </main>
    </main>
  );
}
