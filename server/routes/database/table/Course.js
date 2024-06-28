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
          INNER JOIN program 
            ON course.PRG_Code = program.PRG_Code

          WHERE CRS_Status = 'ACTIVE' 

          ORDER BY CRSID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/course-prerequisite", (req, res) => {
  const sql = `
      SELECT * 
        FROM prerequisite 
          INNER JOIN course 
            ON prerequisite.PreRequisite = course.CRS_Code
          INNER JOIN curriculum
            ON prerequisite.CRR_Code = curriculum.CRR_Code
          
          
          WHERE prerequisite.PRQ_Status = 'ACTIVE' 
            AND prerequisite.CRS_Code = ?
          
          ORDER BY PRQID ASC 
    `;

  db.query(sql, [req.body.CRS_Code], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/course-setup", (req, res) => {
  const sql = `
      SELECT * 
        FROM setup 
          INNER JOIN course 
            ON setup.CRS_Code = course.CRS_Code
          INNER JOIN program 
            ON setup.PRG_Code = program.PRG_Code
          INNER JOIN curriculum
            ON setup.CRR_Code = curriculum.CRR_Code
          
          
          WHERE setup.STP_Status = 'ACTIVE' 
          
          ORDER BY STPID ASC 
    `;

  db.query(sql, [req.body.CRS_Code], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/course-mapping", (req, res) => {
  const sql = `
      SELECT * 
        FROM course_mapping 
          INNER JOIN setup
            ON course_mapping.STPID = setup.STPID
          
          WHERE course_mapping.CMP_Status = 'ACTIVE' 
          
          ORDER BY CMPID ASC 
    `;

  db.query(sql, [req.body.CRS_Code], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-course", (req, res) => {
  const sql = `
      INSERT INTO course (CRS_Code, Course, PRG_Code) 
        VALUES (?)
  `;

  const values = [req.body.CRS_Code, req.body.Course, req.body.PRG_Code];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/add-new-setup", (req, res) => {
  const sql = `
      INSERT INTO setup (CRS_Code, CRR_Code, PRG_Code, Component) 
        VALUES (?)
  `;

  const values = [
    req.body.CRS_Code,
    req.body.CRR_Code,
    req.body.PRG_Code,
    req.body.Component,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/update-existing-course", (req, res) => {
  const sql =
    "UPDATE course SET CRS_Code = ?, Course = ?, PRG_Code = ? WHERE CRSID = ? ";

  db.query(
    sql,
    [req.body.CRS_Code, req.body.Course, req.body.PRG_Code, req.body.CRSID],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/archive-existing-course", (req, res) => {
  const sql = "UPDATE course SET CRS_Status = 'ARCHIVE' WHERE CRSID = ? ";

  db.query(sql, [req.body.CRSID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
