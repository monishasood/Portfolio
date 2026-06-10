"use client";

/**
 * VideoIntro
 * ─────────────────────────────────────────────────────────────
 * Fullscreen sticky cinematic hero:
 *  - Foreground talking-head video + blurred ambient duplicate
 *  - Cinematic gradient overlays for legibility
 *  - Three.js bokeh layer (CinematicLayer)
 *  - GSAP entrance choreography
 *  - Glassmorphism play/pause + mute/unmute controls
 *  - Auto-hiding "Tap for sound" badge
 *  - Pulsing scroll indicator → smooth-scrolls to #work
 */

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import styles from "./VideoIntro.module.css";

// Three.js layer is client-only and below-the-fold-irrelevant: load lazily.
const CinematicLayer = dynamic(
  () => import("../CinematicLayer/CinematicLayer"),
  { ssr: false }
);

const VIDEO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/videos/hero.mp4`;
const SOUND_HINT_MS = 6000;

export default function VideoIntro() {
  const rootRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hintVisible, setHintVisible] = useState(true);

  /* ── Keep both video layers in lockstep ──────────── */
  const withBothVideos = useCallback((fn) => {
    [fgVideoRef.current, bgVideoRef.current].forEach((v) => v && fn(v));
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((was) => {
      withBothVideos((v) => (was ? v.pause() : v.play().catch(() => {})));
      return !was;
    });
  }, [withBothVideos]);

  const toggleMute = useCallback(() => {
    setMuted((was) => {
      const next = !was;
      const fg = fgVideoRef.current;
      if (fg) fg.muted = next; // sound only ever on the foreground layer
      setHintVisible(false);
      return next;
    });
  }, []);

  /* ── Auto-hide the sound hint ────────────────────── */
  useEffect(() => {
    const id = setTimeout(() => setHintVisible(false), SOUND_HINT_MS);
    return () => clearTimeout(id);
  }, []);

  /* ── Periodically resync ambient layer drift ────── */
  useEffect(() => {
    const id = setInterval(() => {
      const fg = fgVideoRef.current;
      const bg = bgVideoRef.current;
      if (fg && bg && Math.abs(fg.currentTime - bg.currentTime) > 0.3) {
        bg.currentTime = fg.currentTime;
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* ── GSAP entrance choreography ──────────────────── */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            `.${styles.veil}`,
            `.${styles.tagline}`,
            `.${styles.nameLine}`,
            `.${styles.subtitle}`,
            `.${styles.controls}`,
            `.${styles.scrollIndicator}`,
            `.${styles.soundHint}`,
          ],
          { clearProps: "all", opacity: 1, y: 0 }
        );
        gsap.set(`.${styles.veil}`, { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(`.${styles.veil}`, { opacity: 0, duration: 2.2, ease: "power2.inOut" })
        .from(
          `.${styles.tagline}`,
          { y: 24, opacity: 0, duration: 1.1 },
          "-=1.5"
        )
        .from(
          `.${styles.nameLine}`,
          { y: 80, opacity: 0, duration: 1.4, stagger: 0.18 },
          "-=0.8"
        )
        .from(
          `.${styles.subtitle}`,
          { y: 24, opacity: 0, duration: 1.1 },
          "-=0.9"
        )
        .from(
          [`.${styles.controls}`, `.${styles.soundHint}`],
          { y: 16, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        .from(
          `.${styles.scrollIndicator}`,
          { opacity: 0, duration: 1.2 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ── Smooth scroll to next section ───────────────── */
  const scrollToWork = useCallback(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={rootRef} className={styles.stickyWrap} aria-label="Intro">
      <div className={styles.hero}>
        {/* ── Ambient blurred duplicate ─────────────── */}
        <video
          ref={bgVideoRef}
          className={styles.videoAmbient}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* ── Foreground video ──────────────────────── */}
        <video
          ref={fgVideoRef}
          className={styles.videoMain}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted={muted}
          playsInline
        />

        {/* ── Cinematic gradient grading ────────────── */}
        <div className={styles.gradeBottom} aria-hidden="true" />
        <div className={styles.gradeVignette} aria-hidden="true" />
        <div className={styles.gradeEmber} aria-hidden="true" />

        {/* ── Three.js bokeh atmosphere ─────────────── */}
        <CinematicLayer />

        {/* ── Landing content ───────────────────────── */}
        <div className={styles.content}>
          <p className={styles.tagline}>
            Product Manager · AI/ML · Zero-to-One
          </p>

          <h1 className={styles.name} aria-label="Monisha Sood">
            <span className={styles.nameLine}>Monisha</span>
            <span className={`${styles.nameLine} ${styles.nameAccent}`}>
              Sood
            </span>
          </h1>

          <p className={styles.subtitle}>
            6+ years building zero-to-one products at the intersection of AI,
            strategy, and human impact — $48M in cost savings, 500+ D1
            athletes served, MBA&nbsp;'26 at the Wisconsin School of Business.
          </p>
        </div>

        {/* ── Glassmorphism controls ────────────────── */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.glassBtn}
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            aria-pressed={!playing}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.52.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>

          <div className={styles.muteWrap}>
            <button
              type="button"
              className={styles.glassBtn}
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              aria-pressed={!muted}
            >
              {muted ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              )}
            </button>

            {hintVisible && muted && (
              <span className={styles.soundHint} role="status">
                Tap for sound
              </span>
            )}
          </div>
        </div>

        {/* ── Scroll indicator ──────────────────────── */}
        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToWork}
          aria-label="Scroll to case studies"
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </button>

        {/* ── Page-load veil (fades out via GSAP) ───── */}
        <div className={styles.veil} aria-hidden="true" />
      </div>
    </section>
  );
}
