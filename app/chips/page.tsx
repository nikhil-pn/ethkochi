import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "free chips?",
  description:
    "Free Kerala chips? Yeah… about that. Lmaooo. But hey — you can actually help build ethKochi instead.",
};

export default function ChipsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 py-16 md:flex-row md:items-center md:gap-16 md:px-16 lg:gap-24">
      {/* Big three-chips packet shot — sits on the left */}
      <div className="flex w-full shrink-0 justify-center md:w-[55%] md:justify-end">
        <Image
          src="/assets/chips-3.png"
          alt="ETH Kochi banana chips — three packets"
          width={496}
          height={503}
          priority
          sizes="(max-width: 768px) 88vw, 600px"
          className="h-auto w-full max-w-[440px] drop-shadow-2xl md:max-w-[600px]"
        />
      </div>

      {/* Copy — nudged over to the right */}
      <div className="w-full max-w-xl md:w-[45%]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0a010]">
          dev talk
        </p>

        <p className="mt-5 text-xl leading-relaxed text-black md:text-2xl">
          Motherfuckers, they&apos;re not even paying me to build this website —
          and you actually think they&apos;ll give <em>you</em> free Kerala
          chips? Lmaooo.
        </p>

        <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
          Wanna actually help build this site? Here&apos;s the{" "}
          <a
            href="https://github.com/nikhil-pn/eat-kochi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
          >
            GitHub repo
          </a>
          . Raise a PR and, hopefully, I&apos;ll merge it. There&apos;s a
          surprise gift waiting for contributors on conference day{" "}
          <span aria-hidden>😉</span>
        </p>

        <Link
          href="/"
          className="mt-10 inline-block text-sm text-black/40 underline underline-offset-4 transition-colors hover:text-black"
        >
          ← fine, take me back
        </Link>
      </div>
    </main>
  );
}
