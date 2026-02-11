export type Rank = 'Iron' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Ascendant' | 'Immortal' | 'Radiant';

export interface Agent {
  id: string;
  name: string;
  role: 'Duelist' | 'Sentinel' | 'Initiator' | 'Controller';
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  strengths: string[];
  abilities: {
    name: string;
    type: 'Basic' | 'Signature' | 'Ultimate';
  }[];
}

export interface MapData {
  id: string;
  name: string;
  recommendedAgents: string[];
  characteristics: string[];
}

export const ranks: Rank[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];

export const agents: Agent[] = [
  // DUELISTS
  {
    id: 'jett',
    name: 'Jett',
    role: 'Duelist',
    difficulty: 4,
    description: 'South Korean duelist known for her dash and cloudburst smokes.',
    strengths: ['Operator plays', 'Entry fragging', 'High mobility'],
    abilities: [
      { name: 'Cloudburst', type: 'Basic' },
      { name: 'Updraft', type: 'Basic' },
      { name: 'Tailwind', type: 'Signature' },
      { name: 'Blade Storm', type: 'Ultimate' },
    ]
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    role: 'Duelist',
    difficulty: 2,
    description: 'British self-sustaining duelist with fire-based abilities.',
    strengths: ['Self-healing', 'Entry fragging', 'Info gathering'],
    abilities: [
      { name: 'Blaze', type: 'Basic' },
      { name: 'Curveball', type: 'Basic' },
      { name: 'Hot Hands', type: 'Signature' },
      { name: 'Run it Back', type: 'Ultimate' },
    ]
  },
  {
    id: 'raze',
    name: 'Raze',
    role: 'Duelist',
    difficulty: 2,
    description: 'Brazilian explosive expert with high damage output.',
    strengths: ['Area denial', 'Satchel mobility', 'High burst damage'],
    abilities: [
      { name: 'Blast Pack', type: 'Basic' },
      { name: 'Paint Shells', type: 'Basic' },
      { name: 'Boom Bot', type: 'Signature' },
      { name: 'Showstopper', type: 'Ultimate' },
    ]
  },
  {
    id: 'reyna',
    name: 'Reyna',
    role: 'Duelist',
    difficulty: 3,
    description: 'Mexican duelist who thrives on aggressive plays and kills.',
    strengths: ['Solo carry', 'Sustain', 'Clutch potential'],
    abilities: [
      { name: 'Leer', type: 'Basic' },
      { name: 'Devour', type: 'Basic' },
      { name: 'Dismiss', type: 'Signature' },
      { name: 'Empress', type: 'Ultimate' },
    ]
  },
  {
    id: 'yoru',
    name: 'Yoru',
    role: 'Duelist',
    difficulty: 4,
    description: 'Japanese deceptive duelist with teleportation and fakeouts.',
    strengths: ['Flanking', 'Mind games', 'Escape tools'],
    abilities: [
      { name: 'Blindside', type: 'Basic' },
      { name: 'Fakeout', type: 'Basic' },
      { name: 'Gatecrash', type: 'Signature' },
      { name: 'Dimensional Drift', type: 'Ultimate' },
    ]
  },
  {
    id: 'neon',
    name: 'Neon',
    role: 'Duelist',
    difficulty: 3,
    description: 'Filipino speedster with electric walls and sprint.',
    strengths: ['Fast entry', 'Wall utility', 'High speed'],
    abilities: [
      { name: 'Fast Lane', type: 'Basic' },
      { name: 'Relay Bolt', type: 'Basic' },
      { name: 'High Gear', type: 'Signature' },
      { name: 'Overdrive', type: 'Ultimate' },
    ]
  },
  {
    id: 'iso',
    name: 'Iso',
    role: 'Duelist',
    difficulty: 3,
    description: 'Chinese 1v1 specialist with bulletproof shield.',
    strengths: ['Duel potential', 'Shield utility', 'Energy drain'],
    abilities: [
      { name: 'Double Tap', type: 'Basic' },
      { name: 'Bulletproof', type: 'Basic' },
      { name: 'Undercut', type: 'Signature' },
      { name: 'Kill Contract', type: 'Ultimate' },
    ]
  },
  // CONTROLLERS
  {
    id: 'brimstone',
    name: 'Brimstone',
    role: 'Controller',
    difficulty: 2,
    description: 'American controller with smokes and stim beacon.',
    strengths: ['Site execution', 'Team buff', 'Global smokes'],
    abilities: [
      { name: 'Stim Beacon', type: 'Basic' },
      { name: 'Incendiary', type: 'Basic' },
      { name: 'Sky Smoke', type: 'Signature' },
      { name: 'Orbital Strike', type: 'Ultimate' },
    ]
  },
  {
    id: 'viper',
    name: 'Viper',
    role: 'Controller',
    difficulty: 4,
    description: 'American chemist with poison cloud and poison wall.',
    strengths: ['Site lockdown', 'Post-plant denial', 'Area control'],
    abilities: [
      { name: 'Snake Bite', type: 'Basic' },
      { name: 'Poison Cloud', type: 'Basic' },
      { name: 'Toxic Screen', type: 'Signature' },
      { name: 'Viper\'s Pit', type: 'Ultimate' },
    ]
  },
  {
    id: 'omen',
    name: 'Omen',
    role: 'Controller',
    difficulty: 3,
    description: 'Shadow controller with teleportation and paranoia.',
    strengths: ['One-way smokes', 'Lurking', 'Map control'],
    abilities: [
      { name: 'Shrouded Step', type: 'Basic' },
      { name: 'Paranoia', type: 'Basic' },
      { name: 'Dark Cover', type: 'Signature' },
      { name: 'From the Shadows', type: 'Ultimate' },
    ]
  },
  {
    id: 'astra',
    name: 'Astra',
    role: 'Controller',
    difficulty: 4,
    description: 'Ghanaian global controller with star-based utility.',
    strengths: ['Global utility', 'Gravity well', 'Area denial'],
    abilities: [
      { name: 'Nova Pulse', type: 'Basic' },
      { name: 'Nebula', type: 'Basic' },
      { name: 'Gravity Well', type: 'Signature' },
      { name: 'Astral Form', type: 'Ultimate' },
    ]
  },
  {
    id: 'harbor',
    name: 'Harbor',
    role: 'Controller',
    difficulty: 2,
    description: 'Indian controller with water-based walls and cascade.',
    strengths: ['Wall replacement', 'Team protection', 'Site entry'],
    abilities: [
      { name: 'Cove', type: 'Basic' },
      { name: 'Cascade', type: 'Basic' },
      { name: 'High Tide', type: 'Signature' },
      { name: 'Reckoning', type: 'Ultimate' },
    ]
  },
  {
    id: 'clove',
    name: 'Clove',
    role: 'Controller',
    difficulty: 3,
    description: 'Scottish post-death controller with smokes.',
    strengths: ['Aggressive smokes', 'Self-revive', 'Immortality'],
    abilities: [
      { name: 'Ruse', type: 'Basic' },
      { name: 'Meddle', type: 'Basic' },
      { name: 'Pick-me-up', type: 'Signature' },
      { name: 'Not Dead Yet', type: 'Ultimate' },
    ]
  },
  // INITIATORS
  {
    id: 'sova',
    name: 'Sova',
    role: 'Initiator',
    difficulty: 4,
    description: 'Russian recon initiator with drone and shock bolts.',
    strengths: ['Information gathering', 'Post-plant lineups', 'Wall-bangs'],
    abilities: [
      { name: 'Owl Drone', type: 'Basic' },
      { name: 'Shock Bolt', type: 'Basic' },
      { name: 'Recon Bolt', type: 'Signature' },
      { name: 'Hunter\'s Fury', type: 'Ultimate' },
    ]
  },
  {
    id: 'breach',
    name: 'Breach',
    role: 'Initiator',
    difficulty: 3,
    description: 'Swedish initiator with flash and fault line.',
    strengths: ['Crowd control', 'Flashing through walls', 'Stuns'],
    abilities: [
      { name: 'Flashpoint', type: 'Basic' },
      { name: 'Fault Line', type: 'Basic' },
      { name: 'Aftershock', type: 'Signature' },
      { name: 'Rolling Thunder', type: 'Ultimate' },
    ]
  },
  {
    id: 'skye',
    name: 'Skye',
    role: 'Initiator',
    difficulty: 3,
    description: 'Australian initiator with wolf and recon tigers.',
    strengths: ['Healing', 'Tracking', 'Area clearing'],
    abilities: [
      { name: 'Guiding Light', type: 'Basic' },
      { name: 'Regrowth', type: 'Basic' },
      { name: 'Trailblazer', type: 'Signature' },
      { name: 'Seekers', type: 'Ultimate' },
    ]
  },
  {
    id: 'kayo',
    name: 'KAY/O',
    role: 'Initiator',
    difficulty: 3,
    description: 'Robot initiator with suppression and flash.',
    strengths: ['Ability denial', 'Entry flash', 'Fragile'],
    abilities: [
      { name: 'Frag/Fragile', type: 'Basic' },
      { name: 'Flashdrive', type: 'Basic' },
      { name: 'Zero/Zero', type: 'Signature' },
      { name: 'NULL/CMD', type: 'Ultimate' },
    ]
  },
  {
    id: 'fade',
    name: 'Fade',
    role: 'Initiator',
    difficulty: 3,
    description: 'Turkish fear-based initiator with prowlers.',
    strengths: ['Tracking', 'Nightfall pressure', 'Prowler reveals'],
    abilities: [
      { name: 'Prowler', type: 'Basic' },
      { name: 'Seize', type: 'Basic' },
      { name: 'Haunting', type: 'Signature' },
      { name: 'Nightfall', type: 'Ultimate' },
    ]
  },
  {
    id: 'gekko',
    name: 'Gekko',
    role: 'Initiator',
    difficulty: 2,
    description: 'Mexican initiator with wingman and dizzy.',
    strengths: ['Plant utility', 'Area control', 'Team utility'],
    abilities: [
      { name: 'Dizzy', type: 'Basic' },
      { name: 'Wingman', type: 'Basic' },
      { name: 'Mosh Pit', type: 'Signature' },
      { name: 'Thrash', type: 'Ultimate' },
    ]
  },
  // SENTINELS
  {
    id: 'sage',
    name: 'Sage',
    role: 'Sentinel',
    difficulty: 2,
    description: 'Chinese sentinel with healing and wall.',
    strengths: ['Healing', 'Site defense', 'Resurrection'],
    abilities: [
      { name: 'Barrier Orb', type: 'Basic' },
      { name: 'Slow Orb', type: 'Basic' },
      { name: 'Healing Orb', type: 'Signature' },
      { name: 'Resurrection', type: 'Ultimate' },
    ]
  },
  {
    id: 'cypher',
    name: 'Cypher',
    role: 'Sentinel',
    difficulty: 3,
    description: 'Moroccan sentinel with traps and camera.',
    strengths: ['Lockdown', 'Information', 'Anti-flank'],
    abilities: [
      { name: 'Trapwire', type: 'Basic' },
      { name: 'Cyber Cage', type: 'Basic' },
      { name: 'Spycam', type: 'Signature' },
      { name: 'Neural Theft', type: 'Ultimate' },
    ]
  },
  {
    id: 'killjoy',
    name: 'Killjoy',
    role: 'Sentinel',
    difficulty: 3,
    description: 'German sentinel with turret and alarm bot.',
    strengths: ['Site lockdown', 'Post-plant', 'Flank watch'],
    abilities: [
      { name: 'Alarm Bot', type: 'Basic' },
      { name: 'Nanoswarm', type: 'Basic' },
      { name: 'Turret', type: 'Signature' },
      { name: 'Lockdown', type: 'Ultimate' },
    ]
  },
  {
    id: 'chamber',
    name: 'Chamber',
    role: 'Sentinel',
    difficulty: 4,
    description: 'French sentinel with operator and teleport.',
    strengths: ['Sniper plays', 'Teleport escape', 'Anchor'],
    abilities: [
      { name: 'Headhunter', type: 'Basic' },
      { name: 'Rendezvous', type: 'Basic' },
      { name: 'Trademark', type: 'Signature' },
      { name: 'Tour De Force', type: 'Ultimate' },
    ]
  },
  {
    id: 'deadlock',
    name: 'Deadlock',
    role: 'Sentinel',
    difficulty: 3,
    description: 'Norwegian sentinel with grav net and sensor.',
    strengths: ['Choke denial', 'Pull utility', 'Site anchor'],
    abilities: [
      { name: 'GravNet', type: 'Basic' },
      { name: 'Sonic Sensor', type: 'Basic' },
      { name: 'Barrier Mesh', type: 'Signature' },
      { name: 'Annihilation', type: 'Ultimate' },
    ]
  },
  {
    id: 'vyse',
    name: 'Vyse',
    role: 'Sentinel',
    difficulty: 3,
    description: 'American sentinel with shear and steel garden.',
    strengths: ['Wall setups', 'Area denial', 'Flank control'],
    abilities: [
      { name: 'Shear', type: 'Basic' },
      { name: 'Arc Rose', type: 'Basic' },
      { name: 'Razorvine', type: 'Signature' },
      { name: 'Steel Garden', type: 'Ultimate' },
    ]
  },
];

export const maps: MapData[] = [
  {
    id: 'ascent',
    name: 'Ascent',
    recommendedAgents: ['jett', 'killjoy', 'sova', 'omen', 'kayo'],
    characteristics: ['Mid control important', 'Open areas', 'Two sites']
  },
  {
    id: 'bind',
    name: 'Bind',
    recommendedAgents: ['brimstone', 'viper', 'raze', 'skye', 'fade'],
    characteristics: ['No middle', 'Short lanes', 'Teleporter exits']
  },
  {
    id: 'haven',
    name: 'Haven',
    recommendedAgents: ['jett', 'sova', 'killjoy', 'omen', 'breach'],
    characteristics: ['Three sites', 'Mid control', 'More defensive']
  },
  {
    id: 'split',
    name: 'Split',
    recommendedAgents: ['raze', 'viper', 'astra', 'cypher', 'skye'],
    characteristics: ['Verticality', 'Two main corridors', 'Slow pace']
  },
  {
    id: 'icebox',
    name: 'Icebox',
    recommendedAgents: ['viper', 'sova', 'sage', 'jett', 'killjoy'],
    characteristics: ['Large open areas', 'Verticality', 'Snowy']
  },
  {
    id: 'breeze',
    name: 'Breeze',
    recommendedAgents: ['viper', 'cypher', 'jett', 'sova', 'kayo'],
    characteristics: ['Large open spaces', 'Long sightlines', 'Mid-heavy']
  },
  {
    id: 'fracture',
    name: 'Fracture',
    recommendedAgents: ['brimstone', 'breach', 'raze', 'neon', 'killjoy'],
    characteristics: ['Two distinct sides', 'Zip lines', 'Multi-level']
  },
  {
    id: 'pearl',
    name: 'Pearl',
    recommendedAgents: ['astra', 'fade', 'killjoy', 'viper', 'jett'],
    characteristics: ['Compact map', 'Horizontal layout', 'CT-side favored']
  },
  {
    id: 'lotus',
    name: 'Lotus',
    recommendedAgents: ['omen', 'killjoy', 'raze', 'viper', 'fade'],
    characteristics: ['Three sites', 'Destroyable walls', 'Mid control']
  },
  {
    id: 'sunset',
    name: 'Sunset',
    recommendedAgents: ['cypher', 'viper', 'omen', 'raze', 'sova'],
    characteristics: ['Two sites', 'Mid focus', 'Urban setting']
  },
  {
    id: 'abyss',
    name: 'Abyss',
    recommendedAgents: ['sova', 'chamber', 'killjoy', 'vyse', 'omen'],
    characteristics: ['Large gaps', 'Verticality', 'Open mid']
  },
];

export const roleWeights: Record<string, Record<string, number>> = {
  Iron: { Duelist: 0.4, Sentinel: 0.3, Controller: 0.2, Initiator: 0.1 },
  Bronze: { Duelist: 0.35, Sentinel: 0.3, Controller: 0.25, Initiator: 0.1 },
  Silver: { Duelist: 0.3, Sentinel: 0.25, Controller: 0.3, Initiator: 0.15 },
  Gold: { Duelist: 0.25, Sentinel: 0.25, Controller: 0.3, Initiator: 0.2 },
  Platinum: { Duelist: 0.25, Sentinel: 0.25, Controller: 0.25, Initiator: 0.25 },
  Diamond: { Duelist: 0.25, Sentinel: 0.25, Controller: 0.25, Initiator: 0.25 },
  Ascendant: { Duelist: 0.2, Sentinel: 0.2, Controller: 0.3, Initiator: 0.3 },
  Immortal: { Duelist: 0.2, Sentinel: 0.2, Controller: 0.3, Initiator: 0.3 },
  Radiant: { Duelist: 0.2, Sentinel: 0.2, Controller: 0.3, Initiator: 0.3 },
};

export const difficultyByRank: Record<Rank, number> = {
  Iron: 2,
  Bronze: 2,
  Silver: 3,
  Gold: 3,
  Platinum: 4,
  Diamond: 4,
  Ascendant: 4,
  Immortal: 5,
  Radiant: 5,
};

export function getRecommendedAgent(rank: Rank, mapId: string): Agent | null {
  const map = maps.find(m => m.id === mapId);
  if (!map) return null;

  const weights = roleWeights[rank];
  const maxDiff = difficultyByRank[rank];

  // Filter candidates by map and difficulty
  let candidates = agents.filter(agent => {
    const onMap = map.recommendedAgents.includes(agent.id);
    const appropriateDifficulty = agent.difficulty <= maxDiff;
    return onMap && appropriateDifficulty;
  });

  // If no candidates, fallback to map agents sorted by difficulty
  if (candidates.length === 0) {
    const mapAgents = agents.filter(a => map.recommendedAgents.includes(a.id));
    candidates = mapAgents.sort((a, b) => a.difficulty - b.difficulty).slice(0, 3);
  }

  // Weighted random selection based on role preference for rank
  const weightedCandidates = candidates.flatMap(agent => {
    const roleWeight = weights[agent.role] || 0.2;
    const times = Math.ceil(roleWeight * 10);
    return Array(times).fill(agent);
  });

  return weightedCandidates[Math.floor(Math.random() * weightedCandidates.length)] || candidates[0] || agents[0];
}

export interface PositioningAdvice {
  attacking: string[];
  defending: string[];
}

export function getPositioningAdvice(agentId: string): PositioningAdvice {
  const adviceMap: Record<string, PositioningAdvice> = {
    jett: {
      attacking: ['Entry first with Tailwind ready', 'Use Cloudburst for site entry', 'Hold long angles with Operator'],
      defending: ['Hold aggressive off-angles', 'Use dash to escape trades', 'Rotate quickly with updraft']
    },
    reyna: {
      attacking: ['Entry with Leer to blind', 'Trade your flashes aggressively', 'Dismiss after kills to escape'],
      defending: ['Hold tight angles for picks', 'Use Devour to heal after kills', 'Empress for multi-frag']
    },
    sova: {
      attacking: ['Drone first to clear corners', 'Use Recon bolt to reveal site', 'Save Shock bolt for post-plant'],
      defending: ['Recon bolt for early info', 'Drone for retake timing', 'Hunter\'s Fury to deny plant']
    },
    sage: {
      attacking: ['Wall off entry points for team', 'Slow orbs to delay rotations', 'Heal team before pushing'],
      defending: ['Wall off choke points early', 'Slow orb at main entries', 'Resurrect key teammate late']
    },
    omen: {
      attacking: ['Smoke off defender angles', 'Lurk for map control', 'Use Ult to pressure other site'],
      defending: ['One-way smokes on chokes', 'Paranoia to delay pushes', 'Teleport for surprise flanks']
    },
    viper: {
      attacking: ['Toxic Screen to split site', 'Learn molty lineups for plant', 'Use Poison Cloud for safety'],
      defending: ['Maintain smoke uptime', 'Snake Bite for post-plant', 'Ultimate to lock site/retake']
    },
    brimstone: {
      attacking: ['Smokes for site execution', 'Stim beacon for team speed', 'Incendiary for post-plant'],
      defending: ['Smokes to delay pushes', 'Incendiary to stop rushes', 'Ult for clutch situations']
    },
    raze: {
      attacking: ['Blast Pack for mobility', 'Boom Bot for info', 'Showstopper for site clear'],
      defending: ['Satchel for vertical plays', 'Paint shells for site control', 'Boombot for flank watch']
    },
    phoenix: {
      attacking: ['Curveball for self-flash', 'Blaze for area denial', 'Run it Back for info'],
      defending: ['Hot Hands to stall', 'Wall for safe positions', 'Trade aggressively']
    },
    kayo: {
      attacking: ['Frag/Fragile to deny utility', 'Flashdrive for entry', 'Zero/Zero to isolate'],
      defending: ['Flash through walls for info', 'Frag to delay pushes', 'Ult for team trades']
    },
    fade: {
      attacking: ['Prowler to clear spots', 'Seize to trap enemies', 'Haunting for info'],
      defending: ['Prowler for retake', 'Nightfall to reveal positions', 'Seize for choke denial']
    },
    killjoy: {
      attacking: ['Alarm bot for flank watch', 'Nanoswarm for post-plant', 'Turret for area control'],
      defending: ['Set up before round starts', 'Alarm bot for early alerts', 'Lockdown for site execution']
    }
  };

  return adviceMap[agentId] || {
    attacking: ['Coordinate with team', 'Use abilities for information', 'Play for trades'],
    defending: ['Hold your angles', 'Communicate enemy positions', 'Play for the retake']
  };
}