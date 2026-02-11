'use client';

import { useState, useTransition } from 'react';
import { agents, maps, getRecommendedAgent, getPositioningAdvice, ranks, type Rank } from '@/data/valorant-data';
import { getBuyRecommendation } from '@/data/economy';
import type { Agent } from '@/data/valorant-data';
import type { BuyRecommendation } from '@/data/economy';
import { AgentCard } from '@/components/agent-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Sub-components ---

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
        active
          ? 'border-[#ff4655] text-[#ff4655]'
          : 'border-transparent text-[#9ca3af] hover:text-[#ece8e1] hover:border-[#252530]'
      }`}
    >
      {children}
    </button>
  );
}

function SectionHeader({ title, icon }: { title: string; icon?: string }) {
  return (
    <h2 className="text-lg font-semibold text-[#ece8e1] mb-4 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h2>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-[#9ca3af]">{message}</p>
    </div>
  );
}

// --- Main Component ---

export default function Home() {
  // State
  const [activeTab, setActiveTab] = useState<'agent' | 'economy' | 'agents'>('agent');
  const [selectedRank, setSelectedRank] = useState<Rank>('Gold');
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [recommendedAgent, setRecommendedAgent] = useState<Agent | null>(null);
  const [positioningAdvice, setPositioningAdvice] = useState<{ attacking: string[]; defending: string[] } | null>(null);
  const [selectedAgentFromGrid, setSelectedAgentFromGrid] = useState<Agent | null>(null);
  const [isPending, startTransition] = useTransition();
  
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [kda, setKda] = useState<number>(1.0);
  const [playerCredits, setPlayerCredits] = useState<number>(800);
  const [wonLastRound, setWonLastRound] = useState<boolean>(false);
  const [buyRecommendation, setBuyRecommendation] = useState<BuyRecommendation | null>(null);

  // Handlers
  const handleGetRecommendation = () => {
    if (selectedMap) {
      startTransition(() => {
        const agent = getRecommendedAgent(selectedRank, selectedMap);
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
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#252530]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#ece8e1]">
            Valodvisor <span className="text-[#ff4655]">//</span>
          </h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-[#252530] bg-[#0a0a0f]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex">
          <TabButton active={activeTab === 'agent'} onClick={() => setActiveTab('agent')}>
            Agent
          </TabButton>
          <TabButton active={activeTab === 'economy'} onClick={() => setActiveTab('economy')}>
            Economy
          </TabButton>
          <TabButton active={activeTab === 'agents'} onClick={() => setActiveTab('agents')}>
            All Agents
          </TabButton>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Agent Tab */}
        {activeTab === 'agent' && (
          <div className="space-y-6">
            {/* Input Form */}
            <Card>
              <SectionHeader title="Find Your Agent" icon="🎯" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                    Your Rank
                  </label>
                  <select
                    value={selectedRank}
                    onChange={(e) => setSelectedRank(e.target.value as Rank)}
                    className="w-full px-4 py-3 rounded-lg bg-[#13131a] border border-[#252530] text-[#ece8e1] focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] transition-colors"
                  >
                    {ranks.map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                    Map
                  </label>
                  <select
                    value={selectedMap}
                    onChange={(e) => setSelectedMap(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#13131a] border border-[#252530] text-[#ece8e1] focus:outline-none focus:border-[#ff4655] focus:ring-1 focus:ring-[#ff4655] transition-colors"
                  >
                    <option value="">Select a map</option>
                    {maps.map((map) => (
                      <option key={map.id} value={map.id}>
                        {map.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleGetRecommendation}
                  disabled={!selectedMap || isPending}
                  className="w-full sm:w-auto"
                  loading={isPending}
                >
                  Get Recommendation
                </Button>
              </div>
            </Card>

            {/* Recommendation Result */}
            {recommendedAgent && (
              <Card className="bg-gradient-to-br from-[#1a1a24] to-[#13131a]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#252530] flex items-center justify-center text-2xl font-bold shrink-0">
                    {recommendedAgent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#ece8e1]">{recommendedAgent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-[#ff4655]/20 text-[#ff4655] text-xs font-medium rounded">
                        {recommendedAgent.role}
                      </span>
                      <span className="text-xs text-[#9ca3af]">
                        Difficulty: {recommendedAgent.difficulty}/5
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-[#9ca3af] mb-6">{recommendedAgent.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#ece8e1] mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {recommendedAgent.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-[#9ca3af] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#ff4655]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#ece8e1] mb-2">Abilities</h4>
                    <ul className="space-y-1">
                      {recommendedAgent.abilities.map((a, i) => (
                        <li key={i} className="text-sm text-[#9ca3af] flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#353545]" />
                          {a.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {positioningAdvice && (
                  <div className="space-y-4 pt-4 border-t border-[#252530]">
                    <div>
                      <h4 className="text-sm font-medium text-[#ece8e1] mb-2">💥 Attacking</h4>
                      <ul className="space-y-1">
                        {positioningAdvice.attacking.map((tip, i) => (
                          <li key={i} className="text-sm text-[#9ca3af]">{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#ece8e1] mb-2">🛡️ Defending</h4>
                      <ul className="space-y-1">
                        {positioningAdvice.defending.map((tip, i) => (
                          <li key={i} className="text-sm text-[#9ca3af]">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {!recommendedAgent && !isPending && (
              <EmptyState message="Select a map to get an agent recommendation" />
            )}
          </div>
        )}

        {/* Economy Tab */}
        {activeTab === 'economy' && (
          <div className="space-y-6">
            <Card>
              <SectionHeader title="Economy Calculator" icon="💰" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Input
                  label="Round"
                  type="number"
                  min="1"
                  max="25"
                  value={roundNumber}
                  onChange={(e) => setRoundNumber(Number(e.target.value))}
                />
                <Input
                  label="Credits"
                  type="number"
                  min="0"
                  max="9000"
                  value={playerCredits}
                  onChange={(e) => setPlayerCredits(Number(e.target.value))}
                />
                <Input
                  label="KDA"
                  type="number"
                  step="0.1"
                  min="0"
                  value={kda}
                  onChange={(e) => setKda(Number(e.target.value))}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#9ca3af] uppercase tracking-wide">
                    Last Round
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWonLastRound(true)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                        wonLastRound
                          ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]'
                          : 'bg-[#13131a] text-[#9ca3af] border border-[#252530] hover:border-[#353545]'
                      }`}
                    >
                      Won
                    </button>
                    <button
                      onClick={() => setWonLastRound(false)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                        !wonLastRound
                          ? 'bg-[#ff4655]/20 text-[#ff4655] border border-[#ff4655]'
                          : 'bg-[#13131a] text-[#9ca3af] border border-[#252530] hover:border-[#353545]'
                      }`}
                    >
                      Lost
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={handleGetBuyAdvice} className="w-full sm:w-auto">
                  Calculate Buy
                </Button>
              </div>
            </Card>

            {buyRecommendation && (
              <Card className="bg-gradient-to-br from-[#1a1a24] to-[#13131a]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#ece8e1]">
                    Round {buyRecommendation.round}
                  </h3>
                  <span className="text-sm text-[#9ca3af]">{buyRecommendation.reason}</span>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-4 bg-[#0a0a0f] rounded-lg">
                    <h4 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide mb-2">Weapons</h4>
                    <ul className="space-y-1">
                      {buyRecommendation.weapons.map((w, i) => (
                        <li key={i} className="font-medium text-[#ece8e1]">{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-[#0a0a0f] rounded-lg">
                    <h4 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide mb-2">Armor</h4>
                    <p className="font-medium text-[#ece8e1]">{buyRecommendation.armor}</p>
                  </div>
                  <div className="p-4 bg-[#0a0a0f] rounded-lg">
                    <h4 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wide mb-2">Abilities</h4>
                    <p className="font-medium text-[#ece8e1]">{buyRecommendation.abilities}</p>
                  </div>
                </div>
              </Card>
            )}

            {!buyRecommendation && (
              <EmptyState message="Enter your economy details to get buy recommendations" />
            )}
          </div>
        )}

        {/* All Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <Card className="bg-gradient-to-br from-[#1a1a24] to-[#13131a] animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-xl bg-[#252530] flex items-center justify-center text-3xl font-bold shrink-0">
                    {selectedAgentFromGrid.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#ece8e1]">{selectedAgentFromGrid.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-[#ff4655]/20 text-[#ff4655] text-xs font-medium rounded">
                        {selectedAgentFromGrid.role}
                      </span>
                      <span className="text-xs text-[#9ca3af]">
                        {selectedAgentFromGrid.difficulty}/5 ⭐
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[#9ca3af] mb-6">{selectedAgentFromGrid.description}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-[#ece8e1] mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {selectedAgentFromGrid.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-[#9ca3af]">{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#ece8e1] mb-2">Abilities</h4>
                    <ul className="space-y-1">
                      {selectedAgentFromGrid.abilities.map((a, i) => (
                        <li key={i} className="text-sm text-[#9ca3af]">
                          {a.name} ({a.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#252530] mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-[#52525b]">
          Valodvisor • Not affiliated with Riot Games
        </div>
      </footer>
    </main>
  );
}