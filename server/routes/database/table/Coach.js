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
  const sql =
    "SELECT * FROM coach INNER JOIN department ON coach.DPT_Code = department.DPT_Code WHERE coach.CCH_Status = 'ACTIVE'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/coach-status", (req, res) => {
  const sql =
    "SELECT * FROM currentcoach INNER JOIN assignment ON currentcoach.SCHLID = assignment.SCHLID WHERE currentcoach.SCHLID = ? AND currentcoach.ACY_Code = ?";

  db.query(sql, [req.body.SCHLID, req.body.ACY_Code], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/coach-specialization", (req, res) => {
  const sql =
    "SELECT * FROM specialization INNER JOIN course ON specialization.CRS_Code = course.CRS_Code WHERE SCHLID = ? AND ACY_Code = ?";

  db.query(sql, [req.body.SCHLID, req.body.ACY_Code], (err, data) => {
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
    if (err) return res.json({ Message: "Server Sided Error" });
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
