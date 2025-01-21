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

