import express from "express";
const app = express();

app.get("/random-code-generator", (req, res) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const charactersLength = characters.length;

  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return res.json(result);
});

export default app;
