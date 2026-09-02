"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(4.7);

  useEffect(() => {
    let width = 0;
    let animFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Gracefully degrade on environments without WebGL support (older browsers,
    // hardware acceleration disabled, headless). Without this, cobe throws.
    try {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 4.7,
        theta: 0.25,
        dark: 1,
        diffuse: 1.8,
        mapSamples: 24000,
        mapBrightness: 10,
        baseColor: [0.1, 0.28, 0.55], // High-visibility bright slate blue
        markerColor: [1.0, 0.75, 0.0], // Glowing Gold #EAA500
        glowColor: [0.15, 0.45, 0.85], // Vibrant electric blue outer glow
        markers: [
          // REFINED SMALLER YELLOW DOT ON BHUTAN
          { location: [27.5142, 90.4336], size: 0.07, color: [1.0, 0.75, 0.0] },
        ],
        arcs: [], // Zero extra endpoint dots anywhere else on Earth
      });
    } catch (err) {
      console.error("Globe initialization failed:", err);
      window.removeEventListener("resize", onResize);
      return;
    }

    const animate = () => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.003;
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: width * 2,
        height: width * 2,
      });
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = "1";
      }
    }, 100);

    return () => {
      cancelAnimationFrame(animFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`relative w-full aspect-square max-w-[390px] sm:max-w-[430px] mx-auto flex items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        className="w-full h-full opacity-0 transition-opacity duration-700 cursor-grab touch-none"
      />
    </div>
  );
}
