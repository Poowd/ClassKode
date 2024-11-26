const express = require("express");
const router = express.Router();

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres.pgcztzkowuxixfyiqera",
  password: "Clskde_#5*Ths2",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
});

router.get("/class-schedule-list", (req, res) => {
  try {
    pool.query(
      `SELECT class_schedules."CLSID", course."CourseID", course."Course", section."Section", program."AcademicLevel", class_schedules."YearLevel", class_schedules."Day", class_schedules."StartTime", class_schedules."EndTime", class_schedules."Room", class_schedules."Component", coach."SCHLID", coach."FirstName", coach."LastName", class_schedules."Population", class_schedules."Created", class_schedules."Status", class_schedules."Units", class_schedules."Capacity", class_schedules."AcademicYear" 

      FROM class_schedules 
      FULL JOIN coach ON class_schedules."Coach" = coach."SCHLID" 
      INNER JOIN course ON class_schedules."Course" = course."CourseID"
      INNER JOIN section ON class_schedules."Section" = section."Section" 
      INNER JOIN program ON section."Program" = program."Code" 

      WHERE class_schedules."Status"='ACTIVE'
      AND class_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/exam-schedule-list", (req, res) => {
  try {
    pool.query(
      `SELECT exam_schedules."ELSID", exam_schedules."Code", exam_schedules."Course", exam_schedules."Section", exam_schedules."Day", exam_schedules."StartTime",exam_schedules."EndTime", exam_schedules."Level", exam_schedules."Room", exam_schedules. "Population", exam_schedules."Created", exam_schedules."Status", exam_schedules."Component", exam_schedules."Capacity", exam_schedules."AcademicYear", coach."SCHLID", CONCAT(coach."LastName", ', ', coach."FirstName") as "Coach" FROM exam_schedules LEFT JOIN coach ON exam_schedules."Coach" = coach."SCHLID" WHERE exam_schedules."Status"='ACTIVE' AND exam_schedules."AcademicYear"=(SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/exam-schedule-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM exam_schedules WHERE "ELSID"='${id}'`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/class-schedule-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM class_schedules WHERE "CLSID"='${id}'`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/exam-schedule-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var code = clientData.CourseCode;
    var course = clientData.Course;
    var section = clientData.Section;
    var component = clientData.Component;
    var time = clientData.Time;
    var level = clientData.Level;
    var room = clientData.Room;
    var day = clientData.Day;
    var capacity = clientData.Capacity;
    var population = clientData.Population;

    pool.query(
      `INSERT INTO exam_schedules ("ELSID", "Code", "Course", "Section", "Day", "StartTime", "EndTime", "Level", "Room", "Population", "Component", "Capacity", "AcademicYear")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from exam_schedules), '${code}', '${course}', '${section}', '${day}', '${time}', '${
        time + 90
      }', '${level}', '${room}', '${population}', '${component}', '${capacity}', (SELECT "Code" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1))`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/class-schedule-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var course = clientData.CRS_CODE;
    var section = clientData.SCT;
    var yearlevel = clientData.YRLVL;
    var day = clientData.DAY;
    var starttime = clientData.STR_TME;
    var endtime = clientData.END_TME;
    var room = clientData.ROM;
    var component = clientData.CPT;
    var coach = clientData.SCHLID;
    var population = clientData.PPL;
    var units = clientData.UNT;
    var capacity = clientData.CPC;
    var academicyear = clientData.ACY;
    pool.query(
      `INSERT INTO class_schedules ("CLSID", "Course", "Section", "YearLevel", "Day", "StartTime", "EndTime", "Room", "Component", "Coach", "Population", "Units", "Capacity", "AcademicYear")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from class_schedules), '${course}', '${section}', '${yearlevel}', '${day}', '${starttime}', '${endtime}', '${room}', '${component}', '${coach}', '${population}', '${units}', '${capacity}', '${academicyear}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/class-schedule-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.CLSID;
    var course = clientData.Course;
    var section = clientData.Section;
    var yearlevel = clientData.YearLevel;
    var day = clientData.Day;
    var starttime = clientData.StartTime;
    var endtime = clientData.EndTime;
    var room = clientData.Room;
    var component = clientData.Component;
    var coach = clientData.Coach;
    var population = clientData.Population;
    var units = clientData.Units;
    var capacity = clientData.Capacity;
    var academicyear = clientData.AcademicYear;
    pool.query(
      `UPDATE class_schedules 

      SET 
      "Course"='${course}', 
      "Section"='${section}', 
      "YearLevel"='${yearlevel}', 
      "Day"='${day}', 
      "StartTime"='${starttime}', 
      "EndTime"='${endtime}' , 
      "Room"='${room}' , 
      "Component"='${component}' , 
      "Coach"='${coach}' ,
      "Population"='${population}'   , 
      "Units"='${units}'   , 
      "Capacity"='${capacity}'   , 
      "AcademicYear"='${academicyear}'  
      
      WHERE "CLSID"='${id}'`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        console.log(clientData);
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/exam-schedule-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.ELSID;
    var code = clientData.Code;
    var course = clientData.Course;
    var section = clientData.Section;
    var yearlevel = clientData.Level;
    var day = clientData.Day;
    var starttime = clientData.StartTime;
    var endtime = clientData.EndTime;
    var room = clientData.Room;
    var component = clientData.Component;
    var coach = clientData.Coach;
    var population = clientData.Population;
    var units = clientData.Units;
    var capacity = clientData.Capacity;
    var academicyear = clientData.AcademicYear;
    pool.query(
      `UPDATE exam_schedules 

      SET 
      "Code"='${code}', 
      "Course"='${course}', 
      "Section"='${section}', 
      "Day"='${day}', 
      "StartTime"='${starttime}', 
      "EndTime"='${endtime}' ,  
      "Level"='${yearlevel}', 
      "Room"='${room}' , 
      "Coach"='${coach}' ,
      "Population"='${population}'   ,
      "Component"='${component}' ,  
      "Capacity"='${capacity}'   , 
      "AcademicYear"='${academicyear}' 
      
      WHERE "ELSID"='${id}'`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/class-schedule-insert-manual", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var course = clientData.Course;
    var section = clientData.Section;
    var yearlevel = clientData.YearLevel;
    var day = clientData.Day;
    var starttime = clientData.StartTime;
    var endtime = clientData.EndTime;
    var room = clientData.Room;
    var component = clientData.Component;
    var coach = clientData.Coach;
    var population = clientData.Population;
    var units = clientData.Units;
    var capacity = clientData.Capacity;
    var academicyear = clientData.AcademicYear;
    pool.query(
      `INSERT INTO class_schedules ("CLSID", "Course", "Section", "YearLevel", "Day", "StartTime", "EndTime", "Room", "Component", "Coach", "Population", "Units", "Capacity", "AcademicYear")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from class_schedules), '${course}', '${section}', '${yearlevel}', '${day}', '${starttime}', '${endtime}', '${room}', '${component}', '${coach}', '${population}', '${units}', '${capacity}', '${academicyear}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/reset-status", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var status = clientData.data;
    pool.query(
      `UPDATE coach_status SET "ClassStatus"='${status}'`,
      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') from department

module.exports = router;
