import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GeneratedContent } from "../data/templates";

interface Props {
  content: GeneratedContent;
  onBodyChange: (body: string) => void;
  onSave: () => void;
  onRegenerate: () => void;
  charLimit?: number;
}

export function ContentPreview({ content, onBodyChange, onSave, onRegenerate, charLimit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const charCount = content.body.length;
  const isOverLimit = charLimit ? charCount > charLimit : false;

  const copyToClipboard = () => {
    const fullContent = `${content.body}\n\n${content.hashtags.join(" ")}${content.cta ? `\n\n${content.cta}` : ""}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMarkdown = () => {
    const md = `# ${content.title}\n\n${content.body}\n\n---\n\n${content.hashtags.join(" ")}${content.cta ? `\n\n${content.cta}` : ""}`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{content.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize">
                {content.platform}
              </Badge>
              {charLimit && (
                <span className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-slate-400"}`}>
                  {charCount}/{charLimit} chars
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs"
            >
              {isEditing ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" size="sm" onClick={onRegenerate} className="text-xs">
              Regenerate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={content.body}
            onChange={(e) => onBodyChange(e.target.value)}
            className="min-h-[300px] font-mono text-sm resize-none"
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            {content.body.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={i} className="text-base font-semibold mt-4 mb-2 text-slate-800">
                    {line.replace("## ", "")}
                  </h3>
                );
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-slate-700 my-1">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return (
                <p key={i} className="text-slate-600 leading-relaxed my-1">
                  {line}
                </p>
              );
            })}
          </div>
        )}

        <Separator />

        {/* Hashtags */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Hashtags</p>
          <div className="flex flex-wrap gap-1.5">
            {content.hashtags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        {content.cta && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Call to Action</p>
            <p className="text-sm text-slate-600 italic">{content.cta}</p>
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={copyToClipboard} variant="outline" className="flex-1 text-sm">
            {copied ? "Copied!" : "Copy as Text"}
          </Button>
          <Button onClick={copyMarkdown} variant="outline" className="flex-1 text-sm">
            Copy as Markdown
          </Button>
          <Button onClick={onSave} className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-sm">
            Save to History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
