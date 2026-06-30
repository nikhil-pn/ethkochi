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
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 py-16 md:flex-row md:gap-12 md:px-12 lg:px-20">
      {/* Small three-chips packet shot — pinned to the far left (~30% column) */}
      <div className="flex w-full shrink-0 justify-center md:w-[30%] md:justify-start">
        <Image
          src="/assets/chips-3.png"
          alt="ETH Kochi banana chips — three packets"
          width={496}
          height={503}
          priority
          sizes="(max-width: 768px) 50vw, 30vw"
          className="h-auto w-full max-w-[200px] drop-shadow-2xl md:max-w-[300px]"
        />
      </div>

      {/* Copy — takes the rest (~70%), comfortably centered */}
      <div className="w-full md:flex-1">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0a010]">
            dev talk
          </p>

          <p className="mt-5 text-xl leading-relaxed text-black md:text-2xl">
            mf, they&apos;re not even paying me to build this website — and you
            actually think they&apos;ll give <em>you</em> free Kerala chips?
            Lmaooo.
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            Wanna actually help build this site? Here&apos;s the{" "}
            <a
              href="https://github.com/nikhil-pn/eatkochi"
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
      </div>
    </main>
  );
}
