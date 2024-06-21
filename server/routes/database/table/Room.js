import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

app.post("/room", (req, res) => {
  const sql = `
      SELECT *
        FROM room
          INNER JOIN rom_building
            ON room.Building = rom_building.Building
          INNER JOIN rom_floor
            ON room.Floor = rom_floor.Floor
          INNER JOIN rom_facility
            ON room.Facility = rom_facility.Facility

          WHERE ROM_Status = 'ACTIVE'

          ORDER BY ROMID ASC
  `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/archive-existing-room", (req, res) => {
  const sql = "UPDATE room SET ROM_Status = 'ARCHIVE' WHERE ROMID = ? ";

  db.query(sql, [req.body.ROMID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

export default app;
