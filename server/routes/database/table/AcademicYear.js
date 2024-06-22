import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/academicyear", (req, res) => {
  const sql = "SELECT * FROM academicyear WHERE ACY_Status = 'ACTIVE'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/academicyear-current", (req, res) => {
  const sql = `
      SELECT * 
        FROM academicyear 

          WHERE ACY_Status = 'ACTIVE' 
          
          ORDER BY ACYID DESC 
          
          Limit 1
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
