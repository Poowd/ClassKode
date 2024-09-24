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

router.get("/assign-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM assignment WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/assignment-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var coach = clientData.SCHLID;
    var academicyear = clientData.AcademicYear;
    var coachtype = clientData.CoachType;
    var department = clientData.Department;
    pool.query(
      `INSERT INTO assignment ("ASGID", "Coach", "AcademicYear", "CoachType")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from assignment), '${coach}', '${academicyear}', '${coachtype}')`,

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

module.exports = router;
