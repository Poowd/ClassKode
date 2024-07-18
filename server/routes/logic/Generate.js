import express from "express";
const app = express();

app.post("/generate-classes", (req, res) => {
  var tempdata = "";
  return res.json({ data: tempdata });
});

export default app;
