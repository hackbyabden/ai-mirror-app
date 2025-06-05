import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Crown, CheckCircle, Star, Infinity, Zap } from "lucide-react";

const premiumFeatures = [
  {
    icon: Infinity,
    title: "Unlimited Scans",
    description: "No daily limits on face, emotion, or voice analysis",
    color: "text-cyan-400"
  },
  {
    icon: Star,
    title: "Advanced Predictions",
    description: "Get detailed future scenarios and deeper insights",
    color: "text-purple-400"
  },
  {
    icon: Zap,
    title: "Priority Processing",
    description: "Faster scan results with enhanced AI models",
    color: "text-yellow-400"
  },
  {
    icon: Crown,
    title: "Exclusive Features",
    description: "Access to premium-only scanning modes",
    color: "text-pink-400"
  }
];

const plans = [
  {
    name: "Monthly",
    price: "$4.99",
    period: "/month",
    popular: false
  },
  {
    name: "Yearly",
    price: "$39.99",
    period: "/year",
    popular: true,
    savings: "Save 33%"
  }
];

export default function Premium() {
  return (
    <div className="max-w-sm mx-auto bg-slate-800 min-h-screen relative">
      <Header />
      
      <main className="p-4 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center animate-pulse">
            <Crown className="text-white text-3xl" />
          </div>
          <h1 className="font-orbitron font-bold text-2xl text-white mb-2">Unlock Your Future</h1>
          <p className="text-gray-400">Get unlimited access to AI-powered insights</p>
        </div>

        {/* Premium Features */}
        <div className="space-y-4 mb-8">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="space-y-3 mb-8">
          <h2 className="text-center text-white font-orbitron font-bold text-lg mb-4">Choose Your Plan</h2>
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-lg p-4 border transition-all ${
              plan.popular 
                ? "bg-gradient-to-r from-purple-600/20 to-pink-500/20 border-purple-600/50" 
                : "bg-slate-700 border-slate-600 hover:border-slate-500"
            }`}>
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{plan.name}</h3>
                  {plan.savings && (
                    <span className="text-green-400 text-sm">{plan.savings}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>
              
              <button className={`w-full py-2 rounded-lg font-semibold transition-opacity ${
                plan.popular
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
                  : "bg-slate-600 text-white hover:bg-slate-500"
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">What's Included</h3>
          <div className="space-y-2">
            {[
              "Unlimited face aging & style transforms",
              "Advanced emotion analysis with insights",
              "Detailed voice personality readings",
              "Custom future life predictions",
              "Priority customer support",
              "Ad-free experience",
              "Early access to new features"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="text-gray-300 text-sm">
            <span className="text-green-400 font-semibold">30-day money-back guarantee.</span> Cancel anytime.
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
