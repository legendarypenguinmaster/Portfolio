import { ArrowRightIcon } from "lucide-react";
import { Silk } from "@/components/brand";
import { DiamondMark, Logo } from "@/components/logo";
import { site } from "@/lib/site";

const services = [
  "Product & MVP Development",
  "Web Applications",
  "API Integration",
  "Maintenance & Support",
];

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-heading text-xl font-medium text-white">{title}</p>
      <ul className="mt-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group flex items-center justify-between border-b border-white/10 py-3.5 text-white transition-colors hover:text-brand"
            >
              {link.label}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950">
      <Silk className="-z-10 opacity-70" />

      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 md:flex-row md:items-center lg:py-28">
        <a
          href="#contact"
          className="font-heading text-[clamp(2.75rem,8vw,6.5rem)] leading-[1.02] font-extrabold tracking-tight text-neutral-400 uppercase transition-colors hover:text-white"
        >
          Let&apos;s — Discuss
          <br />
          New Project
        </a>
        <a
          href="#contact"
          aria-label="Start a project"
          className="group flex size-40 shrink-0 items-center justify-center rounded-full bg-brand transition-transform duration-500 hover:scale-105 lg:size-52"
        >
          <DiamondMark
            variant="ink"
            className="size-16 transition-transform duration-700 group-hover:rotate-[360deg] lg:size-20"
          />
        </a>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-16 lg:py-20">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-6 leading-relaxed text-neutral-400">{site.description}</p>
          </div>
          <LinkList title="Company" links={site.nav.slice(0, 4)} />
          <LinkList title="Services" links={services.map((label) => ({ label, href: "#services" }))} />
          <div>
            <p className="font-heading text-xl font-medium text-white">Contact Us</p>
            <p className="mt-6 text-neutral-400">Send E-Mail</p>
            <a href={`mailto:${site.email}`} className="mt-2 block break-all text-white hover:text-brand">
              {site.email}
            </a>
            <p className="mt-6 text-neutral-400">Start a project</p>
            <a href="#contact" className="mt-2 block text-white hover:text-brand">
              Use the project form
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-5 py-8 text-white sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#faq" className="hover:text-brand">FAQ&apos;s</a>
            <a href="#contact" className="hover:text-brand">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
