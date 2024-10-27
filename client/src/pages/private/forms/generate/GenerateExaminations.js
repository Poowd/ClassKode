import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import useDatabase from "../../../../hook/useDatabase";
import useTimeFormat from "../../../../hook/useTimeFormat";
import useConfiguration from "../../../../hook/useConfiguration";

export function GenerateExaminations() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [convertMinutes] = useTimeFormat();
  const [info] = useConfiguration();

  const [schedule, setSchedule] = useState([]);
  const [examSchedule, setExamSchedule] = useState([]);
  const [room, setRooms] = useState([]);
  const [ay, setAY] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  const times = [420, 510, 600, 690, 780, 870, 960, 1050, 1140];

  useEffect(() => {
    data_get("current-academic-year", setAY);
    data_get("class-schedule-list", setSchedule);
    data_get("room-list", setRooms);
  }, []);

  const [availRoom, setAvailRoom] = useState([]);

  useEffect(() => {
    setAvailRoom([]);
    room.forEach((rom) => {
      if (rom.Facility.includes("Lecture")) {
        setAvailRoom((prev) => [...prev, { Room: rom.Room, Exams: [] }]);
      }
    });
  }, [room]);

  const [tertiary, setTertiary] = useState([]);
  const [noDuplicateTertiary, setNoDuplicateTeriary] = useState(null);
  const [shs, setSHS] = useState([]);

  useEffect(() => {
    setTertiary([]);
    setSHS([]);
    schedule.forEach((schedule) => {
      if (schedule.AcademicLevel === "Tertiary") {
        setTertiary((prev) => [...prev, schedule]);
      } else {
        setSHS((prev) => [...prev, schedule]);
      }
    });
  }, [schedule]);

  const removeDuplicates = (data) => {
    const uniqueEntries = new Map();
    data.forEach((entry) => {
      const key = `${entry.Course}-${entry.Section}`;

      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, entry);
      }
    });

    return Array.from(uniqueEntries.values());
  };

  useEffect(() => {
    setNoDuplicateTeriary(removeDuplicates(tertiary));
  }, [tertiary]);

  return (
    <>
      <main className="h-100">
        <section className="h-25">
          <main className="h-100 bg-warning p-3">
            <DefaultButton
              class="px-2 btn-primary"
              icon={info.icons.navigation.back}
              text="Back"
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-primary px-2"
              text="Generate Tertiary"
              function={() => {
                data_post(
                  "gen-exam-ter",
                  {
                    schedule: removeDuplicates(schedule),
                    room: room,
                  },
                  setExamSchedule
                );
                console.log(examSchedule);
              }}
            />
            <DefaultButton
              class="btn-primary px-2"
              text="Generate SHS"
              function={() => {
                data_post(
                  "gen-exam-shs",
                  {
                    schedule: removeDuplicates(schedule),
                    room: room,
                  },
                  setExamSchedule
                );
                console.log(examSchedule);
              }}
            />
          </main>
        </section>
        <section className="h-75">
          <main className="h-100 row m-0 p-0">
            <section className="col-lg-4 h-100 p-2">
              <main className="h-50 p-1">
                <main className="h-100  bg-white rounded shadow-sm p-2">
                  <section className="h-100 overflow-y-auto">
                    {tertiary.map((schedule, o) => (
                      <div
                        key={o}
                        className={`bg-white rounded shadow-sm p-2 mb-2`}
                      >
                        <p className="m-0">{schedule.Code}</p>
                        <p className="m-0">{schedule.Course}</p>
                        <p className="m-0">{schedule.Component}</p>
                      </div>
                    ))}
                  </section>
                </main>
              </main>
              <main className="h-50 p-1">
                <main className="h-100  bg-white rounded shadow-sm p-2">
                  <section className="h-100 overflow-y-auto">
                    {shs.map((schedule, o) => (
                      <div
                        key={o}
                        className="bg-white rounded shadow-sm p-2 mb-2"
                      >
                        <p className="m-0">{schedule.Code}</p>
                        <p className="m-0">{schedule.Course}</p>
                        <p className="m-0">{schedule.Component}</p>
                      </div>
                    ))}
                  </section>
                </main>
              </main>
            </section>
            <section className="col-lg-8">
              <section>
                {examSchedule.length > 0
                  ? examSchedule.map((item, i) => (
                      <main className="mb-3 mt-3">
                        {item.Exams.map((tip, i) => (
                          <section className="w-100 bg-white rounded shadow-sm p-2 mb-2">
                            {`${item.Room} - ${tip.Code} - ${convertMinutes(
                              times[i]
                            )} : ${convertMinutes(times[i] + 90)}`}
                          </section>
                        ))}
                      </main>
                    ))
                  : null}
              </section>
            </section>
          </main>
        </section>
      </main>
    </>
  );
}
