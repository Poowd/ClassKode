import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// ACADEMIC YEAR =>
app.post("/arc-ay", (req, res) => {
  const sql = `
      UPDATE academicyear 
      SET ACY_Status = 'ARCHIVE' 
      WHERE ACYID = ? 
  `;

  db.query(sql, [req.body.ACYID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
