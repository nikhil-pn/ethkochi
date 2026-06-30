"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const GOLD = "#f0a010";

// How long the splash takes to dissolve into the home screen (ms). Kept in sync
// with the CSS transition durations below.
const TRANSITION_MS = 1050;

type Phase = "splash" | "leaving" | "home";

// Count-UP timer: how long the visitor has been "rotting" on this page since they
// entered. Starts when `since` (entry timestamp) is set.
function TimeWasted({ since }: { since: number | null }) {
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (since == null) return;
    const tick = () => setMs(Date.now() - since);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [since]);

  const t = Math.max(0, Math.floor(ms / 1000));
  const units = [
    { label: "Days", value: Math.floor(t / 86400) },
    { label: "Hours", value: Math.floor((t % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((t % 3600) / 60) },
    { label: "Seconds", value: t % 60 },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[7px] uppercase tracking-[0.3em] text-white/45 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
        time you&apos;ve wasted here
      </p>
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {units.map(({ label, value }) => (
          <div
            key={label}
            className="flex min-w-[52px] flex-col items-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md"
          >
            <span className="text-xl font-bold tabular-nums drop-shadow md:text-2xl">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-widest text-white/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4z" />
      {muted ? (
        <>
          <path d="m22 9-6 6" />
          <path d="m16 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      )}
    </svg>
  );
}

// Chips Easter egg: a bait label (with a hand-scribbled underline) pointing at a
// tiny chips packet, sitting just above the mute control. Links to the /chips troll.
function ChipsBait() {
  return (
    <Link
      href="/chips"
      aria-label="Free chips?"
      className="group animate-fade-in fixed right-4 top-4 z-[9999] flex items-center gap-2"
    >
      <span className="relative whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-medium italic text-neutral-900 backdrop-blur-sm md:text-sm">
        Free kerala chips?
        <svg
          viewBox="0 0 180 12"
          preserveAspectRatio="none"
          className="absolute -bottom-1 left-3 h-2 w-[88%]"
          aria-hidden="true"
        >
          <path
            d="M2 7 C 30 2, 52 11, 84 5 S 150 2, 178 8"
            fill="none"
            stroke={GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-scribble"
          />
        </svg>
      </span>
      <Image
        src="/assets/chips-3.png"
        alt="ETH Kochi banana chips"
        width={496}
        height={503}
        className="h-20 w-auto transition-transform group-hover:-rotate-6 group-hover:scale-105"
      />
    </Link>
  );
}

// Site soundtrack (loops final-audio) + the "faah" entry sound + the splash gate.
// The parent owns the phase; clicking the gate fires the faah and asks the parent
// to begin the transition.
function SiteAudio({
  phase,
  onEnter,
}: {
  phase: Phase;
  onEnter: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const faahRef = useRef<HTMLAudioElement>(null);
  const [audible, setAudible] = useState(false);

  // Prime the looping soundtrack MUTED on mount so the mp3 buffers immediately;
  // entry unmutes + fades it in.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    const sync = () =>
      setAudible(!audio.paused && !audio.muted && audio.volume > 0);
    const evs = ["play", "playing", "pause", "volumechange", "ended"];
    evs.forEach((e) => audio.addEventListener(e, sync));
    audio.muted = true;
    audio.play().catch(() => {});
    return () => evs.forEach((e) => audio.removeEventListener(e, sync));
  }, []);

  // Once the home screen lands, start the soundtrack from the top with a smooth
  // volume fade-in.
  useEffect(() => {
    if (phase !== "home") return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = 0;
    audio.play().catch(() => {});
    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(0.6, v + 0.04);
      audio.volume = v;
      if (v >= 0.6) window.clearInterval(id);
    }, 35);
    return () => window.clearInterval(id);
  }, [phase]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const audibleNow = !audio.paused && !audio.muted && audio.volume > 0;
    if (audibleNow) {
      audio.muted = true;
    } else {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 0.6;
      audio.play().catch(() => {});
    }
  };

  // Splash CTA: fire the "faah" on the user's gesture, then kick off the transition.
  const handleSplashClick = () => {
    const faah = faahRef.current;
    if (faah) {
      faah.currentTime = 0;
      faah.volume = 0.85;
      faah.play().catch(() => {});
    }
    onEnter();
  };

  const leaving = phase === "leaving";

  return (
    <>
      <audio ref={audioRef} src="/assets/final-audio.mp3" loop preload="auto" />
      <audio ref={faahRef} src="/assets/faah.mp3" preload="auto" />

      {/* Pure-black parental-advisory gate. Fades + blurs away (content zooms out)
          on entry for a smooth hand-off to the home screen. */}
      {phase !== "home" && (
        <div
          className={`fixed inset-0 z-[10000] flex select-none flex-col items-center justify-center overflow-hidden bg-black px-6 text-center transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            leaving ? "pointer-events-none opacity-0 blur-md" : "opacity-100 blur-0"
          }`}
        >
          {/* elephant mark, top-left corner */}
          <Image
            src="/assets/elephant-logo.png"
            alt="ethKochi"
            width={2040}
            height={1660}
            priority
            className="absolute left-5 top-5 h-12 w-auto opacity-90 md:h-16"
          />

          <div
            className={`relative z-10 mx-auto flex max-w-md flex-col items-center gap-7 transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              leaving ? "scale-110" : "scale-100"
            }`}
          >
            {/* parental advisory label — black-bg image blends into the page */}
            <Image
              src="/assets/parental-advisory.jpg"
              alt="Parental Advisory — Explicit Content"
              width={2048}
              height={1536}
              priority
              className="w-60 max-w-full md:w-72"
            />

            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              The content you are about to witness is highly brain&#8209;rotted.
              Viewer discretion is advised.
            </p>

            <button
              onClick={handleSplashClick}
              className="group relative mt-1 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#f0a010] px-8 py-3.5 text-base font-semibold tracking-wide text-black transition-all duration-300 ease-out animate-pulse-glow hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#ffb733] active:translate-y-0 active:scale-95"
            >
              {/* shine sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
              <span className="relative z-10">Okay, hasta la vista, skibidis</span>
              <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* shown once inside */}
      {phase === "home" && (
        <>
          <ChipsBait />
          <button
            onClick={toggle}
            data-music-btn
            aria-label={audible ? "Mute music" : "Unmute music"}
            className="animate-fade-in fixed bottom-5 right-5 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20"
          >
            <SpeakerIcon muted={!audible} />
          </button>
        </>
      )}
    </>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [enteredAt, setEnteredAt] = useState<number | null>(null);

  const handleEnter = () => {
    if (phase !== "splash") return;
    setPhase("leaving");
    window.setTimeout(() => {
      setPhase("home");
      setEnteredAt(Date.now());
    }, TRANSITION_MS);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-sans text-white">
      <SiteAudio phase={phase} onEnter={handleEnter} />

      {/* Hero — vivid video with floating content */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/laura_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

        {/* content smoothly fades + zooms in as the splash dissolves away */}
        <div
          className={`relative z-10 mx-auto flex max-w-3xl flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            phase === "splash" ? "scale-[1.06] opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* small "coming soon" sits above the logo */}
          <Image
            src="/assets/coming-soon.png"
            alt="Coming soon"
            width={2336}
            height={696}
            priority
            className="mb-5 h-auto w-32 md:w-40"
          />

          <Image
            src="/assets/eatkochi-logo.png"
            alt="ethKochi"
            width={2928}
            height={3100}
            priority
            className="h-44 w-auto drop-shadow-[0_6px_30px_rgba(0,0,0,0.7)] md:h-60"
          />

          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-xl">
            An Ethereum hackathon in God&apos;s Own Country.
          </p>

          <div className="mt-9">
            <TimeWasted since={enteredAt} />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://web3kerala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#f0a010] px-6 py-3 text-base font-semibold text-black shadow-lg shadow-[#f0a010]/30 transition-all hover:bg-[#ffb733]"
            >
              web3kerala
            </a>
            <a
              href="https://devcon.org"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#f0a010]/40 bg-[#f0a010]/10 px-6 py-3 text-base font-semibold text-[#f0a010] backdrop-blur-sm transition-all hover:bg-[#f0a010]/20"
            >
              Devcon
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
