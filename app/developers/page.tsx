import Link from "next/link";
import {
  Camera,
  Brain,
  Zap,
  Film,
  Bell,
  Server,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: LayoutDashboard,
    title: "Overview Dashboard",
    demoPath: "/demo",
    demoTab: "Overview tab (default)",
    description:
      "Aggregated stats, 7-day behavior detection chart, global sensitivity slider, and quick navigation to other sections.",
    tryIt: "Adjust the Global Sensitivity slider and click Save. Click any quick-link card to jump to Cameras, Behaviors, or Alerts.",
    mocked: "Chart data, detection counts, and inference latency are hardcoded. No real ONNX inference runs.",
    production:
      "FastAPI serves /api/stats aggregating from SQLite alert store. Chart data from /api/stats/daily?days=7. Global sensitivity hot-reloads via config watcher without container restart.",
  },
  {
    icon: Camera,
    title: "RTSP/ONVIF Stream Ingestion",
    demoPath: "/demo",
    demoTab: "Camera Streams tab",
    description:
      "Docker container pulls IP camera streams via RTSP or ONVIF with zero cloud relay. Supports adding, removing, and reconnecting cameras.",
    tryIt: "Click 'Add Camera' to open the form, fill in name and RTSP URL, click Connect. Remove a camera with the trash icon. Reconnect the Hallway camera.",
    mocked: "No actual RTSP streams. Camera previews show placeholder frames. Add/remove only updates React state.",
    production:
      "FFmpeg subprocess per camera defined in config.yaml cameras: block. ONVIF discovery via python-onvif-zeep auto-populates stream URLs. Health checks every 30s with auto-reconnect. Frames fed to ONNX inference pipeline at configurable FPS.",
  },
  {
    icon: Brain,
    title: "Edge AI Behavior Classes",
    demoPath: "/demo",
    demoTab: "Behavior AI tab",
    description:
      "Fine-tuned YOLOv8 ONNX model detects four behavior classes: counter-surfing, destructive chewing, resource guarding, compulsive licking.",
    tryIt: "Toggle behavior classes on/off. Adjust per-class sensitivity sliders. Note detection counts update in the overview.",
    mocked: "Toggles and sliders update local state only. No model inference occurs.",
    production:
      "ONNX Runtime loads yolov8-paw-v2.1.onnx from /models/ inside container. Runs on CPU or Google Coral TPU via config inference.device. Per-class confidence_min thresholds from config.yaml behaviors: section. Model updates ship as new Docker image tags.",
  },
  {
    icon: Zap,
    title: "MQTT & Webhook Dispatch",
    demoPath: "/demo",
    demoTab: "MQTT & Webhooks tab",
    description:
      "Real-time automation dispatch to Home Assistant, smart plugs, speakers, and other MQTT/webhook endpoints on behavior detection.",
    tryIt: "Toggle automations on/off. Click 'Test' on any rule. Pause/resume MQTT bus. View the live MQTT log at the bottom.",
    mocked: "Test buttons show toast notifications. MQTT log is static sample data. No actual MQTT broker connection.",
    production:
      "Paho MQTT client connects to Mosquitto (config mqtt.broker). On detection: publishes to configured topics within <50ms. Webhook rules POST to HA REST API or custom endpoints. Template variables: {{behavior}}, {{confidence}}, {{camera}}, {{timestamp}}.",
  },
  {
    icon: Film,
    title: "Frigate NVR Integration",
    demoPath: "/demo",
    demoTab: "Frigate NVR tab",
    description:
      "Publishes behavior events to Frigate's native MQTT event bus for clip tagging and timeline review.",
    tryIt: "Click 'Preview' on any event to open the clip modal. Click 'Tag' on untagged events. Click 'Open in Frigate' in the modal.",
    mocked: "Clip preview shows placeholder. Tagging updates local state. No Frigate API connection.",
    production:
      "Publishes to frigate/events MQTT topic with type:'pawguard', label:'pawguard:{behavior}', score, and camera. Frigate UI displays custom labels on timeline. Clip IDs reference Frigate's recording API at :5000/api/events/{id}/clip.mp4.",
  },
  {
    icon: Bell,
    title: "Alert History",
    demoPath: "/demo",
    demoTab: "Alert History tab",
    description:
      "Full log of behavior detections with confidence scores, correction actions taken, and status tracking.",
    tryIt: "Search by dog name, behavior, or camera. Filter by status dropdown. Click any row for detail panel. Mark false positive or submit feedback.",
    mocked: "8 hardcoded alerts for dogs Biscuit and Mochi. Search/filter operates on client-side data.",
    production:
      "SQLite database at /data/alerts.db inside container. Retention configurable (default 90 days). REST API: GET /api/alerts?from=&to=&behavior=&status=. False positive feedback queued for quarterly model retraining pipeline.",
  },
  {
    icon: Server,
    title: "System, License & Setup Wizard",
    demoPath: "/demo",
    demoTab: "System & License tab",
    description:
      "Docker container health, license key validation, and self-service YAML configuration wizard.",
    tryIt: "Edit license key and click Validate. Step through the 4-step setup wizard (Pull Image → License → YAML → Verify).",
    mocked: "CPU/memory/inference stats are static. License validation always succeeds with a toast.",
    production:
      "Stripe webhook → key-validation microservice at keys.pawguard.dev. Container validates on startup and daily. Setup wizard mirrors actual docker compose + config.yaml flow. Watchtower or manual pull for model updates.",
  },
];

export default function DevelopersPage() {
  return (
    <>
      <Header active="developers" />
      <main className="min-h-screen">
        <div className="border-b border-white/5 bg-surface-800/50">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight">Developer Documentation</h1>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Every feature in the{" "}
              <Link href="/demo" className="text-paw-400 hover:underline">
                interactive demo
              </Link>{" "}
              is documented below: what it does, where to try it, what&apos;s mocked vs. production,
              and the intended data flow for a real implementation.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-12 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h2 className="text-sm font-semibold text-amber-400">About DEV NOTE tooltips</h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Throughout the demo, amber info icons (<span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-[10px] text-amber-400">i</span>)
              appear beside major controls. Click them for inline production implementation notes.
              This page provides the full reference.
            </p>
          </div>

          <div className="space-y-10">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/5 bg-surface-700/30 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paw-600/15 ring-1 ring-paw-500/20">
                    <feature.icon className="h-5 w-5 text-paw-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-semibold">{feature.title}</h2>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-surface-800/50 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-paw-400">
                      Where to try it
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{feature.demoTab}</p>
                    <Link
                      href={feature.demoPath}
                      className="mt-3 inline-flex items-center gap-1 text-xs text-paw-400 hover:underline"
                    >
                      Open demo <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="rounded-lg bg-surface-800/50 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                      How to interact
                    </h3>
                    <p className="mt-2 text-sm text-gray-300">{feature.tryIt}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-red-500/10 bg-red-500/5 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-red-400">
                      Mocked in demo
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{feature.mocked}</p>
                  </div>
                  <div className="rounded-lg border border-paw-500/10 bg-paw-500/5 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-paw-400">
                      Production implementation
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{feature.production}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Architecture */}
          <section className="mt-16 rounded-2xl border border-white/5 bg-surface-700/30 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Intended Architecture</h2>
            <p className="mt-2 text-sm text-gray-400">
              Data flow for the production PawGuard stack:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-900 p-4 font-mono text-xs text-gray-400 leading-relaxed">
{`IP Cameras (RTSP/ONVIF)
    │
    ▼
┌─────────────────────────────┐
│  PawGuard Docker Container  │
│  ┌─────────┐  ┌──────────┐  │
│  │ FFmpeg  │→ │ ONNX     │  │
│  │ ingest  │  │ YOLOv8   │  │
│  └─────────┘  └────┬─────┘  │
│                    │         │
│  ┌─────────────────▼──────┐ │
│  │ Behavior Classifier    │ │
│  │ (4 classes)            │ │
│  └─────────┬──────────────┘ │
│            │                 │
│  ┌─────────▼──────────────┐ │
│  │ Dispatch Engine        │ │
│  │ MQTT + Webhooks        │ │
│  └─────────┬──────────────┘ │
│            │                 │
│  ┌─────────▼──────────────┐ │
│  │ FastAPI Dashboard :8080│ │
│  │ SQLite alert store     │ │
│  └────────────────────────┘ │
└─────────────┬───────────────┘
              │
    ┌─────────┼──────────┐
    ▼         ▼          ▼
 Mosquitto  Frigate   Home Assistant
 (MQTT)     (clips)   (automations)`}
            </pre>
          </section>

          {/* Tech stack */}
          <section className="mt-10 rounded-2xl border border-white/5 bg-surface-700/30 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">MVP Tech Stack</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>• <strong className="text-gray-300">Runtime:</strong> Python + FastAPI + ONNX Runtime (CPU/Coral TPU)</li>
              <li>• <strong className="text-gray-300">Container:</strong> Docker Compose, image on Docker Hub</li>
              <li>• <strong className="text-gray-300">Model:</strong> YOLOv8 fine-tuned on dog behavior dataset → ONNX export</li>
              <li>• <strong className="text-gray-300">Messaging:</strong> Paho MQTT client + aiohttp webhook dispatcher</li>
              <li>• <strong className="text-gray-300">Storage:</strong> SQLite for alerts, YAML for configuration</li>
              <li>• <strong className="text-gray-300">Payments:</strong> Stripe Checkout → webhook → license key microservice</li>
              <li>• <strong className="text-gray-300">Support:</strong> GitHub Issues + Discord community</li>
              <li>• <strong className="text-gray-300">Updates:</strong> New Docker image tags, opt-in via Watchtower</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Estimated MVP: 3-4 weeks solo dev with pre-trained base model; 6-8 weeks if behavior dataset must be built from scratch.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
