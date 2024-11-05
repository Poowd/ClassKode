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

router.get("/setup-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM curriculum_setup WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/setup-list-archived", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM department WHERE "Status"='ARCHIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/setup-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT curriculum_setup."STPID", curriculum_setup."Program", curriculum_setup."Curriculum", curriculum_setup."Semester", curriculum_setup."YearLevel", curriculum_setup."Component", curriculum_setup."Created", curriculum_setup."Status", course."Code", course."Course" FROM curriculum_setup INNER JOIN course ON course."Code" = curriculum_setup."Course" WHERE curriculum_setup."Curriculum"='${id}'`,
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

router.post("/setup-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var program = clientData.Program;
    var curriculum = clientData.Curriculum;
    var course = clientData.Course;
    var component = clientData.Component;
    var yearlevel = clientData.YearLevel;
    var semester = clientData.Semester;
    pool.query(
      `INSERT INTO curriculum_setup ("STPID", "Program", "Curriculum", "Course", "Component", "YearLevel", "Semester")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from curriculum_setup), '${program}', '${curriculum}', '${course}', '${component}', '${yearlevel}','${semester}')`,

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

router.post("/setup-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.DPTID;
    var code = clientData.Code;
    var department = clientData.Department;
    var abbrev = clientData.Abbrev;
    var description =
      clientData.Description === null ? null : clientData.Description;
    pool.query(
      `UPDATE department 

      SET 
      "Code"='${code}', 
      "Department"='${department}', 
      "Abbrev"='${abbrev}', 
      "Description"='${description}' 
      
      WHERE "DPTID"='${id}'`,

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

router.post("/setup-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE curriculum SET "Status"='ARCHIVE' WHERE "CRRID"='${id}'`,
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

router.post("/setup-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE department SET "Status"='ACTIVE' WHERE "DPTID"='${id}'`,
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

// =>

router.get("/curriculum-setup-list", (req, res) => {
  try {
    pool.query(
      `SELECT setup."CourseID", setup."Course", setup."SubjectArea", setup."CatalogNo", setup."YearLevel", setup."Units", setup."Semester", setup."Component", setup."Program", setup."Curriculum", department."Code" AS "Department" FROM setup INNER JOIN program ON program."Code" = setup."Program" INNER JOIN department ON department."Code" = program."Department" WHERE setup."Curriculum"=(SELECT "Curriculum" FROM academic_year WHERE "Status"='ACTIVE' ORDER BY "ACYID" DESC LIMIT 1)`,
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

router.post("/curriculum-setup-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var curriculum = clientData.Curriculum;
    var program = clientData.Program;
    pool.query(
      `SELECT setup."CourseID", setup."Course", setup."SubjectArea", setup."CatalogNo", setup."YearLevel", setup."Units", setup."Semester", setup."Component", setup."Program", setup."Curriculum", department."Code" FROM setup INNER JOIN program ON program."Code" = setup."Program" INNER JOIN department ON department."Code" = program."Department" WHERE setup."Curriculum"='${curriculum}' AND setup."Program"='${program}'`,
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

router.post("/curriculum-setup-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var courseid = clientData.data.Course_ID;
    var course = clientData.data.Course;
    var subjectarea = clientData.data.Subject_Area;
    var catalogno = clientData.data.Catalog_No;
    var component = clientData.data.Component;
    var units = clientData.data.Units;
    var yearlevel = clientData.data.Year_Level;
    var semester = clientData.data.Semester;
    var program = clientData.Program;
    var curriculum = clientData.Curriculum;
    pool.query(
      `INSERT INTO setup ("SETID", "CourseID", "Course", "SubjectArea", "CatalogNo", "Component", "Units", "YearLevel", "Semester", "Program", "Curriculum")
        VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from setup), '${courseid}', '${course}', '${subjectarea}', '${catalogno}', '${component}','${units}','${yearlevel}','${semester}','${program}','${curriculum}')`,

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

module.exports = router;
