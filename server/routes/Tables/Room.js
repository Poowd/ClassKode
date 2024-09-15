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
    pool.query(`SELECT * FROM room WHERE "Status"='ACTIVE'`, (err, rslt) =>
      res.json(rslt.rows)
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-raw", (req, res) => {
  try {
    pool.query(`SELECT * FROM room`, (err, rslt) => res.json(rslt.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/list-archived", (req, res) => {
  try {
    pool.query(`SELECT * FROM room WHERE "Status"='ARCHIVE'`, (err, rslt) =>
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
    pool.query(`SELECT * FROM room WHERE "ROMID"='${id}'`, (err, rslt) => {
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

router.post("/insert", (req, res) => {
  try {
    var room = req.body.Room;
    var capacity = req.body.Capacity;
    var facility = req.body.Facility;
    var building = req.body.Building;
    var floor = req.body.Floor;
    pool.query(
      `INSERT INTO room ("ROMID", "Room", "Capacity", "Facility", "Building", "Floor")
      VALUES ((select LPAD(CAST((count(*) + 1)::integer AS TEXT), 10, '0') AS Wow from room), '${room}', '${capacity}', '${facility}', '${building}', '${floor}')`,

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
    var id = req.body.ROMID;
    var room = req.body.Room;
    var capacity = req.body.Capacity;
    var facility = req.body.Facility;
    var building = req.body.Building;
    var floor = req.body.Floor;
    pool.query(
      `UPDATE room 

      SET 
      "Room"='${room}', 
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
      `UPDATE room SET "Status"='ARCHIVE' WHERE "ROMID"='${id}'`,
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
      `UPDATE room SET "Status"='ACTIVE' WHERE "ROMID"='${id}'`,
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
