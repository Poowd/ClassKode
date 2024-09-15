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

router.get("/list", (req, res) => {
  try {
    pool.query(`SELECT * FROM section WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/list-target", (req, res) => {
  try {
    var id = req.body.data;
    pool.query(
      `SELECT * FROM section WHERE "Program"='${id}' AND "Status"='ACTIVE'`,
      (err, rslt) => res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-raw", (req, res) => {
  try {
    pool.query(`SELECT * FROM section`, (err, rslt) => res.json(rslt.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM section WHERE "Status"='ARCHIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/target", (req, res) => {
  try {
    var id = req.body.data;
    pool.query(`SELECT * FROM section WHERE "SCTID"='${id}'`, (err, rslt) => {
      if (err) {
        console.error("Query error:", err);
        return;
      }
      res.json(rslt.rows);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/generate", (req, res) => {
  try {
    var section = req.body.Section;
    var yearlevel = req.body.YearLevel;
    var program = req.body.Program;
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
      var section = req.body.Section;
      var yearlevel = req.body.YearLevel;
      var program = req.body.Program;
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

router.post("/insert", (req, res) => {
  try {
    var section = req.body.Section;
    var program = req.body.Program;
    var yearlevel = req.body.YearLevel;
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

router.post("/edit", (req, res) => {
  try {
    var id = req.body.SCTID;
    var section = req.body.Section;
    var program = req.body.Program;
    var yearlevel = req.body.YearLevel;
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

router.post("/archive", (req, res) => {
  try {
    var id = req.body.data;
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

router.post("/restore", (req, res) => {
  try {
    var id = req.body.data;
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
