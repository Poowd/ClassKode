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
    "SELECT * FROM coach INNER JOIN department ON coach.DPTID = department.DPTID WHERE CCH_Status = 'ACTIVE'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-coach", (req, res) => {
  const sql =
    "INSERT INTO coach (`SCHLID`, `CCH_FirstName`, `CCH_MiddleInitial`, `CCH_LastName`, `CCH_Gender`, `DPTID`, `CCH_Email`, `CCH_Contact`, `CCH_Facebook`) VALUES (?)";

  const values = [
    req.body.SCHLID,
    req.body.CCH_FirstName,
    req.body.CCH_MiddleInitial,
    req.body.CCH_LastName,
    req.body.CCH_Gender,
    req.body.DPT_Department,
    req.body.CCH_Email,
    req.body.CCH_Contact,
    req.body.CCH_Facebook,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/update-existing-coach", (req, res) => {
  const sql =
    "UPDATE coach SET SCHLID = ?, CCH_FirstName = ?, CCH_MiddleIntial = ?, CCH_LastName = ?, CCH_Gender = ?, DPTID = ?, CCH_Email = ?, CCH_Contact = ?, CCH_Facebook = ? WHERE CCHID = ? ";

  db.query(
    sql,
    [
      req.body.SCHLID,
      req.body.CCH_FirstName,
      req.body.CCH_MiddleIntial,
      req.body.CCH_LastName,
      req.body.CCH_Gender,
      req.body.DPT_Department,
      req.body.CCH_Email,
      req.body.CCH_Contact,
      req.body.CCH_Facebook,
      req.body.CCHID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/archive-existing-coach", (req, res) => {
  const sql = "UPDATE coach SET CCH_Status = 'ARCHIVED' WHERE CCHID = ? ";

  db.query(sql, [req.body.CCHID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
