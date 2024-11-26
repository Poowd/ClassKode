import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../component/button/DefaultButton";
import useDatabase from "../../../hook/useDatabase";
import { useLocation, useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";

import defalt from "../../../assets/imgs/stimap/roommap/defalt.png";

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
  const [currentRoom, setCurrentRoom] = useState("");
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

  function getBuilding(rom) {
    const room = rooms.find((checkroom) => checkroom.Room === rom);
    return room !== undefined ? room.Building : "";
  }

  function getFloor(rom) {
    const room = rooms.find((checkroom) => checkroom.Room === rom);
    return room !== undefined ? room.Floor : "";
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

  function checkRoomMap(room) {
    if (room === "Computer Laboratory 1") {
      return info.maps.roommaps.main.comlab1;
    }
    if (room === "Computer Laboratory 2") {
      return info.maps.roommaps.main.comlab2;
    }
    if (room === "Computer Laboratory 3") {
      return info.maps.roommaps.main.comlab3;
    }
    if (room === "Computer Laboratory 4") {
      return info.maps.roommaps.main.comlab4;
    }
    if (room === "301M") {
      return info.maps.roommaps.main.room301m;
    }
    if (room === "302M") {
      return info.maps.roommaps.main.room302m;
    }
    if (room === "303M") {
      return info.maps.roommaps.main.room303m;
    }
    if (room === "304M") {
      return info.maps.roommaps.main.room304m;
    }
    if (room === "101B") {
      return info.maps.roommaps.annexb.room101b;
    }
    if (room === "102B") {
      return info.maps.roommaps.annexb.room102b;
    }
    if (room === "103B") {
      return info.maps.roommaps.annexb.room103b;
    }
    if (room === "104B") {
      return info.maps.roommaps.annexb.room104b;
    }
    if (room === "105B") {
      return info.maps.roommaps.annexb.room105b;
    }
    if (room === "106B") {
      return info.maps.roommaps.annexb.room106b;
    }
    if (room === "107B") {
      return info.maps.roommaps.annexb.room107b;
    }
    if (room === "201B") {
      return info.maps.roommaps.annexb.room201b;
    }
    if (room === "202B") {
      return info.maps.roommaps.annexb.room202b;
    }
    if (room === "203B") {
      return info.maps.roommaps.annexb.room203b;
    }
    if (room === "204B") {
      return info.maps.roommaps.annexb.room204b;
    }
    if (room === "205B") {
      return info.maps.roommaps.annexb.room205b;
    }
    if (room === "206B") {
      return info.maps.roommaps.annexb.room206b;
    }
    if (room === "Court") {
      return info.maps.roommaps.annexb.court;
    }
    if (room === "avr1") {
      return info.maps.roommaps.annexb.avr1;
    }
    if (room === "avr2") {
      return info.maps.roommaps.annexb.avr2;
    }
    if (room === "avr3") {
      return info.maps.roommaps.annexb.avr3;
    }
    return defalt;
  }

  return (
    <main className="h-100 row m-0 p-0 overflow-hidden">
      <main className="h-100  m-0 p-0">
        <main className="h-100 row m-0 p-0">
          <section className="col-lg-8 h-100 p-1 height-auto">
            <main className="row row-cols-4 p-2 m-0  bg-white rounded shadow-sm h-100  overflow-y-auto  position-relative ">
              <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
                <div className="d-flex justify-content-end gap-2">
                  <div className="w-100">
                    <div className="d-flex gap-2 justify-content-end">
                      <DefaultButton
                        class="px-2"
                        icon={info.icons.navigation.back}
                        text="Back"
                        function={() => navigate(-1)}
                      />
                      <main className="w-100"></main>
                    </div>
                  </div>
                </div>
              </section>
              {rooms &&
                rooms.map((room, roomindex) => (
                  <section
                    key={roomindex}
                    className="col p-1 m-0"
                    onClick={() => setCurrentRoom(room.Room)}
                  >
                    <main
                      className={`rounded shadow-sm p-2 hover-darken ${
                        checkClassStatus(room.Room)
                          ? "safe-color text-white"
                          : "bg-light"
                      }`}
                      style={{ height: "10em" }}
                    >
                      <main className="border w-100 h-100 rounded shadow-sm d-flex justify-content-center align-items-center flex-column ">
                        <h6 className="m-0">{room.Room}</h6>
                        <small>
                          <p className="m-0">{`${room.Capacity} seats`}</p>
                          <section className="text-center mt-1">
                            {checkClassStatus(room.Room)
                              ? "On-Going Classes"
                              : "Available"}
                            {schedule &&
                              schedule.map((item, i) =>
                                item.Day === days[daytoday.getDay()] ? (
                                  item.StartTime <
                                    daytoday.getHours() * 60 +
                                      daytoday.getMinutes() &&
                                  daytoday.getHours() * 60 +
                                    daytoday.getMinutes() <
                                    item.EndTime ? (
                                    item.Room === room.Room ? (
                                      <section>
                                        <p className="m-0">{item.Section}</p>
                                        <p className="m-0">{item.LastName}</p>
                                        <p className="m-0">{`${convertMinutes(
                                          item.StartTime
                                        )} - ${convertMinutes(
                                          item.EndTime
                                        )}`}</p>
                                      </section>
                                    ) : null
                                  ) : null
                                ) : null
                              )}
                          </section>
                        </small>
                      </main>
                    </main>
                  </section>
                ))}
            </main>
          </section>
          <section className="col-lg-4 h-100 p-1 height-auto">
            <figure className="d-flex align-items-center justify-content-center flex-column h-100 p-2 m-0 bg-white rounded shadow-sm">
              <h5>{`${getBuilding(currentRoom)} - ${getFloor(
                currentRoom
              )}`}</h5>
              <img
                className="ratio ratio-1x1 object-fit-contain"
                style={{ height: "60vh" }}
                src={checkRoomMap(currentRoom) || defalt}
                alt=""
              ></img>
            </figure>
          </section>
        </main>
      </main>
    </main>
  );
}
