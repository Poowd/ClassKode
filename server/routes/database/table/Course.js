import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/course", (req, res) => {
  const sql = `
      SELECT * 
        FROM course 
          INNER JOIN academiclevel 
            ON course.AcademicLevel = academiclevel.AcademicLevel

          WHERE CRS_Status = 'ACTIVE' 

          ORDER BY CRSID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-course", (req, res) => {
  const sql = "UPDATE course SET CRS_Status = 'ARCHIVE' WHERE CRSID = ? ";

  db.query(sql, [req.body.CRSID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
