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

router.get("/project-list", (req, res) => {
  try {
    pool.query(
      `SELECT * FROM projection WHERE "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/projection-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var academicyear = clientData.AcademicYear;
    var section = clientData.Section;
    var population = clientData.Population;
    pool.query(
      `INSERT INTO projection ("PRJID", "Section", "AcademicYear", "Population")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from projection), '${section}', '${academicyear}', '${population}')`,

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
