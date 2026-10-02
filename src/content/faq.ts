/**
 * Common questions, answered honestly.
 *
 * No claims about client names, revenue, headcount, funding, response times or
 * results that have not been verified. Where the honest answer is "it depends",
 * that is what it says.
 */

export type FaqItem = {
  index: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    index: "01",
    question: "What does KAZES.studio actually do?",
    answer:
      "We are an engineering startup in San Francisco. We embed senior engineers into teams that have a hard technical problem and need it solved properly — software platforms, AI systems, or hardware and embedded. We work inside your repositories and your release process, so what we build stays yours.",
  },
  {
    index: "02",
    question: "Are you a consultancy or a product company?",
    answer:
      "A product company first. We do not run a services catalogue or sell fixed-scope deliverables by the hour. We take on a small number of engagements at a time and staff each one with senior people. That is a deliberate constraint — it is why we can hold a high bar on craft, and why we cannot always take on work immediately.",
  },
  {
    index: "03",
    question: "Do you work with early-stage startups?",
    answer:
      "Yes, where the problem is genuinely technical and the team can make decisions quickly. Early-stage work usually starts as technical discovery so you get a real answer about feasibility and cost before committing engineering time. If we are not the right fit we will say so at that point rather than after an invoice.",
  },
  {
    index: "04",
    question: "What does an engagement cost?",
    answer:
      "We do not publish rates, because the number depends entirely on scope, duration and the seniority required. We will give you a written, itemised proposal before any work begins. If cost is the binding constraint on a project, tell us early — the scope can often be cut to fit a budget without cutting the parts that matter.",
  },
  {
    index: "05",
    question: "Can you work with our existing engineers?",
    answer:
      "That is the normal case. We join your standups, use your repositories and CI, follow your review process, and write the code your team will maintain. The goal is that we become unnecessary. If you want a team that stays permanently external, that is possible, but we will flag honestly when we think it is the wrong structure.",
  },
  {
    index: "06",
    question: "What happens to the code and the knowledge?",
    answer:
      "The code lives in your repositories under your licences, from the first commit. Architecture decisions, runbooks, and handover documentation are part of the deliverable rather than an extra. By the end of an engagement your team should be able to operate what we built without us.",
  },
  {
    index: "07",
    question: "How quickly can you start?",
    answer:
      "It depends on current capacity and on how quickly we can assemble the right team, which is the harder constraint. Tell us your target date when you enquire and we will be straight with you about whether we can meet it. We would rather decline than commit to a date we cannot hold.",
  },
  {
    index: "08",
    question: "Do you take on AI work specifically?",
    answer:
      "Yes — applied AI systems, not research. Retrieval, evaluation harnesses, model-backed product features, inference cost and latency reduction, and the surrounding platform work that keeps those systems running in production. We care more about whether a system is measurably working than about which model happens to be underneath it.",
  },
  {
    index: "09",
    question: "Do you do hardware as well as software?",
    answer:
      "Yes. Custom electronics, embedded firmware, and the cloud services devices depend on. That combination is uncommon, and it is why we can take on products that cross the hardware/software boundary rather than handing off at the seam.",
  },
  {
    index: "10",
    question: "Where are you based, and do you work remotely?",
    answer:
      "San Francisco, California. We work with teams across time zones, and some hardware work benefits from being on site. We do not advertise a physical office address until there is a real one to give you.",
  },
];