import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// SCHEDULES =>
app.post("/population-per-year", (req, res) => {
  const sql = `
        SELECT 
          SUM(projection.Population) as Population, 
          projection.ACY_Code, 
          section.Semester 
        FROM projection 
        INNER JOIN section npm run
          ON section.Section = projection.Section 
        WHERE ACY_Code = 'AY-2425' 
          AND section.Semester = 'First Semester'
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
