import express from "express";
import mysql from "mysql";
import bcrypt from "bcryptjs";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// Login =>
//const bcrypt = require("bcryptjs");
app.post("/login-now", (req, res) => {
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

export default app;
