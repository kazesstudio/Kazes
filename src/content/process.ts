/**
 * The four-stage engagement method, reused on the homepage and on every
 * service detail page.
 */

export type ProcessStage = {
  index: string;
  title: string;
  summary: string;
  body: string;
  /** Technical annotations rendered as a mono caption under each stage. */
  note: string;
};

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    summary:
      "Understand the business context, technical constraints, users, and desired outcome.",
    body: "We start inside the operation rather than in a workshop. That means talking to the people who do the work, reading the systems as they actually exist, and finding where the friction really comes from — which is rarely where the original brief pointed.",
    note: "constraints / users / success criteria",
  },
  {
    index: "02",
    title: "Design",
    summary:
      "Develop the architecture, define the implementation plan, and validate critical assumptions.",
    body: "We produce an architecture that fits the team that will maintain it, and we test the riskiest assumptions before committing engineering time to them. Decisions are recorded so the reasoning survives after we are gone.",
    note: "architecture / plan / risk register",
  },
  {
    index: "03",
    title: "Build",
    summary:
      "Work directly with your team to engineer, integrate, test, and refine the solution.",
    body: "Short cycles, working software, real integration from the first increment. Our engineers use your repositories, your CI, and your review process — so the result is yours to own rather than ours to hand over.",
    note: "integration / CI / review",
  },
  {
    index: "04",
    title: "Deploy",
    summary:
      "Ship working systems, document the implementation, and support iteration and handover.",
    body: "Deployment includes the unglamorous parts: monitoring, rollback, runbooks, and the handover conversation that leaves your team able to operate what we built without us.",
    note: "monitoring / runbooks / handover",
  },
];

/** Engagement models. Pricing is deliberately absent — scope is discussed. */
export type EngagementModel = {
  title: string;
  summary: string;
  body: string;
  bestFor: string;
  shape: string;
};

export const engagementModels: EngagementModel[] = [
  {
    title: "Embedded Engineer",
    summary:
      "Integrate an engineer into an existing product or engineering team.",
    body: "One senior engineer, working inside your repositories, standups, and release process. Useful when the capability you need is a hybrid of platform, product, and domain knowledge that is hard to hire for and expensive to get wrong.",
    bestFor: "Teams with a clear roadmap and a specific missing capability.",
    shape: "One engineer · ongoing · your tooling",
  },
  {
    title: "Dedicated Engineering Team",
    summary: "Assemble a focused team around a defined technical objective.",
    body: "A small, senior group assembled around one objective — an AI system, a hardware revision, a platform migration. Sized to the objective rather than padded to a headcount, and structured so the knowledge stays with you when the engagement ends.",
    bestFor: "Objectives too large for one person and too specific for a general team.",
    shape: "Small senior team · milestone-based · your environment",
  },
  {
    title: "Project-Based Delivery",
    summary:
      "Build a scoped software, AI, or hardware solution from discovery to deployment.",
    body: "A defined scope, a fixed sequence, and a defined end. Discovery, architecture, build, and deployment against agreed acceptance criteria, with documentation and handover included as part of the deliverable rather than an extra.",
    bestFor: "Known problems that need a working system, not ongoing capacity.",
    shape: "Scoped · fixed sequence · shipped",
  },
  {
    title: "Technical Discovery",
    summary:
      "Assess feasibility, define architecture, and establish a practical implementation roadmap.",
    body: "A short, intensive engagement for teams facing a genuine technical unknown: whether it is feasible, what it would take, and what to do first. You get an architecture, a risk register, and a roadmap — whether or not you engage us to build it.",
    bestFor: "Founders and technical leads deciding whether to commit.",
    shape: "Short · decision-oriented · roadmap",
  },
];
