import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/curriculum", (req, res) => {
  const sql = "SELECT * FROM curriculum WHERE CRR_Status = 'ACTIVE'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/curriculum-current", (req, res) => {
  const sql = `
      SELECT * 
        FROM curriculum 

          WHERE CRR_Status = 'ACTIVE' 
          
          ORDER BY CRRID DESC 
          
          Limit 1
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
