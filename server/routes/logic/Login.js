import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// Login =>
app.post("/login-now", (req, res) => {
  const sql = `
        SELECT * FROM _users WHERE Email = ? AND Password = ? Limit 1
      `;

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json({ Status: "Success", data: data });
  });
});

export default app;
