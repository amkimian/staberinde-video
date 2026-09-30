# Status and migration provenance

Recorded 2026-09-30. Lifecycle: undecided.

Node.js / Puppeteer video creation scripts using Butterchurn presets and audio analysis.

## Identity and source

- Canonical path: `D:\Development\Music\staberinde-video`.
- Original source: `C:\Users\ukmoo\development\staberinde-video`.
- Read-only comparison copy: `E:\Backup\Development\staberinde-video` (unchanged).
- Original HEAD: `e3ca6e659b04725b7734bef80177d2057951a350`.
- Existing remote is PUBLIC and owned by the verified user amkimian. Alan explicitly approved continuing to use this repository. Source/configuration and documentation backup is authorized; visibility remains unchanged and no private duplicate is created.
- Kept separate from TheMilker, staberinde-video, stabvid, and StabMilker as applicable.

## Preservation

Original C: source copy, dependencies, and generated tmp output remain retained. Top-level audio/video assets moved to D:. Dependencies and tmp output are not copied to D:.

Source/configuration files under 20 MB matched the E: backup by SHA-256 before migration, excluding Git internals, dependencies, target, dist, and tmp. Larger media was initially size-compared only. No unique source variant was found. The E: backup has the same HEAD. staberinde-video staging differs (dist staged on C:), despite matching compared working source. Original staged/unstaged binary patches and Git index snapshots are retained outside the repositories in `C:\Users\ukmoo\Documents\Codex\2026-09-30\task-10\safety\staberinde-video`.

No nested repositories found. No symlinks/junctions found. Absolute-path matches were in IDE workspace metadata and preset text; no source path rewrites were made. Audio, video, IDE workspace data, dependencies, and generated output are not newly uploaded.

## Validation and limits

Canonical compared files verified against the pre-migration SHA-256 inventory before documentation edits. Runtime behavior is unverified. No dependency upgrades or network builds were run. Existing licenses and upstream attribution remain intact. This Node project retains its existing package manifest and lockfile. Reinstall Node dependencies before attempting runtime use from D:.

Validation results: Node --check passed on src/generateAudioAnalysis.js and src/generateStabScreenshots.js.

Public backup review: every changed file in the outgoing migration commit was inspected as text and screened for credential patterns. The scope is two JavaScript files, five JSON rendering configurations, README.md and STATUS.md. JSON configurations refer to local media filenames; the media itself, generated bundles, maps, dist output, dependencies and IDE files are excluded. Final asset comparison matched 485 files against the E: backup, excluding Git internals, dependencies, tmp and IDE metadata.
