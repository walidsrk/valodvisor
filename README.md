# Valodvisor v2.0 🎮

Premium Valorant advisor: smart agent picks (24+ agents, map/role weighted), positioning tips, economy buys. Next.js 16 + Tailwind v4 + shadcn/ui. Live: https://valodvisor.vercel.app

## Features

✨ **Agent Selection Advisor**
- Get personalized agent recommendations based on your player level and selected map
- Considers agent difficulty to match your skill level
- Shows agent strengths, abilities, and role information

🎯 **Positioning & Gameplay Tips**
- Detailed attacking and defending strategies for each agent
- Position-specific advice to maximize your effectiveness
- Learn how to utilize your agent's abilities in different scenarios

💰 **Economy & Buy Recommendations**
- Smart buy recommendations based on:
  - Round number
  - Your KDA (Kill-Death-Assist ratio)
  - Available credits
  - Previous round result
- Optimized economy management for better team coordination

📚 **Quick Agent Reference**
- Browse all available agents at a glance
- Click any agent to instantly see their detailed information
- Visual difficulty ratings for easy comparison

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/walidsrk/valodvisor.git
cd valodvisor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Select Your Agent**:
   - Enter your player level (1-100)
   - Choose the map you're playing on
   - Click "Get Agent Recommendation" to receive a personalized suggestion

2. **View Positioning Advice**:
   - Once an agent is selected, you'll see detailed attacking and defending strategies
   - Use these tips to improve your positioning and gameplay

3. **Get Buy Recommendations**:
   - Enter the current round number
   - Input your KDA and available credits
   - Select whether you won or lost the previous round
   - Click "Get Buy Recommendation" for optimal purchase advice

4. **Browse Agents**:
   - Scroll to the Quick Agent Reference section
   - Click on any agent to view their information instantly

## Project Structure

```
valodvisor/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main page component
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── data/
│   │   ├── valorant-data.ts # Agent and map data with logic
│   │   └── economy.ts       # Buy recommendation logic
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Disclaimer

This is a fan-made tool and is not affiliated with, endorsed by, or in any way officially connected with Riot Games or Valorant.

## License

ISC

---

Made with ❤️ for Valorant grinders
