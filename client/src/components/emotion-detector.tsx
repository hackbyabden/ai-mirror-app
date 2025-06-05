import { useState, useRef } from "react";
import { Camera, Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function EmotionDetector() {
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const emotionMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/scan/emotion", formData);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data.results);
      toast({
        title: "Emotions Analyzed!",
        description: "Your emotional state has been decoded.",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze emotions. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);
      emotionMutation.mutate(formData);
    }
  };

  return (
    <section className="bg-slate-700 rounded-2xl p-6 border border-green-500/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-orbitron font-semibold text-lg text-white">Emotion Detector</h3>
          <p className="text-xs text-gray-400">AI analyzes your true feelings</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center animate-scan">
          <Heart className="text-green-500 text-xl" />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Camera/Upload Area */}
        <div className="relative">
          <div 
            className="w-full h-48 bg-slate-600 rounded-xl flex items-center justify-center cursor-pointer border-2 border-green-500/30 hover:border-green-500/60 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {emotionMutation.isPending ? (
              <div className="text-center">
                <div className="animate-pulse mb-2">
                  <Camera className="text-green-500 text-3xl mx-auto" />
                </div>
                <p className="text-sm text-gray-300">Analyzing emotions...</p>
              </div>
            ) : preview ? (
              <img src={preview} alt="Emotion scan" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="text-center">
                <Camera className="text-green-500 text-3xl mb-2 mx-auto" />
                <p className="text-sm text-gray-300">Upload photo for emotion scan</p>
              </div>
            )}
          </div>
          {emotionMutation.isPending && (
            <>
              <div className="absolute inset-0 rounded-xl border-2 border-green-500 animate-pulse"></div>
              <div className="scanner-line absolute top-1/2 left-0 w-full h-0.5"></div>
            </>
          )}
        </div>
        
        {/* Analysis Results */}
        {results && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-600 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-500">{results.emotions.happiness}%</div>
                <div className="text-xs text-gray-400">Happiness</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-cyan-400">{results.emotions.stress}%</div>
                <div className="text-xs text-gray-400">Hidden Stress</div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
              <p className="text-sm text-gray-300">
                <span className="text-green-500 font-semibold">Analysis:</span> {results.analysis}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
