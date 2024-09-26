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

router.get("/total-population-check", (req, res) => {
  try {
    pool.query(
      `SELECT SUM("Population"::int) as Population FROM projection`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/population-per-term", (req, res) => {
  const clientData = JSON.parse(req.body);
  var data = clientData.Code;
  console.log(clientData);
  try {
    pool.query(
      `SELECT SUM("Population"::int) as Population1 FROM projection WHERE "AcademicYear"='${data}' LIMIT 1`,
      (err, rslt) => res.json(rslt.rows[0])
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
