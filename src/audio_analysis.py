import json
import os
import numpy as np
import time
from pydub import AudioSegment
from scipy.fftpack import fft
from scipy.io import wavfile

# Read command-line arguments
import sys
if len(sys.argv) < 2:
    print("Not enough arguments: python generate_audio.py audio-file-path length-in-ms")
    sys.exit(1)

with open(sys.argv[1], 'r') as f:
    control_file = json.load(f)

audio_file = control_file["audio"]
audio_time = control_file["audioTime"]

dir_path = "./tmp"
os.makedirs(dir_path, exist_ok=True)

audio = AudioSegment.from_file(audio_file)
sample_rate = audio.frame_rate
num_samples = len(audio.get_array_of_samples())
duration = num_samples / sample_rate

framerate = control_file["fps"]
frametime = 1 / framerate
expected_time = 0
audio_analysis_data = []


def analyze_audio():
    global expected_time
    step_size = int(sample_rate * frametime)  # Number of samples per frame
    samples = np.array(audio.get_array_of_samples())
    channels = audio.channels

    if channels == 2:
        samples = samples.reshape((-1, 2))

    for i in range(0, num_samples, step_size):
        frame = samples[i:i+step_size]
        if len(frame) == 0:
            break

        time_mark = i / sample_rate

        if channels == 2:
            left_channel = frame[:, 0]
            right_channel = frame[:, 1]
        else:
            left_channel = right_channel = frame

        fft_data = fft(left_channel)
        fft_data_r = fft(right_channel)

        analysis = {
            "time": time_mark,
            "timeByteArray": np.abs(fft_data).tolist(),
            "timeByteArrayL": np.abs(fft_data).tolist(),
            "timeByteArrayR": np.abs(fft_data_r).tolist()
        }

        audio_analysis_data.append(analysis)
        print("Audio loop", time_mark, expected_time)

    with open("./tmp/audioAnalysisData.json", "w") as f:
        json.dump(audio_analysis_data, f)


# Start audio analysis
analyze_audio()
