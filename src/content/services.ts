/**
 * Service / capability definitions.
 *
 * This module is the CMS seam: point a CMS or MDX pipeline at these shapes and
 * the service index, the service detail template and the navigation all read
 * from one place.
 */

export type ServiceSlug =
  | "forward-deployed-engineering"
  | "ai-systems"
  | "hardware";

export type Service = {
  slug: ServiceSlug;
  /** Two-digit editorial index, e.g. "01". */
  index: string;
  title: string;
  /** Short label used in navigation and card eyebrows. */
  shortTitle: string;
  /** One-line positioning statement. */
  lede: string;
  /** The hero paragraph on the detail page. */
  intro: string;
  href: string;
  capabilities: string[];
  problems: { title: string; body: string }[];
  deliverables: string[];
  disciplines: string[];
  scenarios: string[];
  /** Rendered as the process section on the detail page. */
  processFocus: string;
  metaDescription: string;
  /** Tailwind gradient stops for the detail hero card. */
  tint: {
    from: string;
    to: string;
    text: "light" | "dark";
  };
};

export const services: Service[] = [
  {
    slug: "forward-deployed-engineering",
    index: "01",
    title: "Forward-Deployed Engineering",
    shortTitle: "Forward-deployed engineering",
    lede: "Embedded engineers work directly with your team to understand operational challenges, build tailored solutions, integrate with existing systems, and deploy into real-world environments.",
    intro:
      "Forward-deployed engineering means our engineers sit inside the problem rather than beside it. We work with founders, platform teams, and operational staff to understand how work actually gets done today, then build the systems that change it — carrying the work through integration, deployment, and iteration.",
    href: "/services/forward-deployed-engineering",
    capabilities: [
      "Embedded engineering teams",
      "Technical discovery and rapid prototyping",
      "Enterprise software integration",
      "Internal tools and workflow automation",
      "Production deployment and iteration",
    ],
    problems: [
      {
        title: "The gap between prototype and production",
        body: "A proof of concept demonstrated the idea, but nothing survived contact with real data volume, real permissions, and real uptime expectations. The team needs someone who has closed that gap before.",
      },
      {
        title: "Knowledge trapped in one person",
        body: "Critical workflows depend on an individual's undocumented judgement. We externalise that knowledge into maintained systems, not tribal custom.",
      },
      {
        title: "A roadmap that is really a wishlist",
        body: "Prioritisation is stalled because nobody can size the integration work. We time-box discovery, produce a working slice early, and let evidence drive the rest.",
      },
      {
        title: "Hiring is the bottleneck",
        body: "The role needed right now is a hybrid of platform, product, and domain knowledge that is nearly impossible to fill. We fill that capacity immediately while you keep hiring on your own terms.",
      },
    ],
    deliverables: [
      "An engineer embedded in your standups, reviews, and release process",
      "A working system in your environment, not a document describing one",
      "Production deployment with monitoring and rollback paths",
      "Architecture decision records for every consequential choice",
      "Runbooks and handover documentation your team can maintain",
      "A capacity plan for the work that remains after we step back",
    ],
    disciplines: [
      "Systems design",
      "API and service integration",
      "Identity and access management",
      "Data pipelines",
      "Observability",
      "Release engineering",
      "Technical due diligence",
      "Incident response support",
    ],
    scenarios: [
      "A seed-stage company whose first technical hire needs to start shipping this quarter",
      "An enterprise replacing spreadsheet-driven operational workflows",
      "A platform team absorbing a system acquired through M&A",
      "A founder who needs a senior engineer before they can raise on technical credibility",
    ],
    processFocus:
      "Forward-deployed engagements stay continuous. Discovery happens inside the working week, not in a separate phase before it, and we hold ourselves to the same operational standard as your own engineers.",
    metaDescription:
      "Embedded senior engineers working directly inside your product and operations teams — technical discovery, integration, internal tooling, and production deployment through to handover.",
    tint: { from: "#151515", to: "#0a0a0a", text: "light" },
  },
  {
    slug: "ai-systems",
    index: "02",
    title: "AI & Software Systems",
    shortTitle: "AI & software systems",
    lede: "Design and implement intelligent software systems that solve real operational problems — evaluated, monitored, and reliable enough to depend on.",
    intro:
      "We build AI that earns its place in the process. That means a clear definition of the decision being improved, a retrieval and prompting strategy grounded in your own data, and an evaluation harness that tells you whether the system is actually working when a prompt changes under it.",
    href: "/services/ai-systems",
    capabilities: [
      "AI-powered applications and agents",
      "LLM integration and retrieval systems",
      "Backend and API development",
      "Data pipelines and infrastructure",
      "Cloud architecture and deployment",
      "Evaluation, monitoring, and reliability",
    ],
    problems: [
      {
        title: "A demo that does not survive production",
        body: "The prototype answered beautifully on curated examples. In production it meets ambiguous inputs, missing context, adversarial data, and a latency budget. We build the evaluation harness first, so quality is a measured property rather than an impression.",
      },
      {
        title: "Model dependence treated as a feature",
        body: "Behaviour changes when a provider ships an update. We design abstraction boundaries, prompt and retrieval versioning, and regression tests so upgrades are a controlled operation.",
      },
      {
        title: "No trustworthy data foundation",
        body: "Retrieval fails because the corpus is stale, unsegmented, and ungoverned. We fix ingestion, chunking, and freshness before tuning anything.",
      },
      {
        title: "Automation nobody trusts",
        body: "An agent that acts without a human checkpoint is a liability. We define the autonomy boundary explicitly: what the system decides, what it proposes, and what it must ask about.",
      },
    ],
    deliverables: [
      "A task definition and success criteria agreed before model selection",
      "A production retrieval and orchestration pipeline over your own data",
      "An evaluation suite with regression gates wired into CI",
      "Tracing, cost accounting, and latency monitoring per request path",
      "A documented fallback path with human-in-the-loop checkpoints",
      "Infrastructure-as-code for reproducible environments",
    ],
    disciplines: [
      "Retrieval architecture",
      "Model routing and fallback design",
      "Evaluation harness design",
      "Prompt and context engineering",
      "Vector and structured retrieval",
      "Agent orchestration",
      "Cost and latency engineering",
      "Guardrails and output validation",
    ],
    scenarios: [
      "Automating high-volume operational review where errors are expensive",
      "Giving internal teams trustworthy answers over an existing document corpus",
      "Replacing brittle rules engines with a system that tolerates messy input",
      "Hardening an AI feature that already shipped and is not performing",
    ],
    processFocus:
      "We ship the thinnest useful slice first and instrument it from day one. Every model, prompt, and retrieval change is measured against a fixed evaluation set before it reaches users.",
    metaDescription:
      "Production AI systems — LLM applications, agents, retrieval pipelines, backend and cloud infrastructure, with evaluation, monitoring, and reliability built in from the start.",
    tint: { from: "#ffffff", to: "#e8e8e8", text: "dark" },
  },
  {
    slug: "hardware",
    index: "03",
    title: "Hardware & Embedded Engineering",
    shortTitle: "Hardware & embedded",
    lede: "Bridge the gap between digital systems and the physical world through custom hardware, firmware, and integrated device engineering.",
    intro:
      "Physical products fail in ways software does not. Thermal envelopes, part availability, certification, and field-replaceability constrain the design long before anyone writes firmware. We work across electronics, firmware, and cloud so those constraints are designed around rather than discovered late.",
    href: "/services/hardware",
    capabilities: [
      "Embedded systems and firmware",
      "IoT devices and connected products",
      "Sensor integration and data acquisition",
      "Hardware prototyping and proof of concept",
      "Hardware-software integration",
      "Edge computing and device connectivity",
    ],
    problems: [
      {
        title: "Reference designs that do not survive production",
        body: "An evaluation board proves the idea. Production requires supply-chain resilience, thermal design, enclosure fit, and a part that will still be available in two years. We design for the second year, not the demo.",
      },
      {
        title: "Firmware and cloud drifting apart",
        body: "The device and the backend evolve on different schedules, so fielded hardware falls out of protocol compatibility. We version the contract and treat it as an interface.",
      },
      {
        title: "Data you cannot trust",
        body: "Sensor noise, calibration drift, and intermittent connectivity corrupt datasets downstream. We fix acquisition, buffering, and time synchronisation at the source.",
      },
      {
        title: "Certification treated as an afterthought",
        body: "Regulatory and radio requirements shape the antenna, layout, and firmware update path. Surfacing them early is cheaper than redesigning around them later.",
      },
    ],
    deliverables: [
      "Schematics, PCB layout, and a bill of materials with justified part choices",
      "Firmware with a documented test strategy and over-the-air update path",
      "Prototype hardware assembled and verified against the measured environment",
      "A device-to-cloud protocol with explicit versioning",
      "A test plan covering thermal, power, connectivity, and field-recovery cases",
      "A manufacturing-readiness review and handover package",
    ],
    disciplines: [
      "Schematic capture and PCB layout",
      "Embedded C/C++ and Rust",
      "RTOS scheduling and resource budgeting",
      "Low-power design",
      "Radio and connectivity",
      "Sensor fusion and calibration",
      "DFM and supply-chain planning",
      "Hardware-software interface design",
    ],
    scenarios: [
      "Taking a bench prototype to a manufacturable revision",
      "Custom sensing hardware for an environment off-the-shelf parts cannot survive",
      "Retrofitting fleet or facility equipment with connected instrumentation",
      "Diagnosing field reliability failures in deployed devices",
    ],
    processFocus:
      "We design against the real operating envelope — temperature, power budget, connectivity, and part lifecycle — because those are the constraints that determine whether the build succeeds. Prototype early, on the parts you intend to ship.",
    metaDescription:
      "Custom hardware and embedded engineering — schematics, PCB layout, firmware, sensor integration, device connectivity, and the cloud systems devices depend on.",
    tint: { from: "#232323", to: "#0a0a0a", text: "light" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
