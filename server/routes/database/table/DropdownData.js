import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/academiclevel", (req, res) => {
  const sql = `
      SELECT * 
        FROM academiclevel 

          WHERE ADL_Status = 'ACTIVE'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/coachtype", (req, res) => {
  const sql = `
      SELECT * 
        FROM coach_type 

          WHERE CTP_Status = 'ACTIVE'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/yearlevel", (req, res) => {
  const sql = `
      SELECT * 
        FROM yearlevel 

          WHERE YRL_Status = 'ACTIVE'

          ORDER BY YRLID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/component", (req, res) => {
  const sql = `
      SELECT * 
        FROM course_component 

          WHERE CCP_Status = 'ACTIVE'

          ORDER BY CCPID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/semester", (req, res) => {
  const sql = `
      SELECT * 
        FROM semester 

          WHERE SMS_Status = 'ACTIVE'

          ORDER BY SMSID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/facility", (req, res) => {
  const sql = `
      SELECT * 
        FROM rom_facility 

          WHERE FLT_Status = 'ACTIVE'

          ORDER BY FLTID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/building", (req, res) => {
  const sql = `
      SELECT * 
        FROM rom_building 

          WHERE BLG_Status = 'ACTIVE'

          ORDER BY BLGID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/floor", (req, res) => {
  const sql = `
      SELECT * 
        FROM rom_floor 

          WHERE FLR_Status = 'ACTIVE'

          ORDER BY FLRID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
