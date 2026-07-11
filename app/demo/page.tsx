"use client";

import { useState, useCallback } from "react";
import {
  LayoutDashboard,
  Camera,
  Brain,
  Zap,
  Film,
  Bell,
  Server,
  Play,
  Pause,
  RefreshCw,
  Plus,
  Trash2,
  Search,
  Filter,
  Tag,
  Wifi,
  WifiOff,
  Activity,
  Cpu,
  HardDrive,
  Key,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DevNote } from "@/components/DevNote";
import { ToastContainer, type ToastMessage } from "@/components/Toast";
import {
  BEHAVIOR_CLASSES,
  CAMERAS,
  ALERTS,
  AUTOMATIONS,
  FRIGATE_EVENTS,
  MQTT_LOG,
  CHART_DATA,
  DOCKER_STATUS,
} from "@/lib/mock-data";

type Tab = "overview" | "cameras" | "behaviors" | "automations" | "frigate" | "alerts" | "system";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "cameras", label: "Camera Streams", icon: Camera },
  { id: "behaviors", label: "Behavior AI", icon: Brain },
  { id: "automations", label: "MQTT & Webhooks", icon: Zap },
  { id: "frigate", label: "Frigate NVR", icon: Film },
  { id: "alerts", label: "Alert History", icon: Bell },
  { id: "system", label: "System & License", icon: Server },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [behaviors, setBehaviors] = useState(BEHAVIOR_CLASSES.map((b) => ({ ...b })));
  const [cameras, setCameras] = useState(CAMERAS.map((c) => ({ ...c })));
  const [automations, setAutomations] = useState(AUTOMATIONS.map((a) => ({ ...a })));
  const [frigateEvents, setFrigateEvents] = useState(FRIGATE_EVENTS.map((e) => ({ ...e })));
  const [alertFilter, setAlertFilter] = useState<string>("all");
  const [alertSearch, setAlertSearch] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [showAddAutomation, setShowAddAutomation] = useState(false);
  const [newCameraUrl, setNewCameraUrl] = useState("");
  const [newCameraName, setNewCameraName] = useState("");
  const [mqttPaused, setMqttPaused] = useState(false);
  const [globalSensitivity, setGlobalSensitivity] = useState(75);
  const [licenseKey, setLicenseKey] = useState(DOCKER_STATUS.license);
  const [showClipModal, setShowClipModal] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState(0);

  const addToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    setToasts((prev) => [...prev, { id: Date.now().toString(), message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleBehavior = (id: string) => {
    setBehaviors((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    );
    const b = behaviors.find((x) => x.id === id);
    addToast(`${b?.name} ${b?.enabled ? "disabled" : "enabled"}`, "info");
  };

  const updateSensitivity = (id: string, value: number) => {
    setBehaviors((prev) =>
      prev.map((b) => (b.id === id ? { ...b, sensitivity: value } : b))
    );
  };

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
    const a = automations.find((x) => x.id === id);
    addToast(`Automation "${a?.name}" ${a?.enabled ? "disabled" : "enabled"}`);
  };

  const testAutomation = (id: string) => {
    const a = automations.find((x) => x.id === id);
    addToast(`Test fired: ${a?.target}`, "info");
  };

  const reconnectCamera = (id: string) => {
    setCameras((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "streaming" as const, fps: 12, lastFrame: "just now" } : c
      )
    );
    addToast("Camera reconnected successfully");
  };

  const removeCamera = (id: string) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
    addToast("Camera removed from ingestion pipeline", "info");
  };

  const addCamera = () => {
    if (!newCameraUrl || !newCameraName) {
      addToast("Please fill in camera name and RTSP URL", "error");
      return;
    }
    setCameras((prev) => [
      ...prev,
      {
        id: `cam-${Date.now()}`,
        name: newCameraName,
        protocol: "RTSP" as const,
        url: newCameraUrl,
        status: "streaming" as const,
        fps: 15,
        resolution: "1920×1080",
        onvif: false,
        lastFrame: "just now",
        detections: 0,
      },
    ]);
    setShowAddCamera(false);
    setNewCameraUrl("");
    setNewCameraName("");
    addToast(`Camera "${newCameraName}" added to ingestion`);
  };

  const tagFrigateClip = (id: string) => {
    setFrigateEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, tagged: true } : e))
    );
    addToast("Clip tagged in Frigate timeline");
  };

  const filteredAlerts = ALERTS.filter((a) => {
    if (alertFilter !== "all" && a.status !== alertFilter) return false;
    if (alertSearch && !a.behavior.toLowerCase().includes(alertSearch.toLowerCase()) &&
        !a.camera.toLowerCase().includes(alertSearch.toLowerCase()) &&
        !a.dog.toLowerCase().includes(alertSearch.toLowerCase())) return false;
    return true;
  });

  const maxChart = Math.max(...CHART_DATA.flatMap((d) => [d.counter, d.chewing, d.guarding, d.licking]));

  return (
    <>
      <Header active="demo" />
      <main className="min-h-screen bg-surface-900">
        <div className="border-b border-white/5 bg-surface-800/50 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">PawGuard Dashboard</h1>
              <p className="text-xs text-gray-500">
                Marcus Chen&apos;s Homelab · 192.168.1.10 · Docker {DOCKER_STATUS.image}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-paw-600/15 px-3 py-1 text-xs font-medium text-paw-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paw-400" />
                Live
              </span>
              <DevNote text="In production, this dashboard is served by the PawGuard FastAPI container on port 8080. Authentication via license key in config YAML." />
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-0 px-4 py-6 sm:px-6">
          {/* Sidebar */}
          <nav className="hidden w-56 shrink-0 pr-6 lg:block">
            <ul className="space-y-1">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-paw-600/20 text-paw-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile tabs */}
          <div className="mb-4 w-full lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="w-full rounded-lg border border-white/10 bg-surface-700 px-3 py-2 text-sm text-gray-200"
            >
              {TABS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {activeTab === "overview" && (
              <OverviewSection
                behaviors={behaviors}
                cameras={cameras}
                maxChart={maxChart}
                globalSensitivity={globalSensitivity}
                setGlobalSensitivity={setGlobalSensitivity}
                addToast={addToast}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "cameras" && (
              <CamerasSection
                cameras={cameras}
                showAddCamera={showAddCamera}
                setShowAddCamera={setShowAddCamera}
                newCameraUrl={newCameraUrl}
                setNewCameraUrl={setNewCameraUrl}
                newCameraName={newCameraName}
                setNewCameraName={setNewCameraName}
                addCamera={addCamera}
                reconnectCamera={reconnectCamera}
                removeCamera={removeCamera}
              />
            )}
            {activeTab === "behaviors" && (
              <BehaviorsSection
                behaviors={behaviors}
                toggleBehavior={toggleBehavior}
                updateSensitivity={updateSensitivity}
              />
            )}
            {activeTab === "automations" && (
              <AutomationsSection
                automations={automations}
                mqttPaused={mqttPaused}
                setMqttPaused={setMqttPaused}
                toggleAutomation={toggleAutomation}
                testAutomation={testAutomation}
                showAddAutomation={showAddAutomation}
                setShowAddAutomation={setShowAddAutomation}
                addToast={addToast}
              />
            )}
            {activeTab === "frigate" && (
              <FrigateSection
                events={frigateEvents}
                tagFrigateClip={tagFrigateClip}
                showClipModal={showClipModal}
                setShowClipModal={setShowClipModal}
              />
            )}
            {activeTab === "alerts" && (
              <AlertsSection
                alerts={filteredAlerts}
                alertFilter={alertFilter}
                setAlertFilter={setAlertFilter}
                alertSearch={alertSearch}
                setAlertSearch={setAlertSearch}
                selectedAlert={selectedAlert}
                setSelectedAlert={setSelectedAlert}
                addToast={addToast}
              />
            )}
            {activeTab === "system" && (
              <SystemSection
                licenseKey={licenseKey}
                setLicenseKey={setLicenseKey}
                wizardStep={wizardStep}
                setWizardStep={setWizardStep}
                addToast={addToast}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Clip preview modal */}
      {showClipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowClipModal(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-surface-800 p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Frigate Clip Preview</h3>
            <p className="mt-1 text-sm text-gray-400">Clip ID: {showClipModal}</p>
            <div className="mt-4 flex aspect-video items-center justify-center rounded-xl bg-surface-900 ring-1 ring-white/10">
              <div className="text-center">
                <Film className="mx-auto h-12 w-12 text-gray-600" />
                <p className="mt-2 text-sm text-gray-500">
                  Mock clip playback — in production, streams from Frigate API at :5000
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setShowClipModal(null)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                Close
              </button>
              <button type="button" onClick={() => { addToast("Opened in Frigate UI"); setShowClipModal(null); }} className="rounded-lg bg-paw-600 px-4 py-2 text-sm font-medium text-white hover:bg-paw-500">
                Open in Frigate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Overview ─── */
function OverviewSection({
  behaviors,
  cameras,
  maxChart,
  globalSensitivity,
  setGlobalSensitivity,
  addToast,
  setActiveTab,
}: {
  behaviors: import("@/lib/mock-data").BehaviorClass[];
  cameras: typeof CAMERAS;
  maxChart: number;
  globalSensitivity: number;
  setGlobalSensitivity: (v: number) => void;
  addToast: (m: string, t?: ToastMessage["type"]) => void;
  setActiveTab: (t: Tab) => void;
}) {
  const totalDetections = behaviors.reduce((s, b) => s + b.detections24h, 0);
  const activeCams = cameras.filter((c) => c.status === "streaming").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Detections (24h)", value: totalDetections, icon: Brain, color: "text-paw-400" },
          { label: "Active Cameras", value: `${activeCams}/${cameras.length}`, icon: Camera, color: "text-blue-400" },
          { label: "Inference Latency", value: "34ms", icon: Activity, color: "text-amber-400" },
          { label: "Automations Fired", value: "156", icon: Zap, color: "text-purple-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="mt-2 text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Behavior Detections — Last 7 Days</h2>
          <DevNote text="Production: aggregated from SQLite alert store inside the Docker container. Exported via /api/stats endpoint." />
        </div>
        <div className="mt-6 flex items-end gap-3 h-40">
          {CHART_DATA.map((d) => {
            const total = d.counter + d.chewing + d.guarding + d.licking;
            return (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col-reverse gap-0.5" style={{ height: "120px" }}>
                  {d.licking > 0 && (
                    <div className="w-full rounded-t bg-purple-500/70" style={{ height: `${(d.licking / maxChart) * 100}%` }} title={`Licking: ${d.licking}`} />
                  )}
                  {d.guarding > 0 && (
                    <div className="w-full bg-amber-500/70" style={{ height: `${(d.guarding / maxChart) * 100}%` }} title={`Guarding: ${d.guarding}`} />
                  )}
                  {d.chewing > 0 && (
                    <div className="w-full bg-red-500/70" style={{ height: `${(d.chewing / maxChart) * 100}%` }} title={`Chewing: ${d.chewing}`} />
                  )}
                  {d.counter > 0 && (
                    <div className="w-full rounded-b bg-paw-500/70" style={{ height: `${(d.counter / maxChart) * 100}%` }} title={`Counter: ${d.counter}`} />
                  )}
                </div>
                <span className="text-[10px] text-gray-500">{d.day}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-paw-500" /> Counter Surfing</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" /> Chewing</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Guarding</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-500" /> Licking</span>
        </div>
      </div>

      {/* Global sensitivity */}
      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-6">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Global Sensitivity</h2>
          <DevNote text="Production: scales all per-class thresholds uniformly. Stored in config.yaml as global_sensitivity: 0.0-1.0. Hot-reloaded without container restart." />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={globalSensitivity}
            onChange={(e) => setGlobalSensitivity(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-surface-600 accent-paw-500"
          />
          <span className="w-12 text-right font-mono text-sm text-paw-400">{globalSensitivity}%</span>
          <button
            type="button"
            onClick={() => addToast(`Global sensitivity saved at ${globalSensitivity}%`)}
            className="rounded-lg bg-paw-600/20 px-3 py-1.5 text-xs font-medium text-paw-400 hover:bg-paw-600/30"
          >
            Save
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { tab: "cameras" as Tab, label: "Manage Cameras", desc: `${cameras.length} streams configured` },
          { tab: "behaviors" as Tab, label: "Tune Behaviors", desc: `${behaviors.filter((b) => b.enabled).length} classes active` },
          { tab: "alerts" as Tab, label: "Review Alerts", desc: `${ALERTS.length} events logged` },
        ].map((link) => (
          <button
            key={link.tab}
            type="button"
            onClick={() => setActiveTab(link.tab)}
            className="rounded-xl border border-white/5 bg-surface-700/50 p-4 text-left transition-colors hover:border-paw-500/20 hover:bg-surface-700"
          >
            <div className="font-medium text-gray-200">{link.label}</div>
            <div className="mt-1 text-xs text-gray-500">{link.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Cameras ─── */
function CamerasSection({
  cameras,
  showAddCamera,
  setShowAddCamera,
  newCameraUrl,
  setNewCameraUrl,
  newCameraName,
  setNewCameraName,
  addCamera,
  reconnectCamera,
  removeCamera,
}: {
  cameras: typeof CAMERAS;
  showAddCamera: boolean;
  setShowAddCamera: (v: boolean) => void;
  newCameraUrl: string;
  setNewCameraUrl: (v: string) => void;
  newCameraName: string;
  setNewCameraName: (v: string) => void;
  addCamera: () => void;
  reconnectCamera: (id: string) => void;
  removeCamera: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">RTSP/ONVIF Camera Streams</h2>
          <p className="text-sm text-gray-500">Docker container ingests streams with zero cloud relay</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddCamera(!showAddCamera)}
          className="flex items-center gap-1.5 rounded-lg bg-paw-600 px-3 py-2 text-sm font-medium text-white hover:bg-paw-500"
        >
          <Plus className="h-4 w-4" />
          Add Camera
          <DevNote text="Production: FFmpeg pulls RTSP/ONVIF streams defined in config.yaml cameras: section. ONVIF discovery auto-populates stream URLs." />
        </button>
      </div>

      {showAddCamera && (
        <div className="rounded-xl border border-paw-500/30 bg-surface-700/50 p-4">
          <h3 className="text-sm font-semibold">Add RTSP Camera</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Camera name (e.g. Garage — Reolink)"
              value={newCameraName}
              onChange={(e) => setNewCameraName(e.target.value)}
              className="rounded-lg border border-white/10 bg-surface-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600"
            />
            <input
              type="text"
              placeholder="rtsp://192.168.1.x:554/stream"
              value={newCameraUrl}
              onChange={(e) => setNewCameraUrl(e.target.value)}
              className="rounded-lg border border-white/10 bg-surface-800 px-3 py-2 text-sm font-mono text-gray-200 placeholder:text-gray-600"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={addCamera} className="rounded-lg bg-paw-600 px-4 py-2 text-sm font-medium text-white hover:bg-paw-500">
              Connect Stream
            </button>
            <button type="button" onClick={() => setShowAddCamera(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:bg-white/5">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {cameras.map((cam) => (
          <div key={cam.id} className="rounded-xl border border-white/5 bg-surface-700/50 overflow-hidden">
            <div className="relative aspect-video bg-surface-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-surface-800 to-surface-900" />
              <div className="relative text-center">
                <Camera className="mx-auto h-8 w-8 text-gray-600" />
                <p className="mt-2 text-xs text-gray-500 font-mono">{cam.resolution} @ {cam.fps}fps</p>
              </div>
              <div className={`absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                cam.status === "streaming" ? "bg-paw-600/30 text-paw-400" : "bg-amber-600/30 text-amber-400"
              }`}>
                {cam.status === "streaming" ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {cam.status}
              </div>
              <div className="absolute top-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-gray-300">
                {cam.lastFrame}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium">{cam.name}</h3>
                  <p className="mt-0.5 text-[10px] font-mono text-gray-500 truncate max-w-[200px]">{cam.url}</p>
                </div>
                <span className="rounded bg-surface-600 px-1.5 py-0.5 text-[10px] text-gray-400">{cam.protocol}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <span>{cam.detections} detections today</span>
                {cam.onvif && <span className="text-blue-400">ONVIF</span>}
              </div>
              <div className="mt-3 flex gap-2">
                {cam.status !== "streaming" && (
                  <button type="button" onClick={() => reconnectCamera(cam.id)} className="flex items-center gap-1 rounded-lg bg-paw-600/20 px-2.5 py-1.5 text-xs text-paw-400 hover:bg-paw-600/30">
                    <RefreshCw className="h-3 w-3" /> Reconnect
                  </button>
                )}
                <button type="button" onClick={() => removeCamera(cam.id)} className="flex items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-600/20">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Behaviors ─── */
function BehaviorsSection({
  behaviors,
  toggleBehavior,
  updateSensitivity,
}: {
  behaviors: { id: string; name: string; description: string; icon: string; enabled: boolean; sensitivity: number; detections24h: number; lastTriggered: string }[];
  toggleBehavior: (id: string) => void;
  updateSensitivity: (id: string, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Edge AI Behavior Classes</h2>
        <p className="text-sm text-gray-500">YOLOv8 fine-tuned ONNX model — runs locally on CPU or Coral TPU</p>
      </div>
      <div className="space-y-4">
        {behaviors.map((b) => (
          <div key={b.id} className={`rounded-xl border p-5 transition-colors ${
            b.enabled ? "border-white/5 bg-surface-700/50" : "border-white/5 bg-surface-800/50 opacity-60"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{b.name}</h3>
                    <DevNote text={`Production: class "${b.id}" maps to ONNX output node. Threshold from config behaviors.${b.id}.confidence_min. Model weights ship in Docker image at /models/yolov8-paw-v2.1.onnx.`} />
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">{b.description}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleBehavior(b.id)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  b.enabled ? "bg-paw-600" : "bg-surface-600"
                }`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  b.enabled ? "left-[22px]" : "left-0.5"
                }`} />
              </button>
            </div>
            {b.enabled && (
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs text-gray-500 w-20">Sensitivity</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={b.sensitivity}
                  onChange={(e) => updateSensitivity(b.id, Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-surface-600 accent-paw-500"
                />
                <span className="w-10 text-right font-mono text-xs text-paw-400">{b.sensitivity}%</span>
              </div>
            )}
            <div className="mt-3 flex gap-4 text-xs text-gray-500">
              <span>{b.detections24h} detections (24h)</span>
              <span>Last: {new Date(b.lastTriggered).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Automations ─── */
function AutomationsSection({
  automations,
  mqttPaused,
  setMqttPaused,
  toggleAutomation,
  testAutomation,
  showAddAutomation,
  setShowAddAutomation,
  addToast,
}: {
  automations: typeof AUTOMATIONS;
  mqttPaused: boolean;
  setMqttPaused: (v: boolean) => void;
  toggleAutomation: (id: string) => void;
  testAutomation: (id: string) => void;
  showAddAutomation: boolean;
  setShowAddAutomation: (v: boolean) => void;
  addToast: (m: string, t?: ToastMessage["type"]) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">MQTT & Webhook Automations</h2>
          <p className="text-sm text-gray-500">Real-time dispatch to Home Assistant, smart plugs, and speakers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setMqttPaused(!mqttPaused); addToast(mqttPaused ? "MQTT dispatch resumed" : "MQTT dispatch paused", "info"); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${
              mqttPaused ? "bg-amber-600/20 text-amber-400" : "bg-paw-600/20 text-paw-400"
            }`}
          >
            {mqttPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {mqttPaused ? "Resume" : "Pause"} MQTT
          </button>
          <button
            type="button"
            onClick={() => setShowAddAutomation(!showAddAutomation)}
            className="flex items-center gap-1.5 rounded-lg bg-paw-600 px-3 py-2 text-sm font-medium text-white hover:bg-paw-500"
          >
            <Plus className="h-4 w-4" /> Add Rule
          </button>
        </div>
      </div>

      {showAddAutomation && (
        <div className="rounded-xl border border-paw-500/30 bg-surface-700/50 p-4">
          <h3 className="text-sm font-semibold">New Automation Rule</h3>
          <p className="mt-1 text-xs text-gray-500">Configure in production via config.yaml automations: block</p>
          <button
            type="button"
            onClick={() => { setShowAddAutomation(false); addToast("Automation rule saved to config.yaml"); }}
            className="mt-3 rounded-lg bg-paw-600 px-4 py-2 text-sm font-medium text-white hover:bg-paw-500"
          >
            Save Rule (Mock)
          </button>
        </div>
      )}

      <div className="space-y-3">
        {automations.map((auto) => (
          <div key={auto.id} className={`rounded-xl border border-white/5 p-4 ${!auto.enabled ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{auto.name}</h3>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                    auto.action === "mqtt" ? "bg-blue-600/20 text-blue-400" : "bg-purple-600/20 text-purple-400"
                  }`}>
                    {auto.action}
                  </span>
                  <DevNote text={`Production: on detection match, PawGuard publishes to MQTT broker at ${auto.target} or POSTs to webhook. Latency target <50ms from frame to dispatch.`} />
                </div>
                <p className="mt-1 font-mono text-[10px] text-gray-500">{auto.target}</p>
                <p className="mt-0.5 font-mono text-[10px] text-gray-600">{auto.payload}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => testAutomation(auto.id)} className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-gray-400 hover:bg-white/5">
                  Test
                </button>
                <button
                  type="button"
                  onClick={() => toggleAutomation(auto.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${auto.enabled ? "bg-paw-600" : "bg-surface-600"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${auto.enabled ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
            <div className="mt-2 flex gap-4 text-[10px] text-gray-500">
              <span>Trigger: {auto.trigger}</span>
              <span>Fired {auto.fireCount}×</span>
              <span>Last: {new Date(auto.lastFired).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MQTT Log */}
      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Live MQTT Bus</h3>
          <DevNote text="Production: PawGuard connects to your Mosquitto broker (config mqtt.broker: host:port). Subscribes to frigate/# for snapshot sync. Publishes to pawguard/detections and configured automation topics." />
        </div>
        <div className="mt-3 max-h-48 overflow-y-auto font-mono text-[11px]">
          {MQTT_LOG.map((entry, i) => (
            <div key={i} className="flex gap-2 border-b border-white/5 py-1.5 last:border-0">
              <span className="text-gray-600 w-16 shrink-0">{entry.time}</span>
              <span className={`w-8 shrink-0 ${entry.direction === "out" ? "text-paw-400" : "text-blue-400"}`}>
                {entry.direction === "out" ? "OUT" : "IN"}
              </span>
              <span className="text-gray-400 truncate">{entry.topic}</span>
              <span className="text-gray-600 truncate">{entry.payload}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Frigate ─── */
function FrigateSection({
  events,
  tagFrigateClip,
  showClipModal,
  setShowClipModal,
}: {
  events: typeof FRIGATE_EVENTS;
  tagFrigateClip: (id: string) => void;
  showClipModal: string | null;
  setShowClipModal: (id: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Frigate NVR Integration</h2>
        <p className="text-sm text-gray-500">Native MQTT event bus for clip tagging and timeline review</p>
      </div>

      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-paw-400 animate-pulse" />
          Connected to Frigate MQTT at 192.168.1.10:1883
          <DevNote text="Production: PawGuard publishes to frigate/events with type:'pawguard' and label:'pawguard:{behavior}'. Frigate UI shows these as custom event labels on the timeline. No Frigate config changes required." />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-surface-800/50 text-left text-xs text-gray-500">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Camera</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Tagged</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(ev.timestamp).toLocaleString()}</td>
                <td className="px-4 py-3">{ev.camera}</td>
                <td className="px-4 py-3 font-mono text-xs text-paw-400">{ev.label}</td>
                <td className="px-4 py-3">{(ev.score * 100).toFixed(0)}%</td>
                <td className="px-4 py-3 text-gray-500">{ev.duration}</td>
                <td className="px-4 py-3">
                  {ev.tagged ? (
                    <span className="rounded bg-paw-600/20 px-2 py-0.5 text-[10px] text-paw-400">Tagged</span>
                  ) : (
                    <span className="rounded bg-gray-600/20 px-2 py-0.5 text-[10px] text-gray-500">Untagged</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowClipModal(ev.clipId)}
                      className="rounded px-2 py-1 text-[10px] text-gray-400 hover:bg-white/5"
                    >
                      Preview
                    </button>
                    {!ev.tagged && (
                      <button
                        type="button"
                        onClick={() => tagFrigateClip(ev.id)}
                        className="flex items-center gap-0.5 rounded px-2 py-1 text-[10px] text-paw-400 hover:bg-paw-600/10"
                      >
                        <Tag className="h-3 w-3" /> Tag
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Alerts ─── */
function AlertsSection({
  alerts,
  alertFilter,
  setAlertFilter,
  alertSearch,
  setAlertSearch,
  selectedAlert,
  setSelectedAlert,
  addToast,
}: {
  alerts: typeof ALERTS;
  alertFilter: string;
  setAlertFilter: (v: string) => void;
  alertSearch: string;
  setAlertSearch: (v: string) => void;
  selectedAlert: string | null;
  setSelectedAlert: (v: string | null) => void;
  addToast: (m: string, t?: ToastMessage["type"]) => void;
}) {
  const selected = alerts.find((a) => a.id === selectedAlert);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Alert History</h2>
          <p className="text-sm text-gray-500">{alerts.length} events · Biscuit & Mochi</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={alertSearch}
              onChange={(e) => setAlertSearch(e.target.value)}
              className="rounded-lg border border-white/10 bg-surface-700 py-1.5 pl-8 pr-3 text-sm text-gray-200 placeholder:text-gray-600"
            />
          </div>
          <div className="relative">
            <select
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value)}
              className="appearance-none rounded-lg border border-white/10 bg-surface-700 py-1.5 pl-3 pr-8 text-sm text-gray-200"
            >
              <option value="all">All statuses</option>
              <option value="corrected">Corrected</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="false_positive">False positive</option>
            </select>
            <Filter className="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 text-gray-500" />
          </div>
          <DevNote text="Production: alerts stored in SQLite at /data/alerts.db inside container. Retention configurable via config.yaml. Export via /api/alerts?from=&to=." />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-surface-800/50 text-left text-xs text-gray-500">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Behavior</th>
              <th className="px-4 py-3">Dog</th>
              <th className="px-4 py-3">Camera</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Action Taken</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                onClick={() => setSelectedAlert(alert.id)}
                className={`cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                  selectedAlert === alert.id ? "bg-paw-600/5" : ""
                }`}
              >
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium">{alert.behavior}</td>
                <td className="px-4 py-3">{alert.dog}</td>
                <td className="px-4 py-3 text-xs text-gray-400 max-w-[140px] truncate">{alert.camera}</td>
                <td className="px-4 py-3">{(alert.confidence * 100).toFixed(0)}%</td>
                <td className="px-4 py-3 text-xs text-gray-400 max-w-[180px] truncate">{alert.action}</td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                    alert.status === "corrected" ? "bg-paw-600/20 text-paw-400" :
                    alert.status === "false_positive" ? "bg-red-600/20 text-red-400" :
                    "bg-amber-600/20 text-amber-400"
                  }`}>
                    {alert.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="rounded-xl border border-paw-500/20 bg-surface-700/50 p-5">
          <h3 className="font-semibold">Alert Detail — {selected.id}</h3>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div><span className="text-gray-500">Behavior:</span> {selected.behavior}</div>
            <div><span className="text-gray-500">Dog:</span> {selected.dog}</div>
            <div><span className="text-gray-500">Camera:</span> {selected.camera}</div>
            <div><span className="text-gray-500">Confidence:</span> {(selected.confidence * 100).toFixed(1)}%</div>
            <div className="sm:col-span-2"><span className="text-gray-500">Action:</span> {selected.action}</div>
            <div><span className="text-gray-500">Frigate Clip:</span> <span className="font-mono text-xs text-paw-400">{selected.frigateClip}</span></div>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => addToast("Marked as false positive — model will learn")} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/5">
              Mark False Positive
            </button>
            <button type="button" onClick={() => addToast("Feedback submitted for model retraining")} className="rounded-lg bg-paw-600/20 px-3 py-1.5 text-xs text-paw-400 hover:bg-paw-600/30">
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── System ─── */
function SystemSection({
  licenseKey,
  setLicenseKey,
  wizardStep,
  setWizardStep,
  addToast,
}: {
  licenseKey: string;
  setLicenseKey: (v: string) => void;
  wizardStep: number;
  setWizardStep: (v: number) => void;
  addToast: (m: string, t?: ToastMessage["type"]) => void;
}) {
  const wizardSteps = ["Pull Image", "Enter License", "Configure YAML", "Verify Streams"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">System & License</h2>
        <p className="text-sm text-gray-500">Docker container status and license validation</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Cpu className="h-4 w-4" /> CPU Usage
          </div>
          <div className="mt-2 text-2xl font-bold">{DOCKER_STATUS.cpu}%</div>
          <div className="mt-2 h-1.5 rounded-full bg-surface-600">
            <div className="h-full rounded-full bg-paw-500" style={{ width: `${DOCKER_STATUS.cpu}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <HardDrive className="h-4 w-4" /> Memory
          </div>
          <div className="mt-2 text-2xl font-bold">{DOCKER_STATUS.memory} GB</div>
          <div className="mt-2 h-1.5 rounded-full bg-surface-600">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${(DOCKER_STATUS.memory / DOCKER_STATUS.memoryMax) * 100}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-700/50 p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Activity className="h-4 w-4" /> Inference
          </div>
          <div className="mt-2 text-2xl font-bold">{DOCKER_STATUS.inferenceMs}ms</div>
          <div className="mt-1 text-xs text-gray-500">{DOCKER_STATUS.model}</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-5">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-paw-400" />
          <h3 className="font-semibold">License Key</h3>
          <DevNote text="Production: Stripe webhook creates license in key-validation microservice. Container calls https://keys.pawguard.dev/validate on startup. Perpetual keys never expire; annual keys checked against Stripe subscription status." />
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-surface-800 px-3 py-2 font-mono text-sm text-gray-200"
          />
          <button
            type="button"
            onClick={() => addToast("License validated — perpetual, active")}
            className="rounded-lg bg-paw-600 px-4 py-2 text-sm font-medium text-white hover:bg-paw-500"
          >
            Validate
          </button>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-gray-500">
          <span>Type: {DOCKER_STATUS.licenseType}</span>
          <span>Image: {DOCKER_STATUS.image}</span>
          <span>Uptime: {DOCKER_STATUS.uptime}</span>
        </div>
      </div>

      {/* Setup wizard */}
      <div className="rounded-xl border border-white/5 bg-surface-700/50 p-5">
        <h3 className="font-semibold">Quick Setup Wizard</h3>
        <p className="mt-1 text-sm text-gray-500">Self-configure via YAML — no onboarding call needed</p>
        <div className="mt-4 flex gap-2">
          {wizardSteps.map((step, i) => (
            <button
              key={step}
              type="button"
              onClick={() => setWizardStep(i)}
              className={`flex-1 rounded-lg py-2 text-center text-xs font-medium transition-colors ${
                i === wizardStep
                  ? "bg-paw-600/20 text-paw-400 ring-1 ring-paw-500/30"
                  : i < wizardStep
                  ? "bg-paw-600/10 text-paw-500"
                  : "bg-surface-600/50 text-gray-500"
              }`}
            >
              {i + 1}. {step}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-surface-900 p-4 font-mono text-xs text-gray-400">
          {wizardStep === 0 && (
            <pre>{`docker pull pawguard/pawguard:2.1.0\ndocker compose up -d`}</pre>
          )}
          {wizardStep === 1 && (
            <pre>{`# config.yaml\nlicense_key: "${licenseKey}"`}</pre>
          )}
          {wizardStep === 2 && (
            <pre>{`cameras:\n  - name: kitchen\n    url: rtsp://192.168.1.42:554/stream\nmqtt:\n  broker: 192.168.1.10:1883\nbehaviors:\n  counter-surfing:\n    enabled: true\n    confidence_min: 0.72`}</pre>
          )}
          {wizardStep === 3 && (
            <pre>{`# Verify all streams connected\ncurl http://localhost:8080/api/health\n# → {"status":"ok","cameras":4,"inference_ms":34}`}</pre>
          )}
        </div>
        <div className="mt-3 flex justify-between">
          <button
            type="button"
            disabled={wizardStep === 0}
            onClick={() => setWizardStep(wizardStep - 1)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 hover:bg-white/5 disabled:opacity-30"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              if (wizardStep < wizardSteps.length - 1) {
                setWizardStep(wizardStep + 1);
              } else {
                addToast("Setup complete — PawGuard is running!");
              }
            }}
            className="rounded-lg bg-paw-600 px-4 py-2 text-sm font-medium text-white hover:bg-paw-500"
          >
            {wizardStep < wizardSteps.length - 1 ? "Next" : "Finish Setup"}
          </button>
        </div>
      </div>
    </div>
  );
}
