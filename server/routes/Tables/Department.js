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

router.get("/department-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM department WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/department-list-archived", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM department WHERE "Status"='ARCHIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/department-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM department WHERE "DPTID"='${id}' OR "Code"='${id}'`,
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

router.post("/department-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.Code;
    var department = clientData.Department;
    var abbrev = clientData.Abbrev;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `INSERT INTO department ("DPTID", "Code", "Department", "Abbrev",  "Description", "SubjectArea")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from department), (select CONCAT('DEPT-',LPAD(CAST((count(*) + 1)::integer AS TEXT), 3, '0')) AS Wow from department), '${department}', '${abbrev}',  '${description}',  '${subjectarea}')`,

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

router.post("/department-edit", (req, res) => {
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

router.post("/department-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE department SET "Status"='ARCHIVE' WHERE "DPTID"='${id}'`,
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

router.post("/department-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE department SET "Status"='ACTIVE' WHERE "DPTID"='${id}'`,
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
