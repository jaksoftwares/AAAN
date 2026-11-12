"use client";

import { useEffect, useRef, useState } from "react";

// Muted, looping background video. Respects reduced-motion: the poster stays and playback is not started.
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (reduced) ref.current.pause();
    else void ref.current.play().catch(() => undefined);
  }, [reduced]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      preload="metadata"
      aria-label={label}
      role="img"
    />
  );
}
