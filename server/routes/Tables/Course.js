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

router.get("/list", (req, res) => {
  try {
    pool.query(`SELECT * FROM course WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM course WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/target", (req, res) => {
  try {
    var id = req.body.data;
    pool.query(
      `SELECT * FROM course WHERE "CRSID"='${id}' OR "Code"='${id}'`,
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

router.post("/insert", (req, res) => {
  try {
    var code = req.body.Code;
    var course = req.body.Course;
    var department = req.body.Department;
    var description =
      req.body.Description === null ? null : req.body.Description;
    pool.query(
      `INSERT INTO course ("CRSID", "Code", "Course", "Department", "Description")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from course), '${code}', '${course}', '${department}', '${description}')`,

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

router.post("/edit", (req, res) => {
  try {
    var id = req.body.DPTID;
    var code = req.body.Code;
    var department = req.body.Department;
    var abbrev = req.body.Abbrev;
    var description =
      req.body.Description === null ? null : req.body.Description;
    pool.query(
      `UPDATE course 

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

router.post("/archive", (req, res) => {
  try {
    var id = req.body.data;
    pool.query(
      `UPDATE course SET "Status"='ARCHIVE' WHERE "CRSID"='${id}'`,
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

router.post("/restore", (req, res) => {
  try {
    var id = req.body.data;
    pool.query(
      `UPDATE course SET "Status"='ACTIVE' WHERE "CRSID"='${id}'`,
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