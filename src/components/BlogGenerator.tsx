import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_COMPANIES, CONTENT_THEMES, BRAND } from "../data/brand";
import { BLOG_TEMPLATES } from "../data/templates";
import type { GeneratedContent } from "../data/templates";
import { SYSTEM_PROMPT, BLOG_POST_PROMPT } from "../data/prompts";
import { ContentPreview } from "./ContentPreview";
import { generateWithAI } from "../lib/api";

interface Props {
  onGenerate: (content: GeneratedContent) => void;
}

export function BlogGenerator({ onGenerate }: Props) {
  const [theme, setTheme] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("communityBanks");
  const [length, setLength] = useState("medium");
  const [additionalContext, setAdditionalContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(false);
  const [aiError, setAiError] = useState("");

  const selectedCompany = PORTFOLIO_COMPANIES.find((c) => c.name === company);
  const selectedTheme = CONTENT_THEMES.find((t) => t.id === theme);

  // Check AI availability on mount
  useEffect(() => {
    const checkAIAvailability = async () => {
      try {
        const response = await fetch("/api/generate", { method: "OPTIONS" });
        if (response.ok) {
          setAiAvailable(true);
          setAiError("");
        } else {
          setAiAvailable(false);
          setAiError("AI service not available");
        }
      } catch (error) {
        setAiAvailable(false);
        setAiError("Could not connect to AI service");
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
          type: "blog",
          prompt,
          theme,
          company,
          topic,
          audience,
          length,
          additionalContext,
        });

        if (result.success) {
          setGenerated(result.content);
          setEditedBody(result.content.body);
          setIsGenerating(false);
          return;
        } else {
          console.error("AI generation failed:", result.error);
          setAiError(result.error + " — using template-based generation");
        }
      } catch (error) {
        console.error("AI generation failed, falling back to templates:", error);
        setAiError("AI generation failed, using template-based generation");
      }
    }

    // Fall back to template-based generation
    setTimeout(() => {
      let content: GeneratedContent;

      switch (theme) {
        case "portfolio-spotlight":
          content = BLOG_TEMPLATES["portfolio-spotlight"](
            company || "Our Portfolio Company",
            selectedCompany?.description || "A cutting-edge solution for community banks.",
            additionalContext || "Community banks face increasing pressure to modernize their technology stack while maintaining the personal service that defines them.",
            additionalContext || "provides an innovative approach that integrates seamlessly with existing banking infrastructure, delivering immediate value without disrupting operations."
          );
          break;
        case "industry-trends":
          content = BLOG_TEMPLATES["industry-trends"](
            topic || "The Evolving Banking Technology Landscape",
            additionalContext || "The pace of technology adoption in community banking is accelerating. From AI-powered lending platforms to real-time payment infrastructure, the tools available to community banks are more powerful — and more accessible — than ever.",
            "Community banks that move quickly to adopt proven solutions will strengthen their competitive position and better serve their communities. Those that wait risk falling behind not just large banks, but also agile neobanks and embedded finance platforms.",
            "This is exactly why BankTech Ventures exists. We evaluate over 1,500 companies annually, conduct 500+ founder calls, and invest in the select few that demonstrate real potential to move the needle for community banks."
          );
          break;
        case "ecosystem-value":
          content = BLOG_TEMPLATES["ecosystem-value"](
            additionalContext || "When a mid-sized community bank in the Midwest needed to modernize their commercial lending process, they turned to the BankTech ecosystem. Within weeks, they were connected with a portfolio company that understood their specific needs and could deploy a solution tailored to their existing infrastructure.",
            "The result was a measurable improvement in loan processing time, stronger borrower relationships, and a technology partnership that continues to evolve."
          );
          break;
        default:
          content = BLOG_TEMPLATES["industry-trends"](
            topic || "Innovation in Community Banking",
            additionalContext || "The community banking sector stands at a pivotal moment. Technology is no longer optional — it's the foundation of competitive advantage.",
            "For the 4,800+ community banks across the country, the question isn't whether to adopt new technology, but how to do it effectively, safely, and in a way that preserves the relationship-driven model that makes community banking special.",
            "BankTech Ventures was built to answer that question. Our ecosystem model ensures that every investment we make is informed by real community bank needs and validated by real community bank adoption."
          );
      }

      setGenerated(content);
      setEditedBody(content.body);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSave = () => {
    if (generated) {
      const final = { ...generated, body: editedBody };
      onGenerate(final);
    }
  };

  const getAIPrompt = () => {
    const audienceLabel =
      BRAND.audiences[audience as keyof typeof BRAND.audiences]?.label || "Community Banks";
    return BLOG_POST_PROMPT({
      theme: selectedTheme?.label || theme,
      topic,
      company: company || undefined,
      audience: audienceLabel,
      length,
      additionalContext: additionalContext || undefined,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Configuration */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Configure Article</CardTitle>
              {aiAvailable ? (
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  🟢 AI Connected
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300">
                  🟡 Template Mode
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* AI Prompt - PROMINENT at TOP */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                What do you want to write about?
              </Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write an article about how community banks can use AI for commercial lending without losing the personal touch..."
                className="resize-none border-2 border-emerald-200 focus:border-emerald-400"
                rows={4}
              />
              {aiError && (
                <p className="text-xs text-amber-600 mt-1">{aiError}</p>
              )}
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Article Type</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_THEMES.filter((t) =>
                    ["portfolio-spotlight", "industry-trends", "ecosystem-value", "thought-leadership", "education"].includes(t.id)
                  ).map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.icon} {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Article Topic</Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'AI-Powered Underwriting for Community Banks'"
              />
            </div>

            {/* Audience */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Target Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BRAND.audiences).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Portfolio Company */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Feature Company <span className="text-slate-400">(optional)</span>
              </Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {PORTFOLIO_COMPANIES.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name} — {c.category}
                      {c.status === "exited" ? " (Exited)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCompany && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCompany.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Length */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Article Length</Label>
              <div className="flex gap-2">
                {[
                  { id: "short", label: "Short", desc: "~500 words" },
                  { id: "medium", label: "Medium", desc: "~1000 words" },
                  { id: "long", label: "Long", desc: "~1500+ words" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLength(l.id)}
                    className={`flex-1 text-sm py-2 px-3 rounded-md border transition-colors ${
                      length === l.id
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-medium">{l.label}</div>
                    <div className="text-xs text-slate-400">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Context */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Key Points / Context <span className="text-slate-400">(optional)</span>
              </Label>
              <Textarea
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="Specific angles, data points, quotes, or themes to weave into the article..."
                className="resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={generateContent}
                disabled={!theme || isGenerating}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800"
              >
                {isGenerating ? "Generating..." : "Generate Article"}
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

        {showPrompt && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-800">AI Prompt (for external LLM)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-600 mb-2">
                Copy to use with Claude API or any LLM for richer generation:
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

      {/* Preview */}
      <div className="lg:col-span-3">
        {generated ? (
          <ContentPreview
            content={{ ...generated, body: editedBody }}
            onBodyChange={setEditedBody}
            onSave={handleSave}
            onRegenerate={generateContent}
          />
        ) : (
          <Card className="h-full flex items-center justify-center min-h-[400px]">
            <div className="text-center text-slate-400 space-y-2">
              <div className="text-4xl">📄</div>
              <p className="text-sm">Configure your article and click Generate</p>
              <p className="text-xs">Full blog post drafts will appear here</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
