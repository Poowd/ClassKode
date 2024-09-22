const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});
const app = express();

// Login =>
router.post("/ldasdaogin-now", (req, res) => {
  const clientData = JSON.parse(req.body);
  const sql = `
        SELECT * FROM _users WHERE Email = ? Limit 1
      `;
  const pass = clientData.password;
  const email = clientData.email;

  db.query(sql, [email], (err, data) => {
    if (err) return res.json({ Status: "Server Sided Error" });
    try {
      bcrypt.compare(pass, data[0].Password, (err, resu) => {
        if (err) {
          console.error("Verification error:", err);
        } else if (resu) {
          return res.json({ Status: "Success", data: JSON.parse(req.body) });
        } else {
          console.log("Password does not match");
          console.log(pass);
          return res.json({ Status: "Account doesn't exist", data: null });
        }
      });
    } catch (error) {
      return res.json({ Status: "Account doesn't exist" });
    }
  });
});

module.exports = router;
