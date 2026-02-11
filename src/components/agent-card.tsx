"use client";

import { cn } from "@/lib/utils";
import { Agent } from "@/data/valorant-data";

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
}

export function AgentCard({ agent, onClick, selected = false, compact = false }: AgentCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200",
        "bg-[#13131a] border-[#252530] hover:border-[#ff4655]/50 hover:bg-[#1a1a24]",
        selected && "border-[#ff4655] bg-[#1a1a24] ring-1 ring-[#ff4655]",
        compact ? "min-h-[80px]" : "min-h-[140px]"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#252530] flex items-center justify-center text-lg font-bold shrink-0">
          {agent.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[#ece8e1] truncate">{agent.name}</h4>
          <p className="text-xs text-[#9ca3af] uppercase tracking-wide">{agent.role}</p>
          {!compact && (
            <div className="mt-2 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < agent.difficulty ? "text-[#ff4655]" : "text-[#252530]"}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
