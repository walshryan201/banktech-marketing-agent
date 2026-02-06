import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GeneratedContent } from "../data/templates";

interface HistoryItem extends GeneratedContent {
  id: string;
  createdAt: Date;
}

interface Props {
  items: HistoryItem[];
}

export function ContentHistory({ items }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyContent = (item: HistoryItem) => {
    const full = `${item.body}\n\n${item.hashtags.join(" ")}${item.cta ? `\n\n${item.cta}` : ""}`;
    navigator.clipboard.writeText(full);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAll = () => {
    const md = items
      .map(
        (item) =>
          `# ${item.title}\n*${item.platform} | ${item.createdAt.toLocaleString()}*\n\n${item.body}\n\n${item.hashtags.join(" ")}${item.cta ? `\n\n${item.cta}` : ""}\n\n---\n`
      )
      .join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `banktech-content-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (items.length === 0) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-slate-400 space-y-2">
          <div className="text-4xl">📋</div>
          <p className="text-sm">No saved content yet</p>
          <p className="text-xs">Generate and save content to build your library</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} saved item{items.length > 1 ? "s" : ""}</p>
        <Button variant="outline" size="sm" onClick={exportAll} className="text-xs">
          Export All as Markdown
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`transition-all cursor-pointer ${
              expandedId === item.id ? "ring-1 ring-emerald-300" : "hover:shadow-sm"
            }`}
          >
            <CardHeader
              className="pb-2 cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-sm">{item.title}</CardTitle>
                  <Badge variant="outline" className="text-xs capitalize">
                    {item.platform}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">
                  {item.createdAt.toLocaleDateString()} {item.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </CardHeader>

            {expandedId === item.id && (
              <CardContent className="space-y-3">
                <Separator />
                <div className="prose prose-sm max-w-none">
                  {item.body.split("\n").map((line, i) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h3 key={i} className="text-sm font-semibold mt-3 mb-1 text-slate-800">
                          {line.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (line.trim() === "") return <br key={i} />;
                    return (
                      <p key={i} className="text-sm text-slate-600 my-0.5">
                        {line}
                      </p>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {item.cta && (
                  <p className="text-xs text-slate-500 italic">{item.cta}</p>
                )}

                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyContent(item);
                    }}
                    className="text-xs"
                  >
                    {copiedId === item.id ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
