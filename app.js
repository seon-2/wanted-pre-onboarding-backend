const express = require("express");
const cors = require("cors");

const app = express();

const port = 3020;

// recruitment.js 연결
const recruitmentRouter = require("./routes/recruitment");

// 미들웨어 추가
app.use(cors());
app.use(express.json());
app.use("/recruitment", recruitmentRouter);


app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port} 🌷`);
});
