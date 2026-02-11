"use client"

import { cn } from "@/lib/utils"
import { Agent } from "@/data/valorant-data"

interface AgentCardProps {
  agent: Agent
  onClick?: () => void
  selected?: boolean
}

export function AgentCard({ agent, onClick, selected = false }: AgentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative p-6 border border-slate-200/50 bg-white/5 backdrop-blur-sm rounded-xl hover:border-slate-300/70 hover:bg-white/10 transition-all duration-200 cursor-pointer h-full",
        selected && "ring-2 ring-red-500/50 border-slate-300/70 bg-white/10"
      )}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-slate-300 to-slate-400 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
        <span className="text-lg font-semibold text-slate-900">{agent.name.slice(0,2).toUpperCase()}</span>
      </div>
      <h4 className="font-semibold text-slate-100 text-center mb-2 text-lg leading-tight">{agent.name}</h4>
      <p className="text-xs text-red-400 uppercase tracking-wide font-medium text-center mb-3">{agent.role}</p>
      <div className="flex justify-center items-center mb-4">
        <div className="flex text-slate-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < agent.difficulty ? "★" : "☆"}</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center line-clamp-2 leading-relaxed">{agent.description}</p>
    </div>
  )
}
