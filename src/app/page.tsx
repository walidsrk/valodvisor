'use client';

import { useState, useTransition } from 'react';
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
      setRecommendedAgent(null);
      setPositioningAdvice(getPositioningAdvice(agent.id));
    });
  };

  const handleGetBuyAdvice = () => {
    const recommendation = getBuyRecommendation(roundNumber, { kda, playerCredits }, wonLastRound);
    setBuyRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-[#0f1923] text-[#ece8e1] val-geometric italic-none">
      {/* Decorative Border */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#ff4655] z-50"></div>
      
      <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
        <header className="mb-16 border-l-4 border-[#ff4655] pl-6 py-2">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-2">
            Valod<span className="text-[#ff4655]">visor</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
            Tactical Analysis / Sector 7-C
          </p>
        </header>

        <Tabs defaultValue="agent" className="w-full">
          <TabsList className="flex w-full overflow-x-auto bg-[#1f2326] p-0 h-auto mb-10 gap-1 border-b-2 border-slate-800">
            {['agent', 'buy', 'agents'].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab} 
                className="flex-1 rounded-none px-8 py-4 text-xs font-black uppercase tracking-widest transition-all data-[state=active]:bg-[#ff4655] data-[state=active]:text-[#ece8e1] hover:bg-slate-800"
              >
                {tab === 'agent' ? 'Recommendation' : tab === 'buy' ? 'Economy' : 'Roster'}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="agent" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <div className="bg-[#1f2326] p-8 val-panel">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-slate-700 pb-4">Input Parameters</h3>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400">Combat Level</Label>
                      <Input
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        className="bg-[#0f1923] border-slate-700 rounded-none h-12 focus:border-[#ff4655] transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400">Deployment Zone</Label>
                      <Select value={selectedMap} onValueChange={setSelectedMap}>
                        <SelectTrigger className="bg-[#0f1923] border-slate-700 rounded-none h-12">
                          <SelectValue placeholder="MAP SELECT" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1f2326] border-slate-700 rounded-none">
                          {maps.map((map) => (
                            <SelectItem key={map.id} value={map.id} className="text-[#ece8e1] uppercase font-bold focus:bg-[#ff4655]">
                              {map.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleGetRecommendation}
                      className="w-full bg-[#ff4655] hover:bg-[#ff4655]/90 text-white font-black h-16 rounded-none val-btn uppercase tracking-widest border-b-4 border-red-900"
                    >
                      {isPending ? 'Processing...' : 'Execute Analysis'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                {recommendedAgent ? (
                  <div className="bg-[#ece8e1] text-[#0f1923] p-10 val-panel relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="text-[12rem] font-black leading-none">{recommendedAgent.name[0]}</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-8 border-b-4 border-[#0f1923] pb-6">
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter">{recommendedAgent.name}</h2>
                                <span className="bg-[#ff4655] text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
                                    {recommendedAgent.role}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-50">Operation Complexity</span>
                                <div className="flex gap-1 justify-end">
                                    {[...Array(5)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`h-4 w-2 ${i < recommendedAgent.difficulty ? 'bg-[#ff4655]' : 'bg-slate-300'}`} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-lg font-bold leading-snug mb-10 max-w-2xl">
                          {recommendedAgent.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-[#ff4655] pl-3">Combat Strengths</h4>
                                <ul className="space-y-2 font-bold text-sm">
                                    {recommendedAgent.strengths.map((s, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="h-1 w-1 bg-[#ff4655]" /> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-[#ff4655] pl-3">Abilities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {recommendedAgent.abilities.map((a, i) => (
                                        <span key={i} className="bg-[#0f1923] text-[#ece8e1] px-3 py-1 text-[10px] font-black uppercase">
                                            {typeof a === 'string' ? a : a.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#0f1923]/5 p-6 border-2 border-[#0f1923]/10">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#ff4655] mb-4">Attacking Routine</h4>
                                <ul className="space-y-2 text-xs font-bold leading-relaxed">
                                    {positioningAdvice?.attacking.map((t, i) => <li key={i}>// {t}</li>)}
                                </ul>
                            </div>
                            <div className="bg-[#0f1923]/5 p-6 border-2 border-[#0f1923]/10">
                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Defending Routine</h4>
                                <ul className="space-y-2 text-xs font-bold leading-relaxed">
                                    {positioningAdvice?.defending.map((t, i) => <li key={i}>// {t}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[400px] border-4 border-dashed border-slate-800 flex flex-col items-center justify-center grayscale opacity-20">
                    <span className="text-8xl font-black mb-4">MAP_EMPTY</span>
                    <p className="font-bold uppercase tracking-widest">Awaiting sector selection</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buy">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 bg-[#1f2326] p-8 val-panel">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-slate-700 pb-4">Economy Status</h3>
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400 font-bold">Round Count</Label>
                            <Input type="number" value={roundNumber} onChange={(e) => setRoundNumber(Number(e.target.value))} className="bg-[#0f1923] border-slate-700 rounded-none h-12" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400 font-bold">Liquid Credits</Label>
                            <Input type="number" value={playerCredits} onChange={(e) => setPlayerCredits(Number(e.target.value))} className="bg-[#0f1923] border-slate-700 rounded-none h-12" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400 font-bold">Aggression (KDA)</Label>
                            <Input type="number" step="0.1" value={kda} onChange={(e) => setKda(Number(e.target.value))} className="bg-[#0f1923] border-slate-700 rounded-none h-12" />
                        </div>
                        <div className="pt-4">
                            <Label className="uppercase text-[10px] font-black tracking-widest text-slate-400 font-bold block mb-4">Last Bout Result</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button onClick={() => setWonLastRound(true)} className={`rounded-none h-14 font-black transition-all ${wonLastRound ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-500'}`}>WIN</Button>
                                <Button onClick={() => setWonLastRound(false)} className={`rounded-none h-14 font-black transition-all ${!wonLastRound ? 'bg-[#ff4655] text-white' : 'bg-slate-800 text-slate-500'}`}>LOSS</Button>
                            </div>
                        </div>
                        <Button onClick={handleGetBuyAdvice} className="w-full bg-[#ece8e1] text-[#0f1923] hover:bg-white font-black h-16 rounded-none mt-4 uppercase">Analyze Economy</Button>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    {buyRecommendation ? (
                        <div className="bg-[#ff4655] p-12 val-panel shadow-2xl relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl">PROJ_8</div>
                            <div className="relative z-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-[#0f1923]">Economy Directive</h3>
                                <p className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 italic leading-none border-b-8 border-[#0f1923] pb-8">{buyRecommendation.reason}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-[#0f1923] p-6 text-[#ece8e1]">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50 underline decoration-red-500">Ordnance</h4>
                                        <div className="space-y-1">
                                            {buyRecommendation.weapons.map((w, i) => <p key={i} className="text-xl font-black uppercase">{w}</p>)}
                                        </div>
                                    </div>
                                    <div className="bg-[#0f1923] p-6 text-[#ece8e1]">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50 underline decoration-red-500">Armor</h4>
                                        <p className="text-xl font-black uppercase">{buyRecommendation.armor}</p>
                                    </div>
                                    <div className="bg-[#0f1923] p-6 text-[#ece8e1]">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50 underline decoration-red-500">Utility</h4>
                                        <p className="text-xl font-black uppercase">{buyRecommendation.abilities}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] border-4 border-dashed border-slate-800 flex flex-col items-center justify-center grayscale opacity-20">
                            <span className="text-8xl font-black mb-4">ECO_MISSING</span>
                            <p className="font-bold uppercase tracking-widest">Awaiting match statistics</p>
                        </div>
                    )}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="agents">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {agents.map((agent) => (
                        <div 
                            key={agent.id}
                            onClick={() => handleAgentSelect(agent)}
                            className={`p-6 border-b-4 bg-[#1f2326] cursor-pointer transition-all ${selectedAgentFromGrid?.id === agent.id ? 'border-[#ff4655] scale-105 z-10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <div className="aspect-square bg-slate-800 mb-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 flex items-center justify-center text-4xl font-black">
                                {agent.name[0]}
                            </div>
                            <h4 className="font-black uppercase text-sm tracking-tighter">{agent.name}</h4>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{agent.role}</span>
                        </div>
                    ))}
                </div>

                {selectedAgentFromGrid && (
                    <div className="mt-20 bg-[#ece8e1] text-[#0f1923] p-12 val-panel transition-all animate-in slide-in-from-bottom-5">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                             <div className="lg:col-span-4">
                                 <div className="aspect-[3/4] bg-[#0f1923] flex items-center justify-center text-9xl font-black text-[#ece8e1] relative">
                                     {selectedAgentFromGrid.name[0]}
                                     <div className="absolute top-0 right-0 p-4 text-[10px] font-black tracking-widest text-[#ece8e1]/20">BIO_SEC_A</div>
                                 </div>
                             </div>
                             <div className="lg:col-span-8 py-8">
                                 <h2 className="text-7xl font-black uppercase tracking-tighter mb-4">{selectedAgentFromGrid.name}</h2>
                                 <div className="flex gap-4 mb-8">
                                    <span className="bg-[#ff4655] text-white px-4 py-1 text-xs font-black uppercase tracking-widest">AGENT // {selectedAgentFromGrid.role}</span>
                                    <span className="border-2 border-[#0f1923] px-4 py-1 text-xs font-black uppercase tracking-widest">DIFFICULTY // {selectedAgentFromGrid.difficulty}</span>
                                 </div>
                                 <p className="text-3xl font-bold leading-tight mb-12 max-w-2xl text-[#0f1923]/80">{selectedAgentFromGrid.description}</p>
                                 <div className="grid grid-cols-2 gap-12">
                                     <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-widest underline decoration-[#ff4655] decoration-4 underline-offset-8">Core Abilities</h4>
                                        <div className="grid grid-cols-1 gap-2 pt-4">
                                            {selectedAgentFromGrid.abilities.map((a, i) => (
                                                <div key={i} className="flex flex-col">
                                                    <span className="text-sm font-black uppercase">{typeof a === 'string' ? a : a.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{typeof a === 'string' ? 'STANDARD' : a.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                )}
          </TabsContent>
        </Tabs>

        <footer className="mt-40 pt-16 border-t font-black border-slate-800 text-slate-500 text-[10px] tracking-[0.5em] uppercase flex flex-col md:flex-row justify-between gap-10">
          <div>Valodvisor // Operations Dashboard</div>
          <div>EST. 2026 // Not Authorized by RIOT GAMES</div>
        </footer>
      </div>
    </div>
  );
}
