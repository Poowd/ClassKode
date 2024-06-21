import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/section", (req, res) => {
  const sql = `
      SELECT * 
        FROM section
          INNER JOIN program
            ON section.PRG_Code = program.PRG_Code

          WHERE SCT_Status = 'ACTIVE'

          ORDER BY SCTID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-section", (req, res) => {
  const sql = "UPDATE section SET SCT_Status = 'ARCHIVE' WHERE SCTID = ? ";

  db.query(sql, [req.body.SCTID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
