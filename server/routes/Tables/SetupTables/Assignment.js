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
      `SELECT coach."SCHLID", coach."FirstName", coach."LastName", coach."Image", coach."Link", coach."Email", coach."AcademicLevel", department."Code" as DepartmentCode, department."Department", department."Abbrev" as DepartmentAbbrev, assignment."CoachType", coach_type."MAX", assignment."AcademicYear", assignment."Created", assignment."Status" FROM assignment INNER JOIN coach ON assignment."Coach" = coach."SCHLID" INNER JOIN coach_type ON assignment."CoachType" = coach_type."Type" INNER JOIN department ON coach."Department" = department."Code" WHERE assignment."Status"='ACTIVE' AND coach."Status"='ACTIVE' AND assignment."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/assign-onyear-list", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicyear = clientData.data;
    pool.query(
      `SELECT coach."SCHLID", coach."FirstName", coach."LastName", coach."MiddleInitial", coach."Gender", coach."Image", coach."Link", coach."Email", coach."AcademicLevel", department."Code" as DepartmentCode, department."Department", department."Abbrev" as DepartmentAbbrev, assignment."CoachType", coach_type."MAX", assignment."AcademicYear", assignment."Created", assignment."Status" FROM assignment INNER JOIN coach ON assignment."Coach" = coach."SCHLID" INNER JOIN coach_type ON assignment."CoachType" = coach_type."Type" INNER JOIN department ON coach."Department" = department."Code" WHERE assignment."Status"='ACTIVE' AND coach."Status"='ACTIVE' AND assignment."AcademicYear"='${academicyear}'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/assign-list-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var coach = clientData.data;
    pool.query(
      `SELECT coach."CCHID", coach."SCHLID", coach."FirstName", coach."LastName", coach."MiddleInitial", coach."Gender", coach."Image", department."Code" as DepartmentCode, department."Department", department."Abbrev" as DepartmentAbbrev, assignment."CoachType", coach_type."MAX", assignment."AcademicYear", assignment."Created", assignment."Status" FROM assignment INNER JOIN coach ON assignment."Coach" = coach."SCHLID" INNER JOIN coach_type ON assignment."CoachType" = coach_type."Type" INNER JOIN department ON coach."Department" = department."Code" WHERE coach."SCHLID"='${coach}' OR coach."CCHID"='${coach}' AND assignment."Status"='ACTIVE' AND assignment."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => {
        if (rslt !== undefined) {
          return res.json(rslt.rows[0]);
        }
        return res.json({ MAX: 0 });
      }
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
