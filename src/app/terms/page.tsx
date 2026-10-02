import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { ContactEmailLink } from "@/components/layout/contact-email";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to your use of this website and to enquiries submitted through it.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — KAZES.studio",
    description:
      "The terms that apply to your use of this website and to enquiries submitted through it.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      intro="These terms cover your use of this website and the inquiries you send through it. Actual engineering engagements are governed by a separate written agreement."
      updated="2 October 2026"
    >
      <LegalSection heading="About these terms">
        <p>
          These terms apply to everyone who visits{" "}
          <strong>KAZES.studio</strong> or submits an inquiry through this site.
          By using the site you accept them. Separate terms apply to services we
          perform; where we have signed an agreement with you, that agreement
          takes precedence over anything here.
        </p>
      </LegalSection>

      <LegalSection heading="This site is information, not an offer">
        <p>
          The content here — including our capabilities, process, and concept
          studies — is provided for general information. It is not a proposal, an
          offer, or a commitment to supply any service. Nothing on this site
          creates a contract.
        </p>
        <p>
          <strong>Every project example published on this site is a concept
          study.</strong> They describe work we are equipped to do, written to
          show our approach. They are not client engagements, and the outcome
          figures shown alongside them are design targets rather than measured
          results. No figure on this site should be read as a performance claim
          about a real deployment.
        </p>
      </LegalSection>

      <LegalSection heading="Inquiries">
        <p>
          Submitting the contact form does not create an engagement and does not
          reserve capacity. We decide whether to proceed on the merits of the
          work and our availability. You can withdraw an inquiry at any time by
          asking us to delete it — see the <Link href="/privacy">privacy
          policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The design, text, code, and visual assets of this site belong to
          KAZES.studio or its licensors. You may view it and link to it. You may
          not copy or republish substantial portions, or use the KAZES name or
          marks, without written permission.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy and availability">
        <p>
          We take care to keep this site correct and available, but it is
          provided as is. Technical descriptions may be simplified for
          readability and are not specifications. We may change, suspend, or
          withdraw any part of the site without notice.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          To the fullest extent permitted by law, KAZES.studio is not liable for
          loss arising from your use of, or inability to use, this site,
          reliance on its general information, or any third-party link. We do not
          exclude liability that cannot lawfully be excluded. Nothing here limits
          liability that would exist under a signed services agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links">
        <p>
          Where we link out, we do not endorse and are not responsible for that
          content or its privacy practices.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms; the revision date at the top reflects the
          current version. Continuing to use the site after a change means you
          accept it.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms can go through the{" "}
          <Link href="/contact">contact form</Link> or to us directly.
        </p>
        <ContactEmailLink tone="dark" />
      </LegalSection>
    </LegalPage>
  );
}