const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const http = require("http");

let fps = 10;
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log(
    "not enough arguments: yarn run generate-stab-screenshots control-file audio-analysis-file length"
  );
  process.exit(1);
}

const dir = "./tmp/screenshots";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
} else {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlinkSync(path.join(dir, file), err => {
        if (err) throw err;
      });
    }
  });
}

// Load the control file.
let controlFile = JSON.parse(fs.readFileSync(args[0]).toString());

// Given the fps, and the length of the song, we can calculate the frame count.
bpm = controlFile.bpm; // notes_in_bar = 4
fps = controlFile.fps;

// Work out
// 120 bpm is 2 beats per second, so 1 beat is 0.5 seconds, and as there are 4 notes in a bar, that means 1 bar is 2 seconds.

let time_for_bar = (60 / controlFile.bpm) * controlFile.beats_in_bar;

console.log("Time for a bar: ", time_for_bar);

// So now, work out which frame each preset change starts at

let frame = 0;
let beatCount = 0;
for (let i = 0; i < controlFile.presets.length; i++) {
    console.log("--------------------");

    beatCount = beatCount + controlFile.presets[i].beats;
    frame = beatCount * time_for_bar * fps;


    controlFile.presets[i].frame = frame;
    let presetName = controlFile.presets[i].preset;

    // Here we need to load this from http://localhost:8080/name
    let url = `http://localhost:8080/${presetName}.json`;
    http.get(url, (response) => {
        let place = i;
    	let chunks_of_data = [];

    	response.on('data', (fragments) => {
    		chunks_of_data.push(fragments);
    	});

    	response.on('end', () => {
    		let response_body = Buffer.concat(chunks_of_data);
            console.log("Retrieved preset");
            //console.log("Preset is " + response_body.toString());
            console.log("Writing it to preset " + place);
    		// response body
    		controlFile.presets[place].preset_info = JSON.parse(response_body.toString());
    	});

    	response.on('error', (error) => {
    		console.log(error);
    	});
    });
    //let presetFile = `${process.cwd()}/presets/${presetName}.json`;
    //let preset = JSON.parse(fs.readFileSync(presetFile));
    //controlFile.presets[i].preset_info = preset;

    console.log('Phase: ', i);
    console.log("Current preset: ", presetName);
    console.log("Bars for this phase: ", controlFile.presets[i].beats);
    console.log("Total bars: ", beatCount);
    console.log("Frame to change to next preset: ", frame);

    totalSeconds = (frame / fps);
    minutesPart = parseInt(totalSeconds / 60);
    secondsPart = totalSeconds % 60;

    console.log(`Time to change to next preset: ${minutesPart}:${secondsPart}`)
}

let current_preset = 0;

//const preset = JSON.parse(fs.readFileSync(args[0]).toString());
//const preset2 = JSON.parse(fs.readFileSync(args[1]).toString());


let audioAnalysisFile;
if (args.length > 2) {
  audioAnalysisFile = args[2];
} else {
  audioAnalysisFile = `${process.cwd()}/tmp/audioAnalysisData.json`;
}
const audioAnalysis = JSON.parse(fs.readFileSync(audioAnalysisFile).toString());

let frameCount;
if (args.length > 3) {
  frameCount = Math.min(args[3], audioAnalysis.length);
} else {
  frameCount = audioAnalysis.length;
}

console.log("Total frames: ", frameCount);

// Also load the change file here, so that we can change the preset at a certain time.
// We still do that with bars, but we can translate that into a frame count. (given 60 fps, and a bpm, and a bar count)

(async () => {
  const width = controlFile.width;
  const height = controlFile.height;
  const startFrame = 0;
  const framerate = fps;
  const frametime = 1 / framerate;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR: " + err.toString()));

  async function c(e) {
    console.log('loaded :');
    await page.evaluate(() => {
        console.log('On page :');
        window.startUp();
     });
    return e;
  }
  //page.on("load", await(c));
  const html = `
  <!DOCTYPE html>
      <head>
        <script type="text/javascript" src="https://unpkg.com/lodash"></script>
        <script type="text/javascript" src="https://unpkg.com/butterchurn"></script>
        <script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"></script>


        <link rel="stylesheet" href="https://unpkg.com/normalize.css/normalize.css" />

        <script>
          $(function() {
            const canvas = document.getElementById('canvas');
            const visualizer = butterchurn.default.createVisualizer(null, canvas , {
              width: ${width},
              height: ${height},
              meshWidth: 64,
              meshHeight: 48,
              pixelRatio: 1,
              textureRatio: 2,
            });

            // Add blend time to this
            window.loadPreset = (preset, blend) => {
              console.log("Preset loading " + JSON.stringify(preset));
              visualizer.loadPreset(preset, blend);
            }

          /*
            window.launchSongTitleAnim = (text) => {
              visualizer.launchSongTitleAnim(text);
            }
          */
            window.render = (opts) => {
              visualizer.render(opts);
            }
          });
        </script>
      </head>
      <body>
        <div>
          <canvas id='canvas' width='${width}' height='${height}'></canvas>
        </div>
      </body>
    </html>`;
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  // Load the page above, wait for it to load.
  await page.goto(`data:text/html;charset=UTF-8,${html}`);
  await page.$("#canvas");
  console.log("Canvas loaded");
  //await page.evaluate(() => { window.startUp(); } );
  // Load the preset
  //await page.evaluate(preset => window.loadPreset(preset), preset);

  //await page.evaluate(text => window.launchSongTitleAnim(text), presetName);

  let totalTime = 0;
  let expectedTime = 0;
  let whichPreset = 0;

  preset_reset = false;
  //console.log(controlFile.presets[current_preset].preset_info);
 await page.evaluate((preset, blend) => window.loadPreset(preset), controlFile.presets[current_preset].preset_info, controlFile.presets[current_preset].blend);

  for (let i = startFrame; i < frameCount; i++) {
    // For every frame, get the analysis for this frame, and then render it using those render options.
    // Note that we can change the preset here if we want.
    if (i >= controlFile.presets[current_preset].frame && !preset_reset) {
        console.log('Changing preset');
         current_preset++;
        if (current_preset >= controlFile.presets.length) {
            current_preset = 0;
            preset_reset = true;
        }
// The preset in the config is a name, we need to load it into a json file and then pass that
        await page.evaluate((preset, blend) => window.loadPreset(preset), controlFile.presets[current_preset].preset_info, controlFile.presets[current_preset].blend);

    }

    const audioData = audioAnalysis[i];

    let elapsedTime;
    if (i === 0) {
      elapsedTime = audioData.time;
    } else {
      elapsedTime = audioData.time - audioAnalysis[i - 1].time;
    }

    const renderOpts = {
      elapsedTime,
      audioLevels: {
        timeByteArray: audioData.timeByteArray,
        timeByteArrayL: audioData.timeByteArrayL,
        timeByteArrayR: audioData.timeByteArrayR
      }
    };

    totalTime += elapsedTime;
    expectedTime += frametime;

    // Calcualte rendering time and screenshot time
    const start = Date.now();

    // Evaluate on the page, given this option, this function. (I.e. start rendering)
    await page.evaluate(renderOpts => {
      window.render(renderOpts);
    }, renderOpts);

    const mid = Date.now();

    await page.screenshot({
      path: `tmp/screenshots/SS-${(i + "").padStart(5, 0)}.png`
    });

    const end = Date.now();
    console.log(
      `Frame ${i + 1}/${frameCount}, Render Time: ${(mid - start) /
        1000}, Screenshot Time: ${(end - mid) /
        1000}, Time Desync: ${totalTime - expectedTime}`
    );
  }

  //await browser.close();
})();
