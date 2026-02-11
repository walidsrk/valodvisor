export interface Agent {
  id: string;
  name: string;
  role: 'Duelist' | 'Sentinel' | 'Initiator' | 'Controller';
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  strengths: string[];
  abilities: {
    name: string;
    description: string;
    type: 'Basic' | 'Signature' | 'Ultimate';
  }[];
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
    description: 'Representing her home country of South Korea, Jett\'s agile and evasive fighting style lets her take risks no one else can.',
    strengths: ['Operator usage', 'Entry fragging', 'High verticality'],
    abilities: [
      { name: 'Cloudburst', description: 'Instantly throw a projectile that expands into a brief vision-blocking cloud.', type: 'Basic' },
      { name: 'Updraft', description: 'Instantly propel Jett high into the air.', type: 'Basic' },
      { name: 'Tailwind', description: 'Instantly propel Jett in the direction she is moving.', type: 'Signature' },
      { name: 'Blade Storm', description: 'Equip a set of highly accurate throwing knives.', type: 'Ultimate' },
    ]
  },
  {
    id: 'omen',
    name: 'Omen',
    role: 'Controller',
    difficulty: 3,
    description: 'A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold.',
    strengths: ['Flexible smoking', 'Lurking', 'Mind games'],
    abilities: [
      { name: 'Shrouded Step', description: 'Equip a shadow step ability to teleport to a marked location.', type: 'Basic' },
      { name: 'Paranoia', description: 'Instantly fire a shadow projectile forward, briefly reducing the vision range of all players it touches.', type: 'Basic' },
      { name: 'Dark Cover', description: 'Equip a shadow orb and see its range indicator. Fire to throw the shadow orb to the marked location.', type: 'Signature' },
      { name: 'From the Shadows', description: 'Equip a tactical map. Fire to begin teleporting to any location on the map.', type: 'Ultimate' },
    ]
  },
  {
    id: 'sova',
    name: 'Sova',
    role: 'Initiator',
    difficulty: 4,
    description: 'Born from the eternal winter of Russia’s tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision.',
    strengths: ['Information gathering', 'Post-plant lineups', 'Wall-bang potential'],
    abilities: [
      { name: 'Owl Drone', description: 'Equip an owl drone. Fire to deploy and take control of movement of the drone.', type: 'Basic' },
      { name: 'Shock Bolt', description: 'Equip a bow with a shock bolt. Fire to send the explosive bolt forward, detonating upon collision.', type: 'Basic' },
      { name: 'Recon Bolt', description: 'Equip a bow with a recon bolt. Fire to send the recon bolt forward, activating upon collision to reveal nearby enemies.', type: 'Signature' },
      { name: 'Hunter\'s Fury', description: 'Equip a bow with three long-range, wall-piercing energy blasts.', type: 'Ultimate' },
    ]
  },
  {
    id: 'cypher',
    name: 'Cypher',
    role: 'Sentinel',
    difficulty: 3,
    description: 'The Moroccan information broker, Cypher is a one-man surveillance network who keeps tabs on the enemy’s every move.',
    strengths: ['Locking down sites', 'Information gathering', 'Anti-flank'],
    abilities: [
      { name: 'Trapwire', description: 'Equip a trapwire. Fire to place a destructible and invisible tripwire at the targeted location.', type: 'Basic' },
      { name: 'Cyber Cage', description: 'Instantly toss the cyber cage in front of Cypher. Activate to create a zone that blocks vision and slows enemies.', type: 'Basic' },
      { name: 'Spycam', description: 'Equip a spycam. Fire to place the camera at the targeted location.', type: 'Signature' },
      { name: 'Neural Theft', description: 'Instantly use on a dead enemy player in your crosshairs to reveal the location of all living enemy players.', type: 'Ultimate' },
    ]
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Sentinel',
    difficulty: 2,
    description: 'The stronghold of China, Sage creates safety for herself and her team wherever she goes.',
    strengths: ['Healing', 'Resurrection', 'Slowing pushes'],
    abilities: [
      { name: 'Barrier Orb', description: 'Equip a barrier orb. Fire to place a solid wall.', type: 'Basic' },
      { name: 'Slow Orb', description: 'Equip a slowing orb. Fire to throw the slowing orb forward to detonate upon landing.', type: 'Basic' },
      { name: 'Healing Orb', description: 'Equip a healing orb. Fire with your crosshairs over a damaged ally to activate a heal-over-time on them.', type: 'Signature' },
      { name: 'Resurrection', description: 'Equip a resurrection ability. Fire with your crosshairs over a dead ally to begin resurrecting them.', type: 'Ultimate' },
    ]
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    role: 'Duelist',
    difficulty: 2,
    description: 'Hailing from the U.K., Phoenix\'s star power shines through in his fighting style, igniting the battlefield with flash and flare.',
    strengths: ['Self-healing', 'Isolating duels', 'Information gathering with Ult'],
    abilities: [
      { name: 'Blaze', description: 'Equip a flame wall. Fire to create a line of flame that blocks vision and damages players.', type: 'Basic' },
      { name: 'Curveball', description: 'Equip a flare orb that takes a curving path and detonates shortly after throwing.', type: 'Basic' },
      { name: 'Hot Hands', description: 'Equip a fireball. Fire to throw a fireball that explodes after a set amount of time or upon hitting the ground.', type: 'Signature' },
      { name: 'Run it Back', description: 'Instantly place a marker at Phoenix\'s location. Activate to begin a timer where dying or timing out returns you to that spot.', type: 'Ultimate' },
    ]
  },
  {
    id: 'viper',
    name: 'Viper',
    role: 'Controller',
    difficulty: 4,
    description: 'The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy\'s vision.',
    strengths: ['Site denial', 'Post-plant mollies', 'Long-duration smokes'],
    abilities: [
      { name: 'Snake Bite', description: 'Equip a chemical launcher. Fire to launch a canister that shatters upon hitting the floor, creating a lingering chemical zone.', type: 'Basic' },
      { name: 'Poison Cloud', description: 'Equip a gas emitter. Fire to throw the emitter that perpetually remains throughout the round.', type: 'Basic' },
      { name: 'Toxic Screen', description: 'Equip a gas emitter launcher. Fire to deploy a long line of gas emitters.', type: 'Signature' },
      { name: 'Viper\'s Pit', description: 'Equip a chemical sprayer. Fire to spray a chemical cloud in all directions around Viper, creating a large cloud that reduces the vision range and maximum health of players inside of it.', type: 'Ultimate' },
    ]
  },
  {
    id: 'reyna',
    name: 'Reyna',
    role: 'Duelist',
    difficulty: 3,
    description: 'Forged in the heart of Mexico, Reyna dominates single combat, popping off with every kill she scores.',
    strengths: ['Solo carry potential', 'Sustain', 'High aggression'],
    abilities: [
      { name: 'Leer', description: 'Equip an ethereal destructible eye. Activate to cast the eye a short distance forward. The eye will Nearsight all enemies who look at it.', type: 'Basic' },
      { name: 'Devour', description: 'Enemies killed by Reyna leave behind Soul Orbs that last 3 seconds. Instantly consume a nearby soul orb, rapidly healing for a short duration.', type: 'Basic' },
      { name: 'Dismiss', description: 'Instantly consume a nearby soul orb, becoming intangible for a short duration.', type: 'Signature' },
      { name: 'Empress', description: 'Instantly enter a frenzy, increasing firing, equip and reload speed dramatically. Scoring a kill renews the duration.', type: 'Ultimate' },
    ]
  },
  {
    id: 'brimstone',
    name: 'Brimstone',
    role: 'Controller',
    difficulty: 2,
    description: 'Hailing from the USA, Brimstone\'s orbital arsenal ensures his team always has the advantage.',
    strengths: ['Quick smoke execution', 'Powerful ultimate', 'Combat stimulation'],
    abilities: [
      { name: 'Stim Beacon', description: 'Equip a stim beacon. Fire to toss the stim beacon in front of Brimstone. Upon landing, it creates a field that grants players RapidFire.', type: 'Basic' },
      { name: 'Incendiary', description: 'Equip an incendiary grenade launcher. Fire to launch a grenade that detonates as it comes to a rest on the floor, creating a lingering fire zone.', type: 'Basic' },
      { name: 'Sky Smoke', description: 'Equip a tactical map. Fire to set locations where Brimstone’s smoke clouds will land.', type: 'Signature' },
      { name: 'Orbital Strike', description: 'Equip a tactical map. Fire to launch a lingering orbital strike laser at the selected location.', type: 'Ultimate' },
    ]
  },
  {
    id: 'breach',
    name: 'Breach',
    role: 'Initiator',
    difficulty: 4,
    description: 'The bionic Swede Breach fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground.',
    strengths: ['Crowd control', 'Flashing through walls', 'Disrupting defenders'],
    abilities: [
      { name: 'Aftershock', description: 'Equip a fusion charge. Fire the charge to set a slow-acting burst through the wall.', type: 'Basic' },
      { name: 'Flashpoint', description: 'Equip a blinding charge. Fire the charge to set a fast-acting burst through the wall.', type: 'Basic' },
      { name: 'Fault Line', description: 'Equip a seismic blast. Hold fire to increase the distance. Release to set off a quake, dazing all players in its zone.', type: 'Signature' },
      { name: 'Rolling Thunder', description: 'Equip a seismic charge. Fire to send a cascading quake through all terrain in a large cone.', type: 'Ultimate' },
    ]
  },
];

export const maps: Map[] = [
  { id: 'ascent', name: 'Ascent', recommendedAgents: ['sova', 'killjoy', 'omen', 'jett', 'kayo'] },
  { id: 'bind', name: 'Bind', recommendedAgents: ['brimstone', 'viper', 'raze', 'skye', 'fade'] },
  { id: 'haven', name: 'Haven', recommendedAgents: ['jett', 'sova', 'killjoy', 'omen', 'breach'] },
  { id: 'split', name: 'Split', recommendedAgents: ['raze', 'viper', 'astra', 'cypher', 'skye'] },
  { id: 'icebox', name: 'Icebox', recommendedAgents: ['viper', 'sova', 'sage', 'jett', 'killjoy'] },
  { id: 'breeze', name: 'Breeze', recommendedAgents: ['viper', 'cypher', 'jett', 'sova', 'kayo'] },
  { id: 'fracture', name: 'Fracture', recommendedAgents: ['brimstone', 'breach', 'raze', 'neon', 'killjoy'] },
  { id: 'pearl', name: 'Pearl', recommendedAgents: ['astra', 'fade', 'killjoy', 'viper', 'jett'] },
  { id: 'lotus', name: 'Lotus', recommendedAgents: ['omen', 'killjoy', 'raze', 'viper', 'fade'] },
  { id: 'sunset', name: 'Sunset', recommendedAgents: ['cypher', 'viper', 'omen', 'raze', 'sova'] },
];

export function getRecommendedAgent(level: number, mapId: string): Agent | null {
  const map = maps.find(m => m.id === mapId);
  if (!map) return null;

  const suitableAgents = agents.filter(agent => {
    const isRecommended = map.recommendedAgents.includes(agent.id);
    let isDifficultyAppropriate = false;
    
    if (level < 20) isDifficultyAppropriate = agent.difficulty <= 2;
    else if (level < 50) isDifficultyAppropriate = agent.difficulty <= 3;
    else isDifficultyAppropriate = true;

    return isRecommended && isDifficultyAppropriate;
  });

  if (suitableAgents.length > 0) {
    return suitableAgents[Math.floor(Math.random() * suitableAgents.length)];
  }

  return agents.find(a => map.recommendedAgents.includes(a.id)) || agents[0];
}

export interface PositioningAdvice {
  attacking: string[];
  defending: string[];
}

export function getPositioningAdvice(agentId: string): PositioningAdvice {
  const adviceMap: Record<string, PositioningAdvice> = {
    jett: {
      attacking: ['Entry aggressively using Tailwind + Cloudburst.', 'Use Updraft to reach unexpected vertical off-angles.', 'Hold long lines with the Operator.'],
      defending: ['Hold aggressive angles and dash to safety after the first shot.', 'Use verticality to surprise attackers entering the site.']
    },
    omen: {
      attacking: ['Place smokes to cross chokepoints safely.', 'Use Shrouded Step to bypass defender setups.', 'Lurk and use Ultimate to put pressure on the opposite site.'],
      defending: ['Use one-way smokes to discourage site entry.', 'Use Paranoia to stop a multi-person push in its tracks.']
    },
    sova: {
      attacking: ['Drone first to clear close angles for your duelists.', 'Use Recon bolts to reveal defender positions on site.', 'Save Shock Bolts for post-plant denial.'],
      defending: ['Use Recon bolt early in the round to identify which site the enemy is leaning towards.', 'Use Ultimate to delay the plant or defuse.']
    },
    sage: {
      attacking: ['Use the Barrier Orb to safe-revive or create a safe plant spot.', 'Slow orbs should be used to stop defender retakes.'],
      defending: ['Wall off high-traffic entries early to force enemies to rotate.', 'Hold safe positions to ensure you stay alive to provide heals.']
    },
    cypher: {
      attacking: ['Use your Spycam to scout ahead without peaking.', 'Place Trapwires to watch for flankers during a site hit.'],
      defending: ['Set up cameras and traps in varied locations so attackers can\'t predict them.', 'Stay alive to keep your utility active.']
    },
    viper: {
      attacking: ['Use your Toxic Screen to split sites and minimize defender sightlines.', 'Learn molly lineups for post-plant denial.'],
      defending: ['Maintain your smoke to deplete enemy health as they push through.', 'Use your Ultimate to secure a site lockdown or a retake.']
    },
    phoenix: {
      attacking: ['Pop-flash around corners for self-entries.', 'Use Blaze to cut off sightlines and heal simultaneously.'],
      defending: ['Use Hot Hands to stall a push in a narrow corridor.', 'Retake using Run It Back to gather information and find an opening.']
    },
    reyna: {
      attacking: ['Entry with Leer to blind defenders.', 'Frag out and use Dismiss to escape or Devour to get back to full health.'],
      defending: ['Hold aggressive off-angles; if you get a kill, you can safely reposition or heal.']
    },
    brimstone: {
      attacking: ['Time your smokes for a precise site execution.', 'Drop Stim Beacon as your team initiates the push.'],
      defending: ['Use Incendiary to stop a plant or slow down a fast push.', 'Save your Ultimate for post-plant scenarios or crowded choke points.']
    },
    breach: {
      attacking: ['Flash through walls for your team as they entry.', 'Use Aftershock to clear out hidden corners or corners you can\'t reach.'],
      defending: ['Delay the enemies with Fault Line when they try to enter the site.', 'Follow up your stun with aggressive peeks.']
    }
  };

  return adviceMap[agentId] || {
    attacking: ['Coordinate utility with your entry players.', 'Focus on trade potential.'],
    defending: ['Play for the retake if you are outnumbered.', 'Communicate enemy rotations clearly.']
  };
}
