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
    pool.query(`SELECT * FROM coach WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM coach WHERE "Status"='ARCHIVE'`, (err, rslt) =>
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
      `SELECT * FROM coach WHERE "CCHID"='${id}' OR "SCHLID"='${id}'`,
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
    var id = req.body.SCHLID;
    var first = req.body.FirstName;
    var middle = req.body.MiddleInitial;
    var last = req.body.LastName;
    var gender = req.body.Gender;
    var department = req.body.Department;
    var email = req.body.Email;
    var phone = req.body.Phone;
    var link = req.body.Link;
    var image = req.body.Image;
    pool.query(
      `INSERT INTO coach ("CCHID", "SCHLID", "FirstName", "MiddleInitial", "LastName", "Gender", "Department", "Email", "Phone", "Link", "Image")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from coach), '${id}', '${first}', '${middle}', '${last}', '${gender}', '${department}', '${email}', '${phone}', '${link}', '${image}')`,

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
    var idd = req.body.CCHID;
    var id = req.body.SCHLID;
    var first = req.body.FirstName;
    var middle = req.body.MiddleInitial;
    var last = req.body.LastName;
    var gender = req.body.Gender;
    var department = req.body.Department;
    var email = req.body.Email;
    var phone = req.body.Phone;
    var link = req.body.Link;
    var image = req.body.Image;
    pool.query(
      `UPDATE coach 

      SET 
      "SCHLID"='${id}', 
      "FirstName"='${first}', 
      "MiddleInitial"='${middle}', 
      "LastName"='${last}', 
      "Gender"='${gender}', 
      "Department"='${department}', 
      "Email"='${email}', 
      "Phone"='${phone}', 
      "Link"='${link}', 
      "Image"='${image}'
      
      WHERE "CCHID"='${idd}'`,

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
      `UPDATE coach SET "Status"='ARCHIVE' WHERE "CCHID"='${id}'`,
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
      `UPDATE coach SET "Status"='ACTIVE' WHERE "CCHID"='${id}'`,
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
