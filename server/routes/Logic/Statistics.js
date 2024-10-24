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

router.get("/total-population-check", (req, res) => {
  try {
    pool.query(
      `SELECT SUM("Population"::int) as Population FROM projection`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/population-per-term", (req, res) => {
  const clientData = JSON.parse(req.body);
  var data = clientData.Code;
  console.log(clientData);
  try {
    pool.query(
      `SELECT SUM("Population"::int) as Population1 FROM projection WHERE "AcademicYear"='${data}' LIMIT 1`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/room-units", (req, res) => {
  const clientData = JSON.parse(req.body);
  var data = clientData.data;
  try {
    pool.query(
      `SELECT  SUM(class_schedules."Units"::int)  FROM class_schedules INNER JOIN room ON class_schedules."Room" = room."Room" WHERE room."ROMID"='${data}'`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/room-units-day", (req, res) => {
  const clientData = JSON.parse(req.body);
  var room = clientData.room;
  var day = clientData.day;
  try {
    pool.query(
      `SELECT  SUM(class_schedules."Units"::int)  FROM class_schedules INNER JOIN room ON class_schedules."Room" = room."Room" WHERE room."ROMID"='${room}' AND class_schedules."Day"='${day}' AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/coach-units", (req, res) => {
  const clientData = JSON.parse(req.body);
  var coach = clientData.data;
  try {
    pool.query(
      `SELECT  SUM(class_schedules."Units"::int)  FROM class_schedules INNER JOIN coach ON coach."SCHLID" = class_schedules."Coach" WHERE class_schedules."Coach"='${coach}' OR coach."CCHID"='${coach}' AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => {
        if (rslt !== undefined) {
          return res.json(rslt.rows[0]);
        }
        return res.json({ sum: 0 });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
