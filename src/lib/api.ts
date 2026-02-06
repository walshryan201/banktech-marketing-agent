// Frontend helper for calling the AI generation API

export interface GenerateParams {
  type: "social" | "blog";
  platform?: string;
  prompt?: string;
  theme?: string;
  company?: string;
  topic?: string;
  audience?: string;
  length?: string;
  additionalContext?: string;
}

export interface GenerateResult {
  title: string;
  body: string;
  hashtags: string[];
  cta: string;
  platform: string;
  _source: "ai" | "template";
}

export async function generateWithAI(
  params: GenerateParams
): Promise<{ success: true; content: GenerateResult } | { success: false; error: string }> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, error: data.error || `HTTP ${response.status}` };
    }

    const content = await response.json();
    return { success: true, content };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Network error";
    return { success: false, error: msg };
  }
}

export function isAIAvailable(): Promise<boolean> {
  return fetch("/api/generate", { method: "OPTIONS" })
    .then((r) => r.ok || r.status === 200)
    .catch(() => false);
}
