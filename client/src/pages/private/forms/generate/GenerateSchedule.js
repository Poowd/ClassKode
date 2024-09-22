import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { PiGearSixFill } from "react-icons/pi";
import { MdArrowBackIosNew } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";

export function GenerateSchedule() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [convertMinutes] = useTimeFormat();

  const LocalStorage = [JSON.parse(localStorage.getItem("semester_selector"))];

  const [sched, setSched] = useState([]);

  useEffect(() => {
    data_post("sel-sched", sched, setSched);
  }, [sched]);

  var classes = [];

  const [expected, setExpected] = useState([]);
  const [room, setRoom] = useState([]);
  const [coach, setCoach] = useState([]);
  const [section, setSection] = useState([]);
  const [data, setData] = useState({
    currentSemester: "",
  });

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
    data_post("sel-exp-class", expected, setExpected);
    data_post("sel-rom", room, setRoom);
    data_post("sel-proj", section, setSection);
    data_post("sel-asgn", coach, setCoach);
    data_post("sel-coach-type", coachtype, setCoachType);
    data_post("sel-wke-evt", weekly, setWeekly);
    data_post("sel-cur-ay", ay, setAY);
    data_post("sel-spl-crs", specialize, setSpecialize);
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

  useEffect(() => {
    if (data.currentSemester === "") {
    } else {
      localStorage.setItem("semester_selector", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (LocalStorage[0] === null) {
    } else {
      setData(LocalStorage[0]);
    }
  }, []);

  return (
    <main>
      <main className="h-100 position-relative overflow-y-auto px-1">
        <header>
          <h3 className="m-0 p-0">Generate Schedule</h3>
          <p className="m-0 p-0 text-secondary">
            Please Generate me a new Schedule
          </p>
          <hr className="p-0 mx-0 my-2" />
        </header>
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
                      data_post("ins-pre-sched", schedule[i], setSchedule);
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
                  // disabled={sched.length > 0 ? true : false}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="table-responsive">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th className="p-3">Course Code</th>
                <th className="text-start p-3">Course</th>
                <th className="p-3">Section</th>
                <th className="p-3">Course Level</th>
                <th className="p-3">Day</th>
                <th className="p-3">Time</th>
                <th className="p-3">Room</th>
                <th className="p-3">Component</th>
                <th className="p-3">Coach</th>
                <th className="p-3">Population</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length > 0
                ? schedule.map((sc, i) => (
                    // <ScheduleList
                    //   class={sc.CONFLICT === true ? "bg-warning" : "bg-white"}
                    //   key={i}
                    //   slot1={sc.SCT}
                    //   slot2={sc.CRS}
                    //   slot3={
                    //     sc.DAY +
                    //     " : " +
                    //     convertMinutes(sc.STR_TME) +
                    //     " - " +
                    //     convertMinutes(sc.END_TME)
                    //   }
                    //   slot4={sc.ROM + " " + sc.PPL + "/" + sc.CPC}
                    //   slot5={sc.CCH}
                    //   slot6={sc.CPT + " ( " + sc.UNT + " )"}
                    //   link={null}
                    //   state={null}
                    //   custom={null}
                    // />
                    <tr>
                      <td className="py-3">{sc.CRS_CODE}</td>
                      <td className="text-start py-3">{sc.CRS}</td>
                      <td className="py-3">{sc.SCT}</td>
                      <td className="py-3">{sc.YRLVL}</td>
                      <td className="py-3">{sc.DAY}</td>
                      <td className="py-3">
                        {`${convertMinutes(sc.STR_TME)} - ${convertMinutes(
                          sc.END_TME
                        )}`}
                      </td>
                      <td className="py-3">{sc.ROM}</td>
                      <td className="py-3">{sc.CPT}</td>
                      <td className="py-3">{sc.CCH}</td>
                      <td className="py-3">{`${sc.PPL} out of ${sc.CPC}`}</td>
                    </tr>
                  ))
                : "none"}
            </tbody>
          </table>
        </section>
      </main>
    </main>
  );
}
