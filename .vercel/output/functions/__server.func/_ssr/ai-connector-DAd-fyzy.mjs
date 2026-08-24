//#region node_modules/.nitro/vite/services/ssr/assets/ai-connector-DAd-fyzy.js
function configuredProvider() {
	const requested = process.env["AI_PROVIDER"]?.toLowerCase();
	if (requested && requested !== "huggingface") throw new Error("Drippass AI uses Hugging Face DeepSeek. Set AI_PROVIDER=huggingface.");
	if (!process.env["HF_TOKEN"]) throw new Error("Drippass AI is not configured. Add HF_TOKEN to Vercel Environment Variables.");
	return "huggingface";
}
function textFromLovable(json) {
	return json.output_text ?? json.output?.flatMap((item) => item.content ?? []).map((part) => part.text ?? "").join("") ?? "";
}
async function parseResponse(response, provider) {
	if (response.status === 401 || response.status === 403) throw new Error(`${provider} rejected the server credential. Check its API key.`);
	if (response.status === 429) throw new Error(`${provider} is busy right now. Try again shortly.`);
	if (!response.ok) throw new Error(`${provider} could not respond right now.`);
	return await response.json();
}
async function generateText(request) {
	const provider = configuredProvider();
	if (provider === "huggingface") {
		const token = process.env["HF_TOKEN"];
		if (!token) throw new Error("Hugging Face DeepSeek is selected but HF_TOKEN is missing on the server.");
		return (await parseResponse(await fetch("https://router.huggingface.co/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: "deepseek-ai/DeepSeek-V4-Pro-0813:novita",
				messages: [{
					role: "system",
					content: request.system
				}, {
					role: "user",
					content: request.user
				}],
				temperature: request.temperature ?? .7,
				max_tokens: 300
			})
		}), "Hugging Face DeepSeek")).choices?.[0]?.message?.content ?? "";
	}
	if (provider === "lovable") {
		const key = process.env["LOVABLE_API_KEY"];
		if (!key) throw new Error("Lovable is selected but LOVABLE_API_KEY is missing on the server.");
		return textFromLovable(await parseResponse(await fetch("https://ai.gateway.lovable.dev/v1/responses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Lovable-API-Key": key
			},
			body: JSON.stringify({
				model: process.env["LOVABLE_MODEL"] ?? "openai/gpt-5.6-sol",
				stream: false,
				input: [{
					role: "system",
					content: request.system
				}, {
					role: "user",
					content: request.user
				}]
			})
		}), "Lovable"));
	}
	if (provider === "gemini") {
		const key = process.env["GEMINI_API_KEY"];
		if (!key) throw new Error("Gemini is selected but GEMINI_API_KEY is missing on the server.");
		const model = process.env["GEMINI_TEXT_MODEL"] ?? "gemini-2.0-flash";
		return (await parseResponse(await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				system_instruction: { parts: [{ text: request.system }] },
				contents: [{
					role: "user",
					parts: [{ text: request.user }]
				}],
				generationConfig: { temperature: request.temperature ?? .7 }
			})
		}), "Gemini")).candidates?.flatMap((candidate) => candidate.content?.parts ?? []).map((part) => part.text ?? "").join("") ?? "";
	}
	const baseUrl = (process.env["OLLAMA_BASE_URL"] ?? "http://127.0.0.1:11434").replace(/\/$/, "");
	const model = process.env["OLLAMA_MODEL"] ?? "llama3.2:3b";
	let response;
	try {
		response = await fetch(`${baseUrl}/api/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model,
				stream: false,
				messages: [{
					role: "system",
					content: request.system
				}, {
					role: "user",
					content: request.user
				}],
				options: { temperature: request.temperature ?? .7 }
			})
		});
	} catch {
		throw new Error(`Local Ollama is unavailable at ${baseUrl}. Start Ollama and pull ${model}, or choose another AI_PROVIDER.`);
	}
	return (await parseResponse(response, "Ollama")).message?.content ?? "";
}
//#endregion
export { generateText as t };
