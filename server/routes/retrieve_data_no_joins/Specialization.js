import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/SPCL_CRS", (req, res) => {
  const sql = `
      SELECT 
        coach.LastName, course.Course
        FROM specialization 
        
        RIGHT JOIN coach
        ON coach.SCHLID = specialization.SCHLID
        RIGHT JOIN course
        ON course.CRS_Code = specialization.CRS_Code
        
        
        WHERE ACY_Code = 'AY-2425'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
