import { useState } from "react";
import { Brain, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { quizQuestions } from "@/lib/quiz-data";

export function MindQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const quizMutation = useMutation({
    mutationFn: async (quizData: any) => {
      const response = await apiRequest("POST", "/api/quiz/submit", quizData);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data.predictions);
      toast({
        title: "Future Revealed!",
        description: "Your destiny has been calculated.",
      });
    },
    onError: () => {
      toast({
        title: "Quiz Failed",
        description: "Unable to process your answers. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit quiz
      quizMutation.mutate({
        userId: 1,
        answers: newAnswers,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  if (results) {
    return (
      <section className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl p-6 border border-purple-600/30">
        <div className="text-center">
          <h3 className="font-orbitron font-semibold text-lg text-white mb-4">Your Future Revealed</h3>
          <div className="space-y-3 text-left">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-purple-400 font-semibold">Future Home:</span>
              <span className="text-gray-300 ml-2">{results.futureLocation}</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-purple-400 font-semibold">Career Path:</span>
              <span className="text-gray-300 ml-2">{results.careerPath}</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-purple-400 font-semibold">Love Life:</span>
              <span className="text-gray-300 ml-2">{results.loveLife}</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-purple-400 font-semibold">Wealth Level:</span>
              <span className="text-gray-300 ml-2">{results.wealthLevel}/10</span>
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg px-4 py-2 text-white text-sm hover:opacity-90 transition-opacity"
          >
            Take Quiz Again
          </button>
        </div>
      </section>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <section className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl p-6 border border-purple-600/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-orbitron font-semibold text-lg text-white">Mind Mirror Quiz</h3>
          <p className="text-xs text-gray-400">Predict your future life in 5 questions</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
          <Brain className="text-pink-500 text-xl animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-400">Progress</span>
          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-purple-600 font-medium">
            {currentQuestion + 1}/{quizQuestions.length}
          </span>
        </div>
        
        {/* Current Question */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-600/20">
          <p className="text-sm text-gray-300 mb-4">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-3 rounded-lg bg-slate-600/50 hover:bg-purple-600/20 transition-colors text-sm text-gray-300 border border-purple-600/10 hover:border-purple-600/30 flex items-center justify-between group"
                disabled={quizMutation.isPending}
              >
                <span>{option}</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </button>
            ))}
          </div>
        </div>

        {quizMutation.isPending && (
          <div className="text-center">
            <div className="animate-pulse text-purple-400">Calculating your destiny...</div>
          </div>
        )}
      </div>
    </section>
  );
}
