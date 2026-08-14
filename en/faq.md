# mind² ECHO · Frequently asked questions

## Can an app analyse how each person communicates from a real meeting, without a questionnaire?

Yes. mind² ECHO builds a communication snapshot for each person in the room from the meeting itself, from how they actually spoke, instead of asking anyone to fill in a personality questionnaire. There are no forms and no setup: record the meeting, and every speaker gets their own profile and coaching, backed by quotes from the transcript.

## Can I get a DISC-style (DISG) communication profile of someone from a meeting?

mind² ECHO produces a mind² profile for each speaker across four behaviour dimensions: m (power-oriented), i (initiating), n (sustaining), and d (disciplined). These map onto the familiar four-colour DISC/DISG model (red, yellow, green, blue). It describes how the person communicated in this specific meeting, with a confidence level and supporting quotes. It is a situational snapshot, not a personality type or a label.

## Is my meeting audio private? Does transcription run on-device?

Speech recognition and speaker separation run entirely on your device. Transcription runs live on NVIDIA’s [Nemotron streaming speech model](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b) through the open-source [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) stack, so words appear in the transcript while people are still speaking. Speakers are told apart in two stages, both on-device: live during the recording by a [pyannote](https://github.com/pyannote/pyannote-audio) segmentation model with [wespeaker](https://github.com/wenet-e2e/wespeaker) speaker embeddings, and again in the final analysis pass by NVIDIA’s [Streaming Sortformer](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1) diarization model, which assigns every word to the right speaker. The Apache-licensed [ACFT Whisper models](https://github.com/futo-org/whisper-acft) from [FUTO](https://voiceinput.futo.org/), whose mission is freeing technology from the control of the few, remain on board as a fallback engine. The audio stream never leaves your device. Only the transcript text, never the audio, is sent for AI analysis, and only with your explicit consent; the server does not keep it. It is GDPR-compliant, with one-tap erasure under Art. 17 GDPR.

## Does it give personalised coaching for each person?

Yes. Every speaker gets behaviour and content coaching derived from what they actually said: strengths to lean on, blind spots to watch, what to try next time. Each tip is backed by quotes from the transcript. mind² ECHO never ranks or compares speakers against each other; each person’s coaching stands on its own.

## How is mind² ECHO different from Otter, Fireflies, or Read AI?

Most meeting assistants stop at transcripts, summaries and talk-time charts. mind² ECHO adds a per-person communication layer: a mind² profile and tailored coaching for each speaker, derived from the meeting itself rather than a questionnaire. And it transcribes on-device instead of sending your audio to the cloud.

## Can I see who dominated the meeting and how talk-time was shared?

Yes. mind² ECHO reports each speaker’s talk time and share of the conversation, their number of turns, their average turn length, and how often they asked questions. An unbalanced meeting, a long monologue, or a quiet participant is visible at a glance.

## How many speakers can it tell apart?

Up to four speakers per meeting, the limit of the diarization model. Within that limit the attribution is precise: in the final analysis pass, NVIDIA’s [Streaming Sortformer](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1) assigns every word to a speaker and handles interruptions and short overlapped interjections correctly, so a quick “yes” dropped into the middle of someone else’s sentence lands on the right person without breaking the other speaker’s sentence flow. This was verified by human review, listening back against the audio of a real meeting.

## Do I need to tell people I’m recording?

Yes. Always tell everyone and get their agreement before you record; recording a conversation secretly isn’t okay (in Germany it is even a criminal-law matter, §201 StGB, the “right to one’s own word”). mind² ECHO is built to make that an easy yes: transcription runs on your device, the audio never leaves your device, transcripts are transient, and everything can be erased with one tap. You’re asking people to agree to something genuinely minimal, not a recording shipped off to a company’s cloud.

## Does it need a bot to join my video call? Does it work for in-person meetings?

No bot joins your call. mind² ECHO records through your device, so it works for in-person meetings around a table just as well as for video calls. There is no meeting bot to invite and nothing for the other participants to install.

## Why does the app download models, and how big are they?

The speech models are too large to bundle into the app, so mind² ECHO downloads them on demand: the transcription model is about a 410 MB download, the diarization model for the final analysis pass is 492 MB, and the two small live speaker-separation models add about 36 MB together. The two big models are integrity-checked against a SHA-256 hash and served from GitHub releases under our control; the two small live models come from the open-source sherpa-onnx project’s releases. Fetching a model never contacts an AI provider’s servers. The app checks your free disk space before it starts, and on mobile data it asks before downloading anything large.

## Can I import existing recordings?

Yes. You can import existing audio files, for example FLAC or WAV recordings, and they run through the same on-device pipeline as a live meeting: the transcript appears live while the import is processing, and the import runs faster than real time, so a long recording is done in less time than it took to record. Everything downstream, speaker separation, profiles and coaching, works the same as for a meeting you recorded in the app.

## What is the mind² method?

mind² (“mind squared”) is a communication model from [Dr. Thumm GmbH](https://dr-thumm.de/mind2-methode.html). It pairs a behaviour dimension (m, i, n, d: power-oriented, initiating, sustaining, disciplined, the familiar four DISC/DISG colours) with a motive dimension (six drives after Spranger and two temperament axes). mind² ECHO surfaces the behaviour dimension per speaker for a single meeting.

## Is this an accurate read of someone’s personality?

It is deliberately not a personality verdict. mind² ECHO reports how someone communicated in one meeting, with a confidence level and the quotes it is based on. It is a situational snapshot meant to make the next conversation smoother, not a fixed type. People communicate differently depending on the room, so the profile is a starting point for reflection, never a label.
