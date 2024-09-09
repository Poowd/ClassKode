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
              <li className="list-group-item">{`${item.LastName}, ${item.FirstName}`}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${user.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Academic Level</h1>
        <ul className="list-group">
          {academiclevel &&
            academiclevel.map((item, i) => (
              <li className="list-group-item">{item.AcademicLevel}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${academiclevel.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Academic Year</h1>
        <ul className="list-group">
          {academicyear &&
            academicyear.map((item, i) => (
              <li className="list-group-item">{item.AcademicYear}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${academicyear.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Department</h1>
        <ul className="list-group">
          {department &&
            department.map((item, i) => (
              <li className="list-group-item">{item.Department}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${department.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Program</h1>
        <ul className="list-group">
          {program &&
            program.map((item, i) => (
              <li className="list-group-item">{item.Program}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${program.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Coach</h1>
        <ul className="list-group">
          {coach &&
            coach.map((item, i) => (
              <li className="list-group-item">{`${item.LastName}, ${item.FirstName}`}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${coach.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Course</h1>
        <ul className="list-group">
          {course &&
            course.map((item, i) => (
              <li className="list-group-item">{item.Course}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${course.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Section</h1>
        <ul className="list-group">
          {section &&
            section.map((item, i) => (
              <li className="list-group-item">{item.Section}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${section.length} rows`}</p>
      </section>
      <section className="h-100 w-25">
        <h1>Room</h1>
        <ul className="list-group">
          {room &&
            room.map((item, i) => (
              <li className="list-group-item">{item.Room}</li>
            ))}
        </ul>
        <p>{`The total number of the _user table: ${room.length} rows`}</p>
      </section>
    </main>
  );
}
