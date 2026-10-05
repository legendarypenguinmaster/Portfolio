import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function DiamondMark({
  className,
  variant = "gold",
}: {
  className?: string;
  variant?: "gold" | "ink";
}) {
  if (variant === "ink") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-8", className)}>
        <path d="M12 1.6 22 9.4 12 22.4 2 9.4Z" fill="#0a0a0a" />
        <path d="M12 1.6 17.4 9.4 12 22.4 6.6 9.4Z" fill="#2a2a2a" />
        <path d="M2 9.4h20" fill="none" stroke="#fcdb66" strokeWidth="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-8", className)}>
      <path d="M12 1.6 22 9.4 12 22.4 2 9.4Z" fill="#fdeaa3" />
      <path d="M12 1.6 17.4 9.4 12 22.4 6.6 9.4Z" fill="#fcdb66" />
      <path d="M12 1.6 17.4 9.4H6.6Z" fill="#fff4cc" />
      <path d="M2 9.4h20" fill="none" stroke="#0a0a0a" strokeWidth="0.7" />
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
