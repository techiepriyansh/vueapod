const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.listen(process.env.PORT, () => console.log("listening"));
app.use(express.static("public"));
app.use(express.json());

const nasa_url = "https://api.nasa.gov/planetary/apod?api_key=";

function getRandomDate() {
  const start = 803298600000;
  const end = Date.now();
  let r = Math.floor(Math.random() * (end - start)) + start;
  let d = new Date(r);
  return `${d.getUTCFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

app.get("/random", async (req, res) => {
  const baseUrl = nasa_url + process.env.API_KEY;
  let date = getRandomDate();

  const response = await fetch(baseUrl + "&date=" + date);
  let imgData = await response.json();

  res.json(imgData);
});

app.get("/latest", async (req, res) => {
  const baseUrl = nasa_url + process.env.API_KEY;

  const response = await fetch(baseUrl);
  let imgData = await response.json();

  res.json(imgData);
});
