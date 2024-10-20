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

router.get("/class-schedule-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM class_schedules WHERE "Status"='ACTIVE' AND "AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/class-schedule-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var course = clientData.CRS_CODE;
    var section = clientData.SCT;
    var yearlevel = clientData.YRLVL;
    var day = clientData.DAY;
    var starttime = clientData.STR_TME;
    var endtime = clientData.END_TME;
    var room = clientData.ROM;
    var component = clientData.CPT;
    var coach = clientData.SCHLID;
    var population = clientData.PPL;
    var units = clientData.UNT;
    var capacity = clientData.CPC;
    var academicyear = clientData.ACY;
    pool.query(
      `INSERT INTO class_schedules ("CLSID", "Course", "Section", "YearLevel", "Day", "StartTime", "EndTime", "Room", "Component", "Coach", "Population", "Units", "Capacity", "AcademicYear")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from class_schedules), '${course}', '${section}', '${yearlevel}', '${day}', '${starttime}', '${endtime}', '${room}', '${component}', '${coach}', '${population}', '${units}', '${capacity}', '${academicyear}')`,

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

router.post("/reset-status", (req, res) => {
  try {
    pool.query(
      `UPDATE coach_status SET "ClassStatus"='OFFHOURS'`,
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

//select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') from department

module.exports = router;
