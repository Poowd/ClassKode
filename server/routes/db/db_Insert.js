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
app.post("/ins-ay", (req, res) => {
  const sql = `
      INSERT INTO academicyear 
        (ACY_Code, AcademicYear, CRR_Code, StartDate, EndDate) 
      VALUES (?)
  `;

  const values = [
    req.body.ACY_Code,
    req.body.AcademicYear,
    req.body.CRR_Code,
    req.body.StartDate,
    req.body.EndDate,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
