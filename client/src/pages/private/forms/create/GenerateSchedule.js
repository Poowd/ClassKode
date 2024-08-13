import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PiGearSixFill } from "react-icons/pi";
import { MdArrowBackIosNew } from "react-icons/md";
import { ScheduleList } from "../../../../component/card/ScheduleList";
import { TbListDetails } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";
import { GrSchedules } from "react-icons/gr";

export function GenerateSchedule() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [convertMinutes] = useTimeFormat();

  const [sched, setSched] = useState([]);

  useEffect(() => {
    post("sel-sched", sched, setSched);
  }, [sched]);

  var classes = [];

  const [expected, setExpected] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);
  const [section, setSection] = useState([]);

  const [weekly, setWeekly] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [specialize, setSpecialize] = useState([]);
  const [ay, setAY] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  useEffect(() => {
    post("sel-exp-class", expected, setExpected);
    post("sel-rom", room, setRoom);
    post("sel-proj", section, setSection);
    post("sel-asgn", coach, setCoach);
    post("sel-coach-type", coachtype, setCoachType);
    post("sel-wke-evt", weekly, setWeekly);
    post("sel-cur-ay", ay, setAY);
    post("sel-spl-crs", specialize, setSpecialize);
  }, []);

  useEffect(() => {
    //schedule.splice(0, 1);
    console.log(schedule);
  }, [schedule]);

  function conflictChecker() {
    var st1 = 660;
    var et1 = 780;

    var test = [
      {
        st: 480,
        et: 660,
      },
      {
        st: 780,
        et: 840,
      },
    ];

    for (var i = 0; i < test.length; i++) {
      if (
        !(
          (st1 < test[i].st && et1 <= test[i].st) ||
          (st1 > test[i].st && et1 >= test[i].st && test[i].et <= st1)
        )
      ) {
        console.log("no conflict");
      } else {
        console.log("conflict");
      }
    }
  }

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
                  function={() => conflictChecker()}
                />

                <DefaultButton class="btn-primary px-2" icon={<FaFilter />} />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<FaRegSave />}
                  function={() => {
                    for (var i = 0; i < schedule.length; i++) {
                      console.log(schedule[i]);
                      post("ins-pre-sched", schedule[i], setSchedule);
                    }
                    navigate(-1);
                  }}
                />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Generate"
                  function={() => {
                    //setSchedule(expected);
                    post(
                      "gen-class",
                      {
                        classes: expected,
                        rooms: room,
                        coaches: coach,
                        sections: section,
                        coachtype: coachtype,
                        specialize: specialize,
                      },
                      setSchedule
                    );
                    console.log(schedule);
                  }}
                  disabled={sched.length > 0 ? true : false}
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          {schedule.length > 0
            ? schedule.map((sc, i) => (
                <ScheduleList
                  class={sc.CONFLICT === true ? "bg-warning" : "bg-white"}
                  key={i}
                  slot1={sc.SCT}
                  slot2={sc.CRS}
                  slot3={
                    sc.DAY +
                    " : " +
                    convertMinutes(sc.STR_TME) +
                    " - " +
                    convertMinutes(sc.END_TME)
                  }
                  slot4={sc.ROM + " " + sc.PPL + "/" + sc.CPC}
                  slot5={sc.CCH}
                  slot6={sc.CPT + " ( " + sc.UNT + " )"}
                  link={null}
                  state={null}
                  custom={null}
                />
              ))
            : "none"}
        </section>
      </main>
    </main>
  );
}
