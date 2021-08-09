const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == "production" ? ".env" : ".env.dev"
  ),
});

const app = express();
let query = "express";

app.get("/translate", (req, res) => {
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const request = require("request");
  const options = {
    url: api_url,
    form: { source: "en", target: "ko", text: query },
    headers: {
      "X-Naver-Client-Id": process.env.client_id,
      "X-Naver-Client-Secret": process.env.client_secret,
    },
  };
  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
app.listen(3000, () => {
  console.log("http://localhost:3000/translate app listening on port 3000!");
});
