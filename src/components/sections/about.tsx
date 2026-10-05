import { ChevronRightIcon } from "lucide-react";
import { Burst, Eyebrow, PillButton } from "@/components/brand";
import { Reveal } from "@/components/reveal";

const capabilities = ["Web Applications", "API Integrations", "Cloud & DevOps", "QA & Testing"];

function WorkspaceVisual() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[40px] bg-[radial-gradient(120%_90%_at_10%_0%,#2a2a2a,#0d0d0d_60%)] p-6 ring-1 ring-white/10 sm:p-10 lg:min-h-[560px]">
      <div
        aria-hidden="true"
        className="absolute -right-20 -bottom-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(252,219,102,0.28),transparent)]"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950/90 font-mono text-[13px] leading-7 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="size-2.5 rounded-full bg-brand" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs text-neutral-500">release.ts</span>
        </div>
        <pre className="overflow-x-auto px-5 py-4 text-neutral-300">
          <code>
            <span className="text-brand">const</span> release = <span className="text-brand">await</span> pipeline({"{"}
            {"\n"}  build: <span className="text-emerald-300">&quot;passing&quot;</span>,
            {"\n"}  tests: <span className="text-sky-300">318</span>,
            {"\n"}  review: <span className="text-emerald-300">&quot;approved&quot;</span>,
            {"\n"}  target: <span className="text-emerald-300">&quot;production&quot;</span>,
            {"\n"}{"}"});
            {"\n"}
            {"\n"}
            <span className="text-neutral-500">{"// shipped on schedule"}</span>
          </code>
        </pre>
      </div>
      <div className="relative mt-6 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-ink-800/90 py-2 pr-5 pl-2 backdrop-blur">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand">
          <Burst className="size-4 text-ink-900" />
        </span>
        <span className="text-sm text-white">Weekly demo · Sprint 14 delivered</span>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-x-clip bg-ink-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-0">
          <Reveal className="lg:row-span-2">
            <WorkspaceVisual />
          </Reveal>

          <Reveal className="lg:pt-6 lg:pl-8">
            <Eyebrow>About Company</Eyebrow>
            <h2 className="mt-4 bg-linear-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text font-heading text-4xl leading-[1.2] font-medium tracking-tight text-transparent sm:text-[44px]">
              Reimagining how software gets planned, built, and shipped
            </h2>
          </Reveal>

          <Reveal delay={120} className="relative lg:-ml-32 lg:self-end">
            <div className="relative rounded-[48px] bg-ink-800 p-8 sm:p-12 lg:rounded-tr-[200px] lg:rounded-br-[200px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] border-t-[6px] border-r-[6px] border-brand max-lg:hidden"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-10 left-1/3 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(252,140,40,0.25),transparent)] blur-xl"
              />
              <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
                <div>
                  <p className="flex items-start font-heading text-7xl font-semibold text-brand sm:text-8xl">
                    100<span className="mt-2 text-4xl text-white">%</span>
                  </p>
                  <p className="mt-3 max-w-[11rem] text-lg text-white">Code ownership for every client</p>
                </div>
                <div className="space-y-6">
                  <Burst className="size-8" />
                  <p className="leading-relaxed text-neutral-400">
                    Diamond IT is a software studio dedicated to helping businesses launch and grow
                    reliable products — clean code, clear communication, and delivery you can plan
                    around.
                  </p>
                  <PillButton href="#process" tone="outline" size="md">
                    How we work
                  </PillButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-2">
          <Reveal className="max-w-lg">
            <svg viewBox="0 0 56 56" className="size-14 text-brand" aria-hidden="true">
              <path d="M28 4 52 28 28 52 4 28Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M28 14 42 28 28 42 14 28Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              We start by understanding your goals, users, and constraints. Then we plan the
              architecture, ship in short iterations, and keep you in the loop with weekly demos and
              a shared board.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid border-t border-l border-white/10 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-4 border-r border-b border-white/10 px-6 py-8 transition-colors hover:bg-white/3"
                >
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-brand text-brand transition-colors group-hover:bg-brand group-hover:text-ink-900">
                    <ChevronRightIcon className="size-4" />
                  </span>
                  <span className="font-heading text-xl font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
