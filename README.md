# Gogma Tracker

A web application for Monster Hunter Wilds players to track their Gogmazios armor skill rolls and calculate success rates for specific skill combinations.

## Features

- **Create Tracking Sessions**: Set up tracking sessions by selecting a weapon type and target skill combination (Set Bonus Skill + Group Skill)
- **Swipe-based Roll Tracking**: Tinder-style card interface for quickly logging roll results - swipe right for hits, left for misses
- **Real-time Statistics**: View success rates, total rolls, and hit counts as you track
- **Persistent Storage**: All session data is saved to localStorage, so your progress persists across browser sessions
- **Multiple Sessions**: Track different weapon/skill combinations simultaneously
- **Session Management**: Delete individual sessions or clear all data

## Tech Stack

- **Framework**: [SolidJS](https://solidjs.com) - A reactive UI library
- **Routing**: [@solidjs/router](https://github.com/solidjs/solid-router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4 + [DaisyUI](https://daisyui.com) v5
- **Icons**: [Lucide](https://lucide.dev) (lucide-solid)
- **Storage**: [@solid-primitives/storage](https://github.com/solidjs-community/solid-primitives) for persistent state
- **Build Tool**: [Vite](https://vite.dev)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

```bash
npm install
```

### Development

Run the app in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Production Build

Build the app for production:

```bash
npm run build
```

The build output will be in the `dist` folder, optimized and ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Create a Session**: On the home page, select your weapon type and the target Set Bonus Skill + Group Skill combination you're hunting for
2. **Start Tracking**: Click on your session card to open the tracker
3. **Log Rolls**: After each Gogmazios roll in-game, swipe right (or tap HIT) if you got both target skills, or swipe left (or tap MISS) if you didn't
4. **View Stats**: The footer shows your current success rate and total rolls
5. **Manage Sessions**: Return to the home page to view all sessions, create new ones, or delete existing ones

## Deployment

For deployment options, see the [Vite deployment documentation](https://vite.dev/guide/static-deploy.html).
