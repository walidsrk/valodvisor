export interface BuyRecommendation {
  round: number;
  weapons: string[];
  armor: string;
  abilities: string;
  reason: string;
}

export interface PlayerStats {
  kda: number; // Kill-Death-Assist ratio
  playerCredits: number; // Available player credits
}

export function getBuyRecommendation(
  roundNumber: number,
  playerStats: PlayerStats,
  wonLastRound: boolean
): BuyRecommendation {
  const { kda, playerCredits } = playerStats;

  // Pistol round (Round 1)
  if (roundNumber === 1) {
    return {
      round: 1,
      weapons: ['Classic (free)', 'Ghost (500c)'],
      armor: 'Light Armor (400c)',
      abilities: 'Full abilities',
      reason: 'Pistol round - maximize abilities and light armor'
    };
  }

  // Round 2 after winning pistol
  if (roundNumber === 2 && wonLastRound) {
    return {
      round: 2,
      weapons: ['Spectre (1600c)', 'Sheriff (800c)'],
      armor: 'Light Armor (400c)',
      abilities: 'Essential abilities only',
      reason: 'Anti-eco - SMG or Sheriff with armor to maintain advantage'
    };
  }

  // Round 2 after losing pistol (save/light buy)
  if (roundNumber === 2 && !wonLastRound) {
    return {
      round: 2,
      weapons: ['Classic', 'Sheriff (800c) if good'],
      armor: 'None',
      abilities: 'Skip most abilities',
      reason: 'Save round - full buy on round 4'
    };
  }

  // Round 3 (bonus round)
  if (roundNumber === 3) {
    if (playerCredits >= 3900) {
      return {
        round: 3,
        weapons: ['Phantom (2900c)', 'Vandal (2900c)'],
        armor: 'Heavy Armor (1000c)',
        abilities: 'Full abilities',
        reason: 'Full buy - you have enough credits'
      };
    } else {
      return {
        round: 3,
        weapons: ['Spectre (1600c)', 'Marshal (950c)'],
        armor: 'Light Armor (400c)',
        abilities: 'Essential abilities',
        reason: 'Force buy - try to disrupt enemy economy'
      };
    }
  }

  // Standard buy logic for later rounds
  const canFullBuy = playerCredits >= 3900;
  const canHalfBuy = playerCredits >= 2000 && playerCredits < 3900;
  const shouldSave = playerCredits < 2000;

  // Strong performance (KDA > 1.5) - more aggressive
  if (kda > 1.5) {
    if (canFullBuy) {
      return {
        round: roundNumber,
        weapons: ['Phantom (2900c)', 'Vandal (2900c)', 'Operator (4700c) if confident'],
        armor: 'Heavy Armor (1000c)',
        abilities: 'Full abilities',
        reason: 'Full buy - strong KDA warrants full investment'
      };
    } else if (canHalfBuy) {
      return {
        round: roundNumber,
        weapons: ['Guardian (2250c)', 'Bulldog (2050c)'],
        armor: 'Light Armor (400c)',
        abilities: 'Essential abilities',
        reason: 'Half buy - leverage your performance advantage'
      };
    }
  }

  // Average performance (KDA 0.8-1.5)
  if (kda >= 0.8 && kda <= 1.5) {
    if (canFullBuy) {
      return {
        round: roundNumber,
        weapons: ['Phantom (2900c)', 'Vandal (2900c)'],
        armor: 'Heavy Armor (1000c)',
        abilities: 'Full abilities',
        reason: 'Full buy - standard loadout'
      };
    } else if (canHalfBuy) {
      return {
        round: roundNumber,
        weapons: ['Spectre (1600c)', 'Sheriff (800c)'],
        armor: 'Light Armor (400c)',
        abilities: 'Essential abilities only',
        reason: 'Eco round - save for next full buy'
      };
    }
  }

  // Poor performance (KDA < 0.8) - more conservative
  if (kda < 0.8) {
    if (canFullBuy) {
      return {
        round: roundNumber,
        weapons: ['Phantom (2900c)', 'Vandal (2900c)'],
        armor: 'Heavy Armor (1000c)',
        abilities: 'Full abilities',
        reason: 'Full buy - try to turn the game around'
      };
    } else if (canHalfBuy) {
      return {
        round: roundNumber,
        weapons: ['Classic', 'Abilities only'],
        armor: 'None',
        abilities: 'Full abilities',
        reason: 'Save round - focus on ability usage and positioning'
      };
    }
  }

  // Default save recommendation
  return {
    round: roundNumber,
    weapons: ['Classic (free)'],
    armor: 'None',
    abilities: 'Essential abilities only',
    reason: 'Save round - build economy for full buy next round'
  };
}

export const economyGuide = {
  title: 'Valorant Economy Guide',
  roundRewards: {
    killReward: 200,
    winReward: 3000,
    lossReward: [1900, 2400, 2900], // Consecutive loss rewards: 1st, 2nd, 3rd+ losses
    plantReward: 300,
    defuseReward: 300
  },
  weaponPrices: {
    rifles: {
      'Vandal': 2900,
      'Phantom': 2900,
      'Guardian': 2250,
      'Bulldog': 2050
    },
    smgs: {
      'Spectre': 1600,
      'Stinger': 950
    },
    snipers: {
      'Operator': 4700,
      'Marshal': 950
    },
    sidearms: {
      'Ghost': 500,
      'Sheriff': 800,
      'Classic': 0
    }
  },
  armorPrices: {
    'Heavy Armor': 1000,
    'Light Armor': 400
  }
};
