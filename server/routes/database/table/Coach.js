import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/coach", (req, res) => {
  const sql = `
      SELECT * 
        FROM coach 
          INNER JOIN department 
            ON coach.DPT_Code = department.DPT_Code 
          
          WHERE coach.CCH_Status = 'ACTIVE' 
          
          ORDER BY CCHID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/coach-assignment", (req, res) => {
  const sql = `
      SELECT *
        FROM assignment
          INNER JOIN coach_type
            ON assignment.CoachType = coach_type.CoachType
          INNER JOIN academicyear
            ON assignment.ACY_Code = academicyear.ACY_Code
          INNER JOIN coach
            ON assignment.SCHLID = coach.SCHLID
          
          WHERE assignment.ASG_Status = 'ACTIVE' 
            AND assignment.SCHLID = ?
          
          ORDER BY ACYID DESC
    `;

  db.query(sql, [req.body.SCHLID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/assignment", (req, res) => {
  const sql = `
      SELECT *
        FROM assignment
          INNER JOIN coach_type
            ON assignment.CoachType = coach_type.CoachType
          INNER JOIN academicyear
            ON assignment.ACY_Code = academicyear.ACY_Code
          INNER JOIN coach
            ON assignment.SCHLID = coach.SCHLID
          
          WHERE assignment.ASG_Status = 'ACTIVE'
          
          ORDER BY ACYID ASC
    `;

  db.query(sql, [req.body.SCHLID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/coach-specialization", (req, res) => {
  const sql = `
      SELECT * 
        FROM specialization 
          INNER JOIN assignment 
            ON specialization.SCHLID = assignment.SCHLID
          INNER JOIN course
            ON specialization.CRS_Code = course.CRS_Code
          INNER JOIN academicyear
            ON specialization.ACY_Code = academicyear.ACY_Code
          
          
          WHERE specialization.SPL_Status = 'ACTIVE' 
            AND specialization.SCHLID = ?
          
          ORDER BY ACYID DESC 
    `;

  db.query(sql, [req.body.SCHLID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-coach", (req, res) => {
  const sql =
    "INSERT INTO coach (`SCHLID`, `FirstName`, `MiddleInitial`, `LastName`, `Gender`, `DPT_Code`, `Email`, `Phone`, `Facebook`) VALUES (?)";

  const values = [
    req.body.SCHLID,
    req.body.FirstName,
    req.body.MiddleInitial,
    req.body.LastName,
    req.body.Gender,
    req.body.Department,
    req.body.Email,
    req.body.Phone,
    req.body.Facebook,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/add-new-assignment", (req, res) => {
  const sql =
    "INSERT INTO assignment (`SCHLID`, `ACY_Code`, `CoachType`) VALUES (?)";

  const values = [req.body.SCHLID, req.body.ACY_Code, req.body.CoachType];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/add-new-specialization", (req, res) => {
  const sql =
    "INSERT INTO specialization (`SCHLID`, `CRS_Code`, `ACY_Code`) VALUES (?)";

  const values = [req.body.SCHLID, req.body.CRS_Code, req.body.ACY_Code];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/update-existing-coach", (req, res) => {
  const sql =
    "UPDATE coach SET SCHLID = ?, FirstName = ?, MiddleInitial = ?, LastName = ?, Gender = ?, DPT_Code = ?, Email = ?, Phone = ?, Facebook = ? WHERE CCHID = ? ";

  db.query(
    sql,
    [
      req.body.SCHLID,
      req.body.FirstName,
      req.body.MiddleInitial,
      req.body.LastName,
      req.body.Gender,
      req.body.Department,
      req.body.Email,
      req.body.Phone,
      req.body.Facebook,
      req.body.CCHID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/archive-existing-coach", (req, res) => {
  const sql = "UPDATE coach SET CCH_Status = 'ARCHIVE' WHERE CCHID = ? ";

  db.query(sql, [req.body.CCHID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
