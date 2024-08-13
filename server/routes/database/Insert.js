import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// SCHEDULES =>
app.post("/ins-pre-sched", (req, res) => {
  const sql = `
      INSERT INTO schedule 
      (Section, CRS_Code, Room, Component, Units, Day, StartTime, EndTime, SCHLID, ACY_Code ) 
      VALUES 
      (?);
  `;

  const values = [
    req.body.SCT,
    req.body.CRS_CODE,
    req.body.ROM,
    req.body.CPT,
    req.body.UNT,
    req.body.DAY,
    req.body.STR_TME,
    req.body.END_TME,
    req.body.SCHLID,
    req.body.ACY,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// CURRICULUM =>
app.post("/ins-curr", (req, res) => {
  const sql = `
        INSERT INTO curriculum 
        (CRR_Code, Curriculum) 
        VALUES 
        (?)
    `;

  const values = [req.body.CRR_Code, req.body.Curriculum];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// ACADEMIC YEAR =>
app.post("/ins-ay", (req, res) => {
  const sql = `
      INSERT INTO academicyear 
        (ACY_Code, AcademicYear, CRR_Code, StartDate, EndDate) 
      VALUES (?)
  `;

  const values = [
    req.body.ACY_Code,
    req.body.AcademicYear,
    req.body.CRR_Code,
    req.body.StartDate,
    req.body.EndDate,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// DEPARTMENT =>
app.post("/ins-dpt", (req, res) => {
  const sql = `
      INSERT INTO department 
      (DPT_Code, Department, DPT_Abbreviation, DPT_Description) 
      VALUES 
      (?)`;

  const values = [
    req.body.DPT_Code,
    req.body.Department,
    req.body.DPT_Abbreviation,
    req.body.DPT_Description,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// PROGRAM =>
app.post("/ins-prg", (req, res) => {
  const sql = `
        INSERT INTO program 
        (PRG_Code, Program, PRG_Abbreviation, DPT_Code, AcademicLevel, PRG_Description) 
        VALUES 
        (?)
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

// COACH =>
app.post("/ins-coach", (req, res) => {
  const sql = `
      INSERT INTO coach 
      (SCHLID, FirstName, MiddleInitial, LastName, Gender, DPT_Code, Email, Phone, Facebook, Photo) 
      VALUES 
      (?)  
  `;

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
    req.body.Picture,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/ins-assign", (req, res) => {
  const sql = `
    INSERT INTO assignment 
    (SCHLID, ACY_Code, CoachType) 
    VALUES 
    (?)
  `;

  const values = [req.body.SCHLID, req.body.ACY_Code, req.body.CoachType];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/ins-spec", (req, res) => {
  const sql = `
      INSERT INTO specialization 
      (SCHLID, CRS_Code, ACY_Code) 
      VALUES 
      (?)
  `;

  const values = [req.body.SCHLID, req.body.CRS_Code, req.body.ACY_Code];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// COURSE =>
app.post("/ins-crs", (req, res) => {
  const sql = `
      INSERT INTO course 
      (CRS_Code, Course, PRG_Code)
      VALUES 
      (?)
  `;

  const values = [req.body.CRS_Code, req.body.Course, req.body.PRG_Code];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// ROOM =>
app.post("/ins-rom", (req, res) => {
  const sql = `
        INSERT INTO room 
        (Room, Capacity, Facility, Building, Floor) 
        VALUES 
        (?)
    `;

  const values = [
    req.body.Room,
    req.body.Capacity,
    req.body.Facility,
    req.body.Building,
    req.body.Floor,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// SECTION =>

app.post("/ins-sct", (req, res) => {
  const sql = `
      INSERT INTO section 
      (Section, Semester, YearLevel, PRG_Code) 
      VALUES 
      (?)
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

app.post("/ins-proj", (req, res) => {
  const sql = `
      INSERT INTO projection 
      (Section, Population, ACY_Code) 
      VALUES 
      (?)
  `;

  const values = [req.body.Section, req.body.Population, req.body.ACY_Code];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

app.post("/gen-section", (req, res) => {
  const sql = `
      INSERT INTO section 
      (Section, Semester, YearLevel, PRG_Code)
      VALUES 
      (?)
  `;
  const values = [
    req.body.Section,
    req.body.Semester,
    req.body.YearLevel,
    req.body.Program,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: err });
    return res.json(data);
  });
});

// SETUP =>
app.post("/ins-setup", (req, res) => {
  const sql = `
      INSERT INTO setup 
      (CRS_Code, CRR_Code, PRG_Code, Component)
      VALUES 
      (?)
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

// SECTION =>

export default app;
