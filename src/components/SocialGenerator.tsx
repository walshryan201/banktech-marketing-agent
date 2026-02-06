import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_COMPANIES, CONTENT_THEMES, SOCIAL_PLATFORMS } from "../data/brand";
import { LINKEDIN_TEMPLATES, TWITTER_TEMPLATES } from "../data/templates";
import type { GeneratedContent } from "../data/templates";
import { SYSTEM_PROMPT, SOCIAL_POST_PROMPT } from "../data/prompts";
import { ContentPreview } from "./ContentPreview";
import { generateWithAI } from "../lib/api";

interface Props {
  onGenerate: (content: GeneratedContent) => void;
}

export function SocialGenerator({ onGenerate }: Props) {
  const [platform, setPlatform] = useState("linkedin");
  const [theme, setTheme] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(false);
  const [aiError, setAiError] = useState("");

  const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.id === platform);
  const selectedCompany = PORTFOLIO_COMPANIES.find((c) => c.name === company);
  const selectedTheme = CONTENT_THEMES.find((t) => t.id === theme);

  // Check if AI backend is available on mount
  useEffect(() => {
    const checkAIAvailability = async () => {
      try {
        const response = await fetch("/api/generate", { method: "OPTIONS" });
        setAiAvailable(response.ok);
      } catch (error) {
        setAiAvailable(false);
      }
    };
    checkAIAvailability();
  }, []);

  const generateContent = async () => {
    setIsGenerating(true);
    setAiError("");

    // Try AI generation if available and prompt is provided
    if (aiAvailable && prompt.trim()) {
      try {
        const result = await generateWithAI({
          type: "social",
          platform,
          prompt,
          theme,
          company: company || undefined,
          topic: topic || undefined,
          additionalContext: additionalContext || undefined,
        });
        if (result.success) {
          setGenerated(result.content);
          setEditedBody(result.content.body);
          setIsGenerating(false);
          return;
        } else {
          console.error("AI generation failed:", result.error);
          setAiError(result.error + " — using template-based content instead.");
        }
      } catch (error) {
        console.error("AI generation failed, falling back to templates:", error);
        setAiError("AI generation failed. Using template-based content instead.");
        // Fall through to template generation
      }
    }

    // Use templates for instant generation (fallback or when AI not available/no prompt)
    setTimeout(() => {
      let content: GeneratedContent;

      if (platform === "linkedin") {
        switch (theme) {
          case "portfolio-spotlight":
            content = (LINKEDIN_TEMPLATES["portfolio-spotlight"] as Function)(
              company || "our portfolio company",
              selectedCompany?.description || topic,
              selectedCompany?.tags || []
            );
            break;
          case "industry-trends":
            content = (LINKEDIN_TEMPLATES["industry-trends"] as Function)(
              topic || "Banking Technology",
              additionalContext || "The banking technology landscape continues to evolve rapidly, with community banks increasingly seeking modern solutions to compete in a digital-first world."
            );
            break;
          case "ecosystem-value":
            content = (LINKEDIN_TEMPLATES["ecosystem-value"] as Function)(
              "",
              company || "one of our portfolio companies",
              additionalContext || "deployed a new technology solution that streamlined their operations and improved customer experience"
            );
            break;
          case "thought-leadership":
            content = (LINKEDIN_TEMPLATES["thought-leadership"] as Function)(
              topic || "The Future of Community Banking",
              additionalContext || "The next decade will define which community banks thrive and which fall behind. The difference won't be size — it will be the willingness to embrace strategic technology partnerships."
            );
            break;
          case "milestone":
            content = (LINKEDIN_TEMPLATES.milestone as Function)(
              topic || "Another milestone for BankTech Ventures!",
              additionalContext || "We continue to see strong momentum across our ecosystem, with portfolio companies delivering real results for community bank partners."
            );
            break;
          case "education":
            content = (LINKEDIN_TEMPLATES.education as Function)(
              topic || "Evaluating Fintech Partners",
              additionalContext || "When evaluating fintech partners, community banks should consider: proven track record with similar institutions, regulatory compliance readiness, integration capabilities with existing core systems, and a clear ROI timeline."
            );
            break;
          case "event-recap":
            content = (LINKEDIN_TEMPLATES["event-recap"] as Function)(
              topic || "Industry Conference",
              additionalContext || "Key themes included the acceleration of AI in banking, the growing importance of data-driven decision making, and the need for stronger bank-fintech collaboration."
            );
            break;
          case "community":
            content = (LINKEDIN_TEMPLATES.community as Function)(
              additionalContext || topic || "We're proud of the community we've built — bankers and founders working side by side to solve real problems."
            );
            break;
          case "community-bank-shoutout":
            content = (LINKEDIN_TEMPLATES["community-bank-shoutout"] as Function)(
              company || "Our LP Community Bank",
              additionalContext || "recently achieved a significant milestone in their digital transformation journey",
              "Their success demonstrates the power of combining community banking expertise with cutting-edge technology — and it's exactly the kind of win our ecosystem is designed to create."
            );
            break;
          case "curated-insight":
            content = (LINKEDIN_TEMPLATES["curated-insight"] as Function)(
              topic || "A recent industry report",
              additionalContext || "highlights the accelerating pace of technology adoption in community banking",
              "This aligns with what we see every day. Community banks that embrace proven, practical technology solutions — with the right partners — are not just keeping up; they're pulling ahead."
            );
            break;
          case "behind-the-scenes":
            content = (LINKEDIN_TEMPLATES["behind-the-scenes"] as Function)(
              additionalContext || "Another week, another round of founder calls and bank visits.",
              "These conversations are the heartbeat of BankTech Ventures. Every interaction helps us understand what community banks really need — and which fintechs can deliver."
            );
            break;
          default:
            content = (LINKEDIN_TEMPLATES["thought-leadership"] as Function)(
              topic || "Community Banking Innovation",
              additionalContext || "Community banks are uniquely positioned to deliver personalized, technology-enabled experiences that large institutions can't match."
            );
        }
      } else {
        switch (theme) {
          case "portfolio-spotlight":
            content = (TWITTER_TEMPLATES["portfolio-spotlight"] as Function)(company || "our latest portfolio company");
            break;
          case "milestone":
            content = (TWITTER_TEMPLATES.milestone as Function)(topic || "Big news from BankTech Ventures!");
            break;
          case "community-bank-shoutout":
            content = (TWITTER_TEMPLATES.milestone as Function)("Another LP community bank win! Our ecosystem is working — connecting banks with the technology they need to compete and grow. #BankTechVentures");
            break;
          case "curated-insight":
            content = (TWITTER_TEMPLATES["industry-trends"] as Function)(topic || "Technology adoption in community banking is accelerating");
            break;
          case "behind-the-scenes":
            content = (TWITTER_TEMPLATES.milestone as Function)("On the road again — connecting community banks with the technology partners they deserve. The work is the mission. #BankTechVentures");
            break;
          default:
            content = (TWITTER_TEMPLATES["industry-trends"] as Function)(topic || "Banking technology is evolving fast");
        }
      }

      setGenerated(content);
      setEditedBody(content.body);
      setIsGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    if (generated) {
      const final = { ...generated, body: editedBody };
      onGenerate(final);
    }
  };

  const getAIPrompt = () => {
    return SOCIAL_POST_PROMPT({
      platform: selectedPlatform?.label || "LinkedIn",
      theme: selectedTheme?.label || theme,
      topic,
      company: company || undefined,
      additionalContext: additionalContext || undefined,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Configuration Panel */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Configure Post</CardTitle>
              {aiAvailable ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  ✓ AI Connected
                </Badge>
              ) : (
                <Badge variant="outline" className="text-amber-700 border-amber-300 bg-amber-50">
                  Template Mode
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* AI Prompt Textarea - PROMINENT AT TOP */}
            <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Label className="text-sm font-semibold text-blue-900">What do you want to create?</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write a LinkedIn post about our SOLO investment and how AI is transforming underwriting for community banks..."
                className="resize-none bg-white"
                rows={3}
              />
              {aiAvailable ? (
                <p className="text-xs text-blue-600">AI generation is available. Describe what you want and we'll create it for you.</p>
              ) : (
                <p className="text-xs text-amber-600">AI backend not available. Using template-based generation below.</p>
              )}
              {aiError && (
                <p className="text-xs text-red-600">{aiError}</p>
              )}
            </div>
            {/* Platform */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Platform</Label>
              <div className="flex gap-2">
                {SOCIAL_PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex-1 text-sm py-2 px-3 rounded-md border transition-colors ${
                      platform === p.id
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
              {selectedPlatform && (
                <p className="text-xs text-slate-400">Max {selectedPlatform.maxChars} characters</p>
              )}
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Content Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme..." />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_THEMES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <span>{t.icon} {t.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTheme && (
                <p className="text-xs text-slate-400">{selectedTheme.description}</p>
              )}
            </div>

            {/* Portfolio Company (optional) */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Feature a Portfolio Company <span className="text-slate-400">(optional)</span>
              </Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {PORTFOLIO_COMPANIES.filter((c) => c.status === "active").map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name} — {c.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCompany && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCompany.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Topic / Headline</Label>
              <Textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'How AI is transforming commercial lending for community banks'"
                className="resize-none"
                rows={2}
              />
            </div>

            {/* Additional Context */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Additional Context <span className="text-slate-400">(optional)</span>
              </Label>
              <Textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Any specific points, data, quotes, or angles to include..."
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={generateContent}
                disabled={!theme || isGenerating}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800"
              >
                {isGenerating ? "Generating..." : "Generate Post"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPrompt(!showPrompt)}
                className="text-xs"
              >
                {showPrompt ? "Hide" : "AI"} Prompt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Prompt Preview */}
        {showPrompt && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-800">AI Prompt (for external LLM use)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-600 mb-2">
                Copy this prompt to use with Claude API, ChatGPT, or any LLM for more dynamic generation:
              </p>
              <pre className="text-xs bg-white rounded border border-amber-200 p-3 overflow-auto max-h-48 whitespace-pre-wrap text-slate-700">
                {SYSTEM_PROMPT + "\n\n---\n\n" + getAIPrompt()}
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => navigator.clipboard.writeText(SYSTEM_PROMPT + "\n\n---\n\n" + getAIPrompt())}
              >
                Copy Prompt
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-3">
        {generated ? (
          <ContentPreview
            content={{ ...generated, body: editedBody }}
            onBodyChange={setEditedBody}
            onSave={handleSave}
            onRegenerate={generateContent}
            charLimit={selectedPlatform?.maxChars}
          />
        ) : (
          <Card className="h-full flex items-center justify-center min-h-[400px]">
            <div className="text-center text-slate-400 space-y-2">
              <div className="text-4xl">📝</div>
              <p className="text-sm">Configure your post and click Generate</p>
              <p className="text-xs">Your content will appear here for editing</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
