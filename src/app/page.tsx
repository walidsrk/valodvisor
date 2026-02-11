'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { AgentCard } from "@/components/agent-card"
import { agents, maps, getRecommendedAgent, getPositioningAdvice } from '@/data/valorant-data';
import { getBuyRecommendation } from '@/data/economy';
import type { Agent } from '@/data/valorant-data';
import type { BuyRecommendation } from '@/data/economy';
import { useTransition } from 'react';

export default function Home() {
  const [level, setLevel] = useState<number>(20);
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [recommendedAgent, setRecommendedAgent] = useState<Agent | null>(null);
  const [positioningAdvice, setPositioningAdvice] = useState<{ attacking: string[], defending: string[] } | null>(null);
  const [selectedAgentFromGrid, setSelectedAgentFromGrid] = useState<Agent | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [kda, setKda] = useState<number>(1.0);
  const [playerCredits, setPlayerCredits] = useState<number>(800);
  const [wonLastRound, setWonLastRound] = useState<boolean>(false);
  const [buyRecommendation, setBuyRecommendation] = useState<BuyRecommendation | null>(null);

  const handleGetRecommendation = () => {
    if (selectedMap) {
      startTransition(() => {
        const agent = getRecommendedAgent(level, selectedMap);
        if (agent) {
          setRecommendedAgent(agent);
          setPositioningAdvice(getPositioningAdvice(agent.id));
        }
      });
    }
  };

  const handleAgentSelect = (agent: Agent) => {
    startTransition(() => {
      setSelectedAgentFromGrid(agent);
      setRecommendedAgent(agent);
      setPositioningAdvice(getPositioningAdvice(agent.id));
    });
  };

  const handleGetBuyAdvice = () => {
    const recommendation = getBuyRecommendation(roundNumber, { kda, playerCredits }, wonLastRound);
    setBuyRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24 max-w-4xl">
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 mb-4">
              Valodvisor
            </h1>
            <p className="text-xl text-slate-400 max-w-md mx-auto leading-relaxed">
              Agent picks, positioning, and economy advice for Valorant.
            </p>
          </header>

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agent" className="data-[state=active]:bg-slate-200/50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                Agent
              </TabsTrigger>
              <TabsTrigger value="buy" className="data-[state=active]:bg-slate-200/50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                Economy
              </TabsTrigger>
              <TabsTrigger value="agents" className="data-[state=active]:bg-slate-200/50 data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
                Agents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="agent" className="mt-12">
              <div className="space-y-8">
                <div className="max-w-md mx-auto">
                  <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                        <Label className="text-slate-300 font-medium">Level</Label>
                        <Input
                          id="level"
                          type="number"
                          min="1"
                          max="100"
                          value={level}
                          onChange={(e) => setLevel(Number(e.target.value))}
                          className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          placeholder="Enter level"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-slate-300 font-medium">Map</Label>
                        <Select value={selectedMap} onValueChange={setSelectedMap}>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Select map" />
                          </SelectTrigger>
                          <SelectContent>
                            {maps.map((map) => (
                              <SelectItem key={map.id} value={map.id} className="text-slate-900">
                                {map.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleGetRecommendation}
                        disabled={!selectedMap}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium h-12"
                      >
                        Recommend Agent
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {recommendedAgent && (
                  <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-semibold text-slate-100">
                        {recommendedAgent.name}
                      </CardTitle>
                      <p className="text-slate-400">{recommendedAgent.role} • Difficulty {recommendedAgent.difficulty}/5</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-slate-300 leading-relaxed">{recommendedAgent.description}</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-200 mb-3">Strengths</h4>
                          <ul className="space-y-2 text-sm text-slate-400">
                            {recommendedAgent.strengths.map((strength, idx) => (
                              <li key={idx}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-200 mb-3">Abilities</h4>
                          <ul className="space-y-2 text-sm text-slate-400">
                            {recommendedAgent.abilities.map((ability, idx) => (
                              <li key={idx}>{ability}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="tips">
                          <AccordionTrigger className="text-slate-300 hover:text-slate-100">Positioning Tips</AccordionTrigger>
                          <AccordionContent className="pt-4 mt-2">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-medium text-slate-200 mb-2">Attacking</h5>
                                <ul className="space-y-1 text-sm text-slate-400">
                                  {positioningAdvice?.attacking.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-slate-200 mb-2">Defending</h5>
                                <ul className="space-y-1 text-sm text-slate-400">
                                  {positioningAdvice?.defending.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="buy" className="mt-12">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-6">
                    <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Round</Label>
                            <Input
                              type="number"
                              min="1"
                              max="25"
                              value={roundNumber}
                              onChange={(e) => setRoundNumber(Number(e.target.value))}
                              className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              placeholder="e.g. 5"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">KDA</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="10"
                              value={kda}
                              onChange={(e) => setKda(Number(e.target.value))}
                              className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              placeholder="e.g. 1.2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Credits</Label>
                            <Input
                              type="number"
                              min="0"
                              max="9000"
                              value={playerCredits}
                              onChange={(e) => setPlayerCredits(Number(e.target.value))}
                              className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              placeholder="e.g. 2900"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300 font-medium">Last Round</Label>
                            <Select value={wonLastRound.toString()} onValueChange={(v) => setWonLastRound(v === \'true\')}>
                              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100">
                                <SelectValue placeholder="Won/Lost" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true" className="text-slate-900">Won</SelectItem>
                                <SelectItem value="false" className="text-slate-900">Lost</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Button 
                      onClick={handleGetBuyAdvice}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium h-12"
                    >
                      Get Recommendation
                    </Button>
                  </div>
                </div>

                {buyRecommendation && (
                  <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-slate-100">Round {buyRecommendation.round}</h3>
                          <p className="text-slate-400 mt-1">{buyRecommendation.reason}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 border border-slate-200/30 rounded-lg">
                          <h4 className="font-semibold text-slate-200 mb-4 text-lg">Weapons</h4>
                          <ul className="space-y-2 text-slate-300">
                            {buyRecommendation.weapons.map((weapon, idx) => (
                              <li key={idx} className="text-lg">{weapon}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 border border-slate-200/30 rounded-lg">
                          <h4 className="font-semibold text-slate-200 mb-4 text-lg">Armor</h4>
                          <p className="text-xl text-slate-300">{buyRecommendation.armor}</p>
                        </div>
                        <div className="p-6 border border-slate-200/30 rounded-lg">
                          <h4 className="font-semibold text-slate-200 mb-4 text-lg">Abilities</h4>
                          <p className="text-xl text-slate-300">{buyRecommendation.abilities}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="agents" className="mt-12">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {agents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onClick={() => handleAgentSelect(agent)}
                      selected={selectedAgentFromGrid?.id === agent.id}
                    />
                  ))}
                </div>

                {selectedAgentFromGrid && (
                  <Card className="border-slate-200/50 bg-white/5 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl font-semibold text-slate-100">
                        {selectedAgentFromGrid.name}
                      </CardTitle>
                      <p className="text-slate-400">{selectedAgentFromGrid.role} • Difficulty {selectedAgentFromGrid.difficulty}/5</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-slate-300 leading-relaxed">{selectedAgentFromGrid.description}</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-200 mb-3">Strengths</h4>
                          <ul className="space-y-2 text-sm text-slate-400">
                            {selectedAgentFromGrid.strengths.map((strength, idx) => (
                              <li key={idx}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-200 mb-3">Abilities</h4>
                          <ul className="space-y-2 text-sm text-slate-400">
                            {selectedAgentFromGrid.abilities.map((ability, idx) => (
                              <li key={idx}>{ability}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {positioningAdvice && (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="tips">
                            <AccordionTrigger className="text-slate-300 hover:text-slate-100">Positioning Tips</AccordionTrigger>
                            <AccordionContent className="pt-4 mt-2">
                              <div className="space-y-4">
                                <div>
                                  <h5 className="font-medium text-slate-200 mb-2">Attacking</h5>
                                  <ul className="space-y-1 text-sm text-slate-400">
                                    {positioningAdvice.attacking.map((tip, idx) => (
                                      <li key={idx}>{tip}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium text-slate-200 mb-2">Defending</h5>
                                  <ul className="space-y-1 text-sm text-slate-400">
                                    {positioningAdvice.defending.map((tip, idx) => (
                                      <li key={idx}>{tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <footer className="text-center mt-32 pt-16 border-t border-slate-800/50 text-slate-500 text-sm">
            <p>Made for Valorant grinders</p>
            <p className="mt-1 text-xs">Fan-made • Not affiliated with Riot Games</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
