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
import { ViewModal } from "../../../../component/modal/ViewModal";
import useConfiguration from "../../../../hook/useConfiguration";

export function GenerateSchedule() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();

  const SessionStorage = [
    JSON.parse(sessionStorage.getItem("semester_selector")),
  ];

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
    data_get("current-academic-year", setAY);
  }, [ay]);

  useEffect(() => {
    data_get("room-list", setRoom);
    data_get("project-list", setSection);
    data_get("assign-list", setCoach);
    data_get("coach-type-list", setCoachType);
    data_get("weekly-event-list", setWeekly);
    data_get("specialization-list", setSpecialize);
    data_post("expected-class-list", { data: ay.Code }, setExpected);
  }, [ay]);

  useEffect(() => {
    //schedule.splice(0, 1);
    //console.log(schedule);
  }, [schedule]);

  function conflictChecker() {
    var a = 1;
    var b = 10;

    var test = [
      {
        c: 11,
        d: 15,
      },
    ];

    for (var i = 0; i < test.length; i++) {
      if (
        (!(a < test[i].c && b < test[i].c) &&
          !(a > test[i].c && b > test[i].c)) ||
        (a > test[i].c && b < test[i].d)
      ) {
        return console.log(`conflict : ${test[i].c} - ${test[i].d}`);
      } else {
        return console.log(`no conflict : ${test[i].c} - ${test[i].d}`);
      }
    }
  }

  useEffect(() => {
    if (data.currentSemester === "") {
    } else {
      sessionStorage.setItem("semester_selector", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (SessionStorage[0] === null) {
    } else {
      setData(SessionStorage[0]);
    }
  }, []);

  // for (var i in schedule) {
  //   console.log(schedule[i]);
  //   data_post(
  //     "class-schedule-insert",
  //     schedule[i],
  //     setSchedule
  //   );
  // }
  //navigate(-1);

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in schedule) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}class-schedule-insert`,
              {
                method: "POST",
                body: JSON.stringify(schedule[i]),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      //showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

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
                <DefaultButton
                  class="btn-primary px-2"
                  reversed={false}
                  text={"Expected Classes"}
                  icon={<TbListDetails />}
                  function={() => {}}
                  toggle="modal"
                  target="#ExpectedClass"
                />
                <DefaultButton class="btn-primary px-2" icon={<FaFilter />} />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<FaRegSave />}
                  function={submitForm}
                />
                <DefaultButton
                  class="btn-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Generate"
                  function={() => {
                    //setSchedule(expected);
                    data_post(
                      "gen-class",
                      {
                        classes: expected,
                        rooms: room,
                        coaches: coach,
                        sections: section,
                        coachtype: coachtype,
                        specialize: specialize,
                        academicyear: ay,
                      },
                      setSchedule
                    );
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
                    <tr key={i}>
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
                : null}
            </tbody>
          </table>
        </section>
      </main>
      <ViewModal
        id={"ExpectedClass"}
        title={
          <h6 className="text-center text-black">List of Expected Classes</h6>
        }
        content={
          <main>
            <header className="py-2 px-3 border rounded mb-2">
              <section>
                <p className="p-0 m-0">{`Total Classes: ${expected.length}`}</p>
              </section>
            </header>
            <main>
              <ol className="list-group list-group-numbered">
                {expected.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.Section}</div>
                      {item.Course}
                    </div>
                    <span className="badge text-bg-primary rounded-pill">
                      {item.Population}
                    </span>
                  </li>
                ))}
              </ol>
            </main>
          </main>
        }
      />
    </main>
  );
}
