import { useState, useRef } from "react";
import { Mic, Square, Play } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function VoiceAnalyzer() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [results, setResults] = useState<any>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([20, 60, 90, 45, 25]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  const voiceMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/scan/voice", formData);
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data.results);
      toast({
        title: "Voice Analysis Complete!",
        description: "Your soul has been read through your voice.",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze your voice. Please try again.",
        variant: "destructive",
      });
    }
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        
        const formData = new FormData();
        formData.append("audio", blob, "recording.wav");
        voiceMutation.mutate(formData);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Animate audio levels
      const interval = setInterval(() => {
        setAudioLevels(prev => prev.map(() => Math.random() * 80 + 20));
      }, 200);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          setIsRecording(false);
          clearInterval(interval);
        }
      }, 30000);

    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-6 border border-cyan-500/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-orbitron font-semibold text-lg text-white">Psychic Voice AI</h3>
          <p className="text-xs text-gray-400">Soul reading from your voice</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center">
          <Mic className="text-cyan-400 text-xl animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Recording Interface */}
        <div className="bg-slate-800 rounded-xl p-6 text-center relative overflow-hidden">
          <div className="voice-visualizer absolute inset-0 opacity-20 rounded-xl"></div>
          <div className="relative z-10">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={voiceMutation.isPending}
              className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? "bg-red-500 animate-pulse" 
                  : "bg-gradient-to-r from-cyan-400 to-purple-600 hover:scale-105"
              }`}
            >
              {isRecording ? (
                <Square className="text-2xl text-white" />
              ) : voiceMutation.isPending ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <Mic className="text-2xl text-white" />
              )}
            </button>
            <p className="text-sm text-gray-300 mb-2">
              {isRecording ? "Recording... (tap to stop)" : 
               voiceMutation.isPending ? "Analyzing your voice..." :
               "Tap to start recording"}
            </p>
            <p className="text-xs text-gray-500">Say anything for 10-30 seconds</p>
          </div>
        </div>
        
        {/* Voice Analysis Bars */}
        <div className="grid grid-cols-5 gap-2 h-16">
          {audioLevels.map((level, index) => (
            <div
              key={index}
              className={`bg-cyan-400/70 rounded-full transition-all duration-200 ${
                isRecording ? "animate-pulse" : ""
              }`}
              style={{ 
                height: `${level}%`,
                animationDelay: `${index * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-600 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-cyan-400">{results.personality.confidence}%</div>
                <div className="text-xs text-gray-400">Confidence</div>
              </div>
              <div className="bg-slate-600 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-400">{results.personality.creativity}%</div>
                <div className="text-xs text-gray-400">Creativity</div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
              <p className="text-sm text-gray-300">
                <span className="text-cyan-400 font-semibold">Soul Reading:</span> {results.soulReading}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
