import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";
import { CollapseButton } from "../../../component/button/CollapsButton";

export function RoomAvailability() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();

  const [search, setSearch] = useState({
    Search: "",
  });

  const [dataChange] = useHandleChange(setSearch);
  const [schedule, setSchedule] = useState([]);
  const [convertMinutes] = useTimeFormat();

  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currsection, setCurrentSection] = useState(
    search.Search === "" ? "n/a" : search.Search
  );
  const daytoday = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const loggeduser = JSON.parse(sessionStorage.getItem("user"));

  const [day, setDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [time, setTime] = useState([
    420, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870,
    900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1200, 1260,
  ]);

  useEffect(() => {
    data_get("class-schedule-list", setSchedule);
    data_get("project-list", setSection);
    data_get("course-list", setCourse);
    data_get("room-list", setRooms);
  }, []);

  useEffect(() => {
    section.map((section, i) =>
      i === 0 && currsection === "n/a"
        ? setCurrentSection(section.Section)
        : null
    );
  }, [section]);

  function resetSearch() {
    setSearch({ Search: "" });
  }

  function checkClassStatus(room) {
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].Day === days[daytoday.getDay()]) {
        if (
          schedule[i].StartTime <
            daytoday.getHours() * 60 + daytoday.getMinutes() &&
          daytoday.getHours() * 60 + daytoday.getMinutes() < schedule[i].EndTime
        ) {
          if (schedule[i].Room === room) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function checkClassDetails(room) {
    for (var i = 0; i < schedule.length; i++) {
      if (schedule[i].Day === days[daytoday.getDay()]) {
        if (
          schedule[i].StartTime <
            daytoday.getHours() * 60 + daytoday.getMinutes() &&
          daytoday.getHours() * 60 + daytoday.getMinutes() < schedule[i].EndTime
        ) {
          if (schedule[i].Room === room) {
            return schedule[i];
          }
        }
      }
    }
    return;
  }

  return (
    <main className="h-100 row m-0 p-2">
      <main className="h-100 w-100 d-flex align-items-center">
        <main className="h-100 flex-fill py-2">
          <header className="p-2 text-center">
            <h1>{`Room Availability`}</h1>
            <p className="m-0 fst-italic">{`Room Available`}</p>
            <hr />
          </header>
          <main className="row row-cols-4 p-2">
            {rooms &&
              rooms.map((room, roomindex) => (
                <section key={roomindex} className="col p-1 m-0">
                  <main
                    className={`rounded shadow-sm d-flex justify-content-center align-items-center flex-column ${
                      checkClassStatus(room.Room) ? "bg-success text-white" : ""
                    }`}
                    style={{ height: "10em" }}
                  >
                    <h5 className="m-0">{room.Room}</h5>
                    <section className="text-center">
                      {checkClassStatus(room.Room)
                        ? "On-Going Classes"
                        : "Available"}
                      {schedule &&
                        schedule.map((item, i) =>
                          item.Day === days[daytoday.getDay()] ? (
                            item.StartTime <
                              daytoday.getHours() * 60 +
                                daytoday.getMinutes() &&
                            daytoday.getHours() * 60 + daytoday.getMinutes() <
                              item.EndTime ? (
                              item.Room === room.Room ? (
                                <section>
                                  <p className="m-0">{item.Section}</p>
                                  <p className="m-0">{item.LastName}</p>
                                  <p className="m-0">{`${convertMinutes(
                                    item.StartTime
                                  )} - ${convertMinutes(item.EndTime)}`}</p>
                                </section>
                              ) : null
                            ) : null
                          ) : null
                        )}
                    </section>
                  </main>
                </section>
              ))}
          </main>
        </main>
      </main>
    </main>
  );
}
