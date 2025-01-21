const execSync = require("child_process").execSync;
const uuidv1 = require('uuid/v1');
const fs = require("fs");
const args = process.argv.slice(2);


if (args.length < 1) {
  console.log(
    "not enough arguments: yarn run generate-audio audio-file-path"
  );
  process.exit(1);
}

let controlFile = JSON.parse(fs.readFileSync(args[0]).toString());

const audioFile = controlFile.audio;

(async () => {
  await execSync(
    `ffmpeg -y -framerate ${controlFile.fps} -i tmp/screenshots/SS-%05d.png -i "${audioFile}" -shortest -c:v libx264 -profile:v high -aspect 16:9 -crf 20 -pix_fmt yuv420p tmp/${uuidv1()}.mp4`
  );
})();
