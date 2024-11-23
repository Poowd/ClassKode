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
      `SELECT SUM(class_schedules."Units"::float) FROM class_schedules INNER JOIN coach ON coach."SCHLID" = class_schedules."Coach" WHERE class_schedules."Coach"='${coach}' OR coach."CCHID"='${coach}' AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
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

router.get("/archive-count", (req, res) => {
  try {
    pool.query(
      `SELECT (SELECT COUNT(*) as department FROM department WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as program FROM program WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as course FROM course WHERE "Status"='ARCHIVE'),(SELECT COUNT(*) as coach FROM coach WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as section FROM section WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as room FROM room WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as curriculum FROM curriculum WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as academic_year FROM academic_year WHERE "Status"='ARCHIVE'), (SELECT COUNT(*) as class_schedules FROM class_schedules WHERE "Status"='ARCHIVE')`,
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

router.get("/data-entry-count", (req, res) => {
  try {
    pool.query(
      `SELECT (SELECT COUNT(*) as department FROM department WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as program FROM program WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as course FROM course WHERE "Status"='ACTIVE'),(SELECT COUNT(*) as coach FROM coach WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as section FROM section WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as room FROM room WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as curriculum FROM curriculum WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as academic_year FROM academic_year WHERE "Status"='ACTIVE'), (SELECT COUNT(*) as tertiary_class_schedules FROM class_schedules INNER JOIN year_level ON year_level."YearLevel" = class_schedules."YearLevel" WHERE class_schedules."Status"='ACTIVE' AND year_level."AcademicLevel"='Tertiary' AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)),(SELECT COUNT(*) as shs_class_schedules FROM class_schedules INNER JOIN year_level ON year_level."YearLevel" = class_schedules."YearLevel" WHERE class_schedules."Status"='ACTIVE' AND year_level."AcademicLevel"='Senior High School' AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1))`,
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

router.get("/get-all-data", (req, res) => {
  try {
    pool.query(`SELECT * FROM department`, (err, department) => {
      pool.query(`SELECT * FROM program`, (err, program) => {
        pool.query(`SELECT * FROM course`, (err, course) => {
          pool.query(`SELECT * FROM coach`, (err, coach) => {
            pool.query(`SELECT * FROM section`, (err, section) => {
              pool.query(`SELECT * FROM room`, (err, room) => {
                pool.query(`SELECT * FROM setup`, (err, setup) => {
                  pool.query(`SELECT * FROM assignment`, (err, assignment) => {
                    pool.query(
                      `SELECT * FROM projection`,
                      (err, projection) => {
                        return res.json({
                          department: department.rows,
                          program: program.rows,
                          course: course.rows,
                          coach: coach.rows,
                          section: section.rows,
                          room: room.rows,
                          setup: setup.rows,
                          assignment: assignment.rows,
                          projection: projection.rows,
                        });
                      }
                    );
                  });
                });
              });
            });
          });
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
