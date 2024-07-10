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

export function M1() {
  return (
    <main className="h-100 w-100 row m-0 p-2">
      <section className="h-25 row m-0 p-0">
        <main className="h-100 row m-0 p-1">
          <section className="col-4 p-0 m-0"></section>
          <section className="col-8 p-0 m-0">
            <div className="h-75 row m-0 p-0">
              <section className="col-3 p-0 m-0 border">
                <div className="h-100 row p-0 m-0">
                  <section className="col-8 p-0 m-0 border">clinic</section>
                  <section className="col-4 p-0 m-0 border">storage</section>
                </div>
              </section>
              <section className="col-3 p-0 m-0 border">107</section>
              <section className="col-3 p-0 m-0 border">106</section>
              <section className="col-3 p-0 m-0 border">105</section>
            </div>
            <div className="h-25 row m-0 p-0 ">
              <section className="col-10 p-0 m-0 border"></section>
              <section className="col-2 p-0 m-0 border">storage</section>
            </div>
          </section>
        </main>
      </section>
      <section className="h-50 row m-0 p-0">
        <main className="h-100 row m-0 p-1">
          <section className="col-10 p-0 m-0 border">court</section>
          <section className="col-2 p-0 m-0 ">
            <div className="h-100 w-100 row m-0 p-0">
              <div className="h-100 w-25 p-0 m-0 "></div>
              <div className="h-100 w-75 p-0 m-0 ">
                <div className="h-100 row p-0 m-0">
                  <div className="h-75 p-0 m-0 ">
                    <div className="h-75 p-0 m-0">
                      <div className="h-50 p-0 m-0 border">104</div>
                      <div className="h-50 p-0 m-0 border">103</div>
                    </div>
                    <div className="h-25 p-0 m-0 border">stair</div>
                  </div>
                  <div className="h-25 p-0 m-0"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
      <section className="h-25 row m-0 p-0">
        <main className="h-100 row m-0 p-1">
          <section className="col-2 p-0 m-0"></section>
          <section className="col-10 p-0 m-0">
            <div className="h-100 row p-0 m-0">
              <div className="h-25 row p-0 m-0"></div>
              <div className="h-75 row p-0 m-0">
                <div className="col-2 p-0 m-0 border">cr</div>
                <div className="col-3 p-0 m-0 border">102</div>
                <div className="col-3 p-0 m-0 border">101</div>
                <div className="col-4 p-0 m-0 border">
                  <div className="h-100 row p-0 m-0">
                    <div className="col-8 p-0 m-0 border">drawlab</div>
                    <div className="col-4 p-0 m-0 border">stairs</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    </main>
  );
}
