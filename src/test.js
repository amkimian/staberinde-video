const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const http = require("http");

console.log("Hello!");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR: " + err.toString()));

    const html = `
    <!DOCTYPE html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/normalize.css/normalize.css" />
      <script type="text/javascript" src="https://unpkg.com/lodash"></script>
      <script type="text/javascript" src="https://unpkg.com/butterchurn"></script>
      <script
              src="https://code.jquery.com/jquery-3.1.1.min.js"
              integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
              crossorigin="anonymous"></script>
      <style>
              #canvas:fullscreen {
                width: 100%;
                height: 100%;
              }
            </style>
      <script>
        console.log("Script running");
        window.startUp = () => {
          console.log("Start script load function");
        };
      </script>
    </head>
    <body>
      <div>
        <canvas id='canvas' width='100' height='100'></canvas>
      </div>
    </body>
  </html>`;
  await page.goto(`data:text/html;charset=UTF-8,${html}`);
  await page.$("#canvas");
  console.log("Canvas loaded");
  await page.evaluate(() => {
    console.log("In evaluation");
    window.startUp(); } );
  await browser.close();
})();


