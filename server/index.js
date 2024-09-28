const AcademicYear = require("./routes/Tables/SetupTables/AcademicYear.js");
const Curriculum = require("./routes/Tables/SetupTables/Curriculum.js");
const Setup = require("./routes/Tables/SetupTables/Setup.js");
const Assignment = require("./routes/Tables/SetupTables/Assignment.js");
const Projection = require("./routes/Tables/SetupTables/Projection.js");
const Specialization = require("./routes/Tables/SetupTables/Specialization.js");

const AcademicLevel = require("./routes/Tables/Additional/AcademicLevel.js");
const Semester = require("./routes/Tables/Additional/Semester.js");
const Facility = require("./routes/Tables/Additional/Facility.js");
const Building = require("./routes/Tables/Additional/Building.js");
const Floor = require("./routes/Tables/Additional/Floor.js");
const YearLevel = require("./routes/Tables/Additional/YearLevel.js");
const Component = require("./routes/Tables/Additional/Component.js");
const CoachType = require("./routes/Tables/Additional/CoachType.js");
const WeeklyEvent = require("./routes/Tables/Additional/WeeklyEvent.js");
const ExpectedClass = require("./routes/Tables/Additional/ExpectedClass.js");

const Department = require("./routes/Tables/Department.js");
const Program = require("./routes/Tables/Program.js");
const Coach = require("./routes/Tables/Coach.js");
const Course = require("./routes/Tables/Course.js");
const Room = require("./routes/Tables/Room.js");
const Section = require("./routes/Tables/Section.js");
const Schedules = require("./routes/Tables/Schedules.js");

const _User = require("./routes/Tables/_User.js");

const RandomCode = require("./routes/Logic/RandomCode.js");
const Generate = require("./routes/Logic/GenerateSchedule.js");
const SaveImage = require("./routes/Logic/SaveImage.js");
const Login = require("./routes/Logic/Login.js");
const Statistics = require("./routes/Logic/Statistics.js");
// = = >

const port = 3000;
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const pool = new Pool({
  user: "postgres.pgcztzkowuxixfyiqera",
  password: "Clskde_#5*Ths2",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
});
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Allow-Methods"
  );
  res.header("Content-Type", "application/json");
  next();
});

app.options(
  "*",
  cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "https://localhost:3000",
    allowedHeaders: "Content-Type, Accept",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
// = = >
app.use(express.json());
app.use(express.text());
app.use(express.static("public"));

// = = >
const router = express.Router();
pool.connect();
// = = >

global.router = router;
// = = >

router.use("/", RandomCode);
router.use("/", Generate);
router.use("/", SaveImage);
router.use("/", Login);
router.use("/", Statistics);

router.use("/", AcademicYear);
router.use("/", Curriculum);
router.use("/", Setup);
router.use("/", Assignment);
router.use("/", Projection);
router.use("/", Specialization);

router.use("/", Department);
router.use("/", Program);
router.use("/", Coach);
router.use("/", Course);
router.use("/", Room);
router.use("/", Section);
router.use("/", Schedules);

router.use("/", _User);

router.use("/", Facility);
router.use("/", Building);
router.use("/", Floor);
router.use("/", YearLevel);
router.use("/", AcademicLevel);
router.use("/", Semester);
router.use("/", Component);
router.use("/", CoachType);
router.use("/", WeeklyEvent);
router.use("/", ExpectedClass);

// = = >
app.listen(8081, () => {
  console.log("Running");
});
app.get("/status", (req, res) => {
  res.send("server is running");
});

// pool.query(`SELECT * FROM _user`, (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
// });

app.post("/test-data", (req, res) => {
  try {
    pool.query(`SELECT * FROM _user`, (err, ris) => res.json(ris.rows));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

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
  //const clientData = JSON.parse(req.body);
  const image = req.file.filename;
  return res.json(image);
});

// = = >
pool.end;
// = = >

app.use(global.router);
