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

router.get("/logs-list", (req, res) => {
  try {
    pool.query(
      `SELECT logs."LOGID", logs."Action", logs."Module", logs."Details", logs."Created", logs."Status", logs."Date", logs."Time", _user."SCHLID", _user."FirstName", _user."LastName", _user."UserType", _user."AcademicCode" FROM logs INNER JOIN _user ON _user."SCHLID" = logs."User" WHERE "Status"='ACTIVE' ORDER BY "LOGID" DESC LIMIT 100`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/log-me", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var action = clientData.Action;
    var module = clientData.Module;
    var user = clientData.User;
    var details = clientData.Details;
    var date = clientData.Date;
    var time = clientData.Time;
    pool.query(
      `INSERT INTO logs ("LOGID", "Action", "Module", "User", "Details", "Date", "Time")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from logs), '${action}', '${module}', '${user}', '${details}', '${date}', '${time}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json({ Status: "Success" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
