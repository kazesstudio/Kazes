/**
 * Case study content.
 *
 * IMPORTANT — READ BEFORE PUBLISHING
 * ----------------------------------
 * Every entry in this file is a **concept study**. They describe work
 * KAZES.studio is equipped to do, written to demonstrate the depth and shape
 * of our engineering. They are not client engagements.
 *
 * They must not be presented as real client work. There are no invented
 * clients, testimonials, logos, funding, or performance figures anywhere in
 * this file, and `isConcept: true` is what drives the "Concept study" badge
 * rendered on the index, the card, and the detail page.
 *
 * To publish verified work, add an entry with `isConcept: false` and replace
 * `client: null` with the client's name (or keep it null and set
 * `clientDisclosed: false` for work under NDA). The badge disappears
 * automatically. `outcomes` entries are only rendered as verified claims when
 * the containing study is not a concept study.
 */

import type { ServiceSlug } from "./services";

export type WorkCategory =
  | "ai-systems"
  | "developer-infrastructure"
  | "connected-hardware"
  | "enterprise-automation";

export const workCategories: {
  slug: WorkCategory;
  label: string;
  blurb: string;
}[] = [
  {
    slug: "ai-systems",
    label: "AI systems",
    blurb: "Retrieval, agents, and evaluation harnesses for operational work.",
  },
  {
    slug: "developer-infrastructure",
    label: "Developer infrastructure",
    blurb: "Platform, pipelines, and tooling that makes shipping reliable.",
  },
  {
    slug: "connected-hardware",
    label: "Connected hardware",
    blurb: "Devices, firmware, and the cloud systems they depend on.",
  },
  {
    slug: "enterprise-automation",
    label: "Enterprise automation",
    blurb: "Internal systems replacing manual, error-prone operational load.",
  },
];

export type ArchitectureLayer = {
  name: string;
  items: string[];
};

export type Outcome = {
  label: string;
  value: string;
  /** Always states what the number is, and whether it has been verified. */
  note: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** `null` where the client cannot be named. Never a placeholder company. */
  client: string | null;
  clientDisclosed: boolean;
  isConcept: boolean;
  category: WorkCategory;
  services: ServiceSlug[];
  year: string;
  engagement: string;
  duration: string;
  summary: string;
  challenge: string;
  constraints: { title: string; body: string }[];
  approach: { title: string; body: string }[];
  architecture: {
    caption: string;
    layers: ArchitectureLayer[];
  };
  stack: { group: string; items: string[] }[];
  outcomes: Outcome[];
  lessons: string[];
  /**
   * Deterministic seed for the generated technical figure. Figures are drawn
   * from the data rather than sourced from stock photography, so nothing here
   * implies a real product screenshot.
   */
  figure: "pipeline" | "topology" | "board" | "sequence";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "retrieval-layer-for-clinical-trials",
    title: "A retrieval layer that clinical reviewers actually trusted",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "ai-systems",
    services: ["ai-systems", "forward-deployed-engineering"],
    year: "2025",
    engagement: "Dedicated engineering team",
    duration: "Five months, discovery through deployment",
    summary:
      "An evidence-grounded assistant for trial protocol review, built so that every answer could be traced to source and every change to a prompt could be measured before release.",
    challenge:
      "Reviewers were spending hours cross-checking protocol language against prior amendments and precedent documents. A first-generation assistant had been abandoned because it produced fluent answers that could not be verified, and reviewers had no way to tell a reasonable inference from an invented one. The technical problem was not summarisation — it was provenance. Without traceability, no amount of answer quality would make the system usable in a regulated workflow.",
    constraints: [
      {
        title: "Every claim must be attributable",
        body: "Answers are only useful if a reviewer can jump to the exact clause that supports them, and confirm nothing was paraphrased in transit.",
      },
      {
        title: "The corpus is versioned and amended",
        body: "Protocols accrue amendments. A retrieval index that ignores document lineage will happily return superseded guidance.",
      },
      {
        title: "Regulated domain, low tolerance for drift",
        body: "Behaviour changes between model versions are a compliance concern, not just a quality concern.",
      },
      {
        title: "Existing document infrastructure",
        body: "Content already lived in a permissions-aware repository that had to remain the source of truth.",
      },
    ],
    approach: [
      {
        title: "Made provenance a hard requirement, not a feature",
        body: "The retrieval layer returns structured spans — document, version, clause range — rather than free text. The interface is designed so a claim without a resolvable span cannot be displayed, which removes the failure mode structurally instead of asking the model to behave.",
      },
      {
        title: "Modelled document lineage as first-class metadata",
        body: "Amendment chains are represented explicitly in the index. Superseded clauses are retained but demoted, and the citation surfaces the amendment that introduced the language.",
      },
      {
        title: "Built the evaluation harness before the assistant",
        body: "A fixed set of reviewer-authored question-and-answer pairs, with unanswerable questions deliberately included. Every prompt, retrieval, and model change runs against this set as a gate. Quality became a number that could be compared across releases.",
      },
      {
        title: "Isolated model providers behind a boundary",
        body: "Inference sits behind an internal interface with prompt and retrieval versioning, so a provider upgrade is a controlled operation with a rollback rather than a surprise.",
      },
      {
        title: "Designed the autonomy boundary explicitly",
        body: "The system retrieves, cites, and drafts. A qualified reviewer approves anything that reaches the record. That boundary is enforced in code and stated in the interface, not left to convention.",
      },
    ],
    architecture: {
      caption:
        "Retrieval and evaluation architecture. Document lineage is represented in the index rather than inferred at query time.",
      layers: [
        {
          name: "Sources",
          items: ["Protocol repository", "Amendment history", "Precedent set", "Reviewer annotations"],
        },
        {
          name: "Ingestion",
          items: ["Structure-aware parsing", "Lineage graph", "Clause segmentation", "Change detection"],
        },
        {
          name: "Retrieval",
          items: ["Hybrid keyword + dense", "Version-aware filtering", "Span extraction", "Ranking with recency prior"],
        },
        {
          name: "Generation",
          items: ["Provider abstraction", "Prompt versioning", "Output schema validation", "Span enforcement"],
        },
        {
          name: "Assurance",
          items: ["Evaluation set", "Regression gate in CI", "Trace store", "Reviewer checkpoint"],
        },
      ],
    },
    stack: [
      {
        group: "Interface",
        items: ["TypeScript", "React", "Python", "PostgreSQL"],
      },
      {
        group: "Retrieval",
        items: ["Hybrid lexical + dense search", "Structured clause index", "Document lineage graph"],
      },
      {
        group: "Infrastructure",
        items: ["Containerised services", "Object storage for raw documents", "Tracing and cost telemetry", "CI with evaluation gate"],
      },
    ],
    outcomes: [
      {
        label: "Answer attribution",
        value: "100%",
        note: "Design target: every displayed claim resolves to a citable source span. Structurally enforced, not model-dependent.",
      },
      {
        label: "Unanswerable handling",
        value: "Refusal tested",
        note: "Deliberately included unanswerable cases in the evaluation set to measure refusal behaviour rather than answer volume.",
      },
      {
        label: "Change safety",
        value: "Gated",
        note: "Prompt, retrieval, and model changes must pass the fixed evaluation set before reaching reviewers.",
      },
    ],
    lessons: [
      "In a regulated workflow, traceability is a design constraint on the interface, not a property you ask the model for.",
      "Representing document lineage at index time was cheaper and more reliable than reconstructing version context at query time.",
      "Building the evaluation harness first changed the conversation with the client about what 'good' meant — it stopped being a matter of taste.",
    ],
    figure: "topology",
  },
  {
    slug: "release-path-for-a-monorepo",
    title: "Making deploys boring across forty repositories",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "developer-infrastructure",
    services: ["forward-deployed-engineering", "ai-systems"],
    year: "2025",
    engagement: "Embedded engineer",
    duration: "Ongoing, eight months to first restructure",
    summary:
      "A single release path for a growing engineering organisation, where the previous approach made every deploy a coordinated event involving three teams.",
    challenge:
      "Services had accumulated their own pipelines, their own deployment triggers, and their own rollback procedures. A change touching a shared library required a coordinated release across teams, and the cost of that coordination had made teams batch unrelated changes into larger, riskier deploys. The bottleneck was not code review — it was the release path itself.",
    constraints: [
      {
        title: "No big-bang migration",
        body: "Incremental migration mattered more than a clean end state. Forty services could not be frozen while the platform changed.",
      },
      {
        title: "Different runtimes already in production",
        body: "The constraint applied to containerised services and to scheduled batch jobs with entirely different failure characteristics.",
      },
      {
        title: "Existing ownership boundaries",
        body: "Team boundaries had to keep matching on-call responsibility. A pipeline change that obscured ownership would be rejected.",
      },
      {
        title: "Audit requirements on release events",
        body: "Every production change needed an attributable record, and that record had to survive platform changes.",
      },
    ],
    approach: [
      {
        title: "Started with one service, end to end",
        body: "Rather than designing the target platform on paper, we migrated a single representative service completely — build, test, canary, promote, rollback — and used the friction as the requirements document for everything else.",
      },
      {
        title: "Made provenance a build property",
        body: "Every artefact carries the source revision, the build inputs, and the change record with it. Promotion becomes a reference to a verified artefact rather than a rebuild, which is what removed the coordinated-release requirement.",
      },
      {
        title: "Progressive rollout as the default, not an option",
        body: "Canary analysis runs on every production change with automatic halt thresholds. Small teams stopped needing a manual go/no-go decision they had no context to make well.",
      },
      {
        title: "Rollback designed before rollout",
        body: "Because rollout is a shift of traffic between immutable artefacts, rollback is a traffic operation. We rehearsed it under failure conditions rather than assuming it worked.",
      },
      {
        title: "Migrated on an agreed service queue",
        body: "Teams opted in as they had capacity. A thin compatibility layer meant both patterns ran in parallel, so the migration never became a coordination exercise.",
      },
    ],
    architecture: {
      caption:
        "Unified release path. Promotion shifts traffic between immutable artefacts, so rollback is a traffic operation.",
      layers: [
        {
          name: "Source",
          items: ["Monorepo", "Service modules", "Shared libraries", "Infrastructure definitions"],
        },
        {
          name: "Build",
          items: ["Hermetic builds", "Content-addressed artefacts", "SBOM generation", "Vulnerability scanning"],
        },
        {
          name: "Verify",
          items: ["Unit and integration", "Contract tests", "Environment gates", "Artefact attestation"],
        },
        {
          name: "Release",
          items: ["Progressive rollout", "Automatic halt thresholds", "Traffic shifting", "Instant rollback"],
        },
        {
          name: "Operate",
          items: ["Unified telemetry", "Change correlation", "Ownership metadata", "Incident annotations"],
        },
      ],
    },
    stack: [
      {
        group: "Language",
        items: ["Go", "TypeScript", "Python", "Bash"],
      },
      {
        group: "Platform",
        items: ["Container images", "Declarative infrastructure", "OCI registries", "Secret management"],
      },
      {
        group: "Release",
        items: ["Progressive delivery controller", "Service mesh traffic management", "Policy-as-code", "CI with attestation"],
      },
    ],
    outcomes: [
      {
        label: "Coordinated releases",
        value: "Eliminated",
        note: "Design goal: shared-library changes no longer require a multi-team release window.",
      },
      {
        label: "Rollback",
        value: "Traffic shift",
        note: "Because promotion references immutable artefacts rather than rebuilding, rollback no longer depends on a reversible build.",
      },
      {
        label: "Adoption",
        value: "Opt-in queue",
        note: "Both release patterns ran in parallel throughout, so migration was never a freeze-window negotiation.",
      },
    ],
    lessons: [
      "Migrating one service completely was worth more than designing the whole platform — the failure modes showed up immediately.",
      "Making builds hermetic and artefacts immutable is what turned rollback from a build problem into a routing problem.",
      "An agreed migration queue kept platform work from turning into a coordination tax on every team.",
    ],
    figure: "pipeline",
  },
  {
    slug: "cold-chain-instrumentation",
    title: "Instrumenting a cold chain without stranding the data",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "connected-hardware",
    services: ["hardware", "ai-systems"],
    year: "2024",
    engagement: "Project-based delivery",
    duration: "Seven months, prototype through manufacturing review",
    summary:
      "A connected sensing device for refrigerated logistics, where the real engineering problem was surviving the environment and the radio budget, not reading a temperature.",
    challenge:
      "Temperature excursions were being detected after the fact, from shipment records, which meant spoiled product was discovered at delivery. The requirement was continuous monitoring across refrigerated containers — an environment with condensation, vibration, and very limited connectivity. The honest assessment was that the hard constraints were physical and radio-related, and that a consumer device repurposed for the job would fail in the field for reasons unrelated to its software.",
    constraints: [
      {
        title: "Condensation and thermal cycling",
        body: "Enclosure design, coating, and venting had to survive repeated transitions between freezer and ambient temperatures without trapping moisture against the board.",
      },
      {
        title: "Intermittent connectivity",
        body: "Shipments pass through tunnels, depots, and ocean crossings. Data has to survive the gaps without draining the battery.",
      },
      {
        title: "Battery budget measured in months",
        body: "Devices are not serviced in transit, so radio and sampling duty cycle dominate the power design.",
      },
      {
        title: "Calibration over time",
        body: "A sensor that drifts is worse than no sensor. The measurement chain needed a defensible calibration story.",
      },
      {
        title: "Part lifecycle and certification",
        body: "Radio and safety requirements constrain component choice, and every part needs a second source.",
      },
    ],
    approach: [
      {
        title: "Sized the power budget before choosing parts",
        body: "The radio duty cycle sets the architecture, so we modelled energy per transmission, per sample, and per wake against the target service interval, then selected components to fit that budget rather than adjusting the budget to fit the parts.",
      },
      {
        title: "Designed the data path around disconnection",
        body: "The device buffers locally with a bounded store, transmits opportunistically, and acknowledges sequence numbers so the backend can detect and resolve gaps. Missing data is an expected state the system is designed around, not an error path.",
      },
      {
        title: "Made calibration explicit and auditable",
        body: "Reference points at known temperature are recorded in the field, drift is tracked against them, and readings carry a quality flag the backend acts on. The system degrades visibly rather than silently.",
      },
      {
        title: "Prototyped on production-intent parts",
        body: "Early hardware was built on the components intended for the first production revision, so enclosure fit, thermal behaviour, and radio performance were measured rather than estimated.",
      },
      {
        title: "Treated the device–cloud contract as a versioned interface",
        body: "Firmware and backend evolve on different schedules, so the protocol carries an explicit version, negotiates capabilities on connect, and can be told to fall back to a minimal mode it can still satisfy.",
      },
    ],
    architecture: {
      caption:
        "Device stack. Duty cycle is a design parameter: every layer is sized against the energy budget for one transmission cycle.",
      layers: [
        {
          name: "Sensing",
          items: ["Temperature sensor", "Accelerometer", "Door state", "Reference calibration point"],
        },
        {
          name: "Firmware",
          items: ["RTOS scheduling", "Adaptive sampling", "Local buffer with bounds", "Over-the-air update"],
        },
        {
          name: "Connectivity",
          items: ["Low-power radio", "Batched transmission", "Sequence acknowledgement", "Capability negotiation"],
        },
        {
          name: "Ingest",
          items: ["Protocol version handling", "Gap detection and fill", "Quality flag evaluation", "Timeseries store"],
        },
        {
          name: "Application",
          items: ["Excursion detection", "Alerting", "Shipment timeline reconstruction", "Reporting"],
        },
      ],
    },
    stack: [
      {
        group: "Hardware",
        items: ["32-bit MCU", "Conformal coating and venting", "Primary + secondary sourcing", "Rev A prototype fabrication"],
      },
      {
        group: "Firmware",
        items: ["C (bare metal and RTOS)", "Low-power radio stack", "Flash wear management", "Signed over-the-air updates"],
      },
      {
        group: "Cloud",
        items: ["MQTT ingestion", "Timeseries storage", "Streaming excursion detection", "Fleet management console"],
      },
    ],
    outcomes: [
      {
        label: "Power budget",
        value: "Modelled pre-build",
        note: "Energy per cycle was computed before component selection so the service interval was a design input, not a hope.",
      },
      {
        label: "Data integrity",
        value: "Gap-aware",
        note: "Sequence acknowledgement means the backend can distinguish a device failure from a connectivity gap — the two had been indistinguishable before.",
      },
      {
        label: "Calibration",
        value: "Auditable",
        note: "Field reference points make drift measurable, and readings carry a quality flag the application can act on.",
      },
      {
        label: "Hardware revisions",
        value: "One prototype",
        note: "Design intent was to reach a manufacturable revision in a single prototype cycle by building early on production-intent parts.",
      },
    ],
    lessons: [
      "For connected hardware, the power budget determines the architecture — modelling it first prevented a component selection that could not have met the service interval.",
      "Designing for disconnection from the start changed the backend contract, not just the firmware.",
      "A calibration story is a product requirement for anything that makes a measurement claim.",
    ],
    figure: "board",
  },
  {
    slug: "claims-adjudication-internal-system",
    title: "Automating the first pass of claims adjudication",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "enterprise-automation",
    services: ["forward-deployed-engineering", "ai-systems"],
    year: "2025",
    engagement: "Dedicated engineering team",
    duration: "Four months to production, then embedded support",
    summary:
      "An internal system that handles the mechanical work of first-pass adjudication so human reviewers spend their time on the cases that actually need judgement.",
    challenge:
      "A large share of first-pass adjudication was mechanical: coverage verification, duplicate detection, document completeness, routine policy lookups. Highly trained reviewers were spending most of their time on that work, and a backlog was growing faster than headcount. Manual-only automation was not the answer, because the cases that genuinely required judgement were being mixed in with the ones that did not.",
    constraints: [
      {
        title: "A human must remain accountable",
        body: "Every decision needs an attributable reviewer. The system prepares and recommends; it does not adjudicate.",
      },
      {
        title: "Unstructured, inconsistent source documents",
        body: "Claims arrive with documents of widely varying quality and structure, and 'complete' means different things in different queues.",
      },
      {
        title: "Policy changes take effect immediately",
        body: "A rules engine baked into a deploy cycle could not keep pace with policy updates.",
      },
      {
        title: "Legacy systems of record",
        body: "The authoritative record lived in systems that could be read but not modified, so the new system had to be correct on first write.",
      },
    ],
    approach: [
      {
        title: "Separated automation from authority",
        body: "The system produces a prepared case: extracted facts, matched policy, coverage reasoning, and a recommended disposition with confidence. Reviewers approve or override. Authority stays with a person; the mechanical load does not.",
      },
      {
        title: "Extracted facts with source spans, not summaries",
        body: "Structured extractions carry the exact location they came from. A reviewer can verify a field without re-reading the document, and a wrong extraction is visibly wrong rather than plausibly wrong.",
      },
      {
        title: "Made policy an externalised, versioned artefact",
        body: "Policy rules live outside the deploy cycle, are versioned independently, and every decision records the policy version applied. Changing policy stops being an engineering event.",
      },
      {
        title: "Measured override rate as the primary metric",
        body: "Accuracy and speed both matter, but override rate on recommended dispositions is the signal that tells you whether the system is learning the job or confidently guessing. It was the number we reviewed weekly.",
      },
      {
        title: "Deployed beside the systems of record",
        body: "The new system read authoritative state and produced prepared cases without taking on write authority, which avoided a migration while still making the reviewer experience coherent.",
      },
    ],
    architecture: {
      caption:
        "Preparation pipeline. The system produces a prepared case with attributable extractions; authority for disposition stays with a human reviewer.",
      layers: [
        {
          name: "Intake",
          items: ["Document ingestion", "Queue routing", "Completeness assessment", "Duplicate detection"],
        },
        {
          name: "Extraction",
          items: ["Layout-aware parsing", "Field extraction with spans", "Confidence scoring", "Manual review queue"],
        },
        {
          name: "Policy",
          items: ["Externalised rules", "Versioned policy artefacts", "Coverage evaluation", "Effective-dating"],
        },
        {
          name: "Preparation",
          items: ["Recommendation", "Reasoning trace", "Prepared case assembly", "Reviewer assignment"],
        },
        {
          name: "Decision",
          items: ["Reviewer approval", "Override capture", "Authoritative record write", "Feedback into evaluation set"],
        },
      ],
    },
    stack: [
      {
        group: "Interface",
        items: ["TypeScript", "React", "Python"],
      },
      {
        group: "Data",
        items: ["PostgreSQL", "Document object storage", "Queue-backed workers", "Append-only decision log"],
      },
      {
        group: "Infrastructure",
        items: ["Container services", "Secrets management", "Structured logging", "Infrastructure as code"],
      },
    ],
    outcomes: [
      {
        label: "Accountability",
        value: "Human-held",
        note: "Every disposition is attributable to a named reviewer. The system prepares; it does not adjudicate.",
      },
      {
        label: "Policy updates",
        value: "Decoupled",
        note: "Policy rules are versioned outside the deploy cycle, and each decision records the policy version applied.",
      },
      {
        label: "Quality tracking",
        value: "Override rate",
        note: "Override rate on recommended dispositions was the primary weekly signal — it exposes confident guessing faster than any accuracy metric.",
      },
      {
        label: "Correction loop",
        value: "Closed",
        note: "Overrides were fed back into the evaluation set, so the system was measured against the cases practitioners actually rejected.",
      },
    ],
    lessons: [
      "Separating preparation from authority made the automation acceptable to the reviewers who had to live with it.",
      "Span-bound extractions made verification cheap, which is what determined whether reviewers actually checked the system's work.",
      "Externalising policy out of the deploy cycle removed engineering from the critical path of routine business changes.",
    ],
    figure: "sequence",
  },
  {
    slug: "edge-vision-quality-inspection",
    title: "Vision inspection that had to run on the edge",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "ai-systems",
    services: ["ai-systems", "hardware"],
    year: "2024",
    engagement: "Project-based delivery",
    duration: "Six months, feasibility through field deployment",
    summary:
      "Visual inspection for a high-mix production line, designed around the physical constraints of the cell: latency, vibration, and no continuous network.",
    challenge:
      "Manual inspection of finished assemblies was the last quality gate, and it was both slow and inconsistently calibrated between shifts. A cloud-hosted model was not viable: the network in the cell was unreliable, the latency budget was a few hundred milliseconds, and the cameras moved with the line. The system had to make its decision where the part was.",
    constraints: [
      {
        title: "Hard latency budget",
        body: "Decisions had to return within the takt time of the line, which ruled out round-tripping to a remote service per part.",
      },
      {
        title: "Vibration and moving optics",
        body: "Camera mounting and exposure had to be robust to a line that was never perfectly still, without over-constraining mechanical tolerances.",
      },
      {
        title: "No continuous connectivity",
        body: "The cell could lose the network for extended periods. Degraded operation had to be defined in advance, not improvised.",
      },
      {
        title: "High mix, low volume per variant",
        body: "Retraining per SKU was not viable, so the model needed to generalise across variation rather than memorise a catalogue.",
      },
    ],
    approach: [
      {
        title: "Established a baseline before optimising anything",
        body: "The first deliverable was a measurement of current inspection performance — including inter-rater agreement between human inspectors. Without that, any later improvement claim would have been unfalsifiable.",
      },
      {
        title: "Sized the model to the accelerator, not the other way round",
        body: "Target hardware and its memory bandwidth set the model budget, and the architecture was selected to fit. This avoided the common failure of prototyping a model that cannot be deployed at the required rate.",
      },
      {
        title: "Deployed the decision on the edge, kept the loop closed",
        body: "Inference runs locally. Edge nodes hold enough state to continue evaluating when the network is down, buffer results, and reconcile on reconnect — so connectivity loss degrades reporting rather than inspection.",
      },
      {
        title: "Treated the vision stack as part of the mechanical design",
        body: "Lighting, mount rigidity, and trigger timing were specified alongside the model. Much of the achievable accuracy came from the optics, not the network.",
      },
      {
        title: "Bounded the model's authority",
        body: "The system flags; it does not reject. Confident and uncertain outcomes are separated, and uncertain cases route to a human with the underlying evidence attached.",
      },
    ],
    architecture: {
      caption:
        "Edge inspection architecture. The decision is made at the cell; the network improves the system but is not required for it to inspect.",
      layers: [
        {
          name: "Capture",
          items: ["Triggered cameras", "Controlled lighting", "Rigid mounts", "Frame integrity checks"],
        },
        {
          name: "Preprocess",
          items: ["Geometric correction", "Normalisation", "Region of interest selection", "Quality gating"],
        },
        {
          name: "Inference",
          items: ["Quantised model", "Edge accelerator", "Deterministic runtime", "Sub-budget timing checks"],
        },
        {
          name: "Decide",
          items: ["Confidence scoring", "Uncertain-case routing", "Evidence capture", "Traceable output"],
        },
        {
          name: "Reconcile",
          items: ["Offline buffering", "Store-and-forward", "Drift monitoring", "Retraining feedback"],
        },
      ],
    },
    stack: [
      {
        group: "Model",
        items: ["Compact CNN", "Quantisation for edge inference", "Deterministic runtime", "Per-variant generalisation"],
      },
      {
        group: "Hardware",
        items: ["Edge accelerator module", "Triggered industrial cameras", "Controlled lighting rig"],
      },
      {
        group: "Software",
        items: ["C++ inference service", "Time-series storage", "Buffer and reconciliation layer", "Operator console"],
      },
    ],
    outcomes: [
      {
        label: "Baseline",
        value: "Measured first",
        note: "Human inter-rater agreement was measured before any model work, so later comparisons had a defensible reference point.",
      },
      {
        label: "Latency",
        value: "Within takt",
        note: "Model budget was derived from target hardware and the line's takt time, rather than tuned on a workstation and hoped to fit.",
      },
      {
        label: "Offline behaviour",
        value: "Defined",
        note: "Connectivity loss degrades reporting and improvement signals, not the inspection itself — specified in advance, not improvised.",
      },
      {
        label: "Authority",
        value: "Flag, not reject",
        note: "Uncertain outcomes route to a human with evidence attached, which kept the system's adoption compatible with existing practice.",
      },
    ],
    lessons: [
      "Measuring the existing human baseline first made every subsequent claim falsifiable.",
      "For edge deployment, the target hardware is an architecture input, not a deployment detail.",
      "Much of the achievable accuracy came from lighting and mounting — the vision stack belongs in the mechanical design conversation.",
    ],
    figure: "sequence",
  },
  {
    slug: "multi-tenant-data-platform",
    title: "One data platform, many tenants, no surprises",
    client: null,
    clientDisclosed: false,
    isConcept: true,
    category: "developer-infrastructure",
    services: ["ai-systems", "forward-deployed-engineering"],
    year: "2024",
    engagement: "Embedded engineer",
    duration: "Nine months",
    summary:
      "A multi-tenant ingestion and query platform where the hard requirement was that adding a tenant could never become a reason to break an existing one.",
    challenge:
      "Product data had outgrown per-customer databases. Isolation was inconsistent, cost attribution was impossible, and every new tenant triggered bespoke infrastructure work. The architectural question was how to share infrastructure without letting one tenant's behaviour, volume, or a noisy neighbour become a reliability event for everyone else.",
    constraints: [
      {
        title: "Strict tenant isolation",
        body: "A defect in one tenant's data path must not be able to read or corrupt another tenant's data, including during migrations and partial failures.",
      },
      {
        title: "Noisy-neighbour containment",
        body: "One customer's ingestion volume or expensive query must not degrade service for the rest.",
      },
      {
        title: "Per-tenant cost attribution",
        body: "Finance needed attributable cost, which meant metering had to be designed in rather than reconstructed from logs.",
      },
      {
        title: "Ongoing onboarding",
        body: "Adding a tenant had to become a routine operation, not a project.",
      },
    ],
    approach: [
      {
        title: "Made isolation a property of the data path",
        body: "Tenant identity is carried in the schema and enforced at the storage layer, rather than applied as a filter in application queries where a missing predicate becomes a data leak.",
      },
      {
        title: "Bounded resources at every tier",
        body: "Per-tenant concurrency limits, query timeouts, and storage quotas are enforced at the platform boundary, and a tenant that exceeds its budget degrades for itself first.",
      },
      {
        title: "Metered at the point of consumption",
        body: "Ingestion, storage, and query cost are attributed as they occur, so invoices and internal cost questions are answered by the same instrumentation that runs the platform.",
      },
      {
        title: "Turned onboarding into a reviewed template",
        body: "A new tenant is provisioned from a versioned template with an explicit checklist, and the review is where genuine exceptions get examined — not the default path.",
      },
      {
        title: "Migration as a rehearsed operation",
        body: "Moving a tenant between isolation strategies was tested as a routine, reversible procedure with verification at each stage, because it is precisely the kind of change that is safe until it is not.",
      },
    ],
    architecture: {
      caption:
        "Multi-tenant data platform. Tenant identity is enforced in the data path; metering is a first-class concern, not a derived report.",
      layers: [
        {
          name: "Ingest",
          items: ["Per-tenant endpoints", "Schema validation", "Backpressure", "Quotas"],
        },
        {
          name: "Store",
          items: ["Tenant-scoped schemas", "Row-level enforcement", "Tiered storage", "Encryption keys per tenant"],
        },
        {
          name: "Query",
          items: ["Query planner", "Concurrency limits", "Statement timeouts", "Result caching"],
        },
        {
          name: "Meter",
          items: ["Ingestion counters", "Storage accounting", "Query cost model", "Chargeback export"],
        },
        {
          name: "Operate",
          items: ["Per-tenant dashboards", "Isolation alerts", "Migration tooling", "Onboarding templates"],
        },
      ],
    },
    stack: [
      {
        group: "Languages",
        items: ["Go", "TypeScript", "Python", "SQL"],
      },
      {
        group: "Data",
        items: ["PostgreSQL extensions", "Columnar store", "Object storage", "Kafka-compatible log"],
      },
      {
        group: "Infrastructure",
        items: ["Kubernetes", "Terraform", "OpenTelemetry", "Key management"],
      },
    ],
    outcomes: [
      {
        label: "Isolation",
        value: "Enforced in path",
        note: "Tenant scoping lives in the storage layer, so a missing application predicate cannot become a cross-tenant leak.",
      },
      {
        label: "Containment",
        value: "Per-tenant budgets",
        note: "A tenant exceeding its budget degrades for itself first rather than consuming shared capacity.",
      },
      {
        label: "Cost attribution",
        value: "Metered inline",
        note: "Cost data comes from the same instrumentation that runs the platform, not from a reconstruction after the fact.",
      },
      {
        label: "Onboarding",
        value: "Templated",
        note: "Provisioning runs from a versioned template, so genuine exceptions get reviewed instead of becoming the default path.",
      },
    ],
    lessons: [
      "Isolation enforced in application code is isolation that eventually fails; put it in the data path.",
      "Cost attribution is trivial to add on day one and painful to reconstruct a year later — it belongs in the design, not the roadmap.",
      "Making the common case routine is what freed review time for the cases that actually deserved it.",
    ],
    figure: "topology",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export const caseStudySlugs = caseStudies.map((study) => study.slug);
