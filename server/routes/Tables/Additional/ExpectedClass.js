const express = require("express");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres.pgcztzkowuxixfyiqera",
  password: "Clskde_#5*Ths2",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
});

router.post("/expected-class-list", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var acadmicyear = clientData.data;
    pool.query(
      `SELECT course."Code" AS CourseCode, course."Course", section."Section", curriculum_setup."Component", projection."Population", component."MaxUnits", year_level."YearLevel", semester."Semester" FROM section INNER JOIN year_level ON section."YearLevel" = year_level."YearLevel" INNER JOIN projection ON section."Section" = projection."Section" INNER JOIN curriculum_setup ON section."Program" = curriculum_setup."Program" INNER JOIN course ON curriculum_setup."Course" = course."Code" INNER JOIN component ON curriculum_setup."Component" = component."Component" INNER JOIN  semester ON section."Semester" = semester."Semester" WHERE projection."AcademicYear"='${acadmicyear}' AND section."YearLevel"=curriculum_setup."YearLevel" AND section."Semester"=curriculum_setup."Semester"`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/sel-exp-class", (req, res) => {
  const sql = `
      SELECT course.CRS_Code, course.Course, section.Section, setup.Component, projection.Population, course_component.MaxUnits, section.Semester, yearlevel.YearLevel
      FROM section
      INNER JOIN yearlevel
        ON yearlevel.YearLevel = section.YearLevel
      INNER JOIN projection
        ON projection.Section = section.Section
      INNER JOIN setup
        ON setup.PRG_Code = section.PRG_Code
      INNER JOIN course
        ON course.CRS_Code = setup.CRS_Code
      INNER JOIN course_component
        ON course_component.Component = setup.Component
      WHERE projection.ACY_Code = 'AY-2425-1'
        AND section.YearLevel = setup.YL
        AND section.Semester = setup.SMS
      ORDER BY section.Section ASC
  `;
});

router.get("/semester-list", (req, res) => {
  try {
    pool.query(`SELECT * FROM semester WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
