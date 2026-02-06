import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CONTENT_STRATEGY, TEAM_MEMBERS, FUTURE_TOPICS } from "../data/brand";

export function ContentStrategy() {
  return (
    <div className="space-y-6">
      {/* Calendar Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-700">{CONTENT_STRATEGY.postingCadence}</div>
            <p className="text-sm text-slate-500 mt-1">Posting Cadence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-700">{CONTENT_STRATEGY.monthlyGoal}</div>
            <p className="text-sm text-slate-500 mt-1">Monthly Post Goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-700">LinkedIn</div>
            <p className="text-sm text-slate-500 mt-1">Primary Platform</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Categories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Content Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CONTENT_STRATEGY.contentCategories.map((cat) => (
                <div key={cat.id} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50">
                  <Badge variant="outline" className="text-xs shrink-0 mt-0.5">{cat.id}</Badge>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{cat.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team & Voice */}
        <div className="space-y-6">
          {/* Tone Card */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-emerald-800">Voice & Tone Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-700 italic leading-relaxed">"{CONTENT_STRATEGY.toneTest}"</p>
              <Separator className="my-3" />
              <p className="text-xs text-emerald-600">{CONTENT_STRATEGY.visualGuidance}</p>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Team Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.focus}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Future Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Content Pipeline — Future Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FUTURE_TOPICS.map((topic, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-emerald-600 font-bold text-sm shrink-0">{i + 1}</span>
                <p className="text-sm text-slate-600">{topic}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
