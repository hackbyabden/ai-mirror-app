import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useQuery } from "@tanstack/react-query";
import { Camera, Brain, Mic, Calendar } from "lucide-react";

const scanIcons = {
  face: Camera,
  emotion: Brain,
  voice: Mic,
};

export default function History() {
  const { data: history, isLoading } = useQuery({
    queryKey: ["/api/history"],
  });

  if (isLoading) {
    return (
      <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
        <Header />
        <main className="p-4 pb-32">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-slate-700 rounded-lg h-20"></div>
            ))}
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
      <Header />
      
      <main className="p-4 pb-32">
        <div className="text-center mb-6">
          <h1 className="font-orbitron font-bold text-2xl text-cyan-400 mb-2">Scan History</h1>
          <p className="text-gray-400">Your AI analysis results</p>
        </div>

        <div className="space-y-4">
          {history?.scans?.length > 0 ? (
            history.scans.map((scan: any) => {
              const Icon = scanIcons[scan.scanType as keyof typeof scanIcons] || Camera;
              return (
                <div key={scan.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <Icon className="text-cyan-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold capitalize">{scan.scanType} Scan</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {scan.results && (
                    <div className="mt-3 text-sm text-gray-300">
                      {scan.scanType === 'emotion' && scan.results.emotions && (
                        <div className="grid grid-cols-2 gap-2">
                          <span>Happiness: {scan.results.emotions.happiness}%</span>
                          <span>Stress: {scan.results.emotions.stress}%</span>
                        </div>
                      )}
                      {scan.scanType === 'voice' && scan.results.personality && (
                        <div className="grid grid-cols-2 gap-2">
                          <span>Confidence: {scan.results.personality.confidence}%</span>
                          <span>Creativity: {scan.results.personality.creativity}%</span>
                        </div>
                      )}
                      {scan.scanType === 'face' && (
                        <span>Face scan completed successfully</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700 flex items-center justify-center">
                <Camera className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-white font-semibold mb-2">No Scans Yet</h3>
              <p className="text-gray-400 text-sm">Start scanning to see your results here</p>
            </div>
          )}

          {history?.quizzes?.length > 0 && (
            <>
              <div className="mt-8 mb-4">
                <h2 className="font-orbitron font-bold text-lg text-purple-400">Quiz Results</h2>
              </div>
              {history.quizzes.map((quiz: any) => (
                <div key={quiz.id} className="bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-lg p-4 border border-purple-600/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <Brain className="text-purple-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Mind Mirror Quiz</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {quiz.predictions && (
                    <div className="space-y-2 text-sm">
                      <div className="text-purple-400">Future Location: <span className="text-gray-300">{quiz.predictions.futureLocation}</span></div>
                      <div className="text-purple-400">Career: <span className="text-gray-300">{quiz.predictions.careerPath}</span></div>
                      <div className="text-purple-400">Wealth Level: <span className="text-gray-300">{quiz.predictions.wealthLevel}/10</span></div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
