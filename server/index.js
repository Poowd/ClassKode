import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sticlasskode",
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
app.use(Program);

/* ==============================================
    This section pertains to CRUD Operations:
        1. CREATE
        2. READ
        3. UPDATE
        4. DELETE
===============================================*/

/*
    Entity Name: Coach
*/

app.post("/display-coach", (req, res) => {
  const sql =
    "SELECT * FROM tbl_coach " +
    "INNER JOIN " +
    "tbl_department ON tbl_coach.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_coach.Deleted='False' AND tbl_coach.FirstName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.MiddleInitial LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.LastName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.CoachType LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.Units LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.Email LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.ContactNumber LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_coach.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='False' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_coach.CCHID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-archived-coach", (req, res) => {
  const sql =
    "SELECT * FROM tbl_coach " +
    "INNER JOIN " +
    "tbl_department ON tbl_coach.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_coach.Deleted='True' AND tbl_coach.FirstName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.MiddleInitial LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.LastName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.CoachType LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.Units LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.Email LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.ContactNumber LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_coach.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_coach.Deleted='True' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_coach.CCHID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-coach", (req, res) => {
  const sql =
    "INSERT INTO tbl_coach (`SCHLID`, `FirstName`, `MiddleInitial`, `LastName`, `CoachType`, `Units`, `DPTID`, `Email`, `ContactNumber`, `Facebook`) VALUES (?)";
  const values = [
    req.body.SCHLID,
    req.body.FirstName,
    req.body.MiddleInitial,
    req.body.LastName,
    req.body.CoachType,
    req.body.Units,
    req.body.DPTID,
    req.body.Email,
    req.body.ContactNumber,
    req.body.Facebook,
  ];
  db.query(sql, [values], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/display-specialized-courses", (req, res) => {
  const sql = `SELECT 
      * 
    FROM 
      ay_coach_course
    INNER JOIN
      tbl_coach
    ON
      ay_coach_course.CCHID = tbl_coach.CCHID
    INNER JOIN
      tbl_course
    ON
      ay_coach_course.CRSID = tbl_course.CRSID
    WHERE
      ay_coach_course.AYID = '00000000001'`;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/specialize-courses", (req, res) => {
  const sql = "INSERT INTO con_coach_course (`CCHID`, `CRSID`) VALUES (?, ?);";
  db.query(sql, [req.body.ID, req.body.Courses], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/update-coach-info", (req, res) => {
  const sql =
    "UPDATE tbl_coach SET SCHLID = ?, FirstName = ?, MiddleInitial = ?, LastName = ?, CoachType = ?, Units = ?, DPTID = ?, Email = ?, ContactNumber = ?, Facebook = ?  WHERE CCHID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.slot5,
      req.body.slot6,
      req.body.slot7,
      req.body.slot8,
      req.body.slot9,
      req.body.slot10,
      req.body.id,
    ],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});
app.post("/archive-coach", (req, res) => {
  const sql = "UPDATE tbl_coach SET Deleted = ? WHERE CCHID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/retrieve-coach", (req, res) => {
  const sql = "UPDATE tbl_coach SET Deleted = ? WHERE CCHID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/remove-specialized", (req, res) => {
  const sql = "DELETE FROM con_coach_course WHERE CCHID = ? AND CRSID = ?";
  db.query(sql, [req.body.CCHID, req.body.CRSID], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});

/*
    Entity Name: Course
*/
app.post("/course-selection", (req, res) => {
  const sql =
    "SELECT * FROM tbl_course WHERE Deleted='False' AND CourseName LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/course-2", (req, res) => {
  const sql =
    "SELECT * FROM tbl_course INNER JOIN tbl_department ON tbl_course.DPTID = tbl_department.DPTID WHERE tbl_course.Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-course", (req, res) => {
  const sql =
    "SELECT * FROM tbl_course " +
    "INNER JOIN " +
    "tbl_department ON tbl_course.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_course.Deleted='False' AND tbl_course.CourseCode LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='False' AND tbl_course.CourseName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='False' AND tbl_course.CourseLevel LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='False' AND tbl_course.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='False' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_course.CRSID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-archived-course", (req, res) => {
  const sql =
    "SELECT * FROM tbl_course " +
    "INNER JOIN " +
    "tbl_department ON tbl_course.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_course.Deleted='True' AND tbl_course.CourseCode LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='True' AND tbl_course.CourseName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='True' AND tbl_course.CourseLevel LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='True' AND tbl_course.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_course.Deleted='True' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_course.CRSID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-course", (req, res) => {
  const sql =
    "INSERT INTO tbl_course (`CourseCode`, `CourseName`, `CourseLevel`, `DPTID`) VALUES (?)";
  const values = [
    req.body.CourseCode,
    req.body.CourseName,
    req.body.CourseLevel,
    req.body.DPTID,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/update-course-info", (req, res) => {
  const sql =
    "UPDATE tbl_course SET CourseCode = ?, CourseName = ?, CourseLevel = ?, DPTID = ? WHERE CRSID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.id,
    ],
    (err, data) => {
      if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/display-courses-courses", (req, res) => {
  const sql =
    "SELECT * FROM con_course_course " +
    "INNER JOIN " +
    "tbl_course ON con_course_course.CRSID = tbl_course.CRSID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-temp-course", (req, res) => {
  const sql =
    "SELECT * FROM temp_course " +
    "INNER JOIN " +
    "tbl_course ON temp_course.CRSID = tbl_course.CRSID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-section-courses", (req, res) => {
  const sql =
    "SELECT * FROM con_section_course INNER JOIN tbl_section ON con_section_course.SCTID = tbl_section.SCTID INNER JOIN tbl_course ON con_section_course.CRSID = tbl_course.CRSID INNER JOIN tbl_program ON tbl_section.PRGID = tbl_program.PRGID;";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/courses-courses", (req, res) => {
  const sql =
    "INSERT INTO con_course_course (`PRGID`, `CRSID`, `Type`, `AssignedUnits`) VALUES (?, ?, ?, ?);";
  db.query(
    sql,
    [req.body.Program, req.body.ID, req.body.Type, req.body.Units],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});
app.post("/temp-course", (req, res) => {
  const sql = "INSERT INTO temp_course (`CRSID`, `PRGID`) VALUES (?, ?);";
  db.query(sql, [req.body.tempCourse, req.body.Program], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/section-courses", (req, res) => {
  const sql =
    "INSERT INTO con_section_course (`SCTID`, `CRSID`, `PRGID`) VALUES (?, ?, ?);";
  db.query(sql, [req.body.ID1, req.body.ID2, req.body.ID3], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/archive-course", (req, res) => {
  const sql = "UPDATE tbl_course SET Deleted = ? WHERE CRSID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/retrieve-course", (req, res) => {
  const sql = "UPDATE tbl_course SET Deleted = ? WHERE CRSID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/remove-course-course", (req, res) => {
  const sql = "DELETE FROM con_course_course WHERE CRSID = ? AND Type = ?";
  db.query(sql, [req.body.CRSID, req.body.Type], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/remove-temp-course", (req, res) => {
  const sql = "DELETE FROM temp_course WHERE CRSID = ?";
  db.query(sql, [req.body.CRSID], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});
app.post("/remove-section-course", (req, res) => {
  const sql =
    "DELETE FROM con_section_course WHERE CRSID = ? AND SCTID = ? AND PRGID = ?";
  db.query(
    sql,
    [req.body.CRSID, req.body.SCTID, req.body.PRGID],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});

/*
    Entity Name: Department
*/
app.post("/department-selection", (req, res) => {
  const sql = "SELECT * FROM tbl_department WHERE Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-department", (req, res) => {
  const sql =
    "SELECT * FROM tbl_department " +
    "WHERE " +
    "Deleted='False' AND DepartmentName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND DateCreated LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY DPTID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/display-archived-department", (req, res) => {
  const sql =
    "SELECT * FROM tbl_department " +
    "WHERE " +
    "Deleted='True' AND DepartmentName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND DateCreated LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY DPTID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-department", (req, res) => {
  const sql =
    "INSERT INTO tbl_department (`DepartmentCode`, `DepartmentName`, `DepartmentAbbrev`, `DepartmentDescription`) VALUES (?)";
  const values = [
    req.body.DepartmentCode,
    req.body.DepartmentName,
    req.body.DepartmentAbbrev,
    req.body.DepartmentDescription,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/update-department-info", (req, res) => {
  const sql =
    "UPDATE tbl_department SET DepartmentCode = ?, DepartmentAbbrev = ?, DepartmentName = ?,  DepartmentDescription = ? WHERE DPTID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.id,
    ],
    (err, data) => {
      if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/archive-department", (req, res) => {
  const sql = "UPDATE tbl_department SET Deleted = ? WHERE DPTID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/retrieve-department", (req, res) => {
  const sql = "UPDATE tbl_department SET Deleted = ? WHERE DPTID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

/*
    Entity Name: Program
*/
app.post("/program-selection", (req, res) => {
  const sql = "SELECT * FROM tbl_program WHERE Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-program", (req, res) => {
  const sql =
    "SELECT * FROM tbl_program " +
    "INNER JOIN " +
    "tbl_department ON tbl_program.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_program.Deleted='False' AND tbl_program.ProgramCode LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.ProgramName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.ProgramAbbrev LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.YearLevel LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_program.PRGID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-archived-program", (req, res) => {
  const sql =
    "SELECT * FROM tbl_program " +
    "INNER JOIN " +
    "tbl_department ON tbl_program.DPTID = tbl_department.DPTID " +
    "WHERE " +
    "tbl_program.Deleted='True' AND tbl_program.ProgramCode LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='True' AND tbl_program.ProgramName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='True' AND tbl_program.ProgramAbbrev LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.YearLevel LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.ProgramDescription LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='False' AND tbl_program.DepartmentName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='True' AND tbl_program.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_program.Deleted='True' AND tbl_department.DepartmentName LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY tbl_program.PRGID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-program", (req, res) => {
  const sql =
    "INSERT INTO tbl_program (`ProgramCode`, `ProgramName`, `ProgramAbbrev`, `YearLevel`, `ProgramDescription`, `DPTID`) VALUES (?)";
  const values = [
    req.body.ProgramCode,
    req.body.ProgramName,
    req.body.ProgramAbbrev,
    req.body.YearLevel,
    req.body.Description,
    req.body.DPTID,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/update-program-info", (req, res) => {
  const sql =
    "UPDATE tbl_program SET ProgramCode = ?, ProgramName = ?, ProgramAbbrev = ?, YearLevel = ?, ProgramDescription = ?, DPTID = ?  WHERE PRGID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.slot5,
      req.body.slot6,
      req.body.id,
    ],
    (err, data) => {
      if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/archive-program", (req, res) => {
  const sql = "UPDATE tbl_program SET Deleted = ? WHERE PRGID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/retrieve-program", (req, res) => {
  const sql = "UPDATE tbl_program SET Deleted = ? WHERE PRGID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

/*
    Entity Name: Room
*/
app.post("/room-selection", (req, res) => {
  const sql = "SELECT * FROM tbl_room WHERE Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-room", (req, res) => {
  const sql =
    "SELECT * FROM tbl_room " +
    "WHERE " +
    "Deleted='False' AND RoomName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND Capacity LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND Type LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND Building LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND Floor LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND DateCreated LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY RMID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/update-room-info", (req, res) => {
  const sql =
    "UPDATE tbl_room SET RoomName = ?, Capacity = ?, Type = ?, Building = ?, Floor = ? WHERE RMID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.slot5,
      req.body.id,
    ],
    (err, data) => {
      if (err)
        return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/display-archived-room", (req, res) => {
  const sql =
    "SELECT * FROM tbl_room " +
    "WHERE " +
    "Deleted='True' AND RoomName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND Capacity LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND Type LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND Building LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND Floor LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='True' AND DateCreated LIKE '%" +
    req.body.Search +
    "%' " +
    "ORDER " +
    "BY RMID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-room", (req, res) => {
  const sql =
    "INSERT INTO tbl_room (`RoomName`, `Capacity`, `Type`, `Building`, `Floor`) VALUES (?)";
  const values = [
    req.body.RoomName,
    req.body.Capacity,
    req.body.Type,
    req.body.Building,
    req.body.Floor,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/archive-room", (req, res) => {
  const sql = "UPDATE tbl_room SET Deleted = ? WHERE RMID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/retrieve-room", (req, res) => {
  const sql = "UPDATE tbl_room SET Deleted = ? WHERE RMID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

/*
    Entity Name: Section
*/
app.post("/section-selection", (req, res) => {
  const sql =
    "SELECT * FROM tbl_section INNER JOIN tbl_program ON tbl_section.PRGID = tbl_program.PRGID WHERE tbl_section.Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-section", (req, res) => {
  const sql =
    "INSERT INTO tbl_section (`SectionName`, `Population`, `Year`, `Semester`, `PRGID`) VALUES (?)";
  const values = [
    req.body.SectionName,
    req.body.Population,
    req.body.Year,
    req.body.Semester,
    req.body.PRGID,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/generate-ter-section", (req, res) => {
  const sql =
    "INSERT INTO tbl_section (`SectionName`, `Population`, `Year`, `Semester`, `PRGID`) VALUES (?),(?),(?),(?),(?),(?),(?),(?)";
  const F1S1 = [
    "",
    req.body.F1S1,
    "First Year",
    "First Semester",
    req.body.PRGID,
  ];
  const F1S2 = [
    "",
    req.body.F1S2,
    "First Year",
    "Second Semester",
    req.body.PRGID,
  ];
  const F2S1 = [
    "",
    req.body.F2S1,
    "Second Year",
    "First Semester",
    req.body.PRGID,
  ];
  const F2S2 = [
    "",
    req.body.F2S2,
    "Second Year",
    "Second Semester",
    req.body.PRGID,
  ];
  const F3S1 = [
    "",
    req.body.F3S1,
    "Third Year",
    "First Semester",
    req.body.PRGID,
  ];
  const F3S2 = [
    "",
    req.body.F3S2,
    "Third Year",
    "Second Semester",
    req.body.PRGID,
  ];
  const F4S1 = [
    "",
    req.body.F4S1,
    "Fourth Year",
    "First Semester",
    req.body.PRGID,
  ];
  const F4S2 = [
    "",
    req.body.F4S2,
    "Fourth Year",
    "Second Semester",
    req.body.PRGID,
  ];
  db.query(
    sql,
    [F1S1, F1S2, F2S1, F2S2, F3S1, F3S2, F4S1, F4S2],
    (err, data) => {
      if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/generate-shs-section", (req, res) => {
  const sql =
    "INSERT INTO tbl_section (`SectionName`, `Population`, `Year`, `Semester`, `PRGID`) VALUES (?),(?),(?),(?)";
  const G11S1 = [
    "",
    req.body.G11S1,
    "Grade 11",
    "First Semester",
    req.body.PRGID,
  ];
  const G11S2 = [
    "",
    req.body.G11S2,
    "Grade 11",
    "Second Semester",
    req.body.PRGID,
  ];
  const G12S1 = [
    "",
    req.body.G12S1,
    "Grade 12",
    "First Semester",
    req.body.PRGID,
  ];
  const G12S2 = [
    "",
    req.body.G12S2,
    "Grade 12",
    "Second Semester",
    req.body.PRGID,
  ];
  db.query(sql, [G11S1, G11S2, G12S1, G12S2], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/display-section", (req, res) => {
  const sql =
    "SELECT * FROM tbl_section " +
    "INNER JOIN " +
    "tbl_program ON tbl_section.PRGID = tbl_program.PRGID " +
    "WHERE " +
    "tbl_section.Deleted='False' AND tbl_section.SectionName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_section.Population LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_section.Year LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_section.Semester LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_section.PRGID LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_section.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='False' AND tbl_program.ProgramName LIKE '%" +
    req.body.Search +
    "%'" +
    "ORDER " +
    "BY tbl_section.SCTID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/update-section-info", (req, res) => {
  const sql =
    "UPDATE tbl_section SET SectionName = ?, Population = ?, Year = ?, Semester = ?, PRGID = ? WHERE SCTID = ?";
  db.query(
    sql,
    [
      req.body.slot1,
      req.body.slot2,
      req.body.slot3,
      req.body.slot4,
      req.body.slot5,
      req.body.id,
    ],
    (err, data) => {
      if (err)
        return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/display-archived-section", (req, res) => {
  const sql =
    "SELECT * FROM tbl_section " +
    "INNER JOIN " +
    "tbl_program ON tbl_section.PRGID = tbl_program.PRGID " +
    "WHERE " +
    "tbl_section.Deleted='True' AND tbl_section.SectionName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_section.Population LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_section.Year LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_section.Semester LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_section.PRGID LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_section.DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "tbl_section.Deleted='True' AND tbl_program.ProgramName LIKE '%" +
    req.body.Search +
    "%'" +
    "ORDER " +
    "BY tbl_section.SCTID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/archive-section", (req, res) => {
  const sql = "UPDATE tbl_section SET Deleted = ? WHERE SCTID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/retrieve-section", (req, res) => {
  const sql = "UPDATE tbl_section SET Deleted = ? WHERE SCTID = ?";
  db.query(sql, ["False", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

/*
    Entity: Schedule
*/
app.post("/add-new-schedule", (req, res) => {
  const sql =
    "INSERT INTO tbl_schedule (`CRSID`, `SCTID`, `Day`, `StartTime`, `EndTime`, `Time`, `RMID`, `CCHID`, `ScheduledSemester`, `AYID`, `CRRID`) VALUES (?)";
  const values = [
    req.body.CRSID,
    req.body.SCTID,
    req.body.Day,
    req.body.RawStartTime,
    req.body.RawEndTime,
    req.body.Time,
    req.body.RMID,
    req.body.CCHID,
    req.body.Semester,
    req.body.AYID,
    req.body.CRRID,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/schedule-selection", (req, res) => {
  const sql =
    "SELECT * FROM tbl_schedule INNER JOIN tbl_course ON tbl_schedule.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON tbl_schedule.SCTID = tbl_section.SCTID INNER JOIN tbl_room ON tbl_schedule.RMID = tbl_room.RMID INNER JOIN tbl_coach ON tbl_schedule.CCHID = tbl_coach.CCHID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/count-schedule", (req, res) => {
  const sql =
    "SELECT  COUNT(RMID) AS RoomCount FROM tbl_schedule WHERE RMID = '" +
    req.body.RMID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-schedule", (req, res) => {
  const sql =
    "SELECT * FROM tbl_schedule INNER JOIN tbl_course ON tbl_schedule.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON tbl_schedule.SCTID = tbl_section.SCTID INNER JOIN tbl_room ON tbl_schedule.RMID = tbl_room.RMID INNER JOIN tbl_coach ON tbl_schedule.CCHID = tbl_coach.CCHID WHERE " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID LIKE '%" +
    req.body.academicyear +
    "%' AND " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_schedule.Day LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_schedule.Time LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_schedule.ScheduledSemester LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_room.RoomName LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_coach.LastName LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_coach.FirstName LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_section.SectionName LIKE '%" +
    req.body.search +
    "%' OR " +
    "tbl_schedule.Deleted='False' AND tbl_schedule.AYID= '" +
    req.body.academicyear +
    "' AND tbl_course.CourseName LIKE '%" +
    req.body.search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-student-load", (req, res) => {
  const sql =
    "SELECT * FROM tbl_schedule INNER JOIN tbl_course ON tbl_schedule.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON tbl_schedule.SCTID = tbl_section.SCTID INNER JOIN tbl_room ON tbl_schedule.RMID = tbl_room.RMID INNER JOIN tbl_coach ON tbl_schedule.CCHID = tbl_coach.CCHID INNER JOIN con_course_course ON tbl_course.CRSID = con_course_course.CRSID  WHERE tbl_schedule.Deleted = 'False' AND tbl_course.CourseName LIKE '%" +
    req.body.Search +
    "%' OR tbl_schedule.Deleted = 'False' AND tbl_section.SectionName LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-coach-load", (req, res) => {
  const sql =
    "SELECT * FROM tbl_schedule INNER JOIN tbl_course ON tbl_schedule.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON tbl_schedule.SCTID = tbl_section.SCTID INNER JOIN tbl_room ON tbl_schedule.RMID = tbl_room.RMID INNER JOIN tbl_coach ON tbl_schedule.CCHID = tbl_coach.CCHID INNER JOIN con_course_course ON tbl_course.CRSID = con_course_course.CRSID  WHERE tbl_schedule.Deleted = 'False' AND tbl_course.CourseName LIKE '%" +
    req.body.Search +
    "%' OR tbl_schedule.Deleted = 'False' AND tbl_coach.FirstName LIKE '%" +
    req.body.Search +
    "%' OR tbl_schedule.Deleted = 'False' AND tbl_coach.LastName LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-room-load", (req, res) => {
  const sql =
    "SELECT * FROM tbl_schedule INNER JOIN tbl_course ON tbl_schedule.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON tbl_schedule.SCTID = tbl_section.SCTID INNER JOIN tbl_room ON tbl_schedule.RMID = tbl_room.RMID INNER JOIN tbl_coach ON tbl_schedule.CCHID = tbl_coach.CCHID INNER JOIN con_course_course ON tbl_course.CRSID = con_course_course.CRSID  WHERE tbl_schedule.Deleted = 'False' AND tbl_course.CourseName LIKE '%" +
    req.body.Search +
    "%' OR tbl_schedule.Deleted = 'False' AND tbl_room.RoomName LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

/*
    Entity: Curriculum
*/
app.post("/curriculum-selection-entry", (req, res) => {
  const sql =
    "SELECT tbl_program.DPTID, con_section_course.PRGID, con_course_course.CRSID, con_section_course.SCTID, con_course_course.AssignedUnits, con_course_course.Type FROM con_section_course  RIGHT JOIN con_course_course  ON con_section_course.CRSID = con_course_course.CRSID INNER JOIN tbl_program  ON con_section_course.PRGID = tbl_program.PRGID WHERE con_section_course.PRGID = con_course_course.PRGID;";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/add-new-curriculum", (req, res) => {
  const sql =
    "INSERT INTO tbl_curriculum (`CRRname`,`CRRdescription`, `CRRstartyear`) VALUES (?)";
  const values = [
    req.body.CRRname,
    req.body.CRRdescription,
    req.body.CRRstartyear,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Error", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/add-new-curriculum-entry", (req, res) => {
  const sql =
    "INSERT INTO con_course_curriculum (`CRRID`, `DPTID`, `PRGID`, `CRSID`, `SCTID`, `Units`, `ClassType`) VALUES (?)";
  const values = [
    req.body.CRRID,
    req.body.DPTID,
    req.body.PRGID,
    req.body.CRSID,
    req.body.SCTID,
    req.body.Units,
    req.body.ClassType,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Error", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/edit-curriculum", (req, res) => {
  const sql =
    "UPDATE tbl_curriculum SET CRRname = ?, CRRstartyear = ?, CRRdescription = ? WHERE CRRID = ?";
  db.query(
    sql,
    [req.body.slot1, req.body.slot2, req.body.slot3, req.body.id],
    (err, data) => {
      if (err) return res.json({ Status: "Error", Error: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});
app.post("/archive-curriculum", (req, res) => {
  const sql = "UPDATE tbl_curriculum SET Deleted = ? WHERE CRRID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Error", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});
app.post("/display-curriculum", (req, res) => {
  const sql =
    "SELECT * FROM tbl_curriculum WHERE Deleted='False' AND CRRname LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/curriculum-selection", (req, res) => {
  const sql = "SELECT * FROM tbl_curriculum WHERE Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-curriculum-entry", (req, res) => {
  const sql =
    "SELECT tbl_curriculum.CRRID, tbl_department.DPTID, tbl_program.PRGID, tbl_course.CRSID, tbl_section.SCTID, tbl_curriculum.CRRname, tbl_department.DepartmentName, tbl_program.ProgramName, tbl_course.CourseName, tbl_section.SectionName, con_course_curriculum.Units, con_course_curriculum.ClassType FROM con_course_curriculum INNER JOIN tbl_curriculum ON con_course_curriculum.CRRID = tbl_curriculum.CRRID INNER JOIN tbl_department ON con_course_curriculum.DPTID = tbl_department.DPTID INNER JOIN tbl_program ON con_course_curriculum.PRGID = tbl_program.PRGID INNER JOIN tbl_course ON con_course_curriculum.CRSID = tbl_course.CRSID INNER JOIN tbl_section ON con_course_curriculum.SCTID = tbl_section.SCTID WHERE con_course_curriculum.CRRID = ?;";

  db.query(sql, [req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/remove-curriculum-entry", (req, res) => {
  const sql =
    "DELETE FROM con_course_curriculum WHERE CRRID = ? AND DPTID = ? AND PRGID = ? AND CRSID = ? AND SCTID = ? AND ClassType = ?";

  db.query(
    sql,
    [
      req.body.CRRID,
      req.body.DPTID,
      req.body.PRGID,
      req.body.CRSID,
      req.body.SCTID,
      req.body.ClassType,
    ],
    (err, data) => {
      if (err) return res.json({ Message: "Server Sided Error" });
      return res.json(data);
    }
  );
});
app.post("/curriculum-dashboard", (req, res) => {
  const sql =
    "SELECT * FROM tbl_curriculum WHERE Deleted='False' ORDER BY CRRID DESC LIMIT 1";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

/*
    Section 1: Creating of Data

    The following codes are used to create data inserted by the user at client then sent into server which is saved unto database.
    This section contains INSERT INTO function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post("/create-user", (req, res) => {
  const sql =
    "INSERT INTO tbl_user (`SCHLID`, `FirstName`, `LastName`, `Email`, `UserType`) VALUES (?)";
  const values = [
    req.body.SCHLID,
    req.body.FirstName,
    req.body.LastName,
    req.body.Email,
    req.body.UserType,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/create-schedule", (req, res) => {
  const sql =
    "INSERT INTO tbl_schedule (`CRSID`, `SCTID`, `RMID`, `ScheduleUnits`, `ScheduleStart`, `ScheduleEnd`, `ScheduleDay`, `CCHID`, `AYID`) VALUES (?)";
  const values = [
    req.body.CourseName,
    req.body.SectionName,
    req.body.RoomName,
    req.body.ScheduleUnits,
    req.body.ScheduleStart,
    req.body.ScheduleEnd,
    req.body.ScheduleDay,
    req.body.CoachName,
    req.body.AcademicYear,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

/*
    Section 2: Displaying of Data

    The following codes are used to display data sent from the database to server to client.
    This section contains SELECT function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

/* 
    Part 1: Displaying of Data for Tables
*/
app.post("/display-user", (req, res) => {
  const sql =
    "SELECT * FROM tbl_user " +
    "WHERE " +
    "Deleted='False' AND UUID LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND FirstName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND LastName LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND DateCreated LIKE '%" +
    req.body.Search +
    "%' OR " +
    "Deleted='False' AND UserType LIKE '%" +
    req.body.Search +
    "%'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/display-academicyear", (req, res) => {
  const sql =
    "SELECT * FROM tbl_academicyear WHERE Deleted='False' ORDER BY AYID DESC LIMIT 1";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/display-all-academicyear", (req, res) => {
  const sql =
    "SELECT * FROM tbl_academicyear INNER JOIN tbl_curriculum ON tbl_academicyear.CRRID = tbl_curriculum.CRRID WHERE tbl_academicyear.Deleted='False' ORDER BY AYID";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

/* 
    Part 2: Displaying of Data for Input Boxes
*/

app.post("/curriculum-selection", (req, res) => {
  const sql =
    "SELECT CurriculumName FROM tbl_curriculum WHERE Deleted='False' ORDER BY CRRID DESC LIMIT 1";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
app.post("/academicyear-selection", (req, res) => {
  const sql = "SELECT * FROM tbl_academicyear WHERE Deleted='False'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

/*
    Section 3: Updating of Data

    The following codes are used to update data sent from the client then sent into server which is saved unto database.
    This section contains UPDATE SET function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post("/update-user", (req, res) => {
  const sql =
    "UPDATE tbl_user SET SCHLID = ?, FirstName = ?, LastName = ?, Email = ?, UserType = ? WHERE UUID = ?";
  db.query(
    sql,
    [
      req.body.SCHLID,
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      req.body.UserType,
      req.body.ID,
    ],
    (err, data) => {
      if (err)
        return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
      return res.json({ data, Status: "Success" });
    }
  );
});

/*
    Section 4: Deletion of Data

    The following codes are used to delete data sent from the client then sent into server which is saved unto database.
    This section contains UPDATE SET function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post("/delete-user", (req, res) => {
  const sql = "UPDATE tbl_user SET Deleted = ? WHERE UUID = ?";
  db.query(sql, ["True", req.body.ID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/delete-schedule", (req, res) => {
  const sql = "UPDATE tbl_schedule SET Deleted = ? WHERE SCDID = ?";
  db.query(sql, ["True", req.body.SCDID], (err, data) => {
    if (err) return res.json({ Status: "Invalid Input", ErrorDesc: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

//NEW QUERIES, LEAVING THIS HERE TO ORGANIZE

app.post("/set-ay-coach", (req, res) => {
  const sql =
    "INSERT INTO ay_coach (`AYID`, `CCHID`, `CCH_Type`, `CCH_Units`) VALUES (?, ?, ?, ?);";
  db.query(
    sql,
    [req.body.AYID, req.body.CCHID, req.body.CCH_Type, req.body.CCH_Units],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});

app.post("/display-ay-coach", (req, res) => {
  const sql =
    "SELECT * FROM `ay_coach` INNER JOIN tbl_academicyear ON ay_coach.AYID = tbl_academicyear.AYID INNER JOIN tbl_coach ON ay_coach.CCHID = tbl_coach.CCHID INNER JOIN tbl_department ON tbl_coach.DPTID = tbl_department.DPTID WHERE ay_coach.AYID = '" +
    req.body.AYID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/set-ay-coach-course", (req, res) => {
  const sql =
    "INSERT INTO ay_coach_course (`AYID`, `CCHID`, `CRSID`) VALUES (?, ?, ?);";
  db.query(
    sql,
    [req.body.AYID, req.body.CCHID, req.body.Courses],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});

app.post("/display-ay-coach-course", (req, res) => {
  const sql =
    "SELECT * FROM ay_coach_course INNER JOIN tbl_academicyear ON ay_coach_course.AYID = tbl_academicyear.AYID INNER JOIN tbl_coach ON ay_coach_course.CCHID = tbl_coach.CCHID INNER JOIN tbl_department ON tbl_coach.DPTID = tbl_department.DPTID INNER JOIN tbl_course ON ay_coach_course.CRSID = tbl_course.CRSID WHERE ay_coach_course.AYID = '" +
    req.body.AYID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/set-ay-program", (req, res) => {
  const sql = "INSERT INTO ay_program (`AYID`, `PRGID`) VALUES (?, ?);";
  db.query(sql, [req.body.AYID, req.body.PRGID], (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});

app.post("/display-ay-program", (req, res) => {
  const sql =
    "SELECT * FROM ay_program INNER JOIN tbl_academicyear ON ay_program.AYID = tbl_academicyear.AYID INNER JOIN tbl_program ON ay_program.PRGID = tbl_program.PRGID WHERE ay_program.AYID = '" +
    req.body.AYID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/set-ay-program-section", (req, res) => {
  const sql =
    "INSERT INTO ay_program_section (`AYID`, `SCTID`, `SCT_Population`) VALUES (?, ?, ?);";
  db.query(
    sql,
    [req.body.AYID, req.body.Sections, req.body.SCT_Population],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});

app.post("/display-ay-program-section", (req, res) => {
  const sql =
    "SELECT * FROM ay_program_section INNER JOIN tbl_academicyear ON ay_program_section.AYID = tbl_academicyear.AYID INNER JOIN tbl_section ON ay_program_section.SCTID = tbl_section.SCTID WHERE ay_program_section.AYID = '" +
    req.body.AYID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/update-ay-program-section", (req, res) => {
  const sql =
    "UPDATE ay_program_section SET SCT_Population = ? WHERE AYID = ? AND SCTID = ?;";
  db.query(
    sql,
    [req.body.SCT_Population, req.body.AYID, req.body.SCTID],
    (err, data) => {
      if (err)
        return res.json({
          Status: "Invalid Input",
          Error: "" + err,
        });
      return res.json({
        Status: "Success",
        data,
      });
    }
  );
});

app.post("/display-curr-course", (req, res) => {
  const sql =
    "SELECT * FROM con_course_curriculum INNER JOIN tbl_department ON con_course_curriculum.DPTID = tbl_department.DPTID INNER JOIN tbl_course ON con_course_curriculum.CRSID = tbl_course.CRSID WHERE con_course_curriculum.CRRID = '" +
    req.body.CRRID +
    "'";

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/set-program-section-courses", (req, res) => {
  const sql =
    "INSERT INTO ay_program_section_course (`AYID`, `CRRID`, `PRGID`, `SCTID`, `CRSID`) VALUES ('" +
    req.body.AYID +
    "', '" +
    req.body.CRRID +
    "', '" +
    req.body.PRGID +
    "', '" +
    req.body.SCTID +
    "', '" +
    req.body.CRSID +
    "');";
  db.query(sql, (err, data) => {
    if (err)
      return res.json({
        Status: "Invalid Input",
        Error: "" + err,
      });
    return res.json({
      Status: "Success",
      data,
    });
  });
});

app.post("/display-section-w-course", (req, res) => {
  const sql =
    "SELECT * FROM ay_program_section_course INNER JOIN tbl_course ON ay_program_section_course.CRSID = tbl_course.CRSID WHERE ay_program_section_course.AYID = ? AND ay_program_section_course.CRRID = ?";

  db.query(sql, [req.body.AYID, req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/display-ay-curr", (req, res) => {
  const sql = `
    SELECT * 
    FROM 
      tbl_academicyear 
    INNER JOIN 
      tbl_curriculum
    ON
      tbl_academicyear.CRRID = tbl_curriculum.CRRID
    ORDER BY
      tbl_academicyear.AYID
    DESC
    LIMIT
      1`;

  db.query(sql, (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});

app.post("/add-new-academic-year", (req, res) => {
  const sql =
    "INSERT INTO tbl_academicyear (`CRRID`,`AcademicYear`, `Start`, `End`) VALUES (?)";
  const values = [
    req.body.Curriculum,
    req.body.AcademicYear,
    req.body.Start,
    req.body.End,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json({ Status: "Error", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

app.post("/archive-academic-year", (req, res) => {
  const sql = "UPDATE tbl_academicyear SET Deleted = ? WHERE AYID = ?";
  db.query(sql, ["True", req.body.id], (err, data) => {
    if (err) return res.json({ Status: "Error", Error: "" + err });
    return res.json({ data, Status: "Success" });
  });
});

//app.get meaning mag retrieve lang ng value
//app.post retrieve and or manipulate sa mga data, like may kukunin kang data from client then babato sa server na need gamitin
//'/random-code-generator' is ung magiging url na need for useEffect ng react, simply, function name ng express
//req is request -- ginagamit pag app.post
//res is response -- ibabato nya from server to client
//let to while is block of code, logic itself
//return res.json(result) -- ibabato na nya from server to client ung output ng block of code, pwedeng single value, pwedeng object, pwedeng array ang ibabato

app.get("/genetic-algorithm", (req, res) => {
  class GeneticAlgorithm {
    constructor(
      populationSize,
      mutationRate,
      crossoverRate,
      maxGenerations,
      reqBody
    ) {
      this.populationSize = populationSize;
      this.mutationRate = mutationRate;
      this.crossoverRate = crossoverRate;
      this.maxGenerations = maxGenerations;
      this.reqBody = reqBody;
      this.population = [];
      this.generation = 0;
    }

    // Initialize the population with random schedules
    initializePopulation() {
      for (let i = 0; i < this.populationSize; i++) {
        const individual = this.createRandomSchedule();
        this.population.push({ genes: individual, fitness: 0 });
      }
    }

    // Shuffle array function
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Helper functions for time and room assignment
    setTimeFormat(time) {
      const hour = Math.floor(time / 60);
      const minute = time % 60 > 0 ? "30" : "00";
      const cycle = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minute} ${cycle}`;
    }

    convertUnitsTime(units) {
      return units * 60;
    }

    // Create a random schedule (individual)
    createRandomSchedule() {
      const CurrentSemester = this.reqBody.semester;
      const DayStart = 480; // 8:00 am
      const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const WeekDaysScheduled = WeekDays.reduce(
        (acc, day) => ({ ...acc, [day]: DayStart }),
        {}
      );

      const ListofCoach = [...this.reqBody.coach];
      const ListofCourse = [...this.reqBody.course];
      const ListofRoom = [...this.reqBody.room];

      const SetOfScheduled = [];
      const TempRoom = [];
      const TempCoach = [];

      const checkRoomUnits = (Rooms, CurrentRoom) => {
        return Rooms.filter((room) => room.Room === CurrentRoom).reduce(
          (total, room) => total + room.TimeSlot,
          0
        );
      };

      const assignCoursesToRoom = (ClassType) => {
        return ClassType === "Laboratory" ? "Laboratory" : "Regular Room";
      };

      const checkCoachAvailability = (Coach) => {
        return !SetOfScheduled.some((schedule) => schedule.Coach === Coach);
      };

      for (let i = 0; i < WeekDays.length; i++) {
        this.shuffleArray(ListofCourse);
        for (let j = 0; j < ListofRoom.length; j++) {
          for (let k = 0; k < ListofCourse.length; k++) {
            TempCoach.length = 0;
            ListofCoach.forEach((coach) => {
              if (coach.CourseName === ListofCourse[k].CourseName)
                TempCoach.push(coach);
            });

            if (TempCoach.length === 0) return [];

            this.shuffleArray(TempCoach);

            if (
              ListofRoom[j].Type ===
                assignCoursesToRoom(ListofCourse[k].Type) &&
              ListofRoom[j].Capacity >= ListofCourse[k].SCT_Population
            ) {
              if (checkRoomUnits(TempRoom, ListofRoom[j].RoomName) < 540) {
                if (ListofCourse[k].Semester === CurrentSemester) {
                  if (checkCoachAvailability(TempCoach[0].LastName)) {
                    const st =
                      DayStart +
                      checkRoomUnits(TempRoom, ListofRoom[j].RoomName);
                    const et =
                      st + this.convertUnitsTime(ListofCourse[k].AssignedUnits);

                    const sectionNoConflict = !SetOfScheduled.some(
                      (schedule) =>
                        schedule.Section === ListofCourse[k].SectionName &&
                        schedule.Day === WeekDays[i] &&
                        schedule.RawEndTime > st
                    );

                    if (sectionNoConflict) {
                      SetOfScheduled.push({
                        CRRID: ListofCourse[k].CRRID,
                        CRSID: ListofCourse[k].CRSID,
                        SCTID: ListofCourse[k].SCTID,
                        RMID: ListofRoom[j].RMID,
                        CCHID: TempCoach[0].CCHID,
                        AYID: ListofCourse[k].AYID,
                        Semester: CurrentSemester,
                        CourseCode: ListofCourse[k].CourseCode,
                        CourseName: ListofCourse[k].CourseName,
                        Section: ListofCourse[k].SectionName,
                        CourseLevel: ListofCourse[k].CourseLevel,
                        Day: WeekDays[i],
                        RawStartTime: st,
                        RawEndTime: et,
                        StartTime: this.setTimeFormat(st),
                        EndTime: this.setTimeFormat(et),
                        Time: `${this.setTimeFormat(st)} - ${this.setTimeFormat(
                          et
                        )}`,
                        Room: ListofRoom[j].RoomName,
                        LessonType: ListofCourse[k].Type,
                        Coach: TempCoach[0].LastName,
                        Capacity: ListofRoom[j].Capacity,
                        Population: ListofCourse[k].SCT_Population,
                      });
                      TempRoom.push({
                        Room: ListofRoom[j].RoomName,
                        TimeSlot: this.convertUnitsTime(ListofCourse[k].Units),
                      });
                      WeekDaysScheduled[WeekDays[i]] += this.convertUnitsTime(
                        ListofCourse[k].Units
                      );
                      ListofCourse.splice(k, 1);
                      k--;
                    }
                  }
                }
              }
            }
          }
        }
      }
      return SetOfScheduled;
    }

    // Evaluate the fitness of an individual
    evaluateFitness(individual) {
      let conflictPenalty = 0;
      let roomUtilization = 0;
      let totalRoomCapacity = 0;
      let totalCoursePopulation = 0;

      const DayStart = 480; // 8:00 am
      const DayEnd = 1140; // 8:00 pm
      const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

      const ScheduledCourses = individual.map((schedule) => ({
        Day: schedule.Day,
        Room: schedule.Room,
        StartTime: schedule.RawStartTime,
        EndTime: schedule.RawEndTime,
        Population: schedule.Population,
      }));

      WeekDays.forEach((day) => {
        const daySchedules = ScheduledCourses.filter((s) => s.Day === day);

        for (let i = 0; i < daySchedules.length; i++) {
          for (let j = i + 1; j < daySchedules.length; j++) {
            if (daySchedules[i].Room === daySchedules[j].Room) {
              if (
                !(
                  daySchedules[i].EndTime <= daySchedules[j].StartTime ||
                  daySchedules[i].StartTime >= daySchedules[j].EndTime
                )
              ) {
                conflictPenalty++;
              }
            }
          }
        }
      });

      individual.forEach((schedule) => {
        totalRoomCapacity += schedule.Capacity;
        totalCoursePopulation += schedule.Population;
      });

      roomUtilization = (totalCoursePopulation / totalRoomCapacity) * 100;

      const fitness = roomUtilization / 100 - conflictPenalty;

      return fitness;
    }

    // Evaluate the entire population
    evaluatePopulation() {
      this.population.forEach((individual) => {
        individual.fitness = this.evaluateFitness(individual.genes);
      });
    }

    // Select two parents based on their fitness (roulette wheel selection)
    selectParents() {
      const totalFitness = this.population.reduce(
        (sum, individual) => sum + individual.fitness,
        0
      );
      const pick = () => {
        let rand = Math.random() * totalFitness;
        for (const individual of this.population) {
          rand -= individual.fitness;
          if (rand <= 0) return individual;
        }
      };

      return [pick(), pick()];
    }

    // Crossover two parents to produce a child
    crossover(parent1, parent2) {
      if (Math.random() < this.crossoverRate) {
        const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
        const childGenes = [
          ...parent1.genes.slice(0, crossoverPoint),
          ...parent2.genes.slice(crossoverPoint),
        ];
        return { genes: childGenes, fitness: 0 };
      }
      return Math.random() < 0.5 ? { ...parent1 } : { ...parent2 };
    }

    /* Original Format
          mutate(individual) {
        for (let i = 0; i < individual.genes.length; i++) {
          if (Math.random() < this.mutationRate) {
            // Apply mutation logic
            // Example: swap two classes, change time or room, etc.
          }
        }
      }
      */
    // Mutate an individual's genes
    mutate(individual) {
      if (Math.random() < this.mutationRate) {
        const geneLength = individual.genes.length;

        // Select a random start and end point for the subset
        const start = Math.floor(Math.random() * geneLength);
        const end = Math.floor(Math.random() * geneLength);

        // Ensure that start is less than end
        const [lower, upper] = start < end ? [start, end] : [end, start];

        // Extract the subset
        const subset = individual.genes.slice(lower, upper + 1);

        // Shuffle the subset
        for (let i = subset.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [subset[i], subset[j]] = [subset[j], subset[i]];
        }

        // Replace the original subset with the shuffled subset
        individual.genes.splice(lower, upper - lower + 1, ...subset);
      }
    }

    // Run the genetic algorithm
    run() {
      this.initializePopulation();
      this.evaluatePopulation();

      while (this.generation < this.maxGenerations) {
        const newPopulation = [];

        for (let i = 0; i < this.populationSize; i++) {
          const [parent1, parent2] = this.selectParents();
          const child = this.crossover(parent1, parent2);
          this.mutate(child);
          newPopulation.push(child);
        }

        this.population = newPopulation;
        this.evaluatePopulation();
        this.generation++;

        const bestIndividual = this.population.reduce((best, individual) =>
          individual.fitness > best.fitness ? individual : best
        );

        console.log(
          `Generation ${this.generation}: Best fitness = ${bestIndividual.fitness}`
        );
      }

      return this.getBestIndividual();
    }

    // Get the best individual in the population
    getBestIndividual() {
      return this.population.reduce((best, individual) =>
        individual.fitness > best.fitness ? individual : best
      );
    }
  }

  const ga = new GeneticAlgorithm(100, 0.01, 0.7, 50, req.body);
  const bestSchedule = ga.run();

  return res.json({ data: bestSchedule.genes, Status: "Success" });
});
// return res.json(output: "output");
app.post("/get-scheduable-courses", (req, res) => {
  const sql = `SELECT *
      FROM 
        con_course_course
      INNER JOIN
        tbl_course
      ON
        con_course_course.CRSID = tbl_course.CRSID
      RIGHT JOIN
        ay_program_section_course
      ON
        con_course_course.PRGID = ay_program_section_course.PRGID AND con_course_course.CRSID = ay_program_section_course.CRSID
      INNER JOIN
        tbl_academicyear
      ON
        ay_program_section_course.AYID = tbl_academicyear.AYID
      INNER JOIN
        tbl_curriculum
      ON
        ay_program_section_course.CRRID = tbl_curriculum.CRRID
      INNER JOIN
        ay_program_section
      ON
        ay_program_section_course.SCTID = ay_program_section.SCTID
      INNER JOIN
        tbl_section
      ON
        ay_program_section.SCTID = tbl_section.SCTID
      INNER JOIN
        tbl_program
      ON
        tbl_section.PRGID = tbl_program.PRGID
      INNER JOIN
        tbl_department
      ON
        tbl_program.DPTID = tbl_department.DPTID
      WHERE
        ay_program_section_course.CRRID = ? `;

  db.query(sql, [req.body.CRRID], (err, data) => {
    if (err) return res.json({ Message: "Server Sided Error" });
    return res.json(data);
  });
});
