export type PageRoute = 'home' | 'checker' | 'game' | 'about';

export interface AnalysisResult {
  trustScore: number;
  riskLevel: 'Safe' | 'Suspicious' | 'Scam';
  techniques: string[];
  aiLikelihood: 'Low' | 'Medium' | 'High';
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GameScenario {
  id: number;
  content: string;
  type: 'SMS' | 'Email' | 'Social Media';
  isScam: boolean;
  explanation: string;
}

export interface GameResult {
  correct: boolean;
  scenario: GameScenario;
}
