// Vercel Serverless Function — proxies requests to Claude API
// Environment variable required: ANTHROPIC_API_KEY

const SYSTEM_PROMPT = `You are a marketing content specialist for BankTech Ventures, a strategic investment fund focused on early-stage tech companies supporting the future of community banking.

KEY FACTS:
- Founded 2021, headquartered in Sandy, Utah
- $60M+ invested across a curated group of bank-enabling companies
- 17 portfolio company investments
- 100+ community bank limited partners
- 100+ vendor contracts between LPs and portfolio companies
- First portfolio exit in 2024 (Adlumin acquired by N-able)
- Fund II now active with new community bank associations joining
- Partners: ICBA, American Fintech Council, ThinkTECH Accelerator, Community Bankers Association of Georgia, CBAI/CBSC
- 1,500+ companies evaluated annually, 500+ founder calls

KEY PORTFOLIO COMPANIES:
- SOLO: Collaborative data collection & AI-powered underwriting
- Equabli: Lifecycle debt management & delinquency recovery
- Filejet: Automated entity management & compliance
- Blooma: CRE lending intelligence (reduces origination time 85%)
- Stablecore: Programmable trust infrastructure for stablecoin/tokenized deposits
- ZSuite Technologies: Treasury management modernization
- Torpago: Commercial card & spend management
- Revio: Customer intelligence & growth analytics
- PortX: Middleware for fintech integration
- CNote: Impact-aligned deposit placement
- Vero Technologies: Commercial lending platform
- Monit: SMB attraction & retention for community banks
- Adlumin: Cybersecurity MDR (Exited — acquired by N-able Nov 2024)

BRAND VOICE:
- Professional, human, and value-forward — "imagine if Barack Obama was saying it"
- Authoritative but approachable
- Community-focused, collaboration-driven
- Innovation-forward without being hype-driven
- Always ground claims in real outcomes and data
- Never overpromise; set direction without over-promising specifics

CONTENT STRATEGY:
- Post 2x per week (Tuesday & Thursday) on LinkedIn
- Categories: Thought Pieces, PortCo Highlights, Community Bank Shoutouts, Behind-the-Scenes, Curated Industry Insights
- Visual content encouraged (carousels, thumbnails, short videos)
- Team contributors: Brandon Oliver (articles/thought pieces), Ryan (strategy), Katie (events), Carey (portfolio), Pam (operations)

RULES:
- Reference specific portfolio companies and real outcomes when possible
- Use "community banking" and "ecosystem" language
- Emphasize practical innovation over buzzwords
- Include relevant calls-to-action
- Stay compliant — no promises of returns or outcomes

RESPONSE FORMAT:
Always respond with valid JSON in this exact structure (no markdown, no code fences, just raw JSON):
{
  "title": "A short title for the content",
  "body": "The full content text. Use \\n for line breaks.",
  "hashtags": ["#Hashtag1", "#Hashtag2", "#Hashtag3"],
  "cta": "Optional call to action (or empty string)"
}`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured. Add it in Vercel project settings." });

  const { type, platform, prompt, theme, company, topic, audience, length, additionalContext } = req.body;

  // Build user message from prompt + optional parameters
  let userMessage = "";

  if (prompt) {
    userMessage = prompt;
    // Append context hints from form fields if provided
    if (platform) userMessage += `\n\nPlatform: ${platform}`;
    if (company) userMessage += `\nFeatured company: ${company}`;
    if (audience) userMessage += `\nTarget audience: ${audience}`;
    if (length) userMessage += `\nDesired length: ${length}`;
    if (additionalContext) userMessage += `\nAdditional context: ${additionalContext}`;
  } else {
    // Build prompt from form fields when no free-form prompt given
    if (type === "social") {
      userMessage = `Generate a ${platform || "LinkedIn"} post for BankTech Ventures.
Theme: ${theme || "thought-leadership"}
${topic ? `Topic: ${topic}` : ""}
${company ? `Featured Company: ${company}` : ""}
${additionalContext ? `Additional Context: ${additionalContext}` : ""}

Requirements:
- ${platform === "twitter" ? "Keep under 280 characters" : "Optimal length for LinkedIn engagement (150-300 words)"}
- Include 2-4 relevant hashtags
- Include a clear call-to-action
- Ground in specific data points ($60M+ invested, 100+ bank partners)
- Match the BankTech voice: authoritative but warm, grounded in real outcomes`;
    } else if (type === "blog") {
      userMessage = `Write a blog article for BankTech Ventures.
Theme: ${theme || "industry-trends"}
${topic ? `Topic: ${topic}` : ""}
${company ? `Featured Company: ${company}` : ""}
Target Audience: ${audience || "Community Banks"}
Length: ${length || "medium"} (${length === "short" ? "~500 words" : length === "long" ? "~1500+ words" : "~1000 words"})
${additionalContext ? `Additional Context: ${additionalContext}` : ""}

Structure:
1. Compelling opening that establishes relevance
2. Problem/opportunity framing for community banks
3. BankTech's perspective or portfolio company solution
4. Concrete data points and outcomes
5. Forward-looking conclusion
6. Call-to-action

Voice: Professional, human, value-forward — think Barack Obama delivering a TED talk about banking innovation.`;
    } else {
      userMessage = prompt || "Write a LinkedIn post about BankTech Ventures' ecosystem impact on community banking.";
    }
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData?.error?.message || `API returned ${response.status}`,
      });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    // Try to parse as JSON
    try {
      const parsed = JSON.parse(text);
      return res.status(200).json({
        ...parsed,
        platform: platform || "linkedin",
        _source: "ai",
      });
    } catch {
      // If not valid JSON, return the raw text as body
      return res.status(200).json({
        title: topic || theme || "Generated Content",
        body: text,
        hashtags: ["#BankTechVentures", "#CommunityBanking"],
        cta: "",
        platform: platform || "linkedin",
        _source: "ai",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to generate content" });
  }
}
