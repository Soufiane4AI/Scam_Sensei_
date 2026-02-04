import { Shield, Target, Zap, AlertTriangle, Brain, TrendingUp, Lock, Users, Activity } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] relative overflow-hidden text-[#E5E7EB]">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes move-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        .animate-delay-100 { animation-delay: 100ms; }
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .cyber-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          animation: move-grid 3s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#22D3EE] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-16" style={{ animation: 'fade-in-up 0.8s ease-out' }}>
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-[#1E293B] to-[#0A0F1E] border border-[#3B82F6]/50 rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-10 h-10 text-[#3B82F6] group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Scam Sensei</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            Your AI-powered defense against modern cybersecurity threats, bridging the gap between human intuition and machine intelligence.
          </p>
        </div>

        <div 
          className="bg-[#11172A]/60 backdrop-blur-md border border-[#3B82F6]/20 rounded-3xl p-8 md:p-10 mb-12 hover:border-[#3B82F6]/40 transition-all duration-300 shadow-lg hover:shadow-[#3B82F6]/10"
          style={{ animation: 'fade-in-up 0.8s ease-out 0.2s backwards' }}
        >
          <div className="flex items-start">
            <div className="p-3 bg-[#3B82F6]/10 rounded-xl mr-6 hidden md:block">
               <Target className="w-8 h-8 text-[#3B82F6]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-4 flex items-center">
                <span className="md:hidden mr-3"><Target className="w-6 h-6 text-[#3B82F6]" /></span>
                Our Mission
              </h2>
              <div className="text-[#9CA3AF] leading-relaxed space-y-4 text-lg">
                <p>
                  In an era where artificial intelligence has become democratized, cybercriminals are leveraging AI to create increasingly sophisticated scams at unprecedented scale. These AI-powered attacks are more convincing, more personalized, and harder to detect than ever before.
                </p>
                <p className="bg-[#3B82F6]/5 p-4 rounded-lg border-l-4 border-[#3B82F6]">
                  <span className="text-[#E5E7EB] font-bold">Humans remain the weakest link.</span> Attackers know that exploiting human psychology through social engineering is often the easiest path to success.
                </p>
                <p>
                  Scam Sensei was created to level the playing field. By combining AI-powered detection with interactive training, we help users develop the critical thinking skills needed to identify and avoid modern scams.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="bg-[#11172A]/60 backdrop-blur-md border border-[#374151] rounded-3xl p-8 md:p-10 mb-12"
          style={{ animation: 'fade-in-up 0.8s ease-out 0.4s backwards' }}
        >
          <div className="flex items-start mb-8">
            <AlertTriangle className="w-8 h-8 text-[#F59E0B] mr-4 flex-shrink-0 mt-1 animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-2">What is Social Engineering?</h2>
              <p className="text-[#9CA3AF]">The psychological manipulation of people into performing actions or divulging confidential information.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">            {[
              { icon: "🎣", title: "Phishing", desc: "Fraudulent messages from reputable sources designed to steal sensitive info.", color: "bg-[#EF4444]" },
              { icon: "📞", title: "Vishing", desc: "Voice phishing over phone calls, impersonating legitimate organizations.", color: "bg-[#F59E0B]" },
              { icon: "🎭", title: "Impersonation", desc: "Pretending to be authority figures (CEO, IT support) to manipulate victims.", color: "bg-[#3B82F6]" },
              { icon: "🤖", title: "Deepfake Scams", desc: "AI-generated audio/video impersonating real people to trick victims.", color: "bg-[#22D3EE]" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group bg-[#0A0F1E] border border-[#374151] hover:border-[#E5E7EB]/30 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 ${item.color}/10 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#E5E7EB] group-hover:text-white transition-colors">{item.title}</h3>
                </div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed group-hover:text-[#D1D5DB]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 flex items-center">
             <Brain className="w-5 h-5 text-[#F59E0B] mr-3 flex-shrink-0" />
             <p className="text-[#F59E0B] text-sm font-medium">
               <span className="font-bold">Common Tactics:</span> Urgency, fear, authority, scarcity, social proof, and reciprocity.
             </p>
          </div>
        </div>

        <div 
          className="bg-[#11172A]/60 backdrop-blur-md border border-[#374151] rounded-3xl p-8 md:p-10"
          style={{ animation: 'fade-in-up 0.8s ease-out 0.6s backwards' }}
        >
          <div className="flex items-center mb-10">
            <Activity className="w-8 h-8 text-[#22D3EE] mr-4" />
            <h2 className="text-2xl font-bold text-[#E5E7EB]">The AI Cybersecurity Arms Race</h2>
          </div>

          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-[#EF4444]/30 hover:border-[#EF4444] transition-colors duration-500">
              <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-[#0A0F1E] border-2 border-[#EF4444]"></div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-4 flex items-center">
                <span className="text-[#EF4444] mr-2">OFFENSE:</span> How Attackers Use AI
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#EF4444]/5 p-4 rounded-lg border border-[#EF4444]/10">
                   <h4 className="font-bold text-[#EF4444] mb-1">Automated Personalization</h4>
                   <p className="text-sm text-[#9CA3AF]">Scraping social data to craft perfectly tailored messages.</p>
                </div>
                <div className="bg-[#EF4444]/5 p-4 rounded-lg border border-[#EF4444]/10">
                   <h4 className="font-bold text-[#EF4444] mb-1">Voice & Video Cloning</h4>
                   <p className="text-sm text-[#9CA3AF]">Creating indistinguishable deepfakes for vishing.</p>
                </div>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-[#22C55E]/30 hover:border-[#22C55E] transition-colors duration-500">
              <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-[#0A0F1E] border-2 border-[#22C55E]"></div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-4 flex items-center">
                <span className="text-[#22C55E] mr-2">DEFENSE:</span> How We Use AI
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#22C55E]/5 p-4 rounded-lg border border-[#22C55E]/10">
                   <h4 className="font-bold text-[#22C55E] mb-1">Pattern Recognition</h4>
                   <p className="text-sm text-[#9CA3AF]">Identifying anomalies invisible to the human eye.</p>
                </div>
                <div className="bg-[#22C55E]/5 p-4 rounded-lg border border-[#22C55E]/10">
                   <h4 className="font-bold text-[#22C55E] mb-1">Behavioral Analysis</h4>
                   <p className="text-sm text-[#9CA3AF]">Detecting unusual communication styles instantly.</p>
                </div>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-[#3B82F6]/30 hover:border-[#3B82F6] transition-colors duration-500">
              <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-[#0A0F1E] border-2 border-[#3B82F6]"></div>
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-4 flex items-center">
                 <TrendingUp className="w-5 h-5 text-[#3B82F6] mr-2" />
                 Why Awareness is Critical
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                Technology alone cannot solve the problem. <span className="text-[#E5E7EB] font-medium">The most effective defense</span> combines AI tools with educated users. Regular training helps users recognize red flags and maintain healthy skepticism without becoming paranoid.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#3B82F6]/20 to-[#22D3EE]/20 border border-[#3B82F6]/30 rounded-xl p-6 text-center transform hover:scale-[1.02] transition-transform duration-300">
            <p className="text-[#E5E7EB] text-lg font-medium">
              <span className="font-bold text-[#22D3EE]">Remember:</span> When AI fights AI, humans make the difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}