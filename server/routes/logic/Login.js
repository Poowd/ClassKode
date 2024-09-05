const express = require("express");
const mysql = require("mysql");
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
        SELECT * FROM _users WHERE Email = ? AND Password = ? Limit 1
      `;

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json({ Status: "Success", data: data });
  });
});

module.exports = router;
