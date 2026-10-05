import { Fragment } from "react";
import { Burst } from "@/components/brand";

const words = ["Designing", "Development", "Innovation", "Testing", "Delivery"];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {words.map((word) => (
        <Fragment key={word}>
          <span className="flex h-36 items-center rounded-full border border-ink-900/70 px-16 font-heading text-6xl font-extrabold tracking-tight text-ink-900 uppercase sm:text-7xl">
            {word}
          </span>
          <span className="-mx-px flex h-36 w-48 items-center justify-center rounded-full border border-ink-900/70">
            <Burst className="size-16 text-ink-900" />
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export function MarqueeBand() {
  return (
    <section aria-label="What we do" className="overflow-hidden bg-brand py-14">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
