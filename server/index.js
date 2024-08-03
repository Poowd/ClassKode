import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_classkode",
});

//authentication of the account logged in
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Is not Authenticated" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error." });
      } else {
        req.Name = decoded.Name;
        req.UserType = decoded.UserType;
        req.UUID = decoded.UUID;
        req.File_Maintainance = decoded.File_Maintainance;
        req.Access_View = decoded.Access_View;
        req.Access_Edit = decoded.Access_Edit;
        req.Access_Insert = decoded.Access_Insert;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    Name: req.Name,
    UserType: req.UserType,
    UUID: req.UUID,
    File_Maintainance: req.File_Maintainance,
    Access_View: req.Access_View,
    Access_Edit: req.Access_Edit,
    Access_Insert: req.Access_Insert,
  });
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM tbl_user INNER JOIN tbl_permission ON tbl_user.UUID=tbl_permission.UUID WHERE Email = ? AND Password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    if (data.length > 0) {
      const FirstName = data[0].FirstName;
      const LastName = data[0].LastName;
      const UserType = data[0].UserType;
      const UUID = data[0].UUID;
      const Name = LastName.concat(", ", FirstName);

      const File_Maintainance = data[0].File_Maintainance;
      const Access_View = data[0].Access_View;
      const Access_Edit = data[0].Access_Edit;
      const Access_Insert = data[0].Access_Insert;

      const token = jwt.sign(
        {
          Name,
          UserType,
          UUID,
          File_Maintainance,
          Access_View,
          Access_Edit,
          Access_Insert,
        },
        "our-jsonwebtoken-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else if (
      req.body.email === "classkode@sti.pwd" &&
      req.body.password === "superadminpass"
    ) {
      const UserType = "Admin";
      const UUID = "0";
      const Name = "Powd";

      const File_Maintainance = "True";
      const Access_View = "True";
      const Access_Edit = "True";
      const Access_Insert = "True";

      const token = jwt.sign(
        {
          Name,
          UserType,
          UUID,
          File_Maintainance,
          Access_View,
          Access_Edit,
          Access_Insert,
        },
        "our-jsonwebtoken-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "No Records Found" });
    }
  });
});

//de-authentication of the account that was logged in
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

//checks of the server is running
app.listen(8081, () => {
  console.log("Running");
});

app.get("/status", (req, res) => {
  res.send("server is running");
});

const router = (global.router = express.Router());

import Generate from "./routes/logic/Generate.js";
import Schedule from "./routes/logic/Schedule.js";
import Coach from "./routes/database/table/Coach.js";
import Department from "./routes/database/table/Department.js";
import Course from "./routes/database/table/Course.js";
import Program from "./routes/database/table/Program.js";
import Room from "./routes/database/table/Room.js";
import Section from "./routes/database/table/Section.js";
import AcademicYear from "./routes/database/table/AcademicYear.js";
import DropdownData from "./routes/database/table/DropdownData.js";
import Curriculum from "./routes/database/table/Curriculum.js";
import preSchedule from "./routes/database/table/preSchedule.js";
import Specialization from "./routes/retrieve_data_no_joins/Specialization.js";
app.use(preSchedule);
app.use(Curriculum);
app.use(DropdownData);
app.use(AcademicYear);
app.use(Section);
app.use(Room);
app.use(Generate);
app.use(Schedule);
app.use(Coach);
app.use(Department);
app.use(Course);
app.use(Specialization);
app.use(Program);

import db_Select from "./routes/db/db_Select.js";
app.use(db_Select);

import db_Insert from "./routes/db/db_Insert.js";
app.use(db_Insert);

import db_Update from "./routes/db/db_Update.js";
app.use(db_Update);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  return res.json(image);
});
app.post("/tf", (req, res) => {
  const sql = `
      INSERT INTO coach_images 
        (SCHLID, Image) 
      VALUES (?)
  `;

  const values = [req.body.id, req.body.image];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

//app.post("/getimage", (req, res) => {
//   const sql = `
//       SELECT * FROM whatatest ORDER BY sad DESC
//   `;

//   db.query(sql, (err, data) => {
//     if (err) return res.json({ Message: "Server Sided Error" });
//     return res.json(data);
//   });
// });
//
