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

router.get("/coach-list", (req, res) => {
  try {
    pool.query(
      `SELECT coach."CCHID", coach."SCHLID", coach."FirstName", coach."MiddleInitial", coach."LastName",coach."Gender", coach."Email", coach."Phone",coach."Link", coach."Image", department."Department", department."Code", coach."AcademicLevel", coach."Created", coach."Status" FROM coach INNER JOIN department ON department."Code" = coach."Department" WHERE coach."Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/coach-list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM coach WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/coach-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT coach."CCHID", coach."SCHLID", coach."FirstName", coach."MiddleInitial", coach."LastName",coach."Gender", coach."Email", coach."Phone",coach."Link", coach."Image", department."Department", department."Code",coach."Created", coach."Status" FROM coach INNER JOIN department ON department."Code" = coach."Department" WHERE coach."CCHID"='${id}' OR coach."SCHLID"='${id}'`,
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

router.post("/coach-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    console.log(clientData);
    var id = clientData.SCHLID;
    var first = clientData.FirstName;
    var middle = clientData.MiddleInitial;
    var last = clientData.LastName;
    var gender = clientData.Gender;
    var department = clientData.Department;
    var academicLevel = clientData.AcademicLevel;
    var email = clientData.Email;
    var phone = clientData.Phone;
    var link = clientData.Link;
    var image = clientData.Image;
    pool.query(
      `INSERT INTO coach ("CCHID", "SCHLID", "FirstName", "MiddleInitial", "LastName", "Gender", "Department", "AcademicLevel", "Email", "Phone", "Link", "Image")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from coach), '${id}', '${first}', '${middle}', '${last}', '${gender}', '${department}', '${academicLevel}', '${email}', '${phone}', '${link}', '${image}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json({ Status: "Success", id: id, data: rslt.rows[0] });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/coach-status-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    console.log(clientData);
    var id = clientData.data;
    pool.query(
      `INSERT INTO coach_status ("SCHLID") VALUES ('${id}')`,
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

router.post("/coach-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var idd = clientData.CCHID;
    var id = clientData.SCHLID;
    var first = clientData.FirstName;
    var middle = clientData.MiddleInitial;
    var last = clientData.LastName;
    var gender = clientData.Gender;
    var department = clientData.Department;
    var email = clientData.Email;
    var phone = clientData.Phone;
    var link = clientData.Link;
    var image = clientData.Image;
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

router.post("/coach-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
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

router.post("/coach-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
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
