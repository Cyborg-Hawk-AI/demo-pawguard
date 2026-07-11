import Link from "next/link";
import { ExternalLink, Check, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import research from "@/RESEARCH.json";

const checklistItems = [
  { key: "ten_plus_posts_same_pain", label: "10+ posts with this pain" },
  { key: "paying_for_inferior_solution", label: "Paying for inferior solution" },
  { key: "reachable_channel", label: "Reachable channel" },
  { key: "mvp_under_4_weeks", label: "MVP < 4 weeks" },
  { key: "price_point_high_enough", label: "Price point high enough" },
  { key: "hair_on_fire", label: "Hair-on-fire problem" },
  { key: "can_presell", label: "Can pre-sell" },
  { key: "fewer_than_3_competitors", label: "< 3 competitors" },
  { key: "low_maintenance_ops", label: "Low-maintenance ops (mailbox money)" },
] as const;

export default function ResearchPage() {
  const { idea, pain_points } = research;
  const checklist = idea.checklist;

  return (
    <>
      <Header active="research" />
      <main className="min-h-screen">
        <div className="border-b border-white/5 bg-surface-800/50">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <p className="text-sm font-medium text-paw-400">
              Idea Miner Research · Cluster: {idea.cluster}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              How we found PawGuard
            </h1>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {idea.pitch}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-400">
                Rubric score: {idea.weighted_total}/130
              </span>
              <span className="rounded-full border border-paw-500/30 bg-paw-600/10 px-3 py-1 text-paw-400">
                Validation: {idea.checklist_passed}/9 checks passed
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-400">
                Gate: {idea.gate_result}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16">
          {/* What is PawGuard */}
          <section>
            <h2 className="text-2xl font-bold">What is PawGuard?</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              PawGuard is built for <strong className="text-gray-300">{idea.target_customer}</strong>{" "}
              {idea.unfair_advantage}
            </p>
            <ul className="mt-6 space-y-2">
              {idea.core_features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-paw-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              <strong className="text-gray-400">Pricing:</strong> {idea.price_point}
            </p>
          </section>

          {/* Origin story */}
          <section className="rounded-2xl border border-white/5 bg-surface-700/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">The research: why this exists</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {idea.origin_story}
            </p>
            <div className="mt-6 rounded-lg bg-surface-800/50 p-4">
              <h3 className="text-sm font-semibold text-gray-300">Competitive landscape</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {idea.competitive_landscape}
              </p>
            </div>
            <div className="mt-4 rounded-lg bg-surface-800/50 p-4">
              <h3 className="text-sm font-semibold text-gray-300">Go-to-market</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {idea.gtm_channel}
              </p>
            </div>
          </section>

          {/* Mailbox money */}
          <section className="rounded-2xl border border-paw-500/20 bg-paw-600/5 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">How this business runs itself</h2>
            <p className="mt-2 text-sm text-paw-400">Mailbox money · ~{idea.maintenance_hours_per_week} hours/week owner time</p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {idea.automation_playbook}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-800/50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Agentic automation</h3>
                <p className="mt-2 text-sm text-gray-400">{idea.agentic_automation}</p>
              </div>
              <div className="rounded-lg bg-surface-800/50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">MVP estimate</h3>
                <p className="mt-2 text-sm text-gray-400">{idea.mvp_estimate}</p>
              </div>
            </div>
          </section>

          {/* Validation checklist */}
          <section>
            <h2 className="text-2xl font-bold">
              Validation checklist ({idea.checklist_passed}/9)
            </h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {checklistItems.map((item) => {
                const passed = checklist[item.key as keyof typeof checklist];
                return (
                  <div
                    key={item.key}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      passed
                        ? "border-paw-500/20 bg-paw-600/5"
                        : "border-white/5 bg-surface-800/30"
                    }`}
                  >
                    {passed ? (
                      <Check className="h-4 w-4 shrink-0 text-paw-400" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-gray-600" />
                    )}
                    <span className={`text-sm ${passed ? "text-gray-300" : "text-gray-500"}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Source pain points */}
          <section>
            <h2 className="text-2xl font-bold">Source pain points</h2>
            <p className="mt-2 text-sm text-gray-500">
              Real posts from Reddit, forums, and community sites that informed this idea.
            </p>
            <div className="mt-6 space-y-4">
              {pain_points.slice(0, 10).map((point, i) => (
                <article
                  key={`${point.url}-${i}`}
                  className="rounded-xl border border-white/5 bg-surface-700/30 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-gray-200 leading-snug">
                      {point.title}
                    </h3>
                    <a
                      href={point.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-gray-500 hover:text-paw-400"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  {point.snippet && (
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-4">
                      {point.snippet.replace(/\n/g, " ").slice(0, 400)}
                      {point.snippet.length > 400 ? "…" : ""}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                    <span className="rounded bg-surface-600 px-2 py-0.5">{point.source}</span>
                    <a
                      href={point.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:text-paw-400"
                    >
                      {point.url}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* About Idea Miner */}
          <section className="rounded-2xl border border-white/5 bg-surface-700/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">About this program</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              This demo was auto-built by the <strong className="text-gray-300">Idea Miner</strong> pipeline:
              a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub
              for real people describing real pain, scores the opportunities, and automatically ships a
              working mock of every idea that passes validation (≥8/9 checks, momentum not declining,
              not previously built). The bar for every idea: low-maintenance recurring revenue that a
              solo owner can run in a few hours a week.
            </p>
            <p className="mt-4 text-xs text-gray-600">
              Generated by Idea Miner run 2026-07-10-pm on 2026-07-11 01:05 UTC
            </p>
            <div className="mt-6">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg bg-paw-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-paw-500"
              >
                Explore the interactive demo
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
