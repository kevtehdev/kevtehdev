import Link from "next/link";
import { Eyebrow, Page, Title } from "@/components/views/parts";

// Shown when a view doesn't exist, e.g. /en/nope.
// Static text in both languages, since not-found receives no params.
export default function NotFound() {
  return (
    <Page>
      <Eyebrow>404</Eyebrow>
      <Title>Page not found. Sidan hittades inte.</Title>
      <p>
        <Link href="/" className="link">
          ← kevdev.codes
        </Link>
      </p>
    </Page>
  );
}
