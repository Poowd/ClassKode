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

router.get("/course-list", (req, res) => {
  try {
    pool.query(`SELECT * FROM course WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/course-list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM course WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/course-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM course WHERE "CRSID"='${id}' OR "CourseID"='${id}'`,
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

router.post("/course-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var courseid = clientData.Course_ID;
    var course = clientData.Course;
    var subjectarea = clientData.Subject_Area;
    var catalogno = clientData.Catalog_No;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `INSERT INTO course ("CRSID", "CourseID", "Course", "SubjectArea", "CatalogNo", "Description")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from course), '${courseid}', '${course}', '${subjectarea}', '${catalogno}', '${description}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
        } else {
          res.json(rslt.rows);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/course-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.CRSID;
    var code = clientData.Code;
    var course = clientData.Course;
    var department = clientData.Department;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `UPDATE course 

      SET 
      "Code"='${code}', 
      "Course"='${course}', 
      "Department"='${department}', 
      "Description"='${description}' 
      
      WHERE "CRSID"='${id}'`,

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

router.post("/course-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
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

router.post("/course-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
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
