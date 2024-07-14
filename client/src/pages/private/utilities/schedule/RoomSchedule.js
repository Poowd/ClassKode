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
import { B1 } from "../map/B1";
import { B2 } from "../map/B2";
import { B3 } from "../map/B3";
import { A1 } from "../map/A1";
import { A2 } from "../map/A2";
import { A3 } from "../map/A3";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { ScheduleList } from "../../../../component/card/ScheduleList";
import useTimeFormat from "../../../../hook/useTimeFormat";

export function RoomSchedule() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [placement, setPlacement] = useState([]);
  const [floor, setFloor] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floorstatus, setFloorStatus] = useState(true);
  const [location, setLocation] = useState([
    { Floor: "First Floor", Building: "Main", Map: <B1 /> },
    { Floor: "Second Floor", Building: "Main", Map: <B1 /> },
    { Floor: "Third Floor", Building: "Main", Map: <B1 /> },
    { Floor: "First Floor", Building: "Annex-A", Map: <A1 /> },
    { Floor: "Second Floor", Building: "Annex-A", Map: <A2 /> },
    { Floor: "Third Floor", Building: "Annex-A", Map: <A3 /> },
    { Floor: "First Floor", Building: "Annex-B", Map: <B1 /> },
    { Floor: "Second Floor", Building: "Annex-B", Map: <B2 /> },
    { Floor: "Third Floor", Building: "Annex-B", Map: <B3 /> },
  ]);

  const [currfloor, setCurrentFloor] = useState(location[0].Floor);
  const [currbuilding, setCurrentBuilding] = useState(location[0].Building);
  useEffect(() => {
    post("placement", placement, setPlacement);
    post("floor", floor, setFloor);
    post("building", building, setBuilding);
  }, []);

  useEffect(() => {
    post("schedules", schedule, setSchedule);
  }, []);

  function previousLocation() {
    for (var i = 0; i < location.length; i++) {
      if (
        location[i].Building === currbuilding &&
        location[i].Floor === currfloor
      ) {
        if (i - 1 >= 0) {
          setCurrentBuilding(location[i - 1].Building);
          setCurrentFloor(location[i - 1].Floor);
        }
      }
    }
  }
  function nextLocation() {
    for (var i = 0; i < location.length; i++) {
      if (
        location[i].Building === currbuilding &&
        location[i].Floor === currfloor
      ) {
        if (i + 1 < location.length) {
          setCurrentBuilding(location[i + 1].Building);
          setCurrentFloor(location[i + 1].Floor);
        }
      }
    }
  }

  return (
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-8 h-100 p-0 m-0 pe-2">
        <main className="h-100 w-100 d-flex align-items-center">
          <main>
            <DefaultButton
              class=""
              icon={<MdArrowBackIosNew />}
              function={() => {
                previousLocation();
              }}
            />
          </main>
          <main className="h-100 flex-fill">
            {location.map((location, i) =>
              location.Floor === currfloor && location.Building === currbuilding
                ? location.Map
                : null
            )}
          </main>
          <main>
            <DefaultButton
              class=""
              icon={<MdArrowBackIosNew />}
              function={() => {
                nextLocation();
              }}
            />
          </main>
        </main>
      </section>
      <section className="col-lg-4 h-100 p-0 ps-2 m-0 border-start">
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
          <section>
            {schedule.map((sc, i) =>
              sc.Building === currbuilding && sc.Floor === currfloor ? (
                <>
                  <main className="p-3 shadow-sm rounded mb-2">
                    <main className="row m-0 p-0">
                      <section className="col-3 p-0 m-0">
                        <section>
                          <h6 className="p-0 m-0">
                            {sc.Room === null ? "Court" : sc.Room}
                          </h6>
                        </section>
                      </section>
                      <section className="col-9 p-0 m-0">
                        <section>
                          <h6 className="p-0 m-0">
                            {sc.Section === null ? sc.CRS_Code : sc.Course}
                          </h6>
                        </section>
                        <section>
                          <small>
                            <p className="p-0 m-0 text-secondary fst-italic">
                              <span>
                                {" "}
                                {sc.Day +
                                  " " +
                                  convertMinutes(sc.StartTime) +
                                  " - " +
                                  convertMinutes(sc.EndTime)}
                              </span>
                            </p>
                          </small>
                        </section>
                      </section>
                    </main>
                  </main>
                </>
              ) : null
            )}
          </section>
        </main>
      </section>
    </main>
  );
}
