import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
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
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
