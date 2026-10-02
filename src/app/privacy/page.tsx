import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { ContactEmailLink } from "@/components/layout/contact-email";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KAZES.studio collects, uses, and protects the information you submit through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — KAZES.studio",
    description:
      "How KAZES.studio handles the information you submit through this website.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="This site collects as little as possible and uses it for one purpose: replying to you. This page explains exactly what that means."
      updated="2 October 2026"
    >
      <LegalSection heading="What this covers">
        <p>
          This policy describes how {""}
          <strong>KAZES.studio</strong> handles personal information collected
          through this website — primarily the project inquiry form. It does not
          cover information you send us by email outside this site, or any
          system we operate on your behalf under a separate written agreement.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          When you submit the contact form we collect the details you type into
          it: your name, work email address, company name, an optional website,
          the capability, budget range and timeline you select, and the
          description you write. We ask for each of these because they are
          needed to give you a useful technical reply.
        </p>
        <p>
          We also record the following automatically, purely to operate the form
          securely:
        </p>
        <ul>
          <li>
            Your IP address and browser user-agent string, used at submission
            time to rate-limit and to detect automated abuse.
          </li>
          <li>
            The time elapsed between the form becoming interactive and being
            submitted, used to distinguish humans from scripts.
          </li>
        </ul>
        <p>
          We do not use advertising trackers, cross-site beacons, or
          third-party analytics. There is no cookie banner because there are no
          non-essential cookies to consent to.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use it, and on what basis">
        <p>
          We use your information to evaluate your inquiry and respond to you.
          Where you ask us to contact you about a project, that is necessary to
          take the step you have requested. We rely on our legitimate interest
          in replying to business inquiries and in keeping our systems secure
          and reliable, and your consent for the privacy acknowledgement on the
          form.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Inquiry records are retained for up to <strong>24 months</strong> from
          the last contact, so we have the context if a conversation resumes.
          After that they are deleted. If an inquiry leads to a commercial
          agreement, retention of project records is governed by that agreement
          instead.
        </p>
      </LegalSection>

      <LegalSection heading="Who else sees it">
        <p>
          Nobody, except the processors we need in order to operate this site.
          Depending on configuration, that can include our hosting provider and,
          if configured, an email delivery provider or an automation webhook. We
          do not sell your information, rent mailing lists, or share it with
          advertisers or data brokers.
        </p>
        <p>
          We will disclose information where we are legally required to do so,
          and will tell you unless prohibited from doing so.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          Information is transmitted over TLS and stored on infrastructure
          restricted to the studio. Access is limited to the engineers who need
          it to respond. No system is perfectly secure, but we treat any
          suspected breach as an incident to be investigated rather than
          something to be quietly absorbed.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on where you are, you may have the right to access the
          personal data we hold about you, to correct it, to have it erased, to
          restrict or object to its processing, and to receive a portable copy.
          You can also withdraw consent at any time.
        </p>
        <p>
          To exercise any of these, contact us and we will respond within a
          reasonable period. If you are in the EEA or UK you may also complain
          to your local supervisory authority.
        </p>
      </LegalSection>

      <LegalSection heading="International transfers">
        <p>
          Our infrastructure is hosted in the United States. If you are in
          Europe, the UK, or Switzerland, your information will be transferred
          to and processed in the US under the applicable transfer safeguards.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site is not directed at anyone under 16, and we do not knowingly
          collect information from children.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we change how we handle information we will update this page and
          revise the date at the top. Material changes affecting existing
          inquiries will be communicated directly.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For any privacy question, or to exercise a right described above, use
          the <Link href="/contact">contact form</Link> or email us directly.
        </p>
        <ContactEmailLink tone="dark" />
      </LegalSection>
    </LegalPage>
  );
}