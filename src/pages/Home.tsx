import { Shield, Search, Target, Sparkles } from 'lucide-react';
import type { PageRoute } from '../types';

interface HomeProps {
  onNavigate: (page: PageRoute) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-[#0A0F1E] relative overflow-hidden">
      <style>{`
        @keyframes move-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes scanline {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
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
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#22D3EE]/5"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div 
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[100px] opacity-20"
            style={{ animation: 'float-slow 15s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#22D3EE] rounded-full mix-blend-screen filter blur-[100px] opacity-10"
            style={{ animation: 'float-delayed 18s ease-in-out infinite' }}
          ></div>
        </div>

        <div 
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent blur-sm"
          style={{ animation: 'scanline 8s linear infinite' }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 z-10">
        
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative group">
              <Shield className="w-20 h-20 text-[#3B82F6] relative z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#3B82F6] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#E5E7EB] mb-6 leading-tight">
            AI vs AI: Defending Humans
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#22D3EE] to-[#3B82F6] bg-300% animate-gradient">
              from AI-Powered Scams
            </span>
          </h1>

          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            Scam Sensei is an AI-powered digital security assistant designed to detect
            AI-generated scams and help users recognize modern social engineering attacks
            through real-time analysis and interactive training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          <div
            onClick={() => onNavigate('checker')}
            className="group relative bg-[#11172A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6] transition-all cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#3B82F6]/30 active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B82F6]/0 to-[#22D3EE]/0 group-hover:from-[#3B82F6]/10 group-hover:to-[#22D3EE]/10 rounded-2xl blur -z-10 transition-all"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3B82F6]/10 rounded-xl mb-6 group-hover:bg-[#3B82F6]/20 transition-all group-hover:shadow-lg group-hover:shadow-[#3B82F6]/20">
                <Search className="w-8 h-8 text-[#3B82F6] group-hover:text-[#22D3EE] transition-colors group-hover:scale-110 duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4 group-hover:text-[#22D3EE] transition-colors">
                Analyze a Suspicious Message
              </h3>

              <p className="text-[#9CA3AF] leading-relaxed">
                Use our AI-powered analyzer to detect scams, phishing attempts, and social
                engineering tactics in suspicious messages, emails, or SMS.
              </p>

              <div className="mt-6 flex items-center text-[#3B82F6] group-hover:text-[#22D3EE] font-medium">
                <span>Start Analysis</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('game')}
            className="group relative bg-[#11172A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#22C55E]/20 hover:border-[#22C55E] transition-all cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#22C55E]/30 active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out delay-75"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#22C55E]/0 to-[#4ADE80]/0 group-hover:from-[#22C55E]/10 group-hover:to-[#4ADE80]/10 rounded-2xl blur -z-10 transition-all"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#22C55E]/10 rounded-xl mb-6 group-hover:bg-[#22C55E]/20 transition-all group-hover:shadow-lg group-hover:shadow-[#22C55E]/20">
                <Target className="w-8 h-8 text-[#22C55E] group-hover:text-[#4ADE80] transition-colors group-hover:scale-110 duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4 group-hover:text-[#4ADE80] transition-colors">
                Train Against AI Scams
              </h3>

              <p className="text-[#9CA3AF] leading-relaxed">
                Practice identifying AI-generated scam scenarios in a safe environment.
                Learn to recognize social engineering techniques through interactive training.
              </p>

              <div className="mt-6 flex items-center text-[#22C55E] group-hover:text-[#4ADE80] font-medium">
                <span>Start Training</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-[#11172A]/50 rounded-xl border border-[#3B82F6]/10 hover:bg-[#11172A] hover:border-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#3B82F6]/10 rounded-lg mb-4">
              <Sparkles className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">AI-Powered Detection</h4>
            <p className="text-sm text-[#9CA3AF]">
              Advanced AI analyzes messages for scam patterns and social engineering tactics
            </p>
          </div>

          <div className="text-center p-6 bg-[#11172A]/50 rounded-xl border border-[#3B82F6]/10 hover:bg-[#11172A] hover:border-[#22C55E]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#22C55E]/10 rounded-lg mb-4">
              <Target className="w-6 h-6 text-[#22C55E]" />
            </div>
            <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">Interactive Training</h4>
            <p className="text-sm text-[#9CA3AF]">
              Practice with realistic scenarios to build your scam detection skills
            </p>
          </div>

          <div className="text-center p-6 bg-[#11172A]/50 rounded-xl border border-[#3B82F6]/10 hover:bg-[#11172A] hover:border-[#22D3EE]/30 transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#22D3EE]/10 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-[#22D3EE]" />
            </div>
            <h4 className="text-lg font-bold text-[#E5E7EB] mb-2">AI Cyber Mentor</h4>
            <p className="text-sm text-[#9CA3AF]">
              Get instant explanations and guidance from an AI security expert
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}