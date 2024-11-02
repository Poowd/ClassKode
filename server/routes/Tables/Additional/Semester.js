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

router.get("/semester-list", (req, res) => {
  try {
    pool.query(`SELECT * FROM semester WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/semester-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.SMSID;
    var semester = clientData.Semester;
    var semesterabbrev = clientData.SemesterAbbrev;
    pool.query(
      `UPDATE semester 

      SET 
      "Semester"='${semester}', 
      "Abbrev"='${semesterabbrev}'
      
      WHERE "SMSID"='${id}'`,

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
