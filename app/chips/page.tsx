import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "free chips?",
  description:
    "Free Kerala chips? Lmaooo. Petition for the merch, or help build ethKochi — surprise gift for contributors, plus $100 for the top brain-rot timer.",
};

export default function ChipsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white px-6 py-16 md:flex-row md:gap-12 md:px-10 lg:px-16">
      {/* Three-chips packet shot — pinned to the far left (~30% column) */}
      <div className="flex w-full shrink-0 justify-center md:w-[30%] md:justify-start">
        <Image
          src="/assets/chips-3.png"
          alt="ETH Kochi banana chips — three packets"
          width={496}
          height={503}
          priority
          sizes="(max-width: 768px) 60vw, 30vw"
          className="h-auto w-full max-w-[260px] drop-shadow-2xl md:max-w-[400px]"
        />
      </div>

      {/* Copy — short and punchy, centered in the rest (~70%) */}
      <div className="w-full md:flex-1">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0a010]">
            dev talk
          </p>

          <p className="mt-5 text-xl font-semibold leading-relaxed text-black md:text-2xl">
            mf, they&apos;re not even paying me to build this website — you really
            think they&apos;ll hand you free Kerala chips? Lmaooo.
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            Want Kerala chips as actual merch? Go spam{" "}
            <a
              href="https://x.com/boldrin"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              @boldrin
            </a>{" "}
            on X till it happens. 🍌
          </p>

          <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">
            Or help build it — open a PR on the{" "}
            <a
              href="https://github.com/nikhil-pn/ethkochi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#f0a010] underline underline-offset-4 transition-colors hover:text-black"
            >
              GitHub repo
            </a>
            . Surprise gift for contributors on conference day, plus{" "}
            <span className="font-semibold text-[#f0a010]">$100</span> for whoever
            tops the home-page timer. 😉
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
