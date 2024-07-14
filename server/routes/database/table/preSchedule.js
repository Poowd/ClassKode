import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/schedules", (req, res) => {
  const sql =
    `
      SELECT schedule.SCDID, section.Section, course.Course, schedule.CRS_Code, schedule.StartTime, schedule.EndTime, room.Room, projection.Population, room.Capacity, schedule.Day, schedule.Component, schedule.Units, room.Floor, room.Building, section.Semester
        FROM schedule

          LEFT JOIN projection
            ON projection.Section = schedule.Section
          LEFT JOIN room
          	ON room.Room = schedule.Room
          LEFT JOIN course
           	ON course.CRS_Code = schedule.CRS_Code
          LEFT JOIN section
          	ON section.Section = schedule.Section
        
        WHERE projection.ACY_Code = 'AY-2425'
          OR  SUBSTRING(schedule.Section, 1, 3) = 'ABC'
          AND schedule.CRR_Code = 'CRR2020'

        AND schedule.Section LIKE '%` +
    req.body.Search +
    `%'

        
          
        ORDER BY schedule.StartTime ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/expected-classes", (req, res) => {
  const sql = `
      SELECT course.CRS_Code, course.Course, section.Section, setup.Component, projection.Population, course_component.MaxUnits
        FROM section

          INNER JOIN projection
            ON projection.Section = section.Section

          INNER JOIN setup
            ON setup.PRG_Code = section.PRG_Code

          INNER JOIN course
            ON course.CRS_Code = setup.CRS_Code

          INNER JOIN course_component
            ON course_component.Component = setup.Component
          

        WHERE projection.ACY_Code = 'AY-2425'
          AND section.YearLevel = setup.YL
          AND section.Semester = setup.SMS

        ORDER BY section.Section ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/weekly-event", (req, res) => {
  const sql = `
      SELECT *
        FROM weeklyevent
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/save-presched", (req, res) => {
  const sql = `
      INSERT INTO schedule (Section, CRS_Code, Room, Component, Units, Day, StartTime, EndTime, ACY_Code, CRR_Code) VALUES (?);
  `;

  const values = [
    req.body.Section,
    req.body.Course,
    req.body.Room,
    req.body.Component,
    req.body.Units,
    req.body.Day,
    req.body.TimeStart,
    req.body.EndTime,
    req.body.AcademicYear,
    req.body.Curriculum,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

export default app;
