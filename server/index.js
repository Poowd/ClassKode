const Statistics = require("./routes/database/datapacks/Statistics.js");
const TotalPopulation = require("./routes/database/datapacks/TotalPopulation.js");
const Select = require("./routes/database/Select.js");
const Insert = require("./routes/database/Insert.js");
const Update = require("./routes/database/Update.js");
const Archives = require("./routes/database/Archives.js");
const Generate = require("./routes/logic/GenerateSchedule.js");
const RandomCode = require("./routes/logic/RandomCode.js");
const SaveImage = require("./routes/logic/SaveImage.js");
const Login = require("./routes/logic/Login.js");

const AcademicLevel = require("./routes/Tables/Additional/AcademicLevel.js");
const AcademicYear = require("./routes/Tables/AcademicYear.js");
const Department = require("./routes/Tables/Department.js");
const Program = require("./routes/Tables/Program.js");
const Coach = require("./routes/Tables/Coach.js");
const Course = require("./routes/Tables/Course.js");
const Room = require("./routes/Tables/Room.js");
const Section = require("./routes/Tables/Section.js");
const _User = require("./routes/Tables/_User.js");
const Facility = require("./routes/Tables/Additional/Facility.js");
const Building = require("./routes/Tables/Additional/Building.js");
const Floor = require("./routes/Tables/Additional/Floor.js");
const YearLevel = require("./routes/Tables/Additional/YearLevel.js");
// = = >
const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const pool = new Pool({
  user: "postgres.pgcztzkowuxixfyiqera",
  password: "Clskde_#5*Ths2",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
});
// = = >
pool.connect();
// = = >

// = = >
global.router = router;
router.use("/", Statistics);
router.use("/", TotalPopulation);
router.use("/", Select);
router.use("/", Insert);
router.use("/", Update);
router.use("/", Archives);
router.use("/", Generate);
router.use("/", RandomCode);
router.use("/", SaveImage);
router.use("/", Login);

router.use("/academic-level", AcademicLevel);
router.use("/academic-year", AcademicYear);
router.use("/department", Department);
router.use("/program", Program);
router.use("/coach", Coach);
router.use("/course", Course);
router.use("/room", Room);
router.use("/section", Section);
router.use("/user", _User);
router.use("/facility", Facility);
router.use("/building", Building);
router.use("/floor", Floor);
router.use("/year-level", YearLevel);
// = = >
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  })
);
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

// = = >
pool.end;
// = = >

app.use(global.router);
