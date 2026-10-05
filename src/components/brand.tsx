import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/** Yellow radiating burst used before section labels. */
export function Burst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 text-brand", className)}>
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x="11"
          y="1"
          width="2"
          height="8"
          rx="1"
          fill="currentColor"
          transform={`rotate(${i * 30} 12 12)`}
        />
      ))}
    </svg>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 text-[15px] text-white", className)}>
      <Burst />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow className={tone === "light" ? "text-ink-900 [&_svg]:text-ink-900" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-4 font-heading text-4xl leading-[1.15] font-medium tracking-tight text-balance sm:text-[42px]",
          tone === "light"
            ? "text-ink-900/80"
            : "bg-linear-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent",
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}

const pillTones = {
  brand: { pill: "bg-brand text-ink-900", circle: "bg-brand text-ink-900" },
  dark: { pill: "bg-ink-900 text-white", circle: "bg-ink-900 text-white" },
  outline: {
    pill: "border border-white/25 text-white hover:border-brand hover:text-brand",
    circle: "border border-white/25 text-white group-hover:border-brand group-hover:text-brand",
  },
  muted: { pill: "bg-ink-700 text-white", circle: "bg-ink-700 text-white" },
};

const pillSizes = {
  lg: { pill: "h-14 px-9", circle: "size-14" },
  md: { pill: "h-12 px-7", circle: "size-12" },
};

type PillProps = {
  tone?: keyof typeof pillTones;
  size?: keyof typeof pillSizes;
  children: ReactNode;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<"a">, "className" | "children">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
);

/** Pill label plus a separate round arrow, as one interactive control. */
export function PillButton({
  tone = "brand",
  size = "lg",
  children,
  className,
  ...props
}: PillProps) {
  const styles = pillTones[tone];
  const sizes = pillSizes[size];
  const inner = (
    <>
      <span
        className={cn(
          "inline-flex items-center rounded-full text-base font-medium whitespace-nowrap transition-colors",
          sizes.pill,
          styles.pill,
        )}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "-ml-1 inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45",
          sizes.circle,
          styles.circle,
        )}
      >
        <ArrowUpRightIcon className="size-5" />
      </span>
    </>
  );
  const classes = cn(
    "group inline-flex w-fit items-center outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 rounded-full disabled:pointer-events-none disabled:opacity-60",
    className,
  );

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as ComponentProps<"a">)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {inner}
    </button>
  );
}

/** Soft, silky light streaks used as a section backdrop. */
export function Silk({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <defs>
        <linearGradient id="silk-a" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="silk-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="silk-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <g fill="none" stroke="url(#silk-a)">
        <path d="M-80 140 C 380 60, 760 520, 1520 420" strokeWidth="140" opacity="0.18" filter="url(#silk-blur)" />
        <path d="M-60 210 C 420 120, 820 600, 1500 520" strokeWidth="6" opacity="0.55" filter="url(#silk-soft)" />
        <path d="M-60 260 C 460 170, 860 660, 1500 600" strokeWidth="2" opacity="0.45" />
        <path d="M200 -40 C 520 260, 980 300, 1500 120" strokeWidth="90" opacity="0.1" filter="url(#silk-blur)" />
        <path d="M-120 720 C 400 560, 900 900, 1560 700" strokeWidth="120" opacity="0.12" filter="url(#silk-blur)" />
      </g>
    </svg>
  );
}
