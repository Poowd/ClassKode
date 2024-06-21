import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/program", (req, res) => {
  const sql = `
      SELECT * 
        FROM program
          INNER JOIN department
            ON program.DPT_Code = department.DPT_Code
          
          WHERE PRG_Status = 'ACTIVE'

          ORDER BY PRGID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-program", (req, res) => {
  const sql = "UPDATE program SET PRG_Status = 'ARCHIVE' WHERE PRGID = ? ";

  db.query(sql, [req.body.PRGID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
