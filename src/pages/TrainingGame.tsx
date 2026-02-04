import { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, XCircle, Loader2, MessageCircle, Send, Mail, MessageSquare, Smartphone, HelpCircle, Sparkles, Activity, Play, RefreshCw } from 'lucide-react';
import { generateScenario, askMentor } from '../services/minimax';
import type { GameScenario, GameResult, ChatMessage } from '../types';

export default function TrainingGame() {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [currentRound, setCurrentRound] = useState(0);
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GameResult[]>([]);
  
  const [lastType, setLastType] = useState<string | undefined>(undefined);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalRounds = 5;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (gameState === 'playing' && currentRound < totalRounds && !scenario) {
      loadNextScenario();
    }
  }, [gameState, currentRound, scenario]);

  const loadNextScenario = async () => {
    setIsLoading(true);
    setChatMessages([]);

    try {
      const data = await generateScenario(currentRound + 1, lastType);
      
      setScenario({
        id: currentRound + 1,
        content: data.content,
        type: data.type,
        isScam: data.isScam,
        explanation: data.explanation,
      });
    } catch (err) {
      console.error('Failed to generate scenario:', err);
      setScenario({
        id: currentRound + 1,
        content: 'Failed to load scenario. Please check your API configuration.',
        type: 'SMS',
        isScam: false,
        explanation: 'Error loading scenario',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (userAnswer: boolean) => {
    if (!scenario) return;
    setLastType(scenario.type);
    const correct = userAnswer === scenario.isScam;
    setResults([...results, { correct, scenario }]);

    setTimeout(() => {
      if (currentRound + 1 < totalRounds) {
        setCurrentRound(currentRound + 1);
        setScenario(null);
      } else {
        setGameState('finished');
      }
    }, 800);
  };

  const handleAskMentor = async (question: string) => {
    if (!question.trim() || !scenario) return;

    const userMessage: ChatMessage = { role: 'user', content: question };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsChatting(true);

    try {
      const context = `Training scenario - ${scenario.type}: "${scenario.content}"\nCorrect answer: ${
        scenario.isScam ? 'Scam' : 'Safe'
      }\nExplanation: ${scenario.explanation}`;
      const response = await askMentor(question, context);

      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SMS': return <Smartphone className="w-5 h-5" />;
      case 'Email': return <Mail className="w-5 h-5" />;
      case 'Social Media': return <MessageSquare className="w-5 h-5" />;
      default: return <MessageCircle className="w-5 h-5" />;
    }
  };

  const score = results.filter((r) => r.correct).length;
  
  // --- CORRECTION ICI : Calcul du pourcentage avant le return ---
  const percentage = (score / totalRounds) * 100;

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
        .cyber-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3B82F6] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#22D3EE] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {gameState === 'ready' && (
          <div className="animate-fade-in-up max-w-3xl mx-auto">
            <div className="bg-[#11172A]/80 backdrop-blur-md border border-[#374151] rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl group-hover:bg-[#3B82F6]/20 transition-colors"></div>

              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] rounded-3xl mb-8 shadow-lg shadow-[#3B82F6]/30 animate-[float_3s_ease-in-out_infinite]">
                <Shield className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-[#E5E7EB] mb-6">
                Scam Detection <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">Training</span>
              </h1>

              <p className="text-lg text-[#9CA3AF] mb-10 max-w-xl mx-auto leading-relaxed">
                Test your ability to identify AI-generated scams. You'll face <strong>{totalRounds} realistic scenarios</strong>. Decide if each one is a scam or safe, and learn from your AI mentor.
              </p>

              <button
                onClick={() => { setGameState('playing'); setLastType(undefined); }}
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-[#3B82F6]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-6 h-6 mr-3 fill-current" />
                Start Simulation
              </button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="animate-fade-in-up">
            
            <div className="flex justify-between items-center mb-6">
               <div className="inline-flex items-center px-4 py-2 bg-[#1E293B]/80 backdrop-blur border border-[#374151] rounded-lg text-[#9CA3AF] font-medium shadow-sm">
                 <Activity className="w-4 h-4 mr-2 text-[#22D3EE]" />
                 Round <span className="text-[#E5E7EB] mx-1">{currentRound + 1}</span> / {totalRounds}
               </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#11172A]/80 backdrop-blur-md border border-[#374151] rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-24">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#3B82F6] blur-xl opacity-20 animate-pulse"></div>
                      <Loader2 className="w-16 h-16 text-[#3B82F6] animate-spin relative z-10" />
                    </div>
                    <p className="text-[#9CA3AF] mt-6 animate-pulse">Generating scenario ...</p>
                  </div>
                ) : scenario ? (
                  <>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <h2 className="text-2xl font-bold text-[#E5E7EB] flex items-center">
                        Analyze Message
                      </h2>
                      <div className="flex items-center px-4 py-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-xl text-sm font-bold tracking-wide uppercase">
                        {getTypeIcon(scenario.type)}
                        <span className="ml-2">{scenario.type}</span>
                      </div>
                    </div>

                    <div className="bg-[#0A0F1E] border border-[#374151] rounded-2xl p-8 mb-8 relative z-10 shadow-inner group hover:border-[#3B82F6]/30 transition-colors">
                      <p className="text-[#E5E7EB] leading-relaxed text-lg whitespace-pre-wrap font-serif opacity-90 group-hover:opacity-100 transition-opacity">
                        {scenario.content}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                      <button
                        onClick={() => handleAnswer(true)}
                        className="group relative overflow-hidden px-6 py-5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#EF4444]/40 hover:translate-y-[-2px] active:translate-y-[0px]"
                      >
                         <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         <span className="relative flex items-center justify-center">
                            <XCircle className="w-5 h-5 mr-2" /> This is a Scam
                         </span>
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="group relative overflow-hidden px-6 py-5 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#22C55E]/40 hover:translate-y-[-2px] active:translate-y-[0px]"
                      >
                         <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         <span className="relative flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 mr-2" /> This is Safe
                         </span>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="bg-[#11172A]/80 backdrop-blur-md border border-[#374151] rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-[#3B82F6]/20 rounded-xl mr-3 border border-[#3B82F6]/20">
                     <Sparkles className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E5E7EB]">Cyber Mentor</h3>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">AI Assistant</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                   {[
                     "Why is this suspicious?",
                     "What trick is being used?",
                     "How could I verify this?"
                   ].map((q, i) => (
                     <button
                       key={i}
                       onClick={() => handleAskMentor(q)}
                       disabled={isChatting || !scenario}
                       className="flex items-center px-4 py-2 bg-[#1E293B] border border-[#374151] hover:border-[#3B82F6]/50 text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#3B82F6]/10 text-sm rounded-full transition-all disabled:opacity-50"
                     >
                       <HelpCircle className="w-3 h-3 mr-2" />
                       {q}
                     </button>
                   ))}
                </div>

                <div className="flex flex-col h-[300px] bg-[#0A0F1E]/50 border border-[#374151] rounded-2xl overflow-hidden backdrop-blur-sm">
                   <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {chatMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-[#4B5563]">
                           <MessageCircle className="w-12 h-12 mb-3 opacity-20" />
                           <p className="text-sm">Need a hint? Ask the mentor above.</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                             <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                               msg.role === 'user' 
                                 ? 'bg-[#3B82F6] text-white rounded-tr-sm' 
                                 : 'bg-[#1E293B] text-[#E5E7EB] border border-[#374151] rounded-tl-sm'
                             }`}>
                                <div className="text-[10px] opacity-70 mb-1 font-bold tracking-wider uppercase">
                                  {msg.role === 'user' ? 'You' : 'Mentor'}
                                </div>
                                {msg.content}
                             </div>
                          </div>
                        ))
                      )}
                      <div ref={chatEndRef} />
                   </div>

                   <div className="p-3 bg-[#11172A] border-t border-[#374151] flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAskMentor(chatInput)}
                        placeholder="Type a custom question..."
                        disabled={isChatting || !scenario}
                        className="flex-1 bg-[#0A0F1E] border border-[#374151] rounded-xl px-4 py-2 text-sm text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={() => handleAskMentor(chatInput)}
                        disabled={isChatting || !chatInput.trim() || !scenario}
                        className="p-3 bg-[#3B82F6] text-white rounded-xl hover:bg-[#2563EB] transition-colors disabled:opacity-50 shadow-lg"
                      >
                        {isChatting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="animate-fade-in-up">
            <div className="bg-[#11172A]/80 backdrop-blur-md border border-[#374151] rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-2xl border-4 border-[#1E293B] ${percentage >= 80 ? 'bg-gradient-to-br from-[#22C55E] to-[#10B981]' : percentage >= 60 ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]' : 'bg-gradient-to-br from-[#EF4444] to-[#DC2626]'}`}>
                  <span className="text-4xl font-bold text-white drop-shadow-md">{percentage.toFixed(0)}%</span>
                </div>
                <h2 className="text-4xl font-bold text-[#E5E7EB] mb-3">Training Complete</h2>
                <p className="text-xl text-[#9CA3AF]">You scored <span className="text-white font-bold">{score}</span> out of {totalRounds}</p>
              </div>

              <div className="space-y-4 mb-10">
                {results.map((result, index) => (
                  <div key={index} className={`border rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start ${result.correct ? 'bg-[#22C55E]/5 border-[#22C55E]/30' : 'bg-[#EF4444]/5 border-[#EF4444]/30'}`}>
                    <div className="flex-shrink-0 mt-1">
                      {result.correct ? <CheckCircle className="w-6 h-6 text-[#22C55E]" /> : <XCircle className="w-6 h-6 text-[#EF4444]" />}
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[#E5E7EB] text-sm uppercase tracking-wide">Round {index + 1}</span>
                          <div className="flex items-center text-xs font-medium px-2 py-1 bg-[#1E293B] rounded text-[#9CA3AF]">
                            {getTypeIcon(result.scenario.type)}
                            <span className="ml-1">{result.scenario.type}</span>
                          </div>
                       </div>
                       <p className="text-[#9CA3AF] mb-3 italic text-sm border-l-2 border-[#374151] pl-3">"{result.scenario.content.substring(0, 100)}..."</p>
                       <div className="text-sm">
                          <p className="text-[#E5E7EB]"><span className="font-medium opacity-70">Correct Answer:</span> {result.scenario.isScam ? 'Scam' : 'Safe'}</p>
                          <p className="text-[#9CA3AF] mt-1 text-xs leading-relaxed">{result.scenario.explanation}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setGameState('ready'); setCurrentRound(0); setScenario(null); setResults([]); setChatMessages([]); setLastType(undefined); }}
                className="w-full py-4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-bold rounded-xl shadow-lg hover:shadow-[#3B82F6]/30 transition-all flex items-center justify-center hover:scale-[1.01]"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Train Again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


// ##################################################"
// import { useState, useEffect, useRef } from 'react';

// import { Shield, CheckCircle, XCircle, Loader2, MessageCircle, Send, Mail, MessageSquare, Smartphone, HelpCircle, Sparkles } from 'lucide-react';

// import { generateScenario, askMentor } from '../services/minimax';

// import type { GameScenario, GameResult, ChatMessage } from '../types';



// export default function TrainingGame() {

//   const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');

//   const [currentRound, setCurrentRound] = useState(0);

//   const [scenario, setScenario] = useState<GameScenario | null>(null);

//   const [isLoading, setIsLoading] = useState(false);

//   const [results, setResults] = useState<GameResult[]>([]);

  

//   const [lastType, setLastType] = useState<string | undefined>(undefined);



//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

//   const [chatInput, setChatInput] = useState('');

//   const [isChatting, setIsChatting] = useState(false);

  

//   const chatEndRef = useRef<HTMLDivElement>(null);



//   const totalRounds = 5;



//   useEffect(() => {

//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

//   }, [chatMessages]);



//   useEffect(() => {

//     if (gameState === 'playing' && currentRound < totalRounds && !scenario) {

//       loadNextScenario();

//     }

//   }, [gameState, currentRound, scenario]);



//   const loadNextScenario = async () => {

//     setIsLoading(true);

//     setChatMessages([]);



//     try {

//       const data = await generateScenario(currentRound + 1, lastType);

      

//       setScenario({

//         id: currentRound + 1,

//         content: data.content,

//         type: data.type,

//         isScam: data.isScam,

//         explanation: data.explanation,

//       });

//     } catch (err) {

//       console.error('Failed to generate scenario:', err);

//       setScenario({

//         id: currentRound + 1,

//         content: 'Failed to load scenario. Please check your API configuration.',

//         type: 'SMS',

//         isScam: false,

//         explanation: 'Error loading scenario',

//       });

//     } finally {

//       setIsLoading(false);

//     }

//   };



//   const handleAnswer = (userAnswer: boolean) => {

//     if (!scenario) return;

//     setLastType(scenario.type);

//     const correct = userAnswer === scenario.isScam;

//     setResults([...results, { correct, scenario }]);



//     setTimeout(() => {

//       if (currentRound + 1 < totalRounds) {

//         setCurrentRound(currentRound + 1);

//         setScenario(null);

//       } else {

//         setGameState('finished');

//       }

//     }, 800);

//   };



//   const handleAskMentor = async (question: string) => {

//     if (!question.trim() || !scenario) return;



//     const userMessage: ChatMessage = { role: 'user', content: question };

//     setChatMessages((prev) => [...prev, userMessage]);

//     setChatInput('');

//     setIsChatting(true);



//     try {

//       const context = `Training scenario - ${scenario.type}: "${scenario.content}"\nCorrect answer: ${

//         scenario.isScam ? 'Scam' : 'Safe'

//       }\nExplanation: ${scenario.explanation}`;

//       const response = await askMentor(question, context);



//       const assistantMessage: ChatMessage = { role: 'assistant', content: response };

//       setChatMessages((prev) => [...prev, assistantMessage]);

//     } catch (err) {

//       const errorMessage: ChatMessage = {

//         role: 'assistant',

//         content: 'Sorry, I encountered an error. Please try again.',

//       };

//       setChatMessages((prev) => [...prev, errorMessage]);

//     } finally {

//       setIsChatting(false);

//     }

//   };



//   const getTypeIcon = (type: string) => {

//     switch (type) {

//       case 'SMS': return <Smartphone className="w-5 h-5" />;

//       case 'Email': return <Mail className="w-5 h-5" />;

//       case 'Social Media': return <MessageSquare className="w-5 h-5" />;

//       default: return <MessageCircle className="w-5 h-5" />;

//     }

//   };



//   const score = results.filter((r) => r.correct).length;



//   if (gameState === 'ready') {

//     return (

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         <div className="bg-gradient-to-br from-[#11172A] to-[#1E293B] border border-[#374151] rounded-3xl p-8 md:p-12 text-center">

//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] rounded-2xl mb-6 shadow-lg">

//             <Shield className="w-10 h-10 text-white" />

//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-4">Scam Detection Training</h1>

//           <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">

//             Test your ability to identify AI-generated scams. You'll see {totalRounds} different scenarios. Decide if each one is a scam or safe, and learn from your AI mentor.

//           </p>

//           <button

//             onClick={() => { setGameState('playing'); setLastType(undefined); }}

//             className="px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-[#3B82F6]/30 transition-all"

//           >

//             Start Training

//           </button>

//         </div>

//       </div>

//     );

//   }



//   if (gameState === 'finished') {

//     const percentage = (score / totalRounds) * 100;

//     const missedScams = results.filter((r) => !r.correct && r.scenario.isScam);

//     const missedSafe = results.filter((r) => !r.correct && !r.scenario.isScam);



//     return (

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

//         <div className="bg-[#11172A] border border-[#374151] rounded-3xl p-8 md:p-12">

//           <div className="text-center mb-8">

//             <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 shadow-lg ${percentage >= 80 ? 'bg-gradient-to-br from-[#22C55E] to-[#10B981]' : percentage >= 60 ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]' : 'bg-gradient-to-br from-[#EF4444] to-[#DC2626]'}`}>

//               <span className="text-4xl font-bold text-white">{percentage.toFixed(0)}%</span>

//             </div>

//             <h2 className="text-4xl font-bold text-[#E5E7EB] mb-3">Training Complete!</h2>

//             <p className="text-xl text-[#9CA3AF]">You scored {score} out of {totalRounds}</p>

//           </div>



//           <div className="space-y-6 mb-8">

//             {results.map((result, index) => (

//               <div key={index} className={`border rounded-xl p-6 ${result.correct ? 'bg-[#22C55E]/5 border-[#22C55E]/30' : 'bg-[#EF4444]/5 border-[#EF4444]/30'}`}>

//                 <div className="flex items-start justify-between mb-3">

//                   <div className="flex items-center">

//                     {result.correct ? <CheckCircle className="w-6 h-6 text-[#22C55E] mr-2" /> : <XCircle className="w-6 h-6 text-[#EF4444] mr-2" />}

//                     <span className="font-bold text-[#E5E7EB]">Round {index + 1}</span>

//                   </div>

//                   <div className="flex items-center text-sm text-[#9CA3AF]">

//                     {getTypeIcon(result.scenario.type)}

//                     <span className="ml-1">{result.scenario.type}</span>

//                   </div>

//                 </div>

//                 <p className="text-[#9CA3AF] mb-3 italic">"{result.scenario.content}"</p>

//                 <div className="text-sm">

//                    <p className="text-[#E5E7EB]"><span className="font-medium">Correct Answer:</span> {result.scenario.isScam ? 'Scam' : 'Safe'}</p>

//                    <p className="text-[#9CA3AF] mt-2">{result.scenario.explanation}</p>

//                 </div>

//               </div>

//             ))}

//           </div>

//           <button

//             onClick={() => { setGameState('ready'); setCurrentRound(0); setScenario(null); setResults([]); setChatMessages([]); setLastType(undefined); }}

//             className="w-full px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-bold rounded-xl shadow-lg hover:shadow-[#3B82F6]/30 transition-all"

//           >

//             Train Again

//           </button>

//         </div>

//       </div>

//     );

//   }



//   return (

//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      

//       <div className="text-center mb-6">

//         <div className="inline-flex items-center px-4 py-2 bg-[#11172A] border border-[#374151] rounded-lg text-[#9CA3AF] font-medium">

//           Round {currentRound + 1} of {totalRounds}

//         </div>

//       </div>



//       <div className="space-y-8">

        

//         <div className="bg-[#11172A] border border-[#374151] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">

//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none"></div>



//           {isLoading ? (

//             <div className="flex flex-col items-center justify-center py-20">

//               <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mb-4" />

//               <p className="text-[#9CA3AF]">Generating scenario...</p>

//             </div>

//           ) : scenario ? (

//             <>

//               <div className="flex items-center justify-between mb-6 relative z-10">

//                 <h2 className="text-2xl font-bold text-[#E5E7EB] flex items-center">

//                   <Shield className="w-6 h-6 mr-3 text-[#22D3EE]" />

//                   Analyze This Message

//                 </h2>

//                 <div className="flex items-center px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-lg text-sm font-medium">

//                   {getTypeIcon(scenario.type)}

//                   <span className="ml-2">{scenario.type}</span>

//                 </div>

//               </div>



//               <div className="bg-[#0A0F1E] border border-[#374151] rounded-xl p-8 mb-8 relative z-10 shadow-inner">

//                 <p className="text-[#E5E7EB] leading-relaxed text-lg whitespace-pre-wrap font-serif">

//                   {scenario.content}

//                 </p>

//               </div>



//               <div className="grid sm:grid-cols-2 gap-4 relative z-10">

//                 <button

//                   onClick={() => handleAnswer(true)}

//                   className="px-6 py-4 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#EF4444]/40 hover:translate-y-[-2px] active:translate-y-[0px]"

//                 >

//                   This is a Scam

//                 </button>

//                 <button

//                   onClick={() => handleAnswer(false)}