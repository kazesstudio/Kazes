"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Soft 3D surface — a slowly rotating, matte-shaded form in the studio's warm
 * palette. Used as the portrait "anchor" visual between card groups.
 *
 * Performance and accessibility notes:
 *  - The three.js bundle is imported dynamically, so it never enters the
 *    initial payload. The static gradient fallback paints immediately.
 *  - The canvas is only created once the element is near the viewport, and the
 *    render loop is suspended entirely when the tab is hidden.
 *  - Under `prefers-reduced-motion: reduce` the canvas is never created and the
 *    static gradient is shown instead.
 *  - The context is explicitly disposed on unmount.
 */

const COLORS = {
  background: 0xf5f0e9,
  surface: 0xa7836c,
  deep: 0x4a2d20,
  light: 0xfffcf7,
} as const;

export function SoftForm({
  className,
  intensity = 1,
}: {
  className?: string;
  /** Scales the lighting contrast. Lower values read flatter and softer. */
  intensity?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "unsupported">("idle");

  // Derived, not stored: `useReducedMotion` subscribes to the media query, so
  // there is no need to read it manually and push the result into state.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Honour the visitor's motion preference before any WebGL work happens.
    if (reduceMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      let three: typeof import("three");
      try {
        three = await import("three");
      } catch {
        if (!cancelled) setStatus("unsupported");
        return;
      }

      if (cancelled) return;

      const hostWidth = host.clientWidth;
      if (hostWidth === 0) return;

      try {
        const renderer = new three.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(hostWidth, host.clientHeight, false);
        renderer.setClearAlpha(0);
        host.appendChild(renderer.domElement);
        renderer.domElement.style.display = "block";
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";

        const scene = new three.Scene();
        const camera = new three.PerspectiveCamera(
          34,
          hostWidth / host.clientHeight,
          0.1,
          100,
        );
        camera.position.set(0, 0, 6.4);

        /* --- form: an icosahedron pushed into a soft, slightly flattened
               organic solid. Smooth-shaded, matte, no specular glare. ------- */
        const geometry = new three.IcosahedronGeometry(1.85, 64);
        const position = geometry.attributes.position as {
          getX: (i: number) => number;
          getY: (i: number) => number;
          getZ: (i: number) => number;
          setXYZ: (i: number, x: number, y: number, z: number) => void;
          count: number;
        };

        const vector = new three.Vector3();
        for (let index = 0; index < position.count; index += 1) {
          vector.set(position.getX(index), position.getY(index), position.getZ(index));
          const length = vector.length();
          const nx = vector.x / length;
          const ny = vector.y / length;
          const nz = vector.z / length;

          // Low-frequency, non-repeating deformation. Deterministic, so the
          // form is identical on every load.
          const wave =
            1 +
            0.1 * Math.sin(nx * 2.6 + ny * 1.7) +
            0.06 * Math.sin(nz * 3.4 - ny * 2.2) +
            0.04 * Math.cos(nx * 4.1 + nz * 2.9);

          position.setXYZ(
            index,
            nx * 1.85 * wave,
            ny * 1.85 * wave * 0.92,
            nz * 1.85 * wave,
          );
        }

        geometry.computeVertexNormals();

        const material = new three.MeshStandardMaterial({
          color: COLORS.surface,
          roughness: 0.72,
          metalness: 0.04,
          flatShading: false,
        });

        const mesh = new three.Mesh(geometry, material);
        scene.add(mesh);

        /* --- lighting: warm key from upper left, cool-ish fill, rim ---- */
        const key = new three.DirectionalLight(0xfff6ea, 2.1 * intensity);
        key.position.set(-3.4, 4.2, 4.6);
        scene.add(key);

        const fill = new three.DirectionalLight(0xf5f0e9, 0.85 * intensity);
        fill.position.set(4.2, -1.6, 2.4);
        scene.add(fill);

        const rim = new three.DirectionalLight(0xd8c8b9, 1.5 * intensity);
        rim.position.set(1.2, -2.8, -3.6);
        scene.add(rim);

        scene.add(new three.AmbientLight(0xfffcf7, 0.55 * intensity));

        /* --- slow, continuous rotation --------------------------------- */
        let raf = 0;
        const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const tick = (time: number) => {
          const seconds = time / 1000;
          // Pause entirely when the tab is hidden or the host is offscreen.
          if (document.hidden || !isVisible(host)) {
            raf = requestAnimationFrame(tick);
            return;
          }
          mesh.rotation.y = seconds * 0.12;
          mesh.rotation.x = Math.sin(seconds * 0.18) * 0.12;
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        if (!cancelled && !reduce()) setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(raf);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          if (renderer.domElement.parentNode === host) {
            host.removeChild(renderer.domElement);
          }
        };
      } catch {
        if (!cancelled) setStatus("unsupported");
      }
    };

    // Only start once the element is close to the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [intensity, reduceMotion]);

  // When motion is reduced the WebGL scene never mounts, so the static
  // fallback must stay fully visible rather than fading out.
  const showFallback = status !== "ready" || Boolean(reduceMotion);

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      data-status={status}
    >
      {/* Static fallback — always painted, so there is never a blank frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-opacity duration-1000 motion-reduce:transition-none"
        style={{
          opacity: showFallback ? 1 : 0,
          background:
            "radial-gradient(120% 90% at 32% 22%, #0a0a0a 0%, #151515 52%, #262626 100%)",
        }}
      />
      <div
        ref={hostRef}
        className={cn(
          "absolute inset-0 -z-10",
          reduceMotion ? "hidden" : "kz-drift",
        )}
        aria-hidden="true"
      />
      {/* Soft vignette keeps the form seated in the card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_-40px_80px_-40px_rgb(74_45_32_/_0.35)]"
      />
    </div>
  );
}

function isVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > -200 && rect.top < viewportHeight + 200;
}
