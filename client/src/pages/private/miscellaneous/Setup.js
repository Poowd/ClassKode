import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";

export function Setup() {
  const [get, post] = useDatabase();

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
    post("user", user, setUser);
    post("academic-level", academiclevel, setAcademicLevel);
    post("academic-year", academicyear, setAcademicYear);
    get("department/list", setDepartment);
    post("program", program, setProgram);
    post("coach", coach, setCoach);
    post("course", course, setCourse);
    post("room", room, setRoom);
    post("section", section, setSection);
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
