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
      setRecommendedAgent(null); // Clear recommendation when browsing
      setPositioningAdvice(getPositioningAdvice(agent.id));
    });
  };

  const handleGetBuyAdvice = () => {
    const recommendation = getBuyRecommendation(roundNumber, { kda, playerCredits }, wonLastRound);
    setBuyRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased font-sans">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24 max-w-5xl">
          <header className="mb-20">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-50 mb-4 tracking-tight">
              Valodvisor
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Strategic tactical intelligence for Valorant grinders. Get precise agent picks, positioning guides, and economy management.
            </p>
          </header>

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="flex w-fit bg-transparent border-b border-slate-800 rounded-none h-auto p-0 mb-12 gap-8">
              <TabsTrigger 
                value="agent" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-red-500 border-b-2 border-transparent rounded-none px-0 py-2 text-slate-400 font-medium transition-all shadow-none"
              >
                Strategy
              </TabsTrigger>
              <TabsTrigger 
                value="buy" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-red-500 border-b-2 border-transparent rounded-none px-0 py-2 text-slate-400 font-medium transition-all shadow-none"
              >
                Economy
              </TabsTrigger>
              <TabsTrigger 
                value="agents" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-red-500 border-b-2 border-transparent rounded-none px-0 py-2 text-slate-400 font-medium transition-all shadow-none"
              >
                Database
              </TabsTrigger>
            </TabsList>

            <TabsContent value="agent" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <div className="sticky top-12 space-y-8">
                    <section>
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Execution Parameters</h2>
                      <div className="space-y-6">
                        <div className="grid gap-2">
                          <Label className="text-slate-300 text-xs font-medium uppercase tracking-wider">Combat Level</Label>
                          <Input
                            type="number"
                            min="1"
                            max="500"
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-11 focus:ring-1 focus:ring-red-500/50"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-slate-300 text-xs font-medium uppercase tracking-wider">Active Map</Label>
                          <Select value={selectedMap} onValueChange={setSelectedMap}>
                            <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-100 h-11">
                              <SelectValue placeholder="Select Deployment Zone" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800">
                              {maps.map((map) => (
                                <SelectItem key={map.id} value={map.id} className="text-slate-100 focus:bg-slate-800">
                                  {map.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={handleGetRecommendation}
                          disabled={!selectedMap || isPending}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-12 rounded-lg transition-all"
                        >
                          {isPending ? 'Analyzing...' : 'Generate Strategy'}
                        </Button>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {recommendedAgent ? (
                    <div className="space-y-8">
                      <section>
                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Subject Identified</h2>
                        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
                          <CardHeader className="p-8 border-b border-slate-800/50">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-3xl font-bold text-slate-50 mb-2">{recommendedAgent.name}</CardTitle>
                                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-tighter">
                                  {recommendedAgent.role}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Complexity</span>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`h-1.5 w-4 rounded-full ${i < recommendedAgent.difficulty ? 'bg-red-500' : 'bg-slate-800'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-8 space-y-8">
                            <p className="text-slate-300 leading-relaxed text-lg">
                              {recommendedAgent.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-8">
                              <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Strengths</h4>
                                <ul className="space-y-3">
                                  {recommendedAgent.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                      <div className="w-1 h-1 rounded-full bg-red-500" />
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Skillset</h4>
                                <ul className="space-y-3">
                                  {recommendedAgent.abilities.map((a, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                                      {typeof a === 'string' ? a : a.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </section>

                      {positioningAdvice && (
                        <section>
                          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Tactical Positioning</h2>
                          <div className="grid gap-6">
                            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                              <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Offensive
                              </h3>
                              <ul className="space-y-3">
                                {positioningAdvice.attacking.map((tip, i) => (
                                  <li key={i} className="text-sm text-slate-300 leading-relaxed">{tip}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl">
                              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Defensive
                              </h3>
                              <ul className="space-y-3">
                                {positioningAdvice.defending.map((tip, i) => (
                                  <li key={i} className="text-sm text-slate-300 leading-relaxed">{tip}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </section>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-800 rounded-2xl opacity-40">
                      <span className="text-4xl mb-4">🔎</span>
                      <p className="text-slate-500 font-medium">Define parameters to generate strategy</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buy" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <div className="sticky top-12">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Budget Review</h2>
                    <div className="p-8 border border-slate-800 bg-slate-900/40 rounded-2xl space-y-6">
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Round</Label>
                        <Input
                          type="number"
                          value={roundNumber}
                          onChange={(e) => setRoundNumber(Number(e.target.value))}
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Current Liquid</Label>
                        <Input
                          type="number"
                          value={playerCredits}
                          onChange={(e) => setPlayerCredits(Number(e.target.value))}
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Combat Performance (KDA)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={kda}
                          onChange={(e) => setKda(Number(e.target.value))}
                          className="bg-slate-950 border-slate-800"
                        />
                      </div>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Previous Round Result</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setWonLastRound(true)}
                            className={`flex-1 h-10 text-xs font-bold uppercase tracking-wider transition-all ${wonLastRound ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                          >
                            Victory
                          </Button>
                          <Button 
                            onClick={() => setWonLastRound(false)}
                            className={`flex-1 h-10 text-xs font-bold uppercase tracking-wider transition-all ${!wonLastRound ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                          >
                            Defeat
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleGetBuyAdvice}
                        className="w-full bg-slate-50 text-slate-950 hover:bg-white font-bold h-12 rounded-lg mt-8"
                      >
                        Run Projection
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  {buyRecommendation ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">Budgetary Guidance</h2>
                      <div className="p-10 border border-slate-800 bg-slate-900/60 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                          <span className="text-slate-800 font-black text-6xl select-none">#{buyRecommendation.round}</span>
                        </div>
                        <div className="relative z-10 space-y-12">
                          <div>
                            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Strategic Directive</h3>
                            <p className="text-2xl text-slate-100 font-medium leading-normal max-w-lg">
                              {buyRecommendation.reason}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-6">
                              <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Ordnance</h4>
                              <div className="space-y-3">
                                {buyRecommendation.weapons.map((w, i) => (
                                  <div key={i} className="text-lg font-semibold text-slate-200">{w}</div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-6">
                              <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Protection</h4>
                              <div className="text-xl font-semibold text-slate-200">{buyRecommendation.armor}</div>
                            </div>
                            <div className="space-y-6">
                              <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Utility</h4>
                              <div className="text-xl font-semibold text-slate-200">{buyRecommendation.abilities}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-800 rounded-2xl opacity-40">
                      <span className="text-4xl mb-4">📊</span>
                      <p className="text-slate-500 font-medium">Enter mission data for projection</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="mt-8">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Personnel Database</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                <div className="mt-16 pt-16 border-t border-slate-900 animate-in fade-in slide-in-from-bottom-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                      <div className="aspect-[4/5] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center relative">
                        <span className="text-9xl font-black text-slate-800/50 absolute bottom-0 right-0 -mr-4 -mb-8 leading-none">{selectedAgentFromGrid.name.slice(0,1)}</span>
                        <div className="relative z-10 text-center">
                           <span className="text-slate-500 uppercase text-[10px] font-bold tracking-widest block mb-2">{selectedAgentFromGrid.role}</span>
                           <h3 className="text-4xl font-bold">{selectedAgentFromGrid.name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-8 flex flex-col justify-center gap-12">
                      <p className="text-2xl text-slate-300 leading-relaxed font-medium">
                        {selectedAgentFromGrid.description}
                      </p>
                      <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-6">
                           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Capabilities</h4>
                           <div className="flex flex-wrap gap-2">
                             {selectedAgentFromGrid.abilities.map((a, i) => (
                               <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm font-medium text-slate-300">
                                 {typeof a === 'string' ? a : a.name}
                               </span>
                             ))}
                           </div>
                        </div>
                        <div className="space-y-6">
                           <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tactical Score</h4>
                           <div className="space-y-4">
                              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: `${(selectedAgentFromGrid.difficulty / 5) * 100}%` }} />
                              </div>
                              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Operational Complexity: {selectedAgentFromGrid.difficulty}/5</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <footer className="text-left mt-32 pt-16 border-t border-slate-800/30">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="max-w-xs">
                <span className="text-slate-100 font-bold tracking-tighter text-lg block mb-4">Valodvisor</span>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Precision engineered tactical support system for optimal performance.
                </p>
              </div>
              <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest space-y-2">
                <p>© 2026 Operational Intelligence</p>
                <p>Not affiliated with RIOT GAMES</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
