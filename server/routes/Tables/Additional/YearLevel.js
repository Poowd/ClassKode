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

router.get("/year-level-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM year_level WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/year-level-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.YRLID;
    var yearlevel = clientData.YearLevel;
    var academiclevel = clientData.AcademicLevel;
    pool.query(
      `UPDATE year_level 

      SET 
      "YearLevel"='${yearlevel}', 
      "AcademicLevel"='${academiclevel}'
      
      WHERE "YRLID"='${id}'`,

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
