import { useQuery } from "@tanstack/react-query";
import { Gem } from "lucide-react";
import { useEffect, useState } from "react";

export function DailySecret() {
  const [timeUntilNext, setTimeUntilNext] = useState("");

  const { data: secret, isLoading } = useQuery({
    queryKey: ["/api/secret/today"],
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeDiff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="neon-border rounded-2xl p-6 hologram-effect relative overflow-hidden">
        <div className="scanner-line absolute top-0 left-0 w-full h-0.5 opacity-60"></div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center animate-pulse">
            <Gem className="text-2xl text-white" />
          </div>
          <h2 className="font-orbitron font-bold text-lg mb-2 text-cyan-400">TODAY'S SECRET</h2>
          <div className="animate-pulse bg-gray-700 h-16 rounded mb-4"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="neon-border rounded-2xl p-6 hologram-effect relative overflow-hidden">
      <div className="scanner-line absolute top-0 left-0 w-full h-0.5 opacity-60"></div>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center animate-float">
          <Gem className="text-2xl text-white" />
        </div>
        <h2 className="font-orbitron font-bold text-lg mb-2 text-cyan-400">TODAY'S SECRET</h2>
        <p className="text-sm text-gray-300 mb-4">{secret?.secret}</p>
        <div className="flex items-center justify-center space-x-2 text-xs text-purple-600">
          <span>⏰</span>
          <span>Next reveal in {timeUntilNext}</span>
        </div>
      </div>
    </section>
  );
}
