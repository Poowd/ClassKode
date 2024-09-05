import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { env } from "node:process";

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

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_classkode",
// });

//checks of the server is running
app.listen(8081, () => {
  console.log("Running");
});

app.get("/status", (req, res) => {
  res.send("server is running");
});

const router = (global.router = express.Router());

// DATABASE
import Statistics from "./routes/database/datapacks/Statistics.js";
app.use(Statistics);

import TotalPopulation from "./routes/database/datapacks/TotalPopulation.js";
app.use(TotalPopulation);

import Select from "./routes/database/Select.js";
app.use(Select);

import Insert from "./routes/database/Insert.js";
app.use(Insert);

import Update from "./routes/database/Update.js";
app.use(Update);

import Archives from "./routes/database/Archives.js";
app.use(Archives);

// LOGIC
import Generate from "./routes/logic/GenerateSchedule.js";
app.use(Generate);

import RandomCode from "./routes/logic/RandomCode.js";
app.use(RandomCode);

import SaveImage from "./routes/logic/SaveImage.js";
app.use(SaveImage);

import Login from "./routes/logic/Login.js";
app.use(Login);

// new Router(app, db);
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// class Router {
//   constructor(app, db) {
//     this.login(app, db);
//   }

//   login(app, db) {
//     app.post("/login", (req, res) => {});
//   }
// }

// module.exports = Router;
