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
  { id: 'jett', name: 'Jett', role: 'Duelist', difficulty: 4, description: 'Maneuverability-focused duelist with updraft and dash for aggressive plays.', strengths: ['High mobility', 'Entry fragging', 'Operator specialist'], abilities: ['Updraft', 'Tailwind', 'Cloudburst', 'Blade Storm'] },
  { id: 'phoenix', name: 'Phoenix', role: 'Duelist', difficulty: 3, description: 'Self-sustain duelist with fire abilities and self-revive.', strengths: ['Self-healing', 'Flash support', 'Duel potential'], abilities: ['Curveball', 'Blaze', 'Hot Hands', 'Run it Back'] },
  { id: 'raze', name: 'Raze', role: 'Duelist', difficulty: 2, description: 'Explosive duelist with satchels and rocket launcher.', strengths: ['Area denial', 'Mobility bursts', 'High damage'], abilities: ['Blast Pack', 'Paint Shells', 'Boom Bot', 'Showstopper'] },
  { id: 'reyna', name: 'Reyna', role: 'Duelist', difficulty: 3, description: 'Kill-dependent duelist thriving on aggressive frags.', strengths: ['Post-kill sustain', 'Clutching', 'Snowballing'], abilities: ['Leer', 'Devour', 'Dismiss', 'Empress'] },
  { id: 'raven', name: 'Neon', role: 'Duelist', difficulty: 3, description: 'Speedster duelist with wall and sprint.', strengths: ['Fast entry', 'Wall for utility', 'High speed'], abilities: ['Fast Lane', 'Relay Bolt', 'High Gear', 'Overdrive'] },
  { id: 'yoru', name: 'Yoru', role: 'Duelist', difficulty: 4, description: 'Illusion duelist with teleport and decoy.', strengths: ['Flank potential', 'Fakeouts', 'Escape tools'], abilities: ['Gatecrash', 'Fakeout', 'Blindside', 'Dimensional Drift'] },
  { id: 'iso', name: 'Iso', role: 'Duelist', difficulty: 3, description: 'Bulletproof duelist with shield.', strengths: ['1v1 specialist', 'Shield duels', 'Double-tap'], abilities: ['Double Tap', 'Bulletproof', 'Undercut', 'Kill Contract'] },
  { id: 'clove', name: 'Clove', role: 'Controller', difficulty: 3, description: 'Post-death controller with smokes.', strengths: ['Aggressive smokes', 'Revive potential', 'Immortality'], abilities: ['Ruse', 'Meddle', 'Pick-me-up', 'Not Dead Yet'] },
  { id: 'sova', name: 'Sova', role: 'Initiator', difficulty: 4, description: 'Recon specialist with arrows and drone.', strengths: ['Information gathering', 'Lineups', 'Long-range'], abilities: ['Recon Bolt', 'Owl Drone', 'Shock Bolt', 'Hunter\'s Fury'] },
  { id: 'sage', name: 'Sage', role: 'Sentinel', difficulty: 2, description: 'Healer and waller for team sustain.', strengths: ['Healing', 'Area control', 'Resurrection'], abilities: ['Barrier Orb', 'Healing Orb', 'Slow Orb', 'Resurrection'] },
  { id: 'cypher', name: 'Cypher', role: 'Sentinel', difficulty: 3, description: 'Info sentinel with traps and camera.', strengths: ['Trap setups', 'Enemy tracking', 'Site lock'], abilities: ['Trapwire', 'Cyber Cage', 'Spycam', 'Neural Theft'] },
  { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', difficulty: 3, description: 'Turret and alarm sentinel.', strengths: ['Site lockdown', 'Post-plant', 'Flank watch'], abilities: ['Alarm Bot', 'Nanoswarm', 'Turret', 'Lockdown'] },
  { id: 'chamber', name: 'Chamber', role: 'Sentinel', difficulty: 4, description: 'Sniper sentinel with tp and ult.', strengths: ['Operator plays', 'Teleport utility', 'Headhunter'], abilities: ['Headhunter', 'Rendezvous', 'Tour De Force'] },
  { id: 'deadlock', name: 'Deadlock', role: 'Sentinel', difficulty: 3, description: 'Barrier controller sentinel.', strengths: ['Choke denial', 'Pull enemies', 'Anchor'], abilities: ['GravNet', 'Sonic Sensor', 'Barrier Mesh', 'Annihilation'] },
  { id: 'vyse', name: 'Vyse', role: 'Sentinel', difficulty: 3, description: 'Steel wall sentinel.', strengths: ['Wall setups', 'Sheath tracking', 'Arc Rose'], abilities: ['Shear', 'Arc Rose', 'Razorvine', 'Steel Garden'] },
  { id: 'brimstone', name: 'Brimstone', role: 'Controller', difficulty: 2, description: 'Classic smokes and stim.', strengths: ['Site smokes', 'Post-plant', 'Team buff'], abilities: ['Stim Beacon', 'Incendiary', 'Sky Smoke', 'Orbital Strike'] },
  { id: 'omen', name: 'Omen', role: 'Controller', difficulty: 3, description: 'Shadow tp controller.', strengths: ['One-ways', 'Flanks', 'Paranoia'], abilities: ['Shrouded Step', 'Paranoia', 'Dark Cover', 'From the Shadows'] },
  { id: 'viper', name: 'Viper', role: 'Controller', difficulty: 3, description: 'Poison cloud controller.', strengths: ['Poison denial', 'Wall control', 'Ult lockdown'], abilities: ['Snake Bite', 'Poison Cloud', 'Toxic Screen', 'Viper\'s Pit'] },
  { id: 'astra', name: 'Astra', role: 'Controller', difficulty: 4, description: 'Global smokes astral form.', strengths: ['Global utility', 'Gravity well', 'Nova pulse'], abilities: ['Nova Pulse', 'Gravity Well', 'Nebula/Dissipate', 'Astral Form'] },
  { id: 'harbor', name: 'Harbor', role: 'Controller', difficulty: 2, description: 'Water walls and cascades.', strengths: ['Wall replacement', 'Coversion', 'Ult bubble'], abilities: ['Cove', 'Cascade', 'High Tide', 'Reckoning'] },
  { id: 'faide', name: 'Fade', role: 'Initiator', difficulty: 3, description: 'Fear and reveal initiator.', strengths: ['Prowlers', 'Seize reveal', 'Nightfall'], abilities: ['Prowler', 'Seize', 'Haunting', 'Nightfall'] },
  { id: 'g ekko', name: 'Gekko', role: 'Initiator', difficulty: 2, description: 'Creature utility initiator.', strengths: ['Dizzy reveal', 'Wingman plant', 'Mosh pit'], abilities: ['Dizzy', 'Wingman', 'Mosh Pit', 'Thrash'] },
  { id: 'kAY o', name: 'KAY/O', role: 'Initiator', difficulty: 3, description: 'Suppression and flash.', strengths: ['Null cmd suppress', 'Fragile flashes', 'Ult disable'], abilities: ['Fragile', 'Flashdrive', 'Null Cmd', 'Suppression'] },
  { id: 'breach', name: 'Breach', role: 'Initiator', difficulty: 3, description: 'Stun and fault line.', strengths: ['Entry stuns', 'Blind through walls', 'Ult push'], abilities: ['Flashpoint', 'Fault Line', 'Aftershock', 'Rolling Thunder'] }
];

export const maps: Map[] = [
  { id: 'ascend', name: 'Ascent', recommendedAgents: ['sova', 'killjoy', 'omen', 'chamber', 'cypher'] },
  { id: 'bind', name: 'Bind', recommendedAgents: ['brimstone', 'vipers', 'harbor', 'omen', 'sova'] },
  { id: 'breeze', name: 'Breeze', recommendedAgents: ['sova', 'chamber', 'killjoy', 'cypher', 'fade'] },
  { id: 'fracture', name: 'Fracture', recommendedAgents: ['sova', 'killjoy', 'cypher', 'vyse', 'fade'] },
  { id: 'haven', name: 'Haven', recommendedAgents: ['sova', 'brimstone', 'omen', 'killjoy', 'sage'] },
  { id: 'icebox', name: 'Icebox', recommendedAgents: ['sova', 'vipers', 'harbor', 'killjoy', 'sage'] },
  { id: 'lotus', name: 'Lotus', recommendedAgents: ['sova', 'brimstone', 'omen', 'killjoy', 'cypher'] },
  { id: 'pearl', name: 'Pearl', recommendedAgents: ['sova', 'vipers', 'harbor', 'chamber', 'killjoy'] },
  { id: 'split', name: 'Split', recommendedAgents: ['sage', 'sova', 'omen', 'killjoy', 'cypher'] },
  { id: 'sunset', name: 'Sunset', recommendedAgents: ['sova', 'killjoy', 'cypher', 'fade', 'breach'] },
  { id: 'abyss', name: 'Abyss', recommendedAgents: ['sova', 'chamber', 'killjoy', 'vyse', 'omen'] }
];

export function getRecommendedAgent(level: number, mapId: string): Agent | null {
  const map = maps.find(m => m.id === mapId);
  if (!map) return null;

  const roleWeights = { duelist: 0.3, initiator: 0.25, controller: 0.25, sentinel: 0.2 };
  const maxDifficulty = Math.max(1, Math.floor(level / 20) + 1);
  
  let candidates = agents.filter(a => map.recommendedAgents.includes(a.id) && a.difficulty <= maxDifficulty);
  if (candidates.length === 0) {
    candidates = agents.filter(a => map.recommendedAgents.includes(a.id)).sort((a, b) => a.difficulty - b.difficulty).slice(0, 3);
  }
  
  // Weighted random by role preference for map
  const weighted = candidates.flatMap(agent => 
    Array(Math.floor(10 / agent.difficulty) * (roleWeights[agent.role as keyof typeof roleWeights] || 0.2) * 10).fill(agent)
  );
  return weighted[Math.floor(Math.random() * weighted.length)] || candidates[0];
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
