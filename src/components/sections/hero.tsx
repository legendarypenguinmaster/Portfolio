import { ArrowDownIcon } from "lucide-react";
import { PillButton, Silk } from "@/components/brand";
import { site } from "@/lib/site";

/** Faceted gold diamond, the hero's centerpiece. */
function GoldDiamond() {
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className="size-full drop-shadow-[0_40px_80px_rgba(252,219,102,0.25)]">
      <defs>
        <linearGradient id="gd-a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset="0.5" stopColor="#fcdb66" />
          <stop offset="1" stopColor="#8a6a12" />
        </linearGradient>
        <linearGradient id="gd-b" x1="1" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fdeaa3" />
          <stop offset="1" stopColor="#b8901f" />
        </linearGradient>
        <linearGradient id="gd-c" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9ad2c" />
          <stop offset="1" stopColor="#4a3806" />
        </linearGradient>
        <linearGradient id="gd-d" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* crown */}
      <polygon points="120,70 280,70 340,150 60,150" fill="url(#gd-b)" />
      <polygon points="120,70 160,150 60,150" fill="#fff1bf" />
      <polygon points="120,70 200,70 160,150" fill="url(#gd-d)" />
      <polygon points="200,70 280,70 240,150" fill="#f3cf55" />
      <polygon points="200,70 240,150 160,150" fill="#ffe89a" />
      <polygon points="280,70 340,150 240,150" fill="#c99a22" />
      {/* pavilion */}
      <polygon points="60,150 160,150 200,350" fill="url(#gd-a)" />
      <polygon points="160,150 240,150 200,350" fill="#e8bd3a" />
      <polygon points="240,150 340,150 200,350" fill="url(#gd-c)" />
      <polyline
        points="60,150 340,150"
        fill="none"
        stroke="#0a0a0a"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      {/* fine engraving lines */}
      <g stroke="#fff" strokeOpacity="0.25" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={70 + i * 30} y1="150" x2="200" y2="350" />
        ))}
      </g>
    </svg>
  );
}

function RotatingBadge() {
  return (
    <a
      href="#about"
      aria-label="Scroll to about"
      className="group relative flex size-40 items-center justify-center rounded-full bg-brand text-ink-900 shadow-[0_0_60px_rgba(252,219,102,0.25)]"
    >
      <svg viewBox="0 0 160 160" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text className="fill-ink-900 font-heading text-[15px] font-semibold tracking-[0.32em] uppercase">
          <textPath href="#badge-circle">Software • Development • Studio •</textPath>
        </text>
      </svg>
      <ArrowDownIcon className="size-7 transition-transform group-hover:translate-y-1" />
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-36 pb-16 lg:min-h-[960px] lg:pt-48">
      <Silk className="-z-10 opacity-80" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-b from-transparent to-ink-900"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="font-heading text-[clamp(2.75rem,6.6vw,5.75rem)] leading-[1.02] font-bold tracking-tight">
            <span className="block text-white sm:whitespace-nowrap">Diamond—Grade</span>
            <span className="block bg-linear-to-r from-neutral-300 via-neutral-500 to-neutral-800 bg-clip-text text-transparent">
              Software Built
            </span>
            <span className="block bg-linear-to-r from-neutral-500 to-neutral-900 bg-clip-text text-transparent">
              To Last
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
            {site.name} designs, builds, and supports web applications, product features, and
            integrations — one accountable team from first scope to long-term support.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PillButton href="#contact">Start a Project</PillButton>
            <a
              href="#services"
              className="text-base font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
            >
              Explore services
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] animate-float">
          <div
            aria-hidden="true"
            className="absolute inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(252,219,102,0.35),transparent)] blur-2xl"
          />
          <GoldDiamond />
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center gap-10 px-5 sm:px-8 lg:mt-8 lg:grid lg:grid-cols-3">
        <div className="hidden lg:block" />
        <div className="flex justify-center">
          <RotatingBadge />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm tracking-wider text-white uppercase lg:justify-end">
          <span className="h-px w-16 bg-white/40" />
          Write us —
          <a href={`mailto:${site.email}`} className="normal-case tracking-normal hover:text-brand">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
