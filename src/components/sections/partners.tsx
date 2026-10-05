import { CheckIcon, HandshakeIcon, MessagesSquareIcon, WalletIcon } from "lucide-react";
import { PillButton, SectionTitle, Silk } from "@/components/brand";
import { Reveal } from "@/components/reveal";

const duties = [
  "Work from a legitimate freelance account in their own name — Upwork, Handshake, LinkedIn, and similar.",
  "Handle day-to-day client communication: relaying messages and sharing updates.",
  "Receive drafted technical replies from the delivery team whenever needed.",
  "Collect payment on the account, then share project fees with the studio.",
];

const highlights = [
  {
    icon: HandshakeIcon,
    title: "Relationship seat",
    text: "You keep the freelance account and the client conversation. Coding is not part of the job.",
  },
  {
    icon: MessagesSquareIcon,
    title: "Studio-backed replies",
    text: "Engineering drafts technical answers whenever a client needs a precise response.",
  },
  {
    icon: WalletIcon,
    title: "30% / 70% split",
    text: "Client partners earn 30%. Engineering owns planning, build, and delivery for 70%.",
  },
];

export function Partners() {
  return (
    <section id="partner-program" className="relative isolate overflow-hidden bg-ink-900 py-24 lg:py-32">
      <Silk className="-z-10 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute top-24 right-0 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(252,219,102,0.16),transparent)]"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-20">
          <SectionTitle
            eyebrow="Partner program"
            title="Apply as a partner"
          />
          <Reveal delay={80}>
            <p className="max-w-xl text-lg leading-relaxed text-neutral-400">
              A software development team for freelance work. We pursue US jobs as one studio.
              Client partners own the relationship and the freelance account. Engineering owns
              planning, build, and delivery. Project fees are shared{" "}
              <span className="text-brand">30% / 70%</span>.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="overflow-hidden rounded-[32px] bg-ink-800 p-8 ring-1 ring-white/10 sm:p-10">
            <p className="text-sm font-medium tracking-[0.18em] text-neutral-400 uppercase">
              Project fees
            </p>
            <div className="mt-6 grid grid-cols-[30%_70%] gap-2">
              <div className="rounded-2xl bg-brand px-4 py-8 text-ink-900">
                <p className="font-heading text-4xl font-semibold tracking-tight">30</p>
                <p className="mt-3 text-sm font-medium">Client partners</p>
              </div>
              <div className="rounded-2xl bg-ink-950 px-5 py-8 text-white ring-1 ring-white/10">
                <p className="font-heading text-4xl font-semibold tracking-tight text-brand">70</p>
                <p className="mt-3 text-sm font-medium text-neutral-300">Engineering</p>
              </div>
            </div>
            <p className="mt-8 leading-relaxed text-neutral-400">
              You keep a professional freelance account in your own name, reply reliably, and treat
              US client communication as the job. You do not need to code.
            </p>
            <PillButton href="#contact" className="mt-10">
              Apply as a partner
            </PillButton>
          </Reveal>

          <Reveal delay={120} className="rounded-[32px] bg-ink-950 p-8 ring-1 ring-white/10 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-heading text-3xl font-medium text-white">Client partners</h3>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
                No coding required
              </span>
            </div>
            <p className="mt-4 max-w-xl text-neutral-400">
              The client side is a relationship seat. Coding is not part of the job.
            </p>
            <ul className="mt-8 space-y-4">
              {duties.map((duty) => (
                <li
                  key={duty}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-white/3 px-5 py-4 text-neutral-200"
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-ink-900">
                    <CheckIcon className="size-3.5" />
                  </span>
                  <span className="leading-relaxed">{duty}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              key={title}
              delay={index * 80}
              className="rounded-[28px] border border-white/8 bg-ink-800/70 p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-6 font-heading text-xl font-medium text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-neutral-400">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
