import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Setup() {
  const [get, post, data_get, data_post] = useDatabase();

  const [user, setUser] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);
  const [academicyear, setAcademicYear] = useState([]);
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [coach, setCoach] = useState([]);
  const [course, setCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    data_post("user", user, setUser);
    data_post("academic-level", academiclevel, setAcademicLevel);
    data_post("academic-year", academicyear, setAcademicYear);
    data_get("department-list", setDepartment);
    data_post("program", program, setProgram);
    data_post("coach", coach, setCoach);
    data_post("course", course, setCourse);
    data_post("room", room, setRoom);
    data_post("section", section, setSection);
  }, []);

  return (
    <main className="d-flex gap-3 flex-wrap justify-content-around">
      <section className="h-100 w-25">
        <h1>User</h1>
        <ul className="list-group">
          {user &&
            user.map((item, i) => (
              <li className="list-group-item">{`${item.LastName}, ${item.FirstName} - ${item.Password}`}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${user.length} rows`}</p>
      </section>
    </main>
  );
}
