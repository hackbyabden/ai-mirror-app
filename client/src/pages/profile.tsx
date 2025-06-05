import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { User, Crown, Zap, Settings, LogOut } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
      <Header />
      
      <main className="p-4 pb-32">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center">
            <User className="text-white text-2xl" />
          </div>
          <h1 className="font-orbitron font-bold text-xl text-white mb-1">AI Explorer</h1>
          <p className="text-gray-400 text-sm">Free Account</p>
        </div>

        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Your AI Journey</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">12</div>
                <div className="text-xs text-gray-400">Face Scans</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">5</div>
                <div className="text-xs text-gray-400">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">8</div>
                <div className="text-xs text-gray-400">Voice Reads</div>
              </div>
            </div>
          </div>

          {/* Free Scans Remaining */}
          <div className="bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-lg p-4 border border-cyan-400/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Free Scans</h3>
                <p className="text-gray-400 text-sm">Remaining today</p>
              </div>
              <div className="text-2xl font-bold text-cyan-400">3</div>
            </div>
            <div className="mt-3 bg-slate-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full w-3/5"></div>
            </div>
          </div>

          {/* Upgrade to Premium */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-lg p-4 border border-purple-600/40">
            <div className="flex items-center space-x-3 mb-3">
              <Crown className="text-purple-400 text-xl" />
              <div>
                <h3 className="text-white font-semibold">Upgrade to Premium</h3>
                <p className="text-gray-400 text-sm">Unlock unlimited access</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg py-2 text-white font-semibold hover:opacity-90 transition-opacity">
              Upgrade Now - $4.99/month
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <button className="w-full bg-slate-700 rounded-lg p-4 flex items-center space-x-3 hover:bg-slate-600 transition-colors">
              <Zap className="text-cyan-400" size={20} />
              <span className="text-white">Scan Settings</span>
            </button>
            
            <button className="w-full bg-slate-700 rounded-lg p-4 flex items-center space-x-3 hover:bg-slate-600 transition-colors">
              <Settings className="text-gray-400" size={20} />
              <span className="text-white">App Settings</span>
            </button>
            
            <button className="w-full bg-slate-700 rounded-lg p-4 flex items-center space-x-3 hover:bg-slate-600 transition-colors">
              <LogOut className="text-red-400" size={20} />
              <span className="text-white">Sign Out</span>
            </button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
