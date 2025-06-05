import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { DailySecret } from "@/components/daily-secret";
import { FaceScanner } from "@/components/face-scanner";
import { MindQuiz } from "@/components/mind-quiz";
import { EmotionDetector } from "@/components/emotion-detector";
import { VoiceAnalyzer } from "@/components/voice-analyzer";
import { Crown, Infinity, CheckCircle, Play, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const watchAdMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/watch-ad", {});
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Ad Watched!",
        description: data.message,
      });
    }
  });

  const handleQuickScan = () => {
    // Scroll to face scanner
    document.querySelector('[data-component="face-scanner"]')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
      <Header />
      
      <main className="p-4 space-y-6 pb-32">
        <DailySecret />
        
        <div data-component="face-scanner">
          <FaceScanner />
        </div>
        
        <MindQuiz />
        <EmotionDetector />
        <VoiceAnalyzer />
        
        {/* Premium Unlock */}
        <section className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl p-6 border border-purple-600/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <Crown className="text-2xl text-white" />
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-2 text-white">Unlock Full Powers</h3>
              <p className="text-sm text-gray-300 mb-4">Get deeper insights, custom predictions, and unlimited scans</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => watchAdMutation.mutate()}
                  disabled={watchAdMutation.isPending}
                  className="bg-slate-800/50 rounded-lg p-4 text-center border border-cyan-500/30 hover:bg-cyan-400/10 transition-colors"
                >
                  {watchAdMutation.isPending ? (
                    <div className="animate-spin mx-auto mb-2 w-5 h-5 border-b-2 border-cyan-400 rounded-full"></div>
                  ) : (
                    <Play className="text-cyan-400 text-xl mb-2 mx-auto" />
                  )}
                  <p className="text-xs text-gray-300">Watch Ad</p>
                  <p className="text-xs text-cyan-400">+1 Free Scan</p>
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-4 text-center hover:opacity-90 transition-opacity">
                  <Infinity className="text-white text-xl mb-2 mx-auto" />
                  <p className="text-xs text-white font-semibold">Go Premium</p>
                  <p className="text-xs text-white/80">$4.99/month</p>
                </button>
              </div>
              
              {/* Premium Features List */}
              <div className="text-left space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-300">Unlimited face scans & predictions</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-300">Custom future scenarios</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-300">Voice personality deep-dive</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-300">Ad-free experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNavigation />

      {/* Floating Action Button */}
      <button 
        onClick={handleQuickScan}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-float neon-glow"
      >
        <Sparkles className="text-white text-xl" />
      </button>
    </div>
  );
}
