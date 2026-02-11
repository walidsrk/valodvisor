'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { agents, maps, getRecommendedAgent, getPositioningAdvice } from '@/data/valorant-data';
import { getBuyRecommendation } from '@/data/economy';
import type { Agent } from '@/data/valorant-data';
import type { BuyRecommendation } from '@/data/economy';

export default function Home() {
  const [level, setLevel] = useState<number>(1);
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [recommendedAgent, setRecommendedAgent] = useState<Agent | null>(null);
  const [positioningAdvice, setPositioningAdvice] = useState<{ attacking: string[], defending: string[] } | null>(null);
  
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [kda, setKda] = useState<number>(1.0);
  const [playerCredits, setPlayerCredits] = useState<number>(800);
  const [wonLastRound, setWonLastRound] = useState<boolean>(false);
  const [buyRecommendation, setBuyRecommendation] = useState<BuyRecommendation | null>(null);

  const handleGetRecommendation = () => {
    if (selectedMap) {
      const agent = getRecommendedAgent(level, selectedMap);
      if (agent) {
        setRecommendedAgent(agent);
        setPositioningAdvice(getPositioningAdvice(agent.id));
      }
    }
  };

  const handleGetBuyAdvice = () => {
    const recommendation = getBuyRecommendation(roundNumber, { kda, playerCredits }, wonLastRound);
    setBuyRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Valodvisor
          </h1>
          <p className="text-xl text-gray-300">
            Your Personal Valorant Grinding Advisor
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Agent Selection Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Agent Selection</CardTitle>
              <CardDescription className="text-gray-300">
                Get personalized agent recommendations based on your level and map
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="level" className="text-white">Player Level</Label>
                <Input
                  id="level"
                  type="number"
                  min="1"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter your level (1-100)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="map" className="text-white">Select Map</Label>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose a map" />
                  </SelectTrigger>
                  <SelectContent>
                    {maps.map((map) => (
                      <SelectItem key={map.id} value={map.id}>
                        {map.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGetRecommendation}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={!selectedMap}
              >
                Get Agent Recommendation
              </Button>

              {recommendedAgent && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Recommended: {recommendedAgent.name}
                  </h3>
                  <p className="text-sm text-red-400 mb-2">
                    {recommendedAgent.role} • Difficulty: {recommendedAgent.difficulty}/5
                  </p>
                  <p className="text-gray-300 mb-3">
                    {recommendedAgent.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="text-white font-semibold mb-1">Strengths:</h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm">
                      {recommendedAgent.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Abilities:</h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm">
                      {recommendedAgent.abilities.map((ability, idx) => (
                        <li key={idx}>{ability}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Positioning Advice Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Positioning & Gameplay</CardTitle>
              <CardDescription className="text-gray-300">
                Learn how to play and position with your agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {positioningAdvice ? (
                <div className="space-y-6">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h3 className="text-lg font-bold text-green-400 mb-3">
                      🎯 Attacking
                    </h3>
                    <ul className="space-y-2">
                      {positioningAdvice.attacking.map((tip, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <h3 className="text-lg font-bold text-blue-400 mb-3">
                      🛡️ Defending
                    </h3>
                    <ul className="space-y-2">
                      {positioningAdvice.defending.map((tip, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  Select an agent to see positioning advice
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Buy Recommendation Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Economy & Buy Recommendations</CardTitle>
            <CardDescription className="text-gray-300">
              Get smart buy recommendations based on round, KDA, and team economy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="round" className="text-white">Round Number</Label>
                <Input
                  id="round"
                  type="number"
                  min="1"
                  max="25"
                  value={roundNumber}
                  onChange={(e) => setRoundNumber(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kda" className="text-white">Your KDA</Label>
                <Input
                  id="kda"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={kda}
                  onChange={(e) => setKda(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credits" className="text-white">Your Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min="0"
                  max="9000"
                  value={playerCredits}
                  onChange={(e) => setPlayerCredits(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastRound" className="text-white">Last Round Result</Label>
                <Select value={wonLastRound.toString()} onValueChange={(v) => setWonLastRound(v === 'true')}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Won</SelectItem>
                    <SelectItem value="false">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGetBuyAdvice}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700"
            >
              Get Buy Recommendation
            </Button>

            {buyRecommendation && (
              <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Round {buyRecommendation.round} Recommendation
                  </h3>
                  <p className="text-yellow-400 italic">
                    {buyRecommendation.reason}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-400 font-semibold mb-2">💰 Weapons</h4>
                    <ul className="space-y-1">
                      {buyRecommendation.weapons.map((weapon, idx) => (
                        <li key={idx} className="text-gray-300 text-sm">
                          {weapon}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                    <h4 className="text-yellow-400 font-semibold mb-2">🛡️ Armor</h4>
                    <p className="text-gray-300 text-sm">
                      {buyRecommendation.armor}
                    </p>
                  </div>

                  <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                    <h4 className="text-cyan-400 font-semibold mb-2">⚡ Abilities</h4>
                    <p className="text-gray-300 text-sm">
                      {buyRecommendation.abilities}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Agent Reference */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Quick Agent Reference</CardTitle>
            <CardDescription className="text-gray-300">
              Browse all available agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => {
                    setRecommendedAgent(agent);
                    setPositioningAdvice(getPositioningAdvice(agent.id));
                  }}
                >
                  <h4 className="text-white font-bold mb-1">{agent.name}</h4>
                  <p className="text-xs text-red-400 mb-2">{agent.role}</p>
                  <p className="text-xs text-gray-400">
                    Difficulty: {'★'.repeat(agent.difficulty)}{'☆'.repeat(5 - agent.difficulty)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="text-center mt-12 text-gray-400 text-sm">
          <p>Valodvisor - Made for Valorant grinders 🎮</p>
          <p className="mt-2">Disclaimer: This is a fan-made tool and is not affiliated with Riot Games or Valorant.</p>
        </footer>
      </div>
    </div>
  );
}
