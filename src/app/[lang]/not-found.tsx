import Link from "next/link";
import { Kicker, Label, Title } from "@/components/disk/Label";

// Rendered on the label when a view doesn't exist, e.g. /en/nope.
// Static text in both languages, since not-found receives no params.
export default function NotFound() {
  return (
    <Label>
      <Kicker>Error · Fel</Kicker>
      <Title>Sector not found. Sektorn hittades inte.</Title>
      <p className="font-mono text-[max(0.75rem,2.3cqw)]">
        <Link href="/" className="underline decoration-ink/30 underline-offset-[0.2em] hover:decoration-ink">
          ← Start
        </Link>
      </p>
    </Label>
  );
}
