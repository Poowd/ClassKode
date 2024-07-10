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
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { TbStairs } from "react-icons/tb";
import { SiLevelsdotfyi } from "react-icons/si";
<<<<<<< Updated upstream
import { B1 } from "../map/B1";
import { B2 } from "../map/B2";
import { B3 } from "../map/B3";
import { A1 } from "../map/A1";
import { A2 } from "../map/A2";
import { A3 } from "../map/A3";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
=======
import { M1 } from "./M1";
>>>>>>> Stashed changes

export function RoomSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [placement, setPlacement] = useState([]);
  const [floor, setFloor] = useState([]);
  const [building, setBuilding] = useState([]);
  const [currfloor, setCurrentFloor] = useState("First Floor");
  const [currbuilding, setCurrentBuilding] = useState("Annex-A");
  const [floorstatus, setFloorStatus] = useState(true);

  useEffect(() => {
    post("placement", placement, setPlacement);
    post("floor", floor, setFloor);
    post("building", building, setBuilding);
  }, [placement]);

  return (
<<<<<<< Updated upstream
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-8 p-0 m-0">
        {currfloor === "First Floor" && currbuilding === "Annex-B" ? (
          <B1 />
        ) : currfloor === "Second Floor" && currbuilding === "Annex-B" ? (
          <B2 />
        ) : currfloor === "Third Floor" && currbuilding === "Annex-B" ? (
          <B3 />
        ) : currfloor === "First Floor" && currbuilding === "Annex-A" ? (
          <A1 />
        ) : currfloor === "Second Floor" && currbuilding === "Annex-A" ? (
          <A2 />
        ) : currfloor === "Third Floor" && currbuilding === "Annex-A" ? (
          <A3 />
        ) : null}
      </section>
      <section className="col-lg-4 p-0 ps-2 m-0">
        <main className="h-100 position-relative overflow-y-auto px-1">
          <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
            <div className="d-flex justify-content-between gap-2">
              <div>
                <DefaultButton
                  class=""
                  icon={<MdArrowBackIosNew />}
                  function={() => navigate(-1)}
                />
              </div>
              <div className="d-flex gap-2">
                <DefaultDropdown
                  class="border px-2 btn-primary"
                  reversed={true}
                  icon={<TbStairs />}
                  text={building.map((item, i) =>
                    item.Building === currbuilding ? item.Building : null
                  )}
                  dropdownitems={
                    <>
                      {building.map((option, i) =>
                        option.Building !== currbuilding ? (
                          <DefaultDropdownItem
                            title={option.Building}
                            trigger={() => setCurrentBuilding(option.Building)}
                          />
                        ) : null
                      )}
                    </>
                  }
                />
                <DefaultDropdown
                  class="border px-2 btn-primary"
                  reversed={true}
                  icon={<TbStairs />}
                  text={floor.map((item, i) =>
                    item.Floor === currfloor ? item.Floor : null
                  )}
                  dropdownitems={
                    <>
                      {floor.map((option, i) =>
                        option.Floor !== currfloor ? (
                          <DefaultDropdownItem
                            title={option.Floor}
                            trigger={() => setCurrentFloor(option.Floor)}
                          />
                        ) : null
                      )}
                    </>
                  }
                />
              </div>
            </div>
          </section>
          <section>test</section>
        </main>
      </section>
=======
    // <main className="h-100 row m-0 border p-2">
    //   <section className="col-lg-8 p-0 border">
    //     <M1 />
    //   </section>
    //   <section className="col-lg-4 p-0 border">a</section>
    // </main>
    <main className="h-100 position-relative">
      <nav className="position-absolute d-flex flex-column gap-2 bottom-0 z-3 bg-white p-1">
        <small>
          <h6 className="p-0 m-0">STI College Muñoz-EDSA</h6>
          <p className="p-0 m-0">{currfloor}</p>
        </small>
        <div className="d-flex gap-2">
          <DefaultButton
            class="btn-outline-secondary px-2"
            type="button"
            icon={<IoMdArrowRoundBack />}
            text="Back"
            function={() => navigate(-1)}
          />
          {floor.map((floor, i) => (
            <DefaultButton
              class="btn-primary px-2"
              type="button"
              icon={<SiLevelsdotfyi />}
              text={i + 1}
              function={() => setCurrentFloor(floor.Floor)}
            />
          ))}
          <DefaultButton
            class="btn-outline-primary"
            icon={<PiGearSixFill />}
            function={() => navigate(-1)}
          />
        </div>
      </nav>
      {/* <section className="position-absolute d-flex flex-column bottom-0 z-3 bg-white m-1 p-2 rounded">

      </section> */}
      <main className="h-100 overflow-none">
        <figure class="map h-100">
          {currfloor === "First Floor" ? (
            <img class="blueprint" src={STIMap1} alt="..." />
          ) : currfloor === "Second Floor" ? (
            <img class="blueprint" src={STIMap2} alt="..." />
          ) : currfloor === "Third Floor" ? (
            <img class="blueprint" src={STIMap3} alt="..." />
          ) : (
            () => setFloorStatus(false)
          )}

          {floorstatus === true ? (
            <main class="labels">
              <ul class="labels-list">
                {placement.length > 0
                  ? placement.map((slot, i) =>
                      slot.Floor === currfloor ? (
                        <Label
                          class={
                            slot.Room === null
                              ? "text-secondary " + slot.PLC_Code
                              : " " + slot.PLC_Code
                          }
                          header={slot.Room === null ? "Empty" : slot.Room}
                          content="Available"
                          capacity={slot.Room === null ? "0" : slot.Capacity}
                          trigger={() =>
                            alert(
                              slot.Building +
                                " - " +
                                slot.Floor +
                                " - " +
                                slot.Room
                            )
                          }
                        />
                      ) : null
                    )
                  : ""}
              </ul>
            </main>
          ) : null}
        </figure>
      </main>
>>>>>>> Stashed changes
    </main>
    // <main className="h-100 position-relative">
    //   <nav className="position-absolute d-flex flex-column gap-2 bottom-0 z-3 bg-white p-1">
    //     <small>
    //       <h6 className="p-0 m-0">STI College Muñoz-EDSA</h6>
    //       <p className="p-0 m-0">{currfloor}</p>
    //     </small>
    //     <div className="d-flex gap-2">
    //       <DefaultButton
    //         class="btn-outline-secondary px-2"
    //         type="button"
    //         icon={<IoMdArrowRoundBack />}
    //         text="Back"
    //         function={() => navigate(-1)}
    //       />
    //       {floor.map((floor, i) => (
    //         <DefaultButton
    //           class="btn-primary px-2"
    //           type="button"
    //           icon={<SiLevelsdotfyi />}
    //           text={i + 1}
    //           function={() => setCurrentFloor(floor.Floor)}
    //         />
    //       ))}
    //       <DefaultButton
    //         class="btn-outline-primary"
    //         icon={<PiGearSixFill />}
    //         function={() => navigate(-1)}
    //       />
    //     </div>
    //   </nav>
    //   {/* <section className="position-absolute d-flex flex-column bottom-0 z-3 bg-white m-1 p-2 rounded">

    //   </section> */}
    //   <main className="h-100 overflow-none">
    //     <figure class="map h-100">
    //       {currfloor === "First Floor" ? (
    //         <img class="blueprint" src={STIMap1} alt="..." />
    //       ) : currfloor === "Second Floor" ? (
    //         <img class="blueprint" src={STIMap2} alt="..." />
    //       ) : currfloor === "Third Floor" ? (
    //         <img class="blueprint" src={STIMap3} alt="..." />
    //       ) : (
    //         () => setFloorStatus(false)
    //       )}

    //       {floorstatus === true ? (
    //         <main class="labels">
    //           <ul class="labels-list">
    //             {placement.length > 0
    //               ? placement.map((slot, i) =>
    //                   slot.Floor === currfloor ? (
    //                     <Label
    //                       class={
    //                         slot.Room === null
    //                           ? "text-secondary " + slot.PLC_Code
    //                           : " " + slot.PLC_Code
    //                       }
    //                       header={slot.Room === null ? "Empty" : slot.Room}
    //                       content="Available"
    //                       capacity={slot.Room === null ? "0" : slot.Capacity}
    //                       trigger={() =>
    //                         alert(
    //                           slot.Building +
    //                             " - " +
    //                             slot.Floor +
    //                             " - " +
    //                             slot.Room
    //                         )
    //                       }
    //                     />
    //                   ) : null
    //                 )
    //               : ""}
    //           </ul>
    //         </main>
    //       ) : null}
    //     </figure>
    //   </main>
    // </main>
  );
}
