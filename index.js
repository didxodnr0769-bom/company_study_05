// server.js 파일에 다음 내용을 입력
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어

/** 이용자 토큰 목록 */
const tokens = [];

/** 메뉴 리스트 */
let menus = [];

// 루트 경로에 대한 GET 요청 처리
app.get("/", (req, res) => {
  res.send("Hello, Express Server!");
});

app.get("/token/list", (req, res) => {
  res.json(tokens);
});

app.post("/token/regist", (req, res) => {
  const token = req.body.token;

  if (!tokens.find((t) => t === token)) {
    tokens.push(token);
  }

  res.status(200).send("");
});

/**
 * 메뉴 리스트 요청
 */
app.get("/menu/list", (req, res) => {
  res.json({ data: menus });
});

/**
 * 메뉴 리스트 등록
 */
app.post("/menu/regist", (req, res) => {
  const { menu } = req.body;

  if (Array.isArray(menu)) {
    menus = menu;
  }

  res.status(200).send("");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
