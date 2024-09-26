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

router.get("/section-list", (req, res) => {
  try {
    pool.query(`SELECT * FROM section WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/section-list-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM section WHERE "Program"='${id}' AND "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/section-list-raw", (req, res) => {
  try {
    pool.query(`SELECT * FROM section`, (err, rslt) => res.json(rslt.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/section-list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM section WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/section-target", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `SELECT * FROM section WHERE "SCTID"='${id}' OR "Section"='${id}' AND "Status"='ACTIVE'`,
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

router.post("/section-generate", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var section = clientData.Section;
    var yearlevel = clientData.YearLevel;
    var program = clientData.Program;
    pool.query(
      `INSERT INTO section ("SCTID", "Section", "YearLevel", "Program")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from section), '${section}', '${yearlevel}', '${program}')`,

      (err, rslt) => {
        if (err) {
          console.error("Query error:", err);
          return;
        }
        res.json(rslt.rows);
      }
    );
  } catch (err) {
    try {
      const clientData = JSON.parse(req.body);
      var section = clientData.Section;
      var yearlevel = clientData.YearLevel;
      var program = clientData.Program;
      pool.query(
        `INSERT INTO section ("SCTID", "Section", "YearLevel", "Program")
        VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from section), '${section}', '${yearlevel}', '${program}')`,

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
  }
});

router.post("/section-insert", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var section = clientData.Section;
    var program = clientData.Program;
    var yearlevel = clientData.YearLevel;
    pool.query(
      `INSERT INTO section ("SCTID", "Section", "YearLevel", "Program")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from section), '${section}', '${yearlevel}', '${program}')`,

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

router.post("/section-edit", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.SCTID;
    var section = clientData.Section;
    var program = clientData.Program;
    var yearlevel = clientData.YearLevel;
    pool.query(
      `UPDATE section 

      SET 
      "Room"='${section}', 
      "Capacity"='${capacity}', 
      "Facility"='${facility}', 
      "Building"='${building}', 
      "Floor"='${floor}' 
      
      WHERE "ROMID"='${id}'`,

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

router.post("/section-archive", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE section SET "Status"='ARCHIVE' WHERE "SCTID"='${id}'`,
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

router.post("/section-restore", (req, res) => {
  try {
    const clientData = JSON.parse(req.body);
    var id = clientData.data;
    pool.query(
      `UPDATE section SET "Status"='ACTIVE' WHERE "SCTID"='${id}'`,
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
