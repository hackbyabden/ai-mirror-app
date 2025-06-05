import { Crown, Settings, Eye } from "lucide-react";

export function Header() {
  return (
    <header className="p-4 border-b border-cyan-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center animate-pulse">
            <Eye className="text-white text-lg" />
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-lg text-cyan-400">AI MIRROR</h1>
            <p className="text-xs text-gray-400">Future You & Deep Secrets</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Crown className="text-purple-600 text-sm" />
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <Settings className="text-gray-400" size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
