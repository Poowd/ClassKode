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
app.post("/arch-sched", (req, res) => {
  const sql = `
        SELECT schedule.SCDID, section.Section, projection.Population, course.Course, schedule.Component, room.Room, room.Capacity, schedule.Day, schedule.StartTime, schedule.EndTime, schedule.Units, coach.LastName, schedule.ACY_Code, schedule.SCHLID, room.Building, room.Floor, schedule.SCD_Created
        FROM schedule
        LEFT JOIN projection
          ON projection.Section = schedule.Section
        LEFT JOIN coach
          ON coach.SCHLID = schedule.SCHLID
        LEFT JOIN room
          ON room.Room = schedule.Room
        LEFT JOIN course
          ON course.CRS_Code = schedule.CRS_Code
        LEFT JOIN section
          ON section.Section = schedule.Section
        WHERE projection.ACY_Code = 'AY-2425'
          AND SCD_Status = 'ARCHIVE'
        ORDER BY schedule.StartTime ASC
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ACADEMIC YEAR =>
app.post("/arch-acy", (req, res) => {
  const sql = `
        SELECT * 
        FROM academicyear 
        WHERE ACY_Status = 'ARCHIVE' 
        ORDER BY ACYID DESC
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-academicyear", (req, res) => {
  const sql = "UPDATE academicyear SET ACY_Status = 'ARCHIVE' WHERE ACYID = ? ";

  db.query(sql, [req.body.ACYID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// CURRICULUM =>
app.post("/arch-curr", (req, res) => {
  const sql = `
      SELECT * 
      FROM curriculum 
      WHERE CRR_Status = 'ARCHIVE' 
      ORDER BY CRRID DESC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-curriculum", (req, res) => {
  const sql = "UPDATE curriculum SET CRR_Status = 'ARCHIVE' WHERE CRRID = ? ";

  db.query(sql, [req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// DEPARTMENT =>
app.post("/arch-dept", (req, res) => {
  const sql = `
        SELECT * 
        FROM department 
        WHERE DPT_Status = 'ARCHIVE' 
        ORDER BY DPTID ASC
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-department", (req, res) => {
  const sql = "UPDATE department SET DPT_Status = 'ARCHIVE' WHERE DPTID = ? ";

  db.query(sql, [req.body.DPTID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// PROGRAM =>
app.post("/arch-prg", (req, res) => {
  const sql = `
      SELECT * 
      FROM program
      INNER JOIN department
      ON program.DPT_Code = department.DPT_Code
      WHERE PRG_Status = 'ARCHIVE'
      ORDER BY PRGID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-program", (req, res) => {
  const sql = "UPDATE program SET PRG_Status = 'ARCHIVE' WHERE PRGID = ? ";

  db.query(sql, [req.body.PRGID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// COURSE =>
app.post("/arch-crs", (req, res) => {
  const sql = `
      SELECT * 
      FROM course 
      INNER JOIN program 
      ON course.PRG_Code = program.PRG_Code
      WHERE CRS_Status = 'ARCHIVE' 
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

// COACH =>
app.post("/arch-coach", (req, res) => {
  const sql = `
      SELECT * 
      FROM coach 
      INNER JOIN department 
      ON coach.DPT_Code = department.DPT_Code 
      WHERE coach.CCH_Status = 'ARCHIVE' 
      ORDER BY CCHID ASC
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-coach", (req, res) => {
  const sql = "UPDATE coach SET CCH_Status = 'ARCHIVE' WHERE CCHID = ? ";

  db.query(sql, [req.body.CCHID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// SECTION =>
app.post("/arch-sect", (req, res) => {
  const sql = `
      SELECT * 
      FROM section
      INNER JOIN program
      ON section.PRG_Code = program.PRG_Code
      WHERE SCT_Status = 'ARCHIVE'
      ORDER BY SCTID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
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

// ROOM =>
app.post("/arch-rom", (req, res) => {
  const sql = `
    SELECT *
    FROM room
    INNER JOIN rom_building
      ON room.Building = rom_building.Building
    INNER JOIN rom_floor
      ON room.Floor = rom_floor.Floor
    INNER JOIN rom_facility
      ON room.Facility = rom_facility.Facility
    WHERE ROM_Status = 'ARCHIVE'
    ORDER BY ROMID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-room", (req, res) => {
  const sql = "UPDATE room SET ROM_Status = 'ARCHIVE' WHERE ROMID = ? ";

  db.query(sql, [req.body.ROMID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
