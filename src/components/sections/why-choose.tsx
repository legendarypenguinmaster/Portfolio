import { BadgeCheckIcon, Code2Icon, MessagesSquareIcon } from "lucide-react";
import { PillButton, SectionTitle, Silk } from "@/components/brand";
import { DiamondMark } from "@/components/logo";
import { Reveal } from "@/components/reveal";

const features = [
  {
    icon: MessagesSquareIcon,
    title: "Clear Communication",
    text: "Weekly demos, a shared board, and direct access to your engineers.",
  },
  {
    icon: Code2Icon,
    title: "Senior-Level Engineering",
    text: "Clean, reviewed, tested code — documented and owned by you.",
  },
];

const clipCorner = "[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%,0_14%)]";

export function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-brand py-24 text-ink-900 lg:py-32">
      <Silk className="-z-10 opacity-40 mix-blend-soft-light" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionTitle
            tone="light"
            eyebrow="Why Choose Us?"
            title="Reliable engineering for products that need to work, every day"
          />

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 100}>
                <span className="flex size-16 items-center justify-center rounded-full border-2 border-ink-900">
                  <Icon className="size-7" strokeWidth={1.6} />
                </span>
                <div className="mt-6 border-t border-ink-900/20 pt-6">
                  <h3 className="font-heading text-[22px] font-medium">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-900/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <PillButton href="#contact" tone="dark" className="mt-12">
            Start a Project
          </PillButton>
        </div>

        <Reveal delay={150} className="grid grid-cols-[1fr_1.4fr] gap-5">
          <div className="flex flex-col gap-5 pt-10">
            <div className={`relative aspect-[4/5] overflow-hidden bg-ink-900 ${clipCorner}`}>
              <Silk className="opacity-70" />
              <div className="absolute inset-x-4 bottom-4 space-y-2">
                {["Sprint review", "QA passed", "Deployed"].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white backdrop-blur"
                  >
                    <span className={`size-1.5 rounded-full ${index === 2 ? "bg-brand" : "bg-emerald-400"}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 bg-ink-900 p-5 text-white">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-ink-900">
                <BadgeCheckIcon className="size-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-semibold sm:text-3xl">Weekly</p>
                <p className="text-sm text-neutral-400">Progress demos</p>
              </div>
            </div>
          </div>
          <div
            className={`relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[radial-gradient(90%_70%_at_50%_40%,#2b2b2b,#0a0a0a)] sm:min-h-[540px] ${clipCorner}`}
          >
            <div
              aria-hidden="true"
              className="absolute size-72 rounded-full bg-[radial-gradient(closest-side,rgba(252,219,102,0.35),transparent)]"
            />
            <DiamondMark className="relative size-36 animate-float drop-shadow-[0_20px_40px_rgba(252,219,102,0.35)] sm:size-48" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
