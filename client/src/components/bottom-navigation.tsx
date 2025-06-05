import { Home, Camera, History, User, Crown } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/scan", icon: Camera, label: "Scan" },
  { path: "/history", icon: History, label: "History" },
  { path: "/profile", icon: User, label: "Profile" },
  { path: "/premium", icon: Crown, label: "Premium" },
];

export function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-slate-800 border-t border-cyan-500/30 p-4">
      <div className="grid grid-cols-5 gap-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          return (
            <Link key={path} href={path}>
              <button className={`flex flex-col items-center space-y-1 transition-colors ${
                isActive ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
              } ${label === "Premium" && !isActive ? "text-purple-600 hover:text-pink-500" : ""}`}>
                <Icon className="text-lg" size={18} />
                <span className="text-xs">{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
