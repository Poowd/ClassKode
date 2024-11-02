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

router.get("/academic-level-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM academic_level WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/academic-level-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.ADLID;
    var academiclevel = clientData.AcademicLevel;
    var academicabbrev = clientData.AcademicAbbrev;
    pool.query(
      `UPDATE academic_level 

      SET 
      "AcademicLevel"='${academiclevel}', 
      "Abbrev"='${academicabbrev}'
      
      WHERE "ADLID"='${id}'`,

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
