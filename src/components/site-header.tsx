"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon, MenuIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = site.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-ink-900/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-all duration-300 sm:px-8",
          scrolled ? "h-20" : "h-24",
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-[17px] font-medium transition-colors hover:text-brand",
                active === item.href ? "text-brand" : "text-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden h-12 items-center gap-2 rounded-full bg-brand px-7 text-[17px] font-medium text-ink-900 transition-colors hover:bg-white sm:inline-flex"
          >
            Get a quote
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:rotate-45" />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="size-12 rounded-full border border-white/15 text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-ink-800">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-4">
                {site.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="border-b border-white/10 px-2 py-4 text-lg font-medium text-white hover:text-brand"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand text-base font-medium text-ink-900"
                  >
                    Get a quote
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
