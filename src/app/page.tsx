'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Valodvisor
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
            Smart Valorant agent picks, positioning &amp; eco advice
          </p>
        </header>

        <Tabs defaultValue="agent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
            <TabsTrigger value="agent">🧠 Agent Pick</TabsTrigger>
            <TabsTrigger value="buy">💰 Buy Guide</TabsTrigger>
            <TabsTrigger value="agents">👥 All Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="agent" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Personalized Agent Recommendation</CardTitle>
                <CardDescription className="text-gray-300">
                  Based on your level and map
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-white">Player Level</Label>
                    <Input
                      id="level"
                      type="number"
                      min="1"
                      max="100"
                      value={level}
                      onChange={(e) => setLevel(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="1-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="map" className="text-white">Map</Label>
                    <Select value={selectedMap} onValueChange={setSelectedMap}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Choose map" />
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
                </div>

                <Button 
                  onClick={handleGetRecommendation}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  disabled={!selectedMap}
                >
                  Get Recommendation
                </Button>

                {recommendedAgent && (
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl border border-red-400/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
                          {recommendedAgent.name.slice(0,1).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{recommendedAgent.name}</h3>
                          <p className="text-sm text-red-300">{recommendedAgent.role} • {recommendedAgent.difficulty}/5 ⭐</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{recommendedAgent.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-400/30">
                          <h4 className="text-indigo-400 font-bold mb-2">💪 Strengths</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {recommendedAgent.strengths.map((s, i) => <li key={i}>→ {s}</li>)}
                          </ul>
                        </div>
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-400/30">
                          <h4 className="text-emerald-400 font-bold mb-2">✨ Abilities</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {recommendedAgent.abilities.map((a, i) => <li key={i}>⚡ {a}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="positioning">
                        <AccordionTrigger className="text-white hover:text-white/80">🎯 Positioning Tips</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <div>
                              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-1">⚔️ Attacking</h4>
                              <ul className="space-y-1 text-sm text-gray-300">
                                {positioningAdvice?.attacking.map((tip, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-400">→</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-1">🛡️ Defending</h4>
                              <ul className="space-y-1 text-sm text-gray-300">
                                {positioningAdvice?.defending.map((tip, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-400">→</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buy" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Economy Buy Guide</CardTitle>
                <CardDescription className="text-gray-300">
                  Smart buys based on round, stats &amp; last round
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="round" className="text-white">Round</Label>
                    <Input
                      id="round"
                      type="number"
                      min="1"
                      max="25"
                      value={roundNumber}
                      onChange={(e) => setRoundNumber(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="1-25"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kda" className="text-white">KDA</Label>
                    <Input
                      id="kda"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={kda}
                      onChange={(e) => setKda(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="1.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credits" className="text-white">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="0"
                      max="9000"
                      value={playerCredits}
                      onChange={(e) => setPlayerCredits(Number(e.target.value))}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="$2900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastRound" className="text-white">Last Round</Label>
                    <Select value={wonLastRound.toString()} onValueChange={(v) => setWonLastRound(v === 'true')}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Won/Lost" />
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
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  Get Buy Rec
                </Button>

                {buyRecommendation && (
                  <div className="p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-400/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Round {buyRecommendation.round}</h3>
                        <p className="text-yellow-400 text-lg italic">{buyRecommendation.reason}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-purple-900/20 rounded-xl border border-purple-400/30 text-center">
                        <h4 className="text-purple-400 font-bold text-xl mb-4">🔫 Weapons</h4>
                        <ul className="space-y-2 text-gray-300">
                          {buyRecommendation.weapons.map((w, i) => <li key={i} className="text-lg">{w}</li>)}
                        </ul>
                      </div>
                      <div className="p-6 bg-yellow-900/20 rounded-xl border border-yellow-400/30 text-center">
                        <h4 className="text-yellow-400 font-bold text-xl mb-3">🛡️ Armor</h4>
                        <p className="text-gray-300 text-lg">{buyRecommendation.armor}</p>
                      </div>
                      <div className="p-6 bg-cyan-900/20 rounded-xl border border-cyan-400/30 text-center">
                        <h4 className="text-cyan-400 font-bold text-xl mb-3">⚡ Abilities</h4>
                        <p className="text-gray-300 text-lg">{buyRecommendation.abilities}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">All Agents</CardTitle>
                <CardDescription className="text-gray-300">Quick reference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {agents.map((agent) => (
                    <div 
                      key={agent.id}
                      className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                      onClick={() => {
                        setRecommendedAgent(agent);
                        setPositioningAdvice(getPositioningAdvice(agent.id));
                      }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-bold text-white">{agent.name.slice(0,1).toUpperCase()}</span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-1 group-hover:text-red-400">{agent.name}</h4>
                      <p className="text-xs text-red-400 uppercase tracking-wider font-semibold">{agent.role}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {'★'.repeat(agent.difficulty)}{'☆'.repeat(5 - agent.difficulty)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="text-center mt-16 pt-16 border-t border-white/10 text-gray-400 text-sm">
          <p>Made for Valorant grinders 🎮</p>
          <p className="mt-1">Fan-made • Not affiliated with Riot Games</p>
        </footer>
      </div>
    </div>
  );
}
