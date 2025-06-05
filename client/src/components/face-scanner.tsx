import { useState, useRef } from "react";
import { Camera, UserCheck, Star, VenetianMask } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const scanOptions = [
  { type: "age_progression", icon: UserCheck, label: "Age +20", color: "border-purple-500/30 hover:border-purple-500" },
  { type: "anime", icon: Star, label: "Anime", color: "border-pink-500/30 hover:border-pink-500" },
  { type: "villain", icon: VenetianMask, label: "Villain", color: "border-red-500/30 hover:border-red-500" },
];

export function FaceScanner() {
  const [selectedScan, setSelectedScan] = useState("age_progression");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest("POST", "/api/scan/face", formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Scan Complete!",
        description: "Your future face has been revealed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
    onError: () => {
      toast({
        title: "Scan Failed",
        description: "Unable to process your image. Please try again.",
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
      formData.append("scanType", selectedScan);
      scanMutation.mutate(formData);
    }
  };

  return (
    <section className="bg-slate-700 rounded-2xl p-6 border border-cyan-500/20 relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-orbitron font-semibold text-lg text-white">Future Face Scanner</h3>
          <p className="text-xs text-gray-400">See yourself in 20, 40, 60 years</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center neon-glow">
          <UserCheck className="text-cyan-400 text-xl" />
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-cyan-500/40 rounded-xl p-8 text-center hover:border-cyan-500/80 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {scanMutation.isPending ? (
            <div className="animate-pulse">
              <div className="w-12 h-12 mx-auto mb-3 bg-cyan-400/20 rounded-full flex items-center justify-center">
                <Camera className="text-cyan-400 text-xl animate-pulse" />
              </div>
              <p className="text-sm text-gray-300 mb-2">Processing your image...</p>
            </div>
          ) : preview ? (
            <div>
              <img src={preview} alt="Preview" className="w-24 h-24 mx-auto mb-3 rounded-full object-cover" />
              <p className="text-sm text-green-400 mb-2">Scan complete!</p>
            </div>
          ) : (
            <>
              <Camera className="text-cyan-400 text-3xl mb-3 animate-pulse mx-auto" />
              <p className="text-sm text-gray-300 mb-2">Upload your selfie</p>
              <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
            </>
          )}
        </div>
        
        {/* Scan Options */}
        <div className="grid grid-cols-3 gap-2">
          {scanOptions.map(({ type, icon: Icon, label, color }) => (
            <button
              key={type}
              onClick={() => setSelectedScan(type)}
              className={`bg-slate-600 rounded-lg p-3 text-center border transition-colors ${
                selectedScan === type ? color.replace("hover:", "") : color
              }`}
            >
              <Icon className={`mb-1 mx-auto ${
                type === "age_progression" ? "text-purple-600" : 
                type === "anime" ? "text-pink-500" : "text-red-500"
              }`} size={16} />
              <p className="text-xs text-gray-300">{label}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
