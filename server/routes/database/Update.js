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
app.post("/res-sched", (req, res) => {
  const sql = `
      UPDATE schedule 
      SET SCD_Status = 'ACTIVE' 
      WHERE SCDID = ?
  `;

  db.query(sql, [req.body.SCDID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// CURRICULUM =>
app.post("/upd-curr", (req, res) => {
  const sql = `
      UPDATE curriculum 
      SET CRR_Code = ?, 
          Curriculum = ? 
      WHERE CRRID = ?
  `;

  db.query(
    sql,
    [req.body.CRR_Code, req.body.Curriculum, req.body.CRRID],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-curr", (req, res) => {
  const sql = `
      UPDATE curriculum 
      SET CRR_Status = 'ACTIVE' 
      WHERE CRRID = ?
  `;

  db.query(sql, [req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ACADEMIC YEAR =>
app.post("/arc-ay", (req, res) => {
  const sql = `
      UPDATE academicyear 
      SET ACY_Status = 'ARCHIVE' 
      WHERE ACYID = ? 
  `;

  db.query(sql, [req.body.ACYID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/res-acy", (req, res) => {
  const sql = `
      UPDATE academicyear 
      SET ACY_Status = 'ACTIVE' 
      WHERE ACYID = ?
  `;

  db.query(sql, [req.body.ACYID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// COACH =>
app.post("/upd-coach", (req, res) => {
  const sql = `
      UPDATE coach 
      SET SCHLID = ?, 
          FirstName = ?, 
          MiddleInitial = ?, 
          LastName = ?, 
          Gender = ?, 
          DPT_Code = ?, 
          Email = ?, 
          Phone = ?, 
          Facebook = ?,
          Photo = ? 
      WHERE CCHID = ?   
  `;

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
      req.body.Photo,
      req.body.CCHID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-coach", (req, res) => {
  const sql = `
      UPDATE coach 
      SET CCH_Status = 'ACTIVE' 
      WHERE CCHID = ?
  `;

  db.query(sql, [req.body.CCHID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// DEPARTMENT =>
app.post("/upd-dept", (req, res) => {
  const sql = `
      UPDATE department 
      SET DPT_Code = ?, 
          Department = ?, 
          DPT_Abbreviation = ?, 
          DPT_Description = ? 
      WHERE DPTID = ? 
    `;

  db.query(
    sql,
    [
      req.body.DPT_Code,
      req.body.Department,
      req.body.DPT_Abbreviation,
      req.body.DPT_Description,
      req.body.DPTID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-dept", (req, res) => {
  const sql = "UPDATE department SET DPT_Status = 'ACTIVE' WHERE DPTID = ? ";

  db.query(sql, [req.body.DPTID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// PROGRAM =>
app.post("/upd-prg", (req, res) => {
  const sql = `
      UPDATE program 
      SET PRG_Code = ?, 
          Program = ?, 
          PRG_Abbreviation = ?, 
          DPT_Code = ?, 
          AcademicLevel = ?, 
          PRG_Description = ?
      WHERE PRGID = ? 
  `;

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

app.post("/res-prg", (req, res) => {
  const sql = `
      UPDATE program 
      SET PRG_Status = 'ACTIVE'
      WHERE PRGID = ?`;

  db.query(sql, [req.body.PRGID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// COURSE =>
app.post("/upd-crs", (req, res) => {
  const sql = `
      UPDATE course 
      SET CRS_Code = ?, 
          Course = ?, 
          PRG_Code = ? 
      WHERE CRSID = ?  
  `;

  db.query(
    sql,
    [req.body.CRS_Code, req.body.Course, req.body.PRG_Code, req.body.CRSID],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-crs", (req, res) => {
  const sql = "UPDATE course SET CRS_Status = 'ACTIVE' WHERE CRSID = ? ";

  db.query(sql, [req.body.CRSID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ROOM =>
app.post("/upd-room", (req, res) => {
  const sql = `
      UPDATE room 
      SET Room = ?, 
          Capacity = ?, 
          Facility = ?, 
          Building = ?, 
          Floor = ? 
      WHERE ROMID = ?  
  `;

  db.query(
    sql,
    [
      req.body.Room,
      req.body.Capacity,
      req.body.Facility,
      req.body.Building,
      req.body.Floor,
      req.body.ROMID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-rom", (req, res) => {
  const sql = "UPDATE room SET ROM_Status = 'ACTIVE' WHERE ROMID = ? ";

  db.query(sql, [req.body.ROMID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// SECTION =>
app.post("/upd-sct", (req, res) => {
  const sql = `
      UPDATE section 
      SET Section = ?, 
          Semester = ?, 
          YearLevel = ?, 
          PRG_Code = ? 
      WHERE SCTID = ? 
  `;

  db.query(
    sql,
    [
      req.body.Section,
      req.body.Semester,
      req.body.YearLevel,
      req.body.PRG_Code,
      req.body.SCTID,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});

app.post("/res-sect", (req, res) => {
  const sql = "UPDATE section SET SCT_Status = 'ACTIVE' WHERE SCTID = ? ";

  db.query(sql, [req.body.SCTID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
