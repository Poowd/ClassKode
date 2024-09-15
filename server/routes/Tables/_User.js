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

router.post("/", (req, res) => {
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
router.post("/generate", (req, res) => {
  try {
    bcrypt.hash(`${req.body.Firstname}`, saltRounds, function (err, hash) {
      console.log(hash);
      var id = req.body.SchoolID;
      var first = req.body.Firstname;
      var last = req.body.Lastname;
      var email = req.body.Email;
      var type = req.body.Type;
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

router.post("/login-now", (req, res) => {
  try {
    const pass = req.body.password;
    const email = req.body.email;

    pool.query(`SELECT * FROM _user WHERE "Email"='${email}'`, (err, rslt) =>
      bcrypt.compare(pass, rslt.rows[0].Password, (err, resu) => {
        console.log(resu);
        if (err) {
          console.error("Verification error:", err);
        } else if (resu) {
          return res.json({ Status: "Success", data: rslt.rows[0] });
        } else {
          console.log("Password does not match");
        }
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// router.post("/login-now", (req, res) => {
//   const sql = `
//         SELECT * FROM _users WHERE Email = ? Limit 1
//       `;
//   const pass = req.body.password;

//   db.query(sql, [req.body.email], (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     bcrypt.compare(pass, data[0].Password, (err, resu) => {
//       if (err) {
//         console.error("Verification error:", err);
//       } else if (resu) {
//         return res.json({ Status: "Success", data: data });
//       } else {
//         console.log("Password does not match");
//       }
//     });
//   });
// });

module.exports = router;
