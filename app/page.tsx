import Link from "next/link";
import {
  Shield,
  Camera,
  Brain,
  Radio,
  Film,
  Settings,
  Check,
  ArrowRight,
  Server,
  Zap,
  Lock,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Camera,
    title: "RTSP/ONVIF Ingestion",
    description:
      "Pull streams from your existing IP cameras via Docker. Zero cloud relay, zero subscription for video storage.",
  },
  {
    icon: Brain,
    title: "Behavior-Class AI",
    description:
      "Fine-tuned YOLOv8 detects counter-surfing, destructive chewing, resource guarding, and compulsive licking — not just 'dog detected'.",
  },
  {
    icon: Radio,
    title: "MQTT & Webhook Dispatch",
    description:
      "Fire Home Assistant automations, smart plugs, and speakers within milliseconds of a behavior event.",
  },
  {
    icon: Film,
    title: "Frigate Integration",
    description:
      "Tag clips on Frigate's MQTT event bus for timeline review. Augments your NVR without replacing it.",
  },
  {
    icon: Settings,
    title: "Tuning Dashboard",
    description:
      "Per-behavior sensitivity sliders, class toggles, and full alert history — all in a local web UI.",
  },
  {
    icon: Server,
    title: "Self-Hosted Docker",
    description:
      "One container, YAML config, license key validation. No onboarding call. No cloud inference API.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header active="home" />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-paw-900/30 via-surface-900 to-surface-900" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmM1NWUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paw-500/30 bg-paw-600/10 px-4 py-1.5 text-sm text-paw-400">
                <Zap className="h-3.5 w-3.5" />
                Built for Frigate + Home Assistant homelabs
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Local AI catches your dog{" "}
                <span className="gradient-text">misbehaving</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-400">
                PawGuard runs on your hardware, detects behavior-specific events
                from your existing IP cameras, and triggers smart-home corrections
                instantly — no cloud lock-in, no monthly video storage fees.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-paw-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-paw-600/20 transition-all hover:bg-paw-500 hover:shadow-paw-500/30"
                >
                  Explore Live Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-gray-200 transition-colors hover:bg-white/10"
                >
                  Developer Docs
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-paw-500" />
                  100% local inference
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-paw-500" />
                  ONNX on CPU/Coral TPU
                </span>
                <span className="flex items-center gap-1.5">
                  <Server className="h-4 w-4 text-paw-500" />
                  Docker Compose ready
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-white/5 bg-surface-800/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Augments your stack — doesn&apos;t replace it
              </h2>
              <p className="mt-4 text-gray-400">
                You already run Frigate and Home Assistant. PawGuard slots in
                with native MQTT integration and behavior-specific model weights.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/5 bg-surface-700/50 p-6 transition-all hover:border-paw-500/20 hover:bg-surface-700"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-paw-600/15 ring-1 ring-paw-500/20 transition-colors group-hover:bg-paw-600/25">
                    <feature.icon className="h-5 w-5 text-paw-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof / target */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-surface-700/80 to-surface-800/80 p-8 sm:p-12 glow-paw">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Built for homelab enthusiasts who reject cloud pet cams
                  </h2>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    Furbo, Wyze, and Ring lock you into cloud storage with delayed
                    alerts. Frigate gives you generic &ldquo;dog detected&rdquo; events.
                    PawGuard bridges the gap with behavior-class inference and
                    instant correction dispatch.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "34ms", label: "Avg inference latency" },
                    { stat: "4", label: "Behavior classes" },
                    { stat: "0", label: "Cloud API calls" },
                    { stat: "2-3h", label: "Owner hours/week" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/5 bg-surface-900/50 p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-paw-400">
                        {item.stat}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-white/5 bg-surface-800/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Pricing that respects self-hosters
              </h2>
              <p className="mt-4 text-gray-400">
                No per-camera fees. No cloud storage upsells. One license, unlimited
                local streams.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-surface-700/50 p-8">
                <h3 className="text-lg font-semibold text-gray-200">
                  Annual Subscription
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$39</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Includes model updates for 12 months
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Unlimited camera streams",
                    "All behavior classes",
                    "MQTT + webhook dispatch",
                    "Frigate clip tagging",
                    "Community Discord support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="h-4 w-4 shrink-0 text-paw-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10"
                >
                  Subscribe — Stripe Checkout
                </button>
              </div>
              <div className="relative rounded-2xl border border-paw-500/40 bg-surface-700/50 p-8 ring-1 ring-paw-500/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-paw-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most popular with homelabbers
                </div>
                <h3 className="text-lg font-semibold text-gray-200">
                  Perpetual License
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-500">one-time</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Pay once, run forever. Model v2.1 included.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Everything in Annual",
                    "No recurring fees — ever",
                    "Lifetime license key",
                    "Opt-in model updates via Docker tags",
                    "GitHub Issues priority",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="h-4 w-4 shrink-0 text-paw-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-8 w-full rounded-xl bg-paw-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-paw-500"
                >
                  Buy Perpetual — Stripe Checkout
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-2xl bg-gradient-to-r from-paw-800/40 to-emerald-900/30 p-12 text-center ring-1 ring-paw-500/20">
              <h2 className="text-3xl font-bold">
                See PawGuard in action
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Explore the full interactive dashboard with mock camera streams,
                behavior detection, MQTT dispatch, and Frigate integration.
              </p>
              <Link
                href="/demo"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-paw-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-paw-500"
              >
                Launch Interactive Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
