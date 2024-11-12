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

router.get("/academic-year-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC `,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/academic-year-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM academic_year WHERE "ACYID"='${id}' OR "Code"='${id}'`,
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

router.get("/last-five-terms", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 5`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current-academic-year", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current-academic-year-code", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_code WHERE "AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/academic-year-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.Code;
    var academicyear = clientData.AcademicYear;
    var curriculum = clientData.Curriculum;
    var semester = clientData.Semester;
    var startdate = clientData.StartDate;
    var enddate = clientData.EndDate;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `INSERT INTO academic_year ("ACYID", "Code", "AcademicYear", "Curriculum", "Semester", "StartDate", "EndDate", "Description")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from academic_year), (select CONCAT('ACY-',LPAD(CAST((count(*) + 1)::integer AS TEXT), 3, '0')) AS Wow from academic_year), '${academicyear}', '${curriculum}', '${semester}', '${startdate}', '${enddate}', '${description}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json({ Status: "Success", data: clientData });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/academic-year-code-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.Code;
    var academiccode = clientData.AcademicCode;
    pool.query(
      `INSERT INTO academic_code ("AcademicYear", "AcademicCode") VALUES ('${code}', '${academiccode}')`,

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

router.post("/academic-year-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE academic_year SET "Status"='ARCHIVE' WHERE "ACYID"='${id}' OR "Code"='${id}'`,
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

router.get("/academic-year-list-archived", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_year WHERE "Status"='ARCHIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/academic-year-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE academic_year SET "Status"='ACTIVE' WHERE "ACYID"='${id}'`,
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

router.post("/set-schedule-status", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicYear = clientData.data;
    pool.query(
      `UPDATE academic_year SET "GeneratedSchedules"='TRUE' WHERE "Code"='${academicYear}'`,
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

router.post("/set-exam-status", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicYear = clientData.data;
    var level = clientData.level;
    pool.query(
      `UPDATE academic_year SET "Generated${level}Exams"='TRUE' WHERE "Code"='${academicYear}'`,
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
