type Provider = "lovable" | "gemini" | "ollama";

type TextRequest = {
  system: string;
  user: string;
  temperature?: number;
};

type LovableResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ text?: string }> }>;
};

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

type OllamaResponse = { message?: { content?: string } };

function configuredProvider(): Provider {
  const requested = process.env["AI_PROVIDER"]?.toLowerCase();
  if (requested === "lovable" || requested === "gemini" || requested === "ollama") return requested;
  if (process.env["LOVABLE_API_KEY"]) return "lovable";
  if (process.env["GEMINI_API_KEY"]) return "gemini";
  if (process.env["OLLAMA_BASE_URL"]) return "ollama";
  throw new Error("AI is not configured. Set AI_PROVIDER to lovable, gemini, or ollama and add its server-side settings.");
}

function textFromLovable(json: LovableResponse) {
  return json.output_text ?? json.output?.flatMap((item) => item.content ?? []).map((part) => part.text ?? "").join("") ?? "";
}

async function parseResponse<T>(response: Response, provider: Provider): Promise<T> {
  if (response.status === 401 || response.status === 403) throw new Error(`${provider} rejected the server credential. Check its API key.`);
  if (response.status === 429) throw new Error(`${provider} is busy right now. Try again shortly.`);
  if (!response.ok) throw new Error(`${provider} could not respond right now.`);
  return (await response.json()) as T;
}

export async function generateText(request: TextRequest) {
  const provider = configuredProvider();
  if (provider === "lovable") {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Lovable is selected but LOVABLE_API_KEY is missing on the server.");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({ model: process.env["LOVABLE_MODEL"] ?? "openai/gpt-5.6-sol", stream: false, input: [{ role: "system", content: request.system }, { role: "user", content: request.user }] }),
    });
    return textFromLovable(await parseResponse<LovableResponse>(response, "Lovable"));
  }

  if (provider === "gemini") {
    const key = process.env["GEMINI_API_KEY"];
    if (!key) throw new Error("Gemini is selected but GEMINI_API_KEY is missing on the server.");
    const model = process.env["GEMINI_TEXT_MODEL"] ?? "gemini-2.0-flash";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system_instruction: { parts: [{ text: request.system }] }, contents: [{ role: "user", parts: [{ text: request.user }] }], generationConfig: { temperature: request.temperature ?? 0.7 } }),
    });
    const json = await parseResponse<GeminiResponse>(response, "Gemini");
    return json.candidates?.flatMap((candidate) => candidate.content?.parts ?? []).map((part) => part.text ?? "").join("") ?? "";
  }

  const baseUrl = (process.env["OLLAMA_BASE_URL"] ?? "http://127.0.0.1:11434").replace(/\/$/, "");
  const model = process.env["OLLAMA_MODEL"] ?? "llama3.2:3b";
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, stream: false, messages: [{ role: "system", content: request.system }, { role: "user", content: request.user }], options: { temperature: request.temperature ?? 0.7 } }),
    });
  } catch {
    throw new Error(`Local Ollama is unavailable at ${baseUrl}. Start Ollama and pull ${model}, or choose another AI_PROVIDER.`);
  }
  const json = await parseResponse<OllamaResponse>(response, "Ollama");
  return json.message?.content ?? "";
}
