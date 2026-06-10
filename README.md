# Monisha Sood — Cinematic Portfolio Hero

A fullscreen, sticky cinematic hero built with **Next.js (App Router) + Three.js + GSAP + CSS Modules**, using a talking-head video as the primary visual asset.

## ⚠️ Add your video first

The uploaded video didn't come through in the chat, so the project ships with a placeholder path. Drop your file here:

```
public/videos/hero.mp4
```

(Any H.264 MP4 works. Keep it under ~10 MB for fast loads — `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -movflags +faststart hero.mp4` is a good squeeze.)

## Run it

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Architecture

```
app/
  layout.js                 fonts (Fraunces / Inter / Space Grotesk) + metadata
  globals.css               design tokens (ember orange, monitor blue, warm ink)
  page.js                   hero + #work scroll-target section
  page.module.css
components/
  VideoIntro/
    VideoIntro.jsx           sticky hero, video layers, GSAP entrance, controls
    VideoIntro.module.css    grading overlays, glassmorphism, scroll indicator
  CinematicLayer/
    CinematicLayer.jsx       Three.js bokeh particle overlay
```

### How the pieces work

**Video layers.** Two `<video>` elements share the same source: a blurred, scaled-up ambient layer behind, and the crisp foreground on top. They're controlled together (play/pause) and re-synced every 4 s so the ambient layer never drifts. Sound only ever lives on the foreground layer.

**Color grading.** Three stacked overlays: a bottom-up dark gradient for text legibility, a radial vignette, and a `soft-light` blend layer adding a warm ember practical (lower-left) and a cool monitor-blue spill (upper-right).

**CinematicLayer (Three.js).** ~220 bokeh particles in a single `Points` draw call with additive blending and a canvas-generated soft sprite. Sine-wave oscillation per particle, slow group rotation, and a lerped mouse-parallax camera. Rendering pauses when the hero scrolls out of view or the tab is hidden (IntersectionObserver + visibilitychange), pixel ratio is capped at 2, and every GPU resource is disposed on unmount. The whole layer is skipped under `prefers-reduced-motion`.

**GSAP entrance.** A dark veil fades out, then tagline → stacked name lines (staggered) → subtitle → controls → scroll indicator, all on one timeline inside `gsap.context()` so it cleans up correctly in React strict mode.

**Controls.** Glassmorphism play/pause and mute/unmute buttons with `backdrop-filter`, hover lift, focus-visible rings, and `aria-pressed` states. A pulsing "Tap for sound" badge auto-hides after 6 s or on first unmute.

**Scroll indicator.** A pulsing vertical line at bottom center; clicking smooth-scrolls to the `#work` section.

## Tuning knobs

| What | Where |
|---|---|
| Particle count / colors / speed | `CinematicLayer.jsx` top constants |
| Entrance timing | GSAP timeline in `VideoIntro.jsx` |
| Grading intensity | `.gradeBottom` / `.gradeEmber` in `VideoIntro.module.css` |
| Sound-hint duration | `SOUND_HINT_MS` in `VideoIntro.jsx` |
| Name / tagline / subtitle copy | JSX in `VideoIntro.jsx` |
