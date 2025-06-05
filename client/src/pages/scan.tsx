import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { FaceScanner } from "@/components/face-scanner";
import { EmotionDetector } from "@/components/emotion-detector";
import { VoiceAnalyzer } from "@/components/voice-analyzer";

export default function Scan() {
  return (
    <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
      <Header />
      
      <main className="p-4 space-y-6 pb-32">
        <div className="text-center mb-6">
          <h1 className="font-orbitron font-bold text-2xl text-cyan-400 mb-2">AI Scanner</h1>
          <p className="text-gray-400">Choose your scanning mode</p>
        </div>

        <FaceScanner />
        <EmotionDetector />
        <VoiceAnalyzer />
      </main>

      <BottomNavigation />
    </div>
  );
}
