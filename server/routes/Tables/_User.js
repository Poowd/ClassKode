const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres.pgcztzkowuxixfyiqera",
  password: "Clskde_#5*Ths2",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
});

router.get("/user-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM _user WHERE "UUI_Status"='ACTIVE'`,
      (err, rslt) => {
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/student-section", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    const id = clientData.data;
    pool.query(
      `SELECT * FROM student_section WHERE "SCHLID"='${id}' LIMIT 1`,
      (err, rslt) => {
        res.json(rslt.rows[0]);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/all-coach-status", (req, res) => {
  try {
    pool.query(`SELECT * FROM coach_status`, (err, rslt) => {
      res.json(rslt.rows);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/coach-status", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    const id = clientData.data;
    pool.query(
      `SELECT * FROM coach_status WHERE "SCHLID"='${id}' LIMIT 1`,
      (err, rslt) => {
        res.json(rslt.rows[0]);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/coach-status-update", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.id;
    var status = clientData.status;
    var description = clientData.description;
    pool.query(
      `UPDATE coach_status SET "ClassStatus"='${status}', "Description"='${description}'  WHERE "SCHLID"='${id}'`,
      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows[0]);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/student-section-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var data = clientData.data;
    var section = clientData.section;
    var id = clientData.id;
    pool.query(
      `UPDATE student_section SET "Section"='${data}' WHERE "SCHLID"='${id}' AND "Section"='${section}'`,
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

router.post("/student-section-add", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var section = clientData.section;
    var id = clientData.id;
    pool.query(
      `INSERT INTO student_section ("SCHLID", "Section") VALUES ('${id}', '${section}')`,
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

const saltRounds = 10;
router.post("/user-generate", (req, res) => {
  const clientData = JSON.parse(req.body);
  try {
    bcrypt.hash(`${clientData.Firstname}`, saltRounds, function (err, hash) {
      console.log(hash);
      var id = clientData.SchoolID;
      var first = clientData.Firstname;
      var last = clientData.Lastname;
      var email = clientData.Email;
      var type = clientData.Type;
      var level = clientData.PermissionLevel;
      var pass = hash;
      pool.query(
        `INSERT INTO _user ("UUID", "SCHLID", "FirstName", "LastName", "Email", "Password", "UserType", "PermissionLevel")
          VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from _user), '${id}', '${first}', '${last}', '${email}', '${pass}', '${type}', '${level}')`,

        (err, rslt) => {
          if (err) {
            console.error("Query error:", err);
            return res.json({ Status: "Failed", data: err });
          }
          res.json({ Status: "Success", data: rslt.rows });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.json({ Status: "Failed", data: err });
    //res.status(500).send("Internal Server Error");
  }
});

router.post("/user-login", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    const pass = clientData.password;
    const email = clientData.email;

    pool.query(`SELECT * FROM _user WHERE "Email"='${email}'`, (err, rslt) => {
      if (err) return res.json({ Status: "Server Sided Error" });
      try {
        bcrypt.compare(pass, rslt.rows[0].Password, (err, resu) => {
          if (err) {
            console.error("Verification error:", err);
          } else if (resu) {
            return res.json({ Status: "Success", data: rslt.rows[0] });
          } else {
            console.log("Password does not match");
            return res.json({
              Status: "Account Details doesn't match",
              data: null,
            });
          }
        });
      } catch (error) {
        console.log(pass);
        return res.json({ Status: "Account doesn't exist" });
      }
    });
  } catch (err) {
    return res.json({ Status: "Account doesn't exist" });
  }
});

module.exports = router;
