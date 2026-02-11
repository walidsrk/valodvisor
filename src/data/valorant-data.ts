export interface Agent {
  id: string;
  name: string;
  role: string;
  difficulty: number; // 1-5, where 1 is easiest
  description: string;
  strengths: string[];
  abilities: string[];
}

export interface Map {
  id: string;
  name: string;
  recommendedAgents: string[];
}

export const agents: Agent[] = [
  {
    id: 'jett',
    name: 'Jett',
    role: 'Duelist',
    difficulty: 4,
    description: 'Agile duelist with high mobility',
    strengths: ['Entry fragging', 'Operator plays', 'Quick rotations'],
    abilities: ['Cloudburst (Smoke)', 'Updraft (Jump)', 'Tailwind (Dash)', 'Blade Storm (Ultimate)']
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Sentinel',
    difficulty: 2,
    description: 'Defensive healer and wall controller',
    strengths: ['Site defense', 'Team healing', 'Area denial'],
    abilities: ['Barrier Orb (Wall)', 'Slow Orb', 'Healing Orb', 'Resurrection (Ultimate)']
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    role: 'Duelist',
    difficulty: 2,
    description: 'Self-sufficient duelist with healing abilities',
    strengths: ['Entry fragging', 'Self-healing', 'Area control'],
    abilities: ['Blaze (Wall)', 'Curveball (Flash)', 'Hot Hands (Molly)', 'Run it Back (Ultimate)']
  },
  {
    id: 'sova',
    name: 'Sova',
    role: 'Initiator',
    difficulty: 4,
    description: 'Information gatherer with recon abilities',
    strengths: ['Gathering intel', 'Long-range damage', 'Post-plant lineups'],
    abilities: ['Owl Drone', 'Shock Bolt', 'Recon Bolt', 'Hunter\'s Fury (Ultimate)']
  },
  {
    id: 'brimstone',
    name: 'Brimstone',
    role: 'Controller',
    difficulty: 2,
    description: 'Smoke controller with tactical abilities',
    strengths: ['Site execution', 'Smokes', 'Post-plant'],
    abilities: ['Incendiary', 'Stim Beacon', 'Sky Smoke', 'Orbital Strike (Ultimate)']
  },
  {
    id: 'omen',
    name: 'Omen',
    role: 'Controller',
    difficulty: 3,
    description: 'Versatile controller with teleportation',
    strengths: ['Smokes', 'Lurking', 'Map control'],
    abilities: ['Shrouded Step (Teleport)', 'Paranoia (Flash)', 'Dark Cover (Smoke)', 'From the Shadows (Ultimate)']
  },
  {
    id: 'killjoy',
    name: 'Killjoy',
    role: 'Sentinel',
    difficulty: 3,
    description: 'Tech-based sentinel with gadgets',
    strengths: ['Site lockdown', 'Post-plant', 'Area denial'],
    abilities: ['Alarmbot', 'Turret', 'Nanoswarm', 'Lockdown (Ultimate)']
  },
  {
    id: 'reyna',
    name: 'Reyna',
    role: 'Duelist',
    difficulty: 3,
    description: 'Aggressive duelist that feeds on kills',
    strengths: ['Solo fragging', 'Clutching', 'Snowballing'],
    abilities: ['Leer (Flash)', 'Devour (Heal)', 'Dismiss (Invulnerability)', 'Empress (Ultimate)']
  }
];

export const maps: Map[] = [
  {
    id: 'haven',
    name: 'Haven',
    recommendedAgents: ['sova', 'omen', 'sage', 'killjoy']
  },
  {
    id: 'bind',
    name: 'Bind',
    recommendedAgents: ['brimstone', 'sage', 'omen', 'phoenix']
  },
  {
    id: 'split',
    name: 'Split',
    recommendedAgents: ['sage', 'sova', 'omen', 'killjoy']
  },
  {
    id: 'ascent',
    name: 'Ascent',
    recommendedAgents: ['sova', 'killjoy', 'omen', 'sage']
  },
  {
    id: 'icebox',
    name: 'Icebox',
    recommendedAgents: ['sage', 'sova', 'killjoy', 'omen']
  }
];

export function getRecommendedAgent(level: number, mapId: string): Agent | null {
  const map = maps.find(m => m.id === mapId);
  if (!map) return null;

  // Filter agents by difficulty based on player level
  const maxDifficulty = Math.min(5, Math.floor(level / 5) + 1);
  const suitableAgents = agents.filter(agent => 
    map.recommendedAgents.includes(agent.id) && agent.difficulty <= maxDifficulty
  );

  // Return a random suitable agent or the easiest if none match
  if (suitableAgents.length > 0) {
    return suitableAgents[Math.floor(Math.random() * suitableAgents.length)];
  }

  // Fallback: return the easiest agent for this map
  const mapAgents = agents.filter(agent => map.recommendedAgents.includes(agent.id));
  return mapAgents.sort((a, b) => a.difficulty - b.difficulty)[0] || agents[0];
}

export interface PositioningAdvice {
  attacking: string[];
  defending: string[];
}

export function getPositioningAdvice(agentId: string): PositioningAdvice {
  const adviceMap: Record<string, PositioningAdvice> = {
    jett: {
      attacking: [
        'Entry first on site with dash ready',
        'Use smokes to block sightlines before entering',
        'Take aggressive angles with Operator',
        'Be ready to updraft to unexpected positions'
      ],
      defending: [
        'Play off-angles with dash as escape',
        'Use Operator on long sightlines',
        'Updraft to get height advantage',
        'Dash away when overwhelmed'
      ]
    },
    sage: {
      attacking: [
        'Use wall to block defender positions',
        'Slow orb to delay rotations',
        'Heal teammates before entering site',
        'Wall for post-plant positions'
      ],
      defending: [
        'Wall off choke points early',
        'Use slow orbs at entry points',
        'Play close to teammates for healing',
        'Save wall for post-plant scenarios'
      ]
    },
    phoenix: {
      attacking: [
        'Use wall to cut off angles',
        'Flash before entry with curveball',
        'Molly to clear corners',
        'Entry with Run it Back for info'
      ],
      defending: [
        'Hold aggressive angles with wall backup',
        'Use molly for post-plant denial',
        'Flash to delay pushes',
        'Heal with wall/molly during fights'
      ]
    },
    sova: {
      attacking: [
        'Drone to gather info before push',
        'Use recon bolts to clear site',
        'Shock dart lineups for plant',
        'Ultimate for post-plant pressure'
      ],
      defending: [
        'Recon bolt early for info',
        'Shock dart damage on entries',
        'Save drone for retake',
        'Use ultimate to deny plant'
      ]
    },
    brimstone: {
      attacking: [
        'Smoke off defender positions',
        'Use stim beacon for team',
        'Molly for post-plant',
        'Ultimate to clear site'
      ],
      defending: [
        'Smoke to delay pushes',
        'Molly choke points',
        'Save ultimate for post-plant',
        'Play for lineups after plant'
      ]
    },
    omen: {
      attacking: [
        'Smoke defender positions',
        'Teleport to unexpected spots',
        'Paranoia before entering site',
        'Ultimate for info or flanks'
      ],
      defending: [
        'One-way smokes on chokes',
        'Teleport for off-angles',
        'Paranoia to delay pushes',
        'Ultimate to fake or reposition'
      ]
    },
    killjoy: {
      attacking: [
        'Set up post-plant setups',
        'Use turret for flank watch',
        'Nanoswarm for spike protection',
        'Ultimate for site execution'
      ],
      defending: [
        'Setup turret at choke point',
        'Nanoswarm on plant spots',
        'Alarmbot for info',
        'Ultimate to deny plant'
      ]
    },
    reyna: {
      attacking: [
        'Entry with Leer flash',
        'Get first kill and heal',
        'Dismiss to reposition safely',
        'Empress for multi-frag potential'
      ],
      defending: [
        'Hold aggressive angles',
        'Use Leer for peeking',
        'Heal after each kill',
        'Dismiss to escape trades'
      ]
    }
  };

  return adviceMap[agentId] || {
    attacking: ['Play with your team', 'Communicate enemy positions'],
    defending: ['Hold your position', 'Call out enemy movements']
  };
}
