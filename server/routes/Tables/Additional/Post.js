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

router.get("/posts-list", (req, res) => {
  try {
    pool.query(
      `SELECT posts."PSTID", _user."SCHLID", _user."Email", _user."FirstName", _user."LastName", posts."SubjectMatter", posts."Details", posts."Date", posts."Time", posts."Created", posts."Status" FROM posts INNER JOIN _user ON _user."SCHLID"=posts."Author" WHERE posts."Status"='ACTIVE' ORDER BY posts."PSTID" DESC`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/posts-list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM posts WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/posts-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(`SELECT * FROM posts`, (err, rslt) => {
      if (err) {
        console.error("Query error:", err);
        return;
      }
      res.json(rslt.rows);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/posts-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var author = clientData.Author;
    var subjectmatter = clientData.SubjectMatter;
    var details = clientData.Details;
    var date = clientData.Date;
    var time = clientData.Time;
    pool.query(
      `INSERT INTO posts ("PSTID", "Author", "SubjectMatter",  "Details", "Date", "Time")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from posts),'${author}', '${subjectmatter}',  '${details}',  '${date}',  '${time}')`,

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
