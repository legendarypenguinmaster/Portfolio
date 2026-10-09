import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// "D" monogram with an "I" stem: outer letterform, the counter (cut at 45°), and the seam between I and D.
// Even-odd fill turns the counter and seam into holes.
const markPath =
  "M11 13.5H57C76 13.5 88.5 29 88.5 50.25S76 87 57 87H17V19.5Z" +
  "M20 23.5H56C67.5 23.5 75 35 75 51S67.5 78.5 56 78.5H47.5V51Z" +
  "M31.5 35L34.5 38V87H31.5Z";

export function DiamondMark({
  className,
  variant = "gold",
}: {
  className?: string;
  variant?: "gold" | "ink";
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("size-8", className)}>
      {variant === "gold" && (
        <defs>
          <linearGradient id="diamond-mark-gold" x1="0.1" y1="1" x2="0.9" y2="0.1">
            <stop offset="0" stopColor="#b8801c" />
            <stop offset="0.4" stopColor="#d9a02a" />
            <stop offset="0.75" stopColor="#f5c84a" />
            <stop offset="1" stopColor="#fde27a" />
          </linearGradient>
        </defs>
      )}
      <path
        d={markPath}
        fillRule="evenodd"
        fill={variant === "gold" ? "url(#diamond-mark-gold)" : "#0a0a0a"}
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-heading text-[26px] font-semibold tracking-tight text-white",
        className,
      )}
    >
      <DiamondMark />
      <span>{site.name}</span>
    </Link>
  );
}
