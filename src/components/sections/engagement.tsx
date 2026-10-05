import type { ComponentType } from "react";
import { CheckIcon, LifeBuoyIcon, TargetIcon, UsersRoundIcon } from "lucide-react";
import { PillButton, SectionTitle } from "@/components/brand";
import { Reveal } from "@/components/reveal";

type Model = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
  bestFor: string;
  features: string[];
  glow: string;
};

const models: Model[] = [
  {
    icon: TargetIcon,
    title: "Fixed-Scope Project",
    text: "A clear scope, fixed price per milestone, and a delivery date you can plan around.",
    bestFor: "Best for well-defined builds",
    features: ["Detailed scope & timeline", "Fixed price per milestone", "30 days of post-launch fixes"],
    glow: "rgba(252,219,102,0.35)",
  },
  {
    icon: UsersRoundIcon,
    title: "Dedicated Team",
    text: "Engineers focused on your product with flexible monthly capacity that scales with you.",
    bestFor: "Best for growing products",
    features: ["Sprint planning with your team", "Shared board & direct access", "Scale up or down monthly"],
    glow: "rgba(252,140,40,0.35)",
  },
  {
    icon: LifeBuoyIcon,
    title: "Support & Maintenance",
    text: "Monthly hours for fixes, upgrades, and monitoring to keep your product fast and secure.",
    bestFor: "Best for live products",
    features: ["Security & dependency updates", "Uptime & error monitoring", "Priority response times"],
    glow: "rgba(255,255,255,0.18)",
  },
];

export function Engagement() {
  return (
    <section id="engagement" className="relative bg-ink-950 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle eyebrow="Engagement Models" title="Flexible ways to work together" />
          <p className="max-w-md leading-relaxed text-neutral-400">
            Every engagement starts with a free discovery call and a written proposal covering scope,
            timeline, and cost.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {models.map(({ icon: Icon, title, text, bestFor, features, glow }, index) => (
            <Reveal
              key={title}
              className="grid gap-10 bg-ink-800 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-8"
            >
              <div className="flex gap-6 sm:gap-14 lg:pl-6">
                <span className="font-heading text-4xl font-light text-neutral-400 sm:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-3xl leading-tight font-medium text-white sm:text-[44px]">
                    {title}
                  </h3>
                  <p className="mt-6 max-w-md leading-relaxed text-neutral-400">{text}</p>
                  <p className="mt-5 text-lg text-brand">{bestFor}</p>
                  <PillButton href="#contact" tone="muted" size="md" className="mt-8">
                    Discuss This Model
                  </PillButton>
                </div>
              </div>

              <div
                className="relative flex aspect-[6/5] flex-col justify-between overflow-hidden p-8 sm:p-10"
                style={{
                  background: `radial-gradient(70% 70% at 80% 20%, ${glow}, transparent 70%), linear-gradient(160deg, #262626, #0b0b0b)`,
                }}
              >
                <Icon className="size-16 text-brand" strokeWidth={1.2} />
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-3 text-white backdrop-blur"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink-900">
                        <CheckIcon className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
