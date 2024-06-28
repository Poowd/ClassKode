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

app.post("/add-new-curriculum", (req, res) => {
  const sql = `
      INSERT INTO curriculum (CRR_Code, Curriculum) 
        VALUES (?)
  `;

  const values = [req.body.CRR_Code, req.body.Curriculum];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/update-existing-curriculum", (req, res) => {
  const sql =
    "UPDATE curriculum SET CRR_Code = ?, Curriculum = ? WHERE CRRID = ? ";

  db.query(
    sql,
    [req.body.CRR_Code, req.body.Curriculum, req.body.CRRID],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/archive-existing-curriculum", (req, res) => {
  const sql = "UPDATE curriculum SET CRR_Status = 'ARCHIVE' WHERE CRRID = ? ";

  db.query(sql, [req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
