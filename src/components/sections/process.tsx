import { CompassIcon, Code2Icon, RocketIcon, ScanSearchIcon } from "lucide-react";
import { SectionTitle, Silk } from "@/components/brand";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: ScanSearchIcon,
    title: "Discover",
    text: "We learn your goals, users, and constraints, then agree on scope and budget.",
  },
  {
    icon: CompassIcon,
    title: "Plan",
    text: "Architecture, milestones, and a prioritized backlog — no surprises later.",
  },
  {
    icon: Code2Icon,
    title: "Build",
    text: "Short sprints with weekly demos, code review, and tests on every change.",
  },
  {
    icon: RocketIcon,
    title: "Launch & Support",
    text: "A smooth release, full handoff docs, and support as your product grows.",
  },
];

/** Four-petal flower shape used to frame each step's icon. */
const flower =
  "[mask-image:radial-gradient(circle_at_50%_25%,#000_24%,transparent_24.5%),radial-gradient(circle_at_75%_50%,#000_24%,transparent_24.5%),radial-gradient(circle_at_50%_75%,#000_24%,transparent_24.5%),radial-gradient(circle_at_25%_50%,#000_24%,transparent_24.5%),radial-gradient(circle_at_50%_50%,#000_30%,transparent_30.5%)]";

export function Process() {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-ink-900 py-24 lg:py-32">
      <Silk className="-z-10 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-80 w-[900px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(252,219,102,0.1),transparent)]"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionTitle
          align="center"
          eyebrow="Working Process"
          title="Follow easy working steps for finished projects"
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-0 right-[12.5%] left-[12.5%] hidden border-t border-dashed border-brand lg:block"
          />
          <ol className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <Reveal
                as="li"
                key={title}
                delay={index * 100}
                className="flex flex-col items-center text-center"
              >
                <span aria-hidden="true" className="hidden h-8 border-l border-dashed border-brand lg:block" />
                <span className="flex h-8 min-w-11 items-center justify-center rounded-full bg-brand px-3 font-heading text-sm font-semibold text-ink-900">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="group relative mt-4 size-56">
                  <div
                    className={`absolute inset-0 bg-[conic-gradient(from_200deg,#2c2c2c,#3a3320,#151515,#2c2c2c)] transition-transform duration-700 group-hover:rotate-45 ${flower}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="size-14 text-brand" strokeWidth={1.4} />
                  </div>
                </div>
                <h3 className="mt-6 font-heading text-2xl font-medium text-white">{title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-neutral-400">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
