import Link from "next/link";
import { Page, Row, Title } from "@/components/views/parts";

// Shown when a view doesn't exist, e.g. /en/nope.
// Static text in both languages, since not-found receives no params.
export default function NotFound() {
  return (
    <Page>
      <Row heading={false} label="404">
        <Title>Page not found. Sidan hittades inte.</Title>
        <Link href="/" className="link">
          ← kevdev.codes
        </Link>
      </Row>
    </Page>
  );
}
