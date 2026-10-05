"use client";

import { useRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BlocksIcon,
  CloudCogIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  PlugZapIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Burst, PillButton, SectionTitle, Silk } from "@/components/brand";
import { Reveal } from "@/components/reveal";

const services = [
  {
    icon: RocketIcon,
    title: "Product & MVP Development",
    description: "From idea to a launched first version on a foundation built to scale.",
  },
  {
    icon: LayoutDashboardIcon,
    title: "Web Application Development",
    description: "Dashboards, portals, and internal tools with fast, accessible interfaces.",
  },
  {
    icon: PlugZapIcon,
    title: "API & Systems Integration",
    description: "Payments, CRMs, and third-party APIs connected reliably end to end.",
  },
  {
    icon: BlocksIcon,
    title: "Feature Engineering",
    description: "Scoped, scheduled work inside your existing codebase, with tests and docs.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality Assurance & Testing",
    description: "Automated suites, code review, and release checks that keep production steady.",
  },
  {
    icon: CloudCogIcon,
    title: "Cloud & DevOps",
    description: "CI/CD pipelines and infrastructure as code for repeatable, safe deployments.",
  },
  {
    icon: LifeBuoyIcon,
    title: "Maintenance & Support",
    description: "Fixes, upgrades, and monitoring long after the first release ships.",
  },
];

export function Services() {
  const track = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const node = track.current;
    if (!node) return;
    const card = node.querySelector("li");
    const step = card ? card.getBoundingClientRect().width : node.clientWidth * 0.8;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section id="services" className="relative isolate overflow-hidden bg-ink-950 py-24 lg:py-32">
      <Silk className="-z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute top-40 left-0 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(252,140,40,0.18),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[360px_1fr] lg:gap-0">
        <Reveal className="flex flex-col lg:pr-12">
          <div className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl lg:block bg-[linear-gradient(135deg,#1f1f1f,#0d0d0d)] ring-1 ring-white/10">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-40">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className="border-r border-b border-white/5" />
              ))}
            </div>
            <div className="absolute inset-x-6 bottom-6 space-y-2">
              {[86, 64, 92].map((value, index) => (
                <div key={index} className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
                </div>
              ))}
            </div>
            <Burst className="absolute top-6 left-6 size-10" />
          </div>
          <div className="mt-auto lg:pt-12">
            <Burst className="size-10" />
            <p className="mt-6 leading-relaxed text-neutral-400">
              Diamond IT is a software studio dedicated to helping businesses launch, scale, and
              maintain reliable products on the web.
            </p>
            <PillButton href="#contact" tone="outline" size="md" className="mt-8">
              Discuss Your Project
            </PillButton>
          </div>
        </Reveal>

        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-6 lg:pl-12">
            <SectionTitle eyebrow="Our Services" title="We deliver versatile end-to-end software services" />
            <div className="flex gap-3">
              {[
                { dir: -1 as const, icon: ArrowLeftIcon, label: "Previous services" },
                { dir: 1 as const, icon: ArrowRightIcon, label: "Next services" },
              ].map(({ dir, icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => scroll(dir)}
                  aria-label={label}
                  className="flex size-16 items-center justify-center rounded-full border border-dashed border-brand text-brand transition-colors hover:bg-brand hover:text-ink-900"
                >
                  <Icon className="size-5" />
                </button>
              ))}
            </div>
          </div>

          <ul
            ref={track}
            className="mt-12 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="group flex min-h-[460px] w-[85%] shrink-0 snap-start flex-col border-r border-white/10 bg-white/4 p-8 backdrop-blur-sm transition-colors hover:bg-white/8 sm:w-1/2 sm:p-12 xl:w-[38%]"
              >
                <Icon className="size-14 text-brand transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
                <div className="mt-auto">
                  <h3 className="font-heading text-2xl leading-snug font-medium text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-400">{description}</p>
                  <a
                    href="#contact"
                    className="mt-8 flex h-12 items-center justify-between rounded-full border border-white/15 px-7 text-[15px] text-white transition-colors group-hover:border-brand group-hover:text-brand"
                  >
                    Start this project
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
