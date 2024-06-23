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

app.post("/section-projection", (req, res) => {
  const sql = `
      SELECT * 
        FROM projection 
          INNER JOIN section 
            ON projection.Section = section.Section
          INNER JOIN academicyear
            ON projection.ACY_Code = academicyear.ACY_Code
          
          
          WHERE projection.PRJ_Status = 'ACTIVE' 
            AND projection.Section = ?
          
          ORDER BY PRJID ASC 
    `;

  db.query(sql, [req.body.Section], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-section", (req, res) => {
  const sql = `
      INSERT INTO section (Section, Semester, YearLevel, PRG_Code) 
        VALUES (?)
  `;

  const values = [
    req.body.Section,
    req.body.Semester,
    req.body.YearLevel,
    req.body.PRG_Code,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
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
