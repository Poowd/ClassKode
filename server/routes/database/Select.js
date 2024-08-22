import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

// USERS =>
app.post("/sel-users", (req, res) => {
  const sql = `
        SELECT * FROM _users
      `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// SCHEDULES =>
app.post("/sel-sched", (req, res) => {
  const sql = `
      SELECT schedule.SCDID, section.Section, projection.Population, course.Course, schedule.Component, room.Room, room.Capacity, schedule.Day, schedule.StartTime, schedule.EndTime, schedule.Units, coach.LastName, schedule.ACY_Code, schedule.SCHLID, room.Building, room.Floor
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
        OR SUBSTRING(schedule.Section, 1, 3) = 'ABC'
        AND schedule.Section
      LIKE '%${req.body.Search}%'
      ORDER BY schedule.StartTime ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-exp-class", (req, res) => {
  const sql = `
      SELECT course.CRS_Code, course.Course, section.Section, setup.Component, projection.Population, course_component.MaxUnits, section.Semester, yearlevel.YearLevel
      FROM section
      INNER JOIN yearlevel
        ON yearlevel.YearLevel = section.YearLevel
      INNER JOIN projection
        ON projection.Section = section.Section
      INNER JOIN setup
        ON setup.PRG_Code = section.PRG_Code
      INNER JOIN course
        ON course.CRS_Code = setup.CRS_Code
      INNER JOIN course_component
        ON course_component.Component = setup.Component
      WHERE projection.ACY_Code = 'AY-2425'
        AND section.YearLevel = setup.YL
        AND section.Semester = setup.SMS
      ORDER BY section.Section ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-wke-evt", (req, res) => {
  const sql = `
      SELECT *
      FROM weeklyevent
      WHERE WKE_Status = 'ACTIVE'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ACADEMIC YEAR =>
app.post("/sel-ay", (req, res) => {
  const sql = `
      SELECT * 
      FROM academicyear 
      WHERE ACY_Status = 'ACTIVE' 
      ORDER BY ACYID DESC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-cur-ay", (req, res) => {
  const sql = `
      SELECT * 
      FROM academicyear 
      WHERE ACY_Status = 'ACTIVE'    
      ORDER BY ACYID DESC 
      Limit 1
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// CURRICULUM =>
app.post("/sel-curr", (req, res) => {
  const sql = `
      SELECT * 
      FROM curriculum 
      WHERE CRR_Status = 'ACTIVE' 
      ORDER BY CRRID DESC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-cur-curr", (req, res) => {
  const sql = `
      SELECT * 
      FROM curriculum 
      WHERE CRR_Status = 'ACTIVE' 
      ORDER BY CRRID DESC 
      Limit 1
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// DEPARTMENT =>
app.post("/sel-dept", (req, res) => {
  const sql = `
      SELECT * 
      FROM department 
      WHERE DPT_Status = 'ACTIVE' 
      ORDER BY DPTID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// PROGRAM =>
app.post("/sel-prg", (req, res) => {
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

// COURSE =>
app.post("/sel-crs", (req, res) => {
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

app.post("/sel-compt", (req, res) => {
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

app.post("/sel-spl-crs", (req, res) => {
  const sql = `
      SELECT 
        coach.LastName, course.Course
        FROM specialization 
        RIGHT JOIN coach
        ON coach.SCHLID = specialization.SCHLID
        RIGHT JOIN course
        ON course.CRS_Code = specialization.CRS_Code
        WHERE ACY_Code = 'AY-2425'
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-crs-preq", (req, res) => {
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

// COACH =>
app.post("/sel-coach", (req, res) => {
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

app.post("/sel-coach-asgn", (req, res) => {
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

app.post("/sel-coach-spl", (req, res) => {
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

// COACH TYPE =>
app.post("/sel-coach-type", (req, res) => {
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

// SECTION =>
app.post("/sel-sect", (req, res) => {
  const sql = `
      SELECT * 
      FROM section
      INNER JOIN program
      ON section.PRG_Code = program.PRG_Code
      WHERE SCT_Status = 'ACTIVE'
      ORDER BY SCTID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/sel-sect-proj", (req, res) => {
  const sql = `
      SELECT * 
      FROM projection 
      INNER JOIN section 
        ON projection.Section = section.Section
      INNER JOIN academicyear
        ON projection.ACY_Code = academicyear.ACY_Code
      WHERE projection.PRJ_Status = 'ACTIVE' 
        AND projection.Section = ?
      ORDER BY PRJID ASC 
    `;

  db.query(sql, [req.body.Section], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-proj", (req, res) => {
  const sql = `
      SELECT * 
      FROM projection 
      INNER JOIN section 
        ON projection.Section = section.Section
      INNER JOIN academicyear
        ON projection.ACY_Code = academicyear.ACY_Code
      WHERE projection.PRJ_Status = 'ACTIVE' 
      ORDER BY PRJID ASC 
    `;

  db.query(sql, [req.body.Section], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ROOM =>
app.post("/sel-rom", (req, res) => {
  const sql = `
    SELECT *
    FROM room
    INNER JOIN rom_building
      ON room.Building = rom_building.Building
    INNER JOIN rom_floor
      ON room.Floor = rom_floor.Floor
    INNER JOIN rom_facility
      ON room.Facility = rom_facility.Facility
    WHERE ROM_Status = 'ACTIVE'
    ORDER BY ROMID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/sel-fac", (req, res) => {
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

app.post("/sel-buil", (req, res) => {
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

app.post("/sel-flor", (req, res) => {
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

app.post("/sel-place", (req, res) => {
  const sql = `
      SELECT PLCID,PLC_Code,PLC_Status,rom_building.Building,rom_floor.Floor,room.Room,room.Capacity
      FROM placement
      INNER JOIN rom_building
        ON placement.Building = rom_building.Building
      INNER JOIN rom_floor
        ON placement.Floor = rom_floor.Floor
      LEFT JOIN room
        ON placement.Room = room.Room
      WHERE PLC_Status = 'ACTIVE'
      ORDER BY PLCID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ASSIGNMENT =>
app.post("/sel-asgn", (req, res) => {
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

// PROJECTION =>
app.post("/sel-prj", (req, res) => {
  const sql = `
      SELECT * 
      FROM projection 
      INNER JOIN section 
      ON projection.Section = section.Section
      INNER JOIN academicyear
      ON projection.ACY_Code = academicyear.ACY_Code
      WHERE projection.PRJ_Status = 'ACTIVE' 
      ORDER BY PRJID ASC 
    `;

  db.query(sql, [req.body.SCHLID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// SETUP =>
app.post("/sel-setup", (req, res) => {
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

// PLACEMENT =>
app.post("/sel-place", (req, res) => {
  const sql = `
        SELECT PLCID,PLC_Code,PLC_Status,rom_building.Building,rom_floor.Floor,room.Room,room.Capacity
          FROM placement
            INNER JOIN rom_building
              ON placement.Building = rom_building.Building
            INNER JOIN rom_floor
              ON placement.Floor = rom_floor.Floor
            LEFT JOIN room
              ON placement.Room = room.Room
  
            WHERE PLC_Status = 'ACTIVE'
  
            ORDER BY PLCID ASC
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

// ACADEMIC LEVEL =>
app.post("/sel-acyl", (req, res) => {
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

// SEMESTER =>
app.post("/sel-sem", (req, res) => {
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

// YEAR LEVEL =>
app.post("/sel-yrlvl", (req, res) => {
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

export default app;
