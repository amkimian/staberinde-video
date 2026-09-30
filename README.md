# staberinde-video

Node.js / Puppeteer video creation scripts using Butterchurn presets and audio analysis.

Canonical location: `D:\Development\Music\staberinde-video`. Lifecycle is undecided. This project retains its own identity and history; it is not consolidated into StabMilker. See [STATUS.md](STATUS.md) for migration provenance and validation.

---

# Staberinde Video Creator

Create videos of Milkdrop presets using Butterchurn

## Usage

Create files like transcendence.json that contain the following:

```json
{
  "preset": "transcendence",
  "duration": 10,
  "fps": 30,
  "output": "transcendence.mp4"
}
```

Then run the script with the file as an argument:

```bash
npm run  generate-audio ./transcendence.json

npm run generate-stab-screenshots ./transcendence.json

npm run create-video-from-screenshots ./transcendence.json
```

Your video will be in the tmp folder.

