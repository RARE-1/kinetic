# Kinetic Logic Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite. Showcasing app development services and portfolio projects with an interactive UI and mobile simulator.

## 🎯 Features

- **Modern Design**: Built with React 19 and Tailwind CSS for a sleek, responsive interface
- **Interactive Components**: Hero section, services, portfolio showcase, testimonials, and contact form
- **Mobile Simulator**: Live preview of mobile app designs
- **Firebase Integration**: Secure backend with Firestore database and authentication
- **Server-Side Rendering**: Express.js server with Vite middleware for optimal performance
- **Type Safety**: Full TypeScript support across the entire project

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kinetic-logic-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file with your configuration
   - Add Firebase credentials if needed

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build & Deployment

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

This creates an optimized production build with:
- Vite's bundled frontend
- esbuild for server bundle
- Sourcemaps for debugging

### Start Production Server
```bash
npm start
```

### Clean Build Artifacts
```bash
npm run clean
```

### Type Checking
```bash
npm lint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Landing section
│   ├── Portfolio.tsx    # Project showcase
│   ├── Services.tsx     # Services offered
│   ├── Testimonials.tsx # Client testimonials
│   ├── Contact.tsx      # Contact form
│   ├── Navbar.tsx       # Navigation
│   └── MobileSimulator.tsx # Mobile preview
├── data.ts             # Portfolio data and content
├── firebase.ts         # Firebase configuration
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles

server.ts              # Express server configuration
vite.config.ts         # Vite configuration
```

## 🔐 Firebase Setup

This project uses Firebase for:
- Authentication
- Firestore database
- Security rules

Configuration is loaded from `firebase-applet-config.json`. Ensure proper security rules are set in `firestore.rules`.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tools**: Vite, esbuild
- **Backend**: Express.js
- **Database**: Firebase/Firestore
- **Animations**: Motion
- **Icons**: Lucide React
- **UI Library**: Tailwind CSS + custom components

## 📝 Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run clean` | Remove build artifacts |
| `npm run lint` | Type check with TypeScript |

## 📄 License

© 2024 Kinetic Logic. All rights reserved.
