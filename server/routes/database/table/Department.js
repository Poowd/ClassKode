import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/department", (req, res) => {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-department", (req, res) => {
  const sql =
    "INSERT INTO department (`DPT_Code`, `Department`, `DPT_Abbreviation`, `DPT_Description`) VALUES (?)";

  const values = [
    req.body.DPT_Code,
    req.body.Department,
    req.body.DPT_Abbreviation,
    req.body.DPT_Description,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/archive-existing-department", (req, res) => {
  const sql = "UPDATE department SET DPT_Status = 'ARCHIVE' WHERE DPTID = ? ";

  db.query(sql, [req.body.DPTID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
