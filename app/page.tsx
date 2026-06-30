"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const GOLD = "#f0a010";

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
      className="group fixed right-4 top-4 z-[9999] flex items-center gap-2"
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

// Site soundtrack (loops the trimmed can-can). Controlled by the parent: entry is
// the user's gesture (the splash button), which flips audio audible + reveals the site.
function SiteAudio({ entered, onEnter }: { entered: boolean; onEnter: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audible, setAudible] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    const sync = () => setAudible(!audio.paused && !audio.muted && audio.volume > 0);
    const evs = ["play", "playing", "pause", "volumechange", "ended"];
    evs.forEach((e) => audio.addEventListener(e, sync));
    // Prime MUTED so the mp3 buffers immediately; entry flips it audible.
    audio.muted = true;
    audio.play().catch(() => {});
    return () => evs.forEach((e) => audio.removeEventListener(e, sync));
  }, []);

  useEffect(() => {
    if (!entered) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.play().catch(() => {});
  }, [entered]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const audibleNow = !audio.paused && !audio.muted && audio.volume > 0;
    if (audibleNow) {
      audio.muted = true;
    } else {
      audio.muted = false;
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/cancan_trimmed.mp3" loop preload="auto" />

      {/* Pure-black parental-advisory warning gate. Entry is button-only. */}
      {!entered && (
        <div className="fixed inset-0 z-[10000] flex select-none flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
          {/* elephant mark, top-left corner */}
          <Image
            src="/assets/elephant-logo.png"
            alt="ethKochi"
            width={2040}
            height={1660}
            priority
            className="absolute left-5 top-5 h-12 w-auto opacity-90 md:h-16"
          />

          <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-7">
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
              onClick={onEnter}
              className="mt-1 rounded-full bg-[#f0a010] px-8 py-3.5 text-base font-semibold tracking-wide text-black transition-all hover:bg-[#ffb733]"
            >
              Okay, hasta la vista, skibidis
            </button>
          </div>
        </div>
      )}

      {/* shown once inside */}
      {entered && (
        <>
          <ChipsBait />
          <button
            onClick={toggle}
            data-music-btn
            aria-label={audible ? "Mute music" : "Unmute music"}
            className="fixed bottom-5 right-5 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20"
          >
            <SpeakerIcon muted={!audible} />
          </button>
        </>
      )}
    </>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [enteredAt, setEnteredAt] = useState<number | null>(null);

  const enter = () => {
    if (entered) return;
    setEntered(true);
    setEnteredAt(Date.now());
  };

  return (
    <main className="relative min-h-screen bg-black font-sans text-white">
      <SiteAudio entered={entered} onEnter={enter} />

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

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
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
