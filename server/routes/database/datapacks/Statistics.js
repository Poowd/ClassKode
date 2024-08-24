import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/total-coach", (req, res) => {
  const sql = `SELECT COUNT(SCHLID) as Total_Coach FROM assignment WHERE ACY_Code = 'AY-2425'`;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/total-coach-type", (req, res) => {
  const sql = `SELECT COUNT(SCHLID) as Total_Coach_Type FROM assignment WHERE ACY_Code = 'AY-2425' AND CoachType = ?`;

  db.query(sql, [req.body.type], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/total-section", (req, res) => {
  const sql = `SELECT 
          SUM(projection.Population) as Total_Population, 
          projection.ACY_Code, 
          section.Semester,
          COUNT(projection.Section) as  
        FROM projection 
        INNER JOIN section
          ON section.Section = projection.Section 
        WHERE ACY_Code = 'AY-2425' 
          AND section.Semester = ?`;

  db.query(sql, [req.body.semester], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/total-population", (req, res) => {
  const sql = ``;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
