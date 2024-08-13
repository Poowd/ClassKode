import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// app.post("/academicyear", (req, res) => {
//   const sql =
//     "SELECT * FROM academicyear WHERE ACY_Status = 'ACTIVE' ORDER BY ACYID DESC";

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

// app.post("/academicyear-current", (req, res) => {
//   const sql = `
//       SELECT *
//         FROM academicyear

//           WHERE ACY_Status = 'ACTIVE'

//           ORDER BY ACYID DESC

//           Limit 1
//   `;

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

// app.post("/add-new-academicyear", (req, res) => {
//   const sql = `
//       INSERT INTO academicyear (ACY_Code, AcademicYear, CRR_Code, StartDate, EndDate)
//         VALUES (?)
//   `;

//   const values = [
//     req.body.ACY_Code,
//     req.body.AcademicYear,
//     req.body.CRR_Code,
//     req.body.StartDate,
//     req.body.EndDate,
//   ];

//   db.query(sql, [values], (err, data) => {
//     if (err) return res.json({ Message: err });
//     return res.json(data);
//   });
// });

// app.post("/archive-existing-academicyear", (req, res) => {
//   const sql = "UPDATE academicyear SET ACY_Status = 'ARCHIVE' WHERE ACYID = ? ";

//   db.query(sql, [req.body.ACYID], (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });

export default app;
