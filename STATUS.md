# Status and migration provenance

Recorded 2026-09-30. Lifecycle: undecided.

Node.js / Puppeteer video creation scripts using Butterchurn presets and audio analysis.

## Identity and source

- Canonical path: `D:\Development\Music\staberinde-video`.
- Original source: `C:\Users\ukmoo\development\staberinde-video`.
- Read-only comparison copy: `E:\Backup\Development\staberinde-video` (unchanged).
- Original HEAD: `e3ca6e659b04725b7734bef80177d2057951a350`.
- Existing remote is PUBLIC. Publishing is paused. A separate private repository or private-fork destination must be chosen; no permissions were changed and no push was made.
- Kept separate from TheMilker, staberinde-video, stabvid, and StabMilker as applicable.

## Preservation

Original C: source copy, dependencies, and generated tmp output remain retained. Top-level audio/video assets moved to D:. Dependencies and tmp output are not copied to D:.

Source/configuration files under 20 MB matched the E: backup by SHA-256 before migration, excluding Git internals, dependencies, target, dist, and tmp. Larger media was initially size-compared only. No unique source variant was found. The E: backup has the same HEAD. staberinde-video staging differs (dist staged on C:), despite matching compared working source. Original staged/unstaged binary patches and Git index snapshots are retained outside the repositories in `C:\Users\ukmoo\Documents\Codex\2026-09-30\task-10\safety\staberinde-video`.

No nested repositories found. No symlinks/junctions found. Absolute-path matches were in IDE workspace metadata and preset text; no source path rewrites were made. Audio, video, IDE workspace data, dependencies, and generated output are not newly uploaded.

## Validation and limits

Canonical compared files verified against the pre-migration SHA-256 inventory before documentation edits. Runtime behavior is unverified. No dependency upgrades or network builds were run. Existing licenses and upstream attribution remain intact. Java project requires JDK 21 and Maven; Node projects retain existing package manifests and lockfiles. Reinstall Node dependencies before attempting runtime use from D:.

Validation results: Node --check passed on src/generateAudioAnalysis.js and src/generateStabScreenshots.js.
