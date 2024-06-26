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

app.post("/add-new-program", (req, res) => {
  const sql = `
      INSERT INTO program (PRG_Code, Program, PRG_Abbreviation, DPT_Code, AcademicLevel, PRG_Description) 
        VALUES (?)
  `;

  const values = [
    req.body.PRG_Code,
    req.body.Program,
    req.body.PRG_Abbreviation,
    req.body.DPT_Code,
    req.body.AcademicLevel,
    req.body.PRG_Description,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/update-existing-program", (req, res) => {
  const sql =
    "UPDATE program SET PRG_Code = ?, Program = ?, PRG_Abbreviation = ?, DPT_Code = ?, AcademicLevel = ?, PRG_Description = ? WHERE PRGID = ? ";

  db.query(
    sql,
    [
      req.body.PRG_Code,
      req.body.Program,
      req.body.PRG_Abbreviation,
      req.body.DPT_Code,
      req.body.AcademicLevel,
      req.body.PRG_Description,
      req.body.PRGID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/archive-existing-program", (req, res) => {
  const sql = "UPDATE program SET PRG_Status = 'ARCHIVE' WHERE PRGID = ? ";

  db.query(sql, [req.body.PRGID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
