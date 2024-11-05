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
      `SELECT 
        setup."CourseID", 
        setup."Course", 
        section."Section", 
        setup."Component", 
        projection."Population", 
        setup."Units", 
        setup."YearLevel", 
        setup."Semester" 

        FROM section 
        INNER JOIN projection ON section."Section" = projection."Section" 
        INNER JOIN setup ON section."Program" = setup."Program" 

        WHERE projection."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1) 
        AND section."YearLevel"=setup."YearLevel" 
        AND section."Semester"=setup."Semester"`,

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
