"use client";

/**
 * CinematicLayer
 * ─────────────────────────────────────────────────────────────
 * A transparent Three.js overlay that floats warm-orange and
 * white bokeh particles with additive blending, slow sine
 * oscillation, and gentle mouse-parallax camera drift.
 *
 * Performance notes:
 *  - Single BufferGeometry + Points (one draw call)
 *  - Pixel ratio capped at 2
 *  - rAF loop pauses when the tab is hidden or the layer
 *    scrolls out of view (IntersectionObserver)
 *  - All GPU resources disposed on unmount
 *  - Skips rendering entirely under prefers-reduced-motion
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 220;

/** Soft radial bokeh sprite drawn once on a canvas. */
function makeBokehTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function CinematicLayer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer / scene / camera ─────────────────── */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      120
    );
    camera.position.z = 24;

    /* ── Particles ─────────────────────────────────── */
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT); // phase offsets
    const speeds = new Float32Array(PARTICLE_COUNT);

    const ember = new THREE.Color("#ff8c42");
    const emberSoft = new THREE.Color("#ffb27a");
    const white = new THREE.Color("#fff6ec");
    const blue = new THREE.Color("#6ea8d8");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 60; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 36; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z depth

      // ~55% ember, 30% white, 10% soft ember, 5% blue spill
      const r = Math.random();
      const c =
        r < 0.55 ? ember : r < 0.85 ? white : r < 0.95 ? emberSoft : blue;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      seeds[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.35;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const basePositions = positions.slice(); // immutable reference copy

    const texture = makeBokehTexture();
    const material = new THREE.PointsMaterial({
      size: 1.6,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ── Mouse parallax (lerped, GPU-cheap) ────────── */
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ── Visibility gating ─────────────────────────── */
    let inView = true;
    let tabVisible = !document.hidden;
    const io = new IntersectionObserver(
      ([entry]) => (inView = entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(mount);
    const onVisibility = () => (tabVisible = !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    /* ── Resize ────────────────────────────────────── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!inView || !tabVisible) return; // skip work off-screen

      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const phase = seeds[i];
        const sp = speeds[i];
        // slow drifting sine oscillation on every axis
        pos[i3 + 0] = basePositions[i3 + 0] + Math.sin(t * sp + phase) * 1.4;
        pos[i3 + 1] =
          basePositions[i3 + 1] + Math.sin(t * sp * 0.8 + phase * 1.7) * 1.8;
        pos[i3 + 2] =
          basePositions[i3 + 2] + Math.cos(t * sp * 0.6 + phase) * 1.2;
      }
      geometry.attributes.position.needsUpdate = true;

      // gentle group rotation + parallax camera lerp
      points.rotation.y = t * 0.012;
      camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    tick();

    /* ── Teardown ──────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        // soft blur sells the bokeh / dreamy depth
        filter: "blur(1.5px)",
      }}
    />
  );
}
