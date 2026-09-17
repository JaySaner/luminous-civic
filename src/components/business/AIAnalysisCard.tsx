import React from 'react';
import type { BusinessAIAnalysis } from '@/lib/business/types';
import { Sparkles, Tag, Clock, ShieldAlert } from 'lucide-react';

export const AIAnalysisCard: React.FC<{ analysis?: BusinessAIAnalysis }> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-800/30 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Gemini AI Triage Assessment</h3>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Est. {analysis.estimatedHoursToResolve} hrs
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-slate-300 leading-relaxed">{analysis.summary}</p>
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Recommended Action Plan</span>
          <p className="text-xs text-slate-200">{analysis.suggestedAction}</p>
        </div>
      </div>

      {analysis.tags && analysis.tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <Tag className="w-3.5 h-3.5 text-slate-500" />
          {analysis.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
