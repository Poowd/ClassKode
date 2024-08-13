import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// app.post("/schedules", (req, res) => {
//   const sql =
//     `
//       SELECT schedule.SCDID, section.Section, course.Course, schedule.CRS_Code, schedule.StartTime, schedule.EndTime, room.Room, projection.Population, room.Capacity, schedule.Day, schedule.Component, schedule.Units, room.Floor, room.Building, section.Semester, schedule.Coach
//         FROM schedule

//           LEFT JOIN projection
//             ON projection.Section = schedule.Section
//           LEFT JOIN room
//           	ON room.Room = schedule.Room
//           LEFT JOIN course
//            	ON course.CRS_Code = schedule.CRS_Code
//           LEFT JOIN section
//           	ON section.Section = schedule.Section

//         WHERE projection.ACY_Code = 'AY-2425'
//           OR  SUBSTRING(schedule.Section, 1, 3) = 'ABC'

//         AND schedule.Section LIKE '%` +
//     req.body.Search +
//     `%'

//         ORDER BY schedule.StartTime ASC
//   `;

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

// app.post("/expected-classes", (req, res) => {
//   const sql = `
//       SELECT course.CRS_Code, course.Course, section.Section, setup.Component, projection.Population, course_component.MaxUnits, section.Semester
//         FROM section

//           INNER JOIN projection
//             ON projection.Section = section.Section

//           INNER JOIN setup
//             ON setup.PRG_Code = section.PRG_Code

//           INNER JOIN course
//             ON course.CRS_Code = setup.CRS_Code

//           INNER JOIN course_component
//             ON course_component.Component = setup.Component

//         WHERE projection.ACY_Code = 'AY-2425'
//           AND section.YearLevel = setup.YL
//           AND section.Semester = setup.SMS

//         ORDER BY section.Section ASC
//   `;

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

// app.post("/weekly-event", (req, res) => {
//   const sql = `
//       SELECT *
//         FROM weeklyevent
//   `;

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

// app.post("/save-presched", (req, res) => {
//   const sql = `
//       INSERT INTO schedule (Section, CRS_Code, Room, Component, Units, Day, StartTime, EndTime, SCHLID, ACY_Code ) VALUES (?);
//   `;

//   const values = [
//     req.body.SCT,
//     req.body.CRS_CODE,
//     req.body.ROM,
//     req.body.CPT,
//     req.body.UNT,
//     req.body.DAY,
//     req.body.STR_TME,
//     req.body.END_TME,
//     req.body.SCHLID,
//     req.body.ACY,
//   ];

//   db.query(sql, [values], (err, data) => {
//     if (err) return res.json({ Message: err });
//     return res.json(data);
//   });
// });

// app.post("/assignment", (req, res) => {
//   const sql = `
//       SELECT coach.SCHLID, coach.DPT_Code, coach.LastName, assignment.CoachType, coach_type.MaxUnits
//         FROM assignment
//           INNER JOIN coach_type
//             ON assignment.CoachType = coach_type.CoachType
//           INNER JOIN academicyear
//             ON assignment.ACY_Code = academicyear.ACY_Code
//           INNER JOIN coach
//             ON assignment.SCHLID = coach.SCHLID

//           WHERE academicyear.ACY_Code = 'AY-2425'

//           ORDER BY ACYID DESC
//     `;

//   db.query(sql, [req.body.SCHLID], (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

export default app;
