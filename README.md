# PawGuard

> Local AI catches your dog misbehaving and triggers smart-home corrections instantly.

## What is PawGuard?

PawGuard is built for **Home Assistant / Frigate power users who own dogs and have existing IP camera infrastructure, frustrated by cloud-locked pet cams with delayed alerts and monthly fees for video storage.**. Behavior-specific fine-tuned model weights (not just 'dog detected') combined with native Frigate/HA integration means it slots into existing infrastructure without replacing anything — it augments the stack these users already run.

### Core MVP features
- RTSP/ONVIF stream ingestion via Docker container with zero cloud dependency
- Edge AI model fine-tuned for dog behavior classes: counter-surfing, destructive chewing, resource guarding, compulsive licking
- Real-time webhook and MQTT dispatch to Home Assistant automations, smart plugs, and speakers
- Frigate NVR integration via native MQTT event bus for clip tagging and timeline review
- Web UI dashboard for sensitivity tuning, behavior class toggles, and alert history

**Pricing:** Annual subscription with optional one-time perpetual license tier at $39/year (subscription) or $79 one-time perpetual license — one-time resonates better with self-hosters who reject recurring fees

## The research: why this exists

The user identified a real gap: self-hosted homelab enthusiasts running Frigate and Home Assistant have sophisticated camera infrastructure but no purpose-built tool for dog behavior correction — only generic 'dog detected' events. Evidence from r/homeassistant and r/selfhosted confirms this community is large, technically capable, and deeply motivated to avoid cloud lock-in (multiple threads explicitly rejecting Furbo/Wyze/Ring). However, the evidence also shows these users are highly DIY-oriented and will attempt to build this themselves with Frigate's existing detection hooks before paying. The opportunity is real but narrow: the product must be so polished and behavior-accurate that it saves meaningful setup time versus a custom HA automation.

**Cluster:** user-submitted | **Rubric score:** 44/130 | **Validation:** 5/9 checks passed

**Competitive landscape:** Furbo, Eufy Pet, Wyze are cloud-locked consumer products. Frigate itself does generic object detection (person, dog, cat) but has no behavior-class inference or correction dispatch. No direct competitor exists in the self-hosted behavior-specific dog correction space — the gap is real but small.

**Go-to-market:** r/homeassistant, r/selfhosted, r/homelab, r/dogs subreddits; Home Assistant community forums; YouTube homelab/HA tutorial creators; GitHub repo with free community tier to build trust

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

Stripe handles payments and sends license keys via webhook to a lightweight key-validation microservice. Users pull the Docker image, enter their key, and self-configure via YAML — no onboarding call needed. GitHub Issues and a Discord server handle 90% of support socially (community helps community). Model updates ship as new Docker image tags; users opt-in via Watchtower or manual pull. Monthly MRR reporting via Stripe dashboard requires zero manual work. Estimated owner hours per week: 2-3.

**Estimated owner time:** ~3 hour(s)/week

**MVP estimate:** Python + FastAPI + ONNX Runtime (CPU/Coral TPU) + Docker Compose; YOLOv8 fine-tuned on dog behavior dataset; MQTT publisher + webhook dispatcher. 3-4 weeks solo dev if pre-trained base model is available; 6-8 weeks if behavior dataset must be built from scratch.

## Validation checklist (5/9)
- [ ] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [ ] MVP < 4 weeks
- [ ] Price point high enough
- [ ] Hair-on-fire problem
- [x] Can pre-sell
- [x] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### 
- **Persona:** 
- **Workaround:** 
- **Frequency:** 
- **WTP signal:** 
- **Source:** https://selfhostedworld.com/software/frigate

### 
- **Persona:** 
- **Workaround:** 
- **Frequency:** 
- **WTP signal:** 
- **Source:** https://www.reddit.com/r/homeassistant/comments/10ddye2/ideas_for_home_security_camera_self_hosted/

### 
- **Persona:** 
- **Workaround:** 
- **Frequency:** 
- **WTP signal:** 
- **Source:** https://www.reddit.com/r/selfhosted/comments/19emttc/is_there_a_reasonable_selfhosted_absolutely_cloud/kjdnr2d/

### 
- **Persona:** 
- **Workaround:** 
- **Frequency:** 
- **WTP signal:** 
- **Source:** https://www.reddit.com/r/homelab/comments/1p2gl78/local_ainvr_box_for_home_assistant_frigate/

### 
- **Persona:** 
- **Workaround:** 
- **Frequency:** 
- **WTP signal:** 
- **Source:** https://www.reddit.com/r/selfhosted/comments/19emttc/is_there_a_reasonable_selfhosted_absolutely_cloud/kjdnr2d/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-10-pm on 2026-07-11 01:05 UTC_


## Local development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (required before deploy)
npm start      # serve production build locally
```

### Project structure

```
app/
  page.tsx          # Landing page (hero, features, pricing)
  demo/page.tsx     # Interactive product mock dashboard
  developers/       # Feature documentation for reviewers
  research/         # Research story and validation results
components/         # Header, Footer, DevNote tooltips, Toast
lib/mock-data.ts    # Hardcoded demo data (no backend)
```

### Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page with pricing and CTA |
| `/demo` | Full interactive dashboard — cameras, behaviors, MQTT, Frigate, alerts |
| `/developers` | Per-feature docs: what's mocked vs. production, data flows |
| `/research` | Origin story, validation checklist, source pain points |

### Deploy to Vercel

Zero configuration required — no environment variables, no custom server:

1. Push this directory to a Git repository
2. Import the repo in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

Or use the Vercel CLI:

```bash
npx vercel
```

### Tech stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data:** Client-side mock data only (no API, no database, no auth)
