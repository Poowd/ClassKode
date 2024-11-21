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

router.get("/project-list", (req, res) => {
  try {
    pool.query(
      `SELECT projection."PRJID", section."Section", section."YearLevel", program."AcademicLevel", program."Program", projection."AcademicYear", projection."Population", projection."Created", projection."Status" FROM projection INNER JOIN section ON projection."Section" = section."Section" INNER JOIN program ON section."Program" = program."Code" WHERE projection."Status"='ACTIVE' AND "AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/project-onyear-list", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicyear = clientData.data;
    pool.query(
      `SELECT projection."PRJID", section."Section", section."YearLevel", program."Program", projection."AcademicYear", projection."Population", projection."Created", projection."Status" FROM projection INNER JOIN section ON projection."Section" = section."Section" INNER JOIN program ON section."Program" = program."Code" WHERE projection."Status"='ACTIVE' AND "AcademicYear"='${academicyear}'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/projection-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicyear = clientData.AcademicYear;
    var section = clientData.Section;
    var population = clientData.Population;
    pool.query(
      `INSERT INTO projection ("PRJID", "Section", "AcademicYear", "Population")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from projection), '${section}', '${academicyear}', '${population}')`,

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

router.post("/projection-generate", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicyear = clientData.Academic_Year;
    var section = clientData.Section;
    var population = clientData.Population;
    pool.query(
      `INSERT INTO projection ("PRJID", "Section", "AcademicYear", "Population")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from projection), '${section}', '${academicyear}', '${population}')`,

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

router.get("/project-total-population", (req, res) => {
  try {
    pool.query(
      `SELECT MAX(projection."PRJID"::int) as order, academic_year."AcademicYear", SUM(projection."Population"::int) as total_population, SUM(CASE WHEN program."AcademicLevel" = 'Tertiary' THEN projection."Population"::int ELSE 0 END) as tertiary_population, SUM(CASE WHEN program."AcademicLevel" = 'Senior High School' THEN projection."Population"::int ELSE 0 END) as shs_population FROM projection FULL JOIN academic_year ON academic_year."Code" = projection."AcademicYear" INNER JOIN section ON section."Section" = projection."Section" INNER JOIN program ON program."Code" = section."Program" WHERE academic_year."Status"='ACTIVE' GROUP BY academic_year."AcademicYear" ORDER BY MAX(projection."PRJID"::int) ASC LIMIT 5`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
