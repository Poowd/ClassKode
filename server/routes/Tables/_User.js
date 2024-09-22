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

router.post("/user-list", (req, res) => {
  try {
    pool.query(`SELECT * FROM _user`, (err, rslt) => {
      res.json(rslt.rows);
    });
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
      var pass = hash;
      pool.query(
        `INSERT INTO _user ("UUID", "SCHLID", "FirstName", "LastName", "Email", "Password", "UserType")
          VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from _user), '${id}', '${first}', '${last}', '${email}', '${pass}', '${type}')`,

        (err, rslt) => {
          if (err) {
            console.error("Query error:", err);
            return;
          }
          res.json(rslt.rows);
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
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
            return res.json({ Status: "Account doesn't exist", data: null });
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
