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

router.get("/program-list", (req, res) => {
  try {
    pool.query(
      `SELECT program."PRGID", program."Code", program."Program", program."Abbrev", department."Code" as DPTCode, department."AcademicLevel", program."Created", program."Status" FROM program INNER JOIN department ON program."Department"=department."Code" WHERE program."Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/program-list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM program WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/program-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM program WHERE "PRGID"='${id}' OR "Code"='${id}'`,
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

router.post("/program-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.Code;
    var program = clientData.Program;
    var abbrev = clientData.Abbrev;
    var department = clientData.Department;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `INSERT INTO program ("PRGID", "Code", "Program", "Abbrev", "Department", "Description")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from program), '${code}', '${program}', '${abbrev}', '${department}', '${description}')`,

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

router.post("/program-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.PRGID;
    var code = clientData.Code;
    var program = clientData.Program;
    var department = clientData.Department;
    var abbrev = clientData.Abbrev;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `UPDATE program 
        SET 
        "Code"='${code}', 
        "Program"='${program}', 
        "Abbrev"='${abbrev}', 
        "Department"='${department}', 
        "Description"='${description}' 
        
        WHERE "PRGID"='${id}'`,

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

router.post("/program-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE program SET "Status"='ARCHIVE' WHERE "PRGID"='${id}'`,
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

router.post("/program-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE program SET "Status"='ACTIVE' WHERE "PRGID"='${id}'`,
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
