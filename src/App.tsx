import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialGenerator } from "./components/SocialGenerator";
import { BlogGenerator } from "./components/BlogGenerator";
import { BrandReference } from "./components/BrandReference";
import { ContentStrategy } from "./components/ContentStrategy";
import { ContentHistory } from "./components/ContentHistory";
import type { GeneratedContent } from "./data/templates";

export default function App() {
  const [history, setHistory] = useState<(GeneratedContent & { id: string; createdAt: Date })[]>([]);

  const addToHistory = (content: GeneratedContent) => {
    setHistory((prev) => [
      { ...content, id: crypto.randomUUID(), createdAt: new Date() },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-lg">
              BT
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                BankTech Marketing Agent
              </h1>
              <p className="text-sm text-slate-500">Content generation for BankTech Ventures</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            Ready
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="social" className="space-y-6">
          <TabsList className="bg-white border h-11 p-1">
            <TabsTrigger value="social" className="text-sm px-4">
              Social Media
            </TabsTrigger>
            <TabsTrigger value="blog" className="text-sm px-4">
              Blog Articles
            </TabsTrigger>
            <TabsTrigger value="brand" className="text-sm px-4">
              Brand Reference
            </TabsTrigger>
            <TabsTrigger value="strategy" className="text-sm px-4">
              Content Strategy
            </TabsTrigger>
            <TabsTrigger value="history" className="text-sm px-4">
              History ({history.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social">
            <SocialGenerator onGenerate={addToHistory} />
          </TabsContent>

          <TabsContent value="blog">
            <BlogGenerator onGenerate={addToHistory} />
          </TabsContent>

          <TabsContent value="brand">
            <BrandReference />
          </TabsContent>

          <TabsContent value="strategy">
            <ContentStrategy />
          </TabsContent>

          <TabsContent value="history">
            <ContentHistory items={history} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
