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

router.get("/curriculum-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM curriculum WHERE "Status"='ACTIVE' ORDER BY "CRRID" DESC`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current-curriculum", (req, res) => {
  try {
    pool.query(
      `SELECT academic_year."Code" as academiccode, academic_year."AcademicYear", curriculum."Curriculum", curriculum."Code", curriculum."CRRID", curriculum."Description", curriculum."Created", curriculum."Status"  FROM academic_year INNER JOIN curriculum ON curriculum."Code" = academic_year."Curriculum" WHERE academic_year."Status"='ACTIVE' ORDER BY academic_year."ACYID" DESC LIMIT 1`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/curriculum-list-archived", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM curriculum WHERE "Status"='ARCHIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/curriculum-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM curriculum WHERE "CRRID"='${id}' OR "Code"='${id}'`,
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

router.post("/curriculum-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.Code;
    var curriculum = clientData.Curriculum;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `INSERT INTO curriculum ("CRRID", "Code", "Curriculum", "Description")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from curriculum), '${code}', '${curriculum}', '${description}')`,

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

router.post("/curriculum-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.DPTID;
    var code = clientData.Code;
    var department = clientData.Department;
    var abbrev = clientData.Abbrev;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `UPDATE department 

      SET 
      "Code"='${code}', 
      "Department"='${department}', 
      "Abbrev"='${abbrev}', 
      "Description"='${description}' 
      
      WHERE "DPTID"='${id}'`,

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

router.post("/curriculum-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE curriculum SET "Status"='ARCHIVE' WHERE "ACYID"='${id}' OR "Code"='${id}'`,
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

router.post("/curriculum-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE curriculum SET "Status"='ACTIVE' WHERE "DPTID"='${id}'`,
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
