import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BRAND, PORTFOLIO_COMPANIES } from "../data/brand";

export function BrandReference() {
  return (
    <div className="space-y-6">
      {/* Brand Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-emerald-700">{BRAND.totalInvested}</div>
            <p className="text-sm text-slate-500 mt-1">Total Invested</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-emerald-700">{BRAND.portfolioCount}</div>
            <p className="text-sm text-slate-500 mt-1">Portfolio Companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-emerald-700">{BRAND.lpCount}</div>
            <p className="text-sm text-slate-500 mt-1">Community Bank LPs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="voice" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="voice" className="text-sm">Brand Voice</TabsTrigger>
          <TabsTrigger value="portfolio" className="text-sm">Portfolio</TabsTrigger>
          <TabsTrigger value="audiences" className="text-sm">Audiences</TabsTrigger>
          <TabsTrigger value="assets" className="text-sm">Assets</TabsTrigger>
        </TabsList>

        {/* Brand Voice */}
        <TabsContent value="voice">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">{BRAND.mission}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Voice & Tone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-3 italic">{BRAND.tone.voice}</p>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-2">Do</p>
                    <ul className="space-y-1.5">
                      {BRAND.tone.dos.map((d, i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-emerald-500 mt-0.5">+</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-2">Don't</p>
                    <ul className="space-y-1.5">
                      {BRAND.tone.donts.map((d, i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-red-400 mt-0.5">-</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Key Value Propositions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {BRAND.valueProps.map((vp, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50">
                      <span className="text-emerald-600 font-bold text-sm">{i + 1}</span>
                      <p className="text-sm text-slate-600">{vp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Portfolio Companies */}
        <TabsContent value="portfolio">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Portfolio Companies ({PORTFOLIO_COMPANIES.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {PORTFOLIO_COMPANIES.map((company) => (
                  <AccordionItem key={company.name} value={company.name}>
                    <AccordionTrigger className="text-sm hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{company.name}</span>
                        <Badge variant="outline" className="text-xs font-normal">
                          {company.category}
                        </Badge>
                        {company.status === "exited" && (
                          <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                            Exited
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pl-1">
                        <p className="text-sm text-slate-600">{company.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>Invested: {company.investmentYear}</span>
                          <span>Stage: {company.stage}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {company.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audiences */}
        <TabsContent value="audiences">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(BRAND.audiences).map(([key, aud]) => (
              <Card key={key}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{aud.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Pain Points
                    </p>
                    <ul className="space-y-1.5">
                      {aud.painPoints.map((pp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex gap-2">
                          <span className="text-slate-400">-</span>
                          {pp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Key Message
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed italic">{aud.messaging}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assets */}
        <TabsContent value="assets">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {BRAND.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-sm cursor-pointer hover:bg-emerald-100 transition-colors"
                      onClick={() => navigator.clipboard.writeText(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">Click to copy</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Key Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {BRAND.partners.map((p) => (
                    <li key={p} className="text-sm text-slate-600 flex gap-2 items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Key Statistics (for content use)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { stat: BRAND.totalInvested, label: "Total invested" },
                    { stat: "17", label: "Portfolio companies" },
                    { stat: "100+", label: "Community bank LPs" },
                    { stat: "100+", label: "Vendor contracts signed" },
                    { stat: "1,500+", label: "Companies evaluated (2024)" },
                    { stat: "500+", label: "Founder calls (2024)" },
                    { stat: "1", label: "Portfolio exit (Adlumin)" },
                    { stat: "2021", label: "Year founded" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-emerald-50 transition-colors"
                      onClick={() => navigator.clipboard.writeText(item.stat)}
                    >
                      <div className="text-lg font-bold text-slate-800">{item.stat}</div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">Click to copy stat</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
