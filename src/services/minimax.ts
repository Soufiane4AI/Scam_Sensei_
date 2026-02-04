const MINIMAX_API_KEY = import.meta.env.VITE_MINIMAX_API_KEY;
const MINIMAX_GROUP_ID = import.meta.env.VITE_MINIMAX_GROUP_ID; 
const MINIMAX_API_URL = 'https://api.minimax.io/v1/text/chatcompletion_v2';

interface MinimaxMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// --- FONCTION DE NETTOYAGE ROBUSTE ---
function cleanAndParseJSON(responseText: string): any {
  try {
    let cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const firstBracket = cleanText.indexOf('{');
    const lastBracket = cleanText.lastIndexOf('}');

    if (firstBracket !== -1 && lastBracket !== -1) {
      cleanText = cleanText.substring(firstBracket, lastBracket + 1);
    }

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("JSON Parse Error:", responseText);
    return { 
      content: "System error: Could not generate a scenario. Please try again.",
      type: "SMS",
      isScam: false,
      explanation: "API response was not valid JSON."
    };
  }
}

export async function callMinimax(
  messages: MinimaxMessage[],
  temperature: number = 0.7
): Promise<string> {
  if (!MINIMAX_API_KEY) {
    throw new Error('VITE_MINIMAX_API_KEY is missing in .env file');
  }

  try {
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'MiniMax-M2',
        messages,
        temperature,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || data.reply || '';
    
  } catch (error) {
    console.error('Minimax Call Failed:', error);
    throw error;
  }
}

export async function analyzeMessage(content: string): Promise<any> {
  const systemPrompt = `ROLE:
You are a cybersecurity expert.

TASK:
Analyze this message for scam indicators.

OUTPUT:
Return ONLY valid JSON. No markdown.

FORMAT:
{
  "trustScore": <0-100>,
  "riskLevel": "Safe" | "Suspicious" | "Scam",
  "techniques": ["<tech1>", "<tech2>"],
  "aiLikelihood": "Low" | "Medium" | "High",
  "explanation": "<short explanation>"
}`;

  const response = await callMinimax([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Analyze: "${content}"` },
  ]);

  return cleanAndParseJSON(response);
}

export async function generateScenario(round: number, excludeType?: string): Promise<any> {
  
  const types = ['SMS', 'Email', 'Social Media'];
  const availableTypes = excludeType ? types.filter(t => t !== excludeType) : types;
  const forcedType = availableTypes[Math.floor(Math.random() * availableTypes.length)];

  const isScamForced = Math.random() < 0.5; 

  const systemPrompt = `ROLE:
You are a creative cybersecurity scenario generator.

TASK:
Generate a UNIQUE and REALISTIC scenario based on the strict constraints below.

STRICT CONSTRAINTS (YOU MUST OBEY):
- TYPE: "${forcedType}"
- STATUS: ${isScamForced ? "SCAM (Malicious)" : "SAFE (Legitimate)"}
- DIFFICULTY: Level ${round}/5

CONTEXT GUIDELINES:
- If "SMS": Use short text, realistic sender names (e.g. "Mom", "BankAlert", "Delivery").
- If "Email": Subject line + Body. Professional tone but with subtle cues if scam.
- If "Social Media": Mention the platform (Instagram DM, LinkedIn message, WhatsApp).

SCAM CRITERIA (If SCAM):
- Level 1-2: Obvious mistakes, urgency, weird links.
- Level 3-5: Spear phishing, no typos, looks very official, psychological manipulation.

SAFE CRITERIA (If SAFE):
- Can still look urgent (e.g. real bank verification) but is legitimate.
- Normal communication from friends or colleagues.

OUTPUT FORMAT:
Return ONLY a valid JSON object (no markdown):
{
  "content": "<the full message content>",
  "type": "${forcedType}",
  "isScam": ${isScamForced},
  "explanation": "<why it is safe or scam>"
}`;


  const response = await callMinimax([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Generate scenario now.' },
  ], 0.85);

  return cleanAndParseJSON(response);
}

export async function askMentor(question: string, context: string): Promise<string> {
  const systemPrompt = `ROLE: Cyber Mentor.
TASK: Answer the user question clearly and ethically.
CONTEXT: ${context}
CONSTRAINT: Max 3 sentences. Keep it educational.`;
  
  return await callMinimax([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: question },
  ]);
}