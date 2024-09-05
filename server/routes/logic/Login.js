const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs")
const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// Login =>
router.post("/login-now", (req, res) => {
  const sql = `
        SELECT * FROM _users WHERE Email = ? Limit 1
      `;
  const pass = req.body.password;

  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    bcrypt.compare(pass, data[0].Password, (err, resu) => {
      if (err) {
        console.error("Verification error:", err);
      } else if (resu) {
        return res.json({ Status: "Success", data: data });
      } else {
        console.log("Password does not match");
      }
    });
  });
});

module.exports = router;
