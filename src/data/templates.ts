// Content generation templates for BankTech Ventures marketing

export interface GeneratedContent {
  title: string;
  body: string;
  hashtags: string[];
  cta?: string;
  platform: string;
}

// ── Social Media Templates ──

export const LINKEDIN_TEMPLATES = {
  "portfolio-spotlight": (company: string, description: string, tags: string[]) => ({
    title: `Portfolio Spotlight: ${company}`,
    body: `We're proud to spotlight ${company} — one of BankTech Ventures' portfolio companies driving real innovation for community banks.

${description}

At BankTech Ventures, we don't just invest capital — we connect fintechs with our ecosystem of 100+ community bank partners to accelerate adoption and deliver measurable impact.

This is what it looks like when community banks and fintechs work together.`,
    hashtags: ["#BankTechVentures", "#CommunityBanking", ...tags.slice(0, 2).map((t) => `#${t.replace(/\s+/g, "")}`)],
    cta: "Learn more about our portfolio → banktechventures.com/portfolio",
    platform: "linkedin",
  }),

  "industry-trends": (topic: string, insight: string) => ({
    title: `Industry Insight: ${topic}`,
    body: `${insight}

At BankTech Ventures, we're watching this space closely. In 2024 alone, we evaluated over 1,500 companies and conducted 500+ founder calls to find the technologies that will matter most to community banks.

The future of banking isn't just about technology — it's about the right technology, deployed in partnership with the institutions that know their communities best.

What trends are you seeing in your market?`,
    hashtags: ["#BankTechVentures", "#BankInnovation", "#CommunityBanking", "#Fintech"],
    platform: "linkedin",
  }),

  "ecosystem-value": (lpName: string, portfolioCompany: string, outcome: string) => ({
    title: "Ecosystem in Action",
    body: `This is the power of the BankTech ecosystem.

${lpName ? `${lpName} — one of our LP community banks —` : "One of our LP community banks"} recently ${outcome} through their partnership with ${portfolioCompany}.

With 100+ community banks in our network and 100+ vendor contracts signed between LPs and portfolio companies, we're proving that collaboration between banks and fintechs creates real, lasting value.

This is what we built BankTech Ventures to do.`,
    hashtags: ["#BankTechVentures", "#Ecosystem", "#CommunityBanking", "#Fintech"],
    cta: "Interested in joining our ecosystem? Let's talk.",
    platform: "linkedin",
  }),

  "thought-leadership": (topic: string, perspective: string) => ({
    title: `Perspective: ${topic}`,
    body: `${perspective}

Community banks represent over 4,800 institutions serving communities across America. They need technology partners who understand their unique challenges — not one-size-fits-all solutions designed for the top 25.

At BankTech Ventures, we sit at the intersection of community banking and fintech innovation, and our job is to bridge that gap.

That's why we invest in companies that are purpose-built for community banks.`,
    hashtags: ["#BankTechVentures", "#ThoughtLeadership", "#CommunityBanking"],
    platform: "linkedin",
  }),

  milestone: (achievement: string, context: string) => ({
    title: "Milestone",
    body: `${achievement}

${context}

Since our founding in 2021, we've invested over $60 million in 17 bank-enabling technology companies, and our ecosystem of 100+ community bank LPs continues to grow.

Thank you to our investors, portfolio companies, and partners who make this possible. The best is ahead.`,
    hashtags: ["#BankTechVentures", "#Milestone", "#CommunityBanking", "#Fintech"],
    platform: "linkedin",
  }),

  education: (topic: string, keyPoints: string) => ({
    title: `Learn: ${topic}`,
    body: `${keyPoints}

At BankTech Ventures, we're committed to equipping community bankers with the knowledge they need to navigate the evolving technology landscape.

From our Fintech Boot Camps to our FOMO newsletter, we're building resources that help bankers evaluate, adopt, and champion technology that moves their institutions forward.`,
    hashtags: ["#BankTechVentures", "#Education", "#CommunityBanking", "#BankingTech"],
    cta: "Subscribe to FOMO → banktechventures.com",
    platform: "linkedin",
  }),

  "event-recap": (eventName: string, highlights: string) => ({
    title: `Event: ${eventName}`,
    body: `Great conversations at ${eventName}!

${highlights}

We love connecting with community bankers and fintech founders who share our vision — technology should serve communities, not replace them.

See you at the next one.`,
    hashtags: ["#BankTechVentures", "#Events", "#CommunityBanking", "#Networking"],
    platform: "linkedin",
  }),

  community: (highlight: string) => ({
    title: "Team & Community",
    body: `${highlight}

At BankTech Ventures, we believe the strength of our ecosystem comes from the people in it — bankers, founders, partners, and team members who show up every day to build a more innovative future for community banking.`,
    hashtags: ["#BankTechVentures", "#Team", "#CommunityBanking"],
    platform: "linkedin",
  }),

  "community-bank-shoutout": (bankName: string, achievement: string, context: string) => ({
    title: `Community Spotlight: ${bankName}`,
    body: `We love celebrating the wins of our LP community banks.

${bankName} ${achievement}

${context}

This is what the BankTech ecosystem is all about — community banks that are innovating, growing, and leading the way for their communities.

Congratulations to the entire ${bankName} team.`,
    hashtags: ["#BankTechVentures", "#CommunityBanking", "#BankInnovation"],
    cta: "Learn how your bank can join our ecosystem → banktechventures.com",
    platform: "linkedin",
  }),

  "curated-insight": (article: string, insight: string, btvTake: string) => ({
    title: "Industry Insight",
    body: `Interesting read: ${article}

${insight}

Our take at BankTech Ventures:

${btvTake}

Community banks that move quickly to adopt proven solutions will strengthen their competitive position. Those that wait risk falling behind not just large banks, but agile neobanks and embedded finance platforms.

What are you seeing in your market?`,
    hashtags: ["#BankTechVentures", "#Fintech", "#CommunityBanking", "#BankInnovation"],
    platform: "linkedin",
  }),

  "behind-the-scenes": (moment: string, context: string) => ({
    title: "Behind the Scenes",
    body: `${moment}

${context}

At BankTech Ventures, we're not just investing capital — we're building relationships. Every founder call, every bank visit, every conference handshake is part of how we connect the dots between community banks and the technology they need.

The work is the mission.`,
    hashtags: ["#BankTechVentures", "#TeamBTV", "#CommunityBanking"],
    platform: "linkedin",
  }),
};

export const TWITTER_TEMPLATES = {
  "portfolio-spotlight": (company: string) => ({
    title: `Spotlight: ${company}`,
    body: `🔦 Spotlight: ${company} is helping community banks innovate and grow.

This is what happens when fintechs and community banks work together. 🤝

#BankTechVentures #CommunityBanking`,
    hashtags: ["#BankTechVentures", "#CommunityBanking"],
    platform: "twitter",
  }),

  "industry-trends": (topic: string) => ({
    title: `Trend: ${topic}`,
    body: `📊 ${topic}

Community banks are paying attention — and so are we.

In 2024, we evaluated 1,500+ companies to find the right tech for community banking.

#BankTechVentures #Fintech`,
    hashtags: ["#BankTechVentures", "#Fintech"],
    platform: "twitter",
  }),

  milestone: (achievement: string) => ({
    title: "Milestone",
    body: `🏆 ${achievement}

$50M+ invested. 17 portfolio companies. 100+ community bank partners.

The ecosystem is working. #BankTechVentures`,
    hashtags: ["#BankTechVentures"],
    platform: "twitter",
  }),
};

// ── Blog Templates ──

export const BLOG_TEMPLATES = {
  "portfolio-spotlight": (company: string, description: string, problem: string, solution: string) => ({
    title: `Portfolio Spotlight: How ${company} Is Transforming Community Banking`,
    body: `## The Challenge

${problem}

## The Solution

${company} ${solution}

${description}

## Why BankTech Invested

At BankTech Ventures, we look for companies that solve real, pressing problems for community banks. ${company} stood out because of its deep understanding of community banking needs and its ability to deliver measurable results.

## The Ecosystem Advantage

As part of the BankTech ecosystem, ${company} has direct access to our network of 100+ community bank limited partners — institutions that are ready to pilot, adopt, and champion solutions that work.

This isn't just venture capital. This is a collaborative ecosystem built to accelerate innovation where it matters most: at the community bank level.

## What's Next

We're excited to support ${company}'s continued growth and look forward to sharing more wins from our portfolio. Stay tuned to our FOMO newsletter for monthly updates.

---

*BankTech Ventures is a strategic investment fund focused on early-stage tech companies supporting the future of community banking. Learn more at [banktechventures.com](https://banktechventures.com).*`,
    hashtags: ["#BankTechVentures", "#CommunityBanking", "#Fintech"],
    cta: "Contact us to learn more about our portfolio",
    platform: "blog",
  }),

  "industry-trends": (topic: string, trend: string, impact: string, btv_angle: string) => ({
    title: `${topic}: What Community Banks Need to Know`,
    body: `## The Trend

${trend}

## Why It Matters for Community Banks

${impact}

## BankTech's Perspective

${btv_angle}

## Looking Ahead

At BankTech Ventures, we've evaluated over 1,500 companies in the past year alone, and trends like these inform every investment decision we make. Our goal is to identify and invest in the technologies that will define the next chapter of community banking.

The institutions that embrace thoughtful innovation — with the right partners — will be the ones that thrive.

## Stay Connected

Subscribe to our FOMO newsletter for monthly insights on banking technology trends, portfolio company updates, and ecosystem news.

---

*BankTech Ventures invests in early-stage tech companies that support the future of community banking. With $60M+ invested and 100+ community bank partners, we're building the ecosystem for banking innovation.*`,
    hashtags: ["#BankTechVentures", "#BankInnovation", "#CommunityBanking"],
    platform: "blog",
  }),

  "ecosystem-value": (story: string, impact: string) => ({
    title: `Inside the BankTech Ecosystem: Where Community Banks Meet Innovation`,
    body: `## The Power of the Ecosystem

When we founded BankTech Ventures in 2021, we set out to answer a question that community bankers were asking across the country: "How do we invest in the best technology companies in our industry?"

The answer wasn't just a fund — it was an ecosystem.

## A Real-World Example

${story}

## Measurable Impact

${impact}

## How the Ecosystem Works

BankTech Ventures brings together three pillars:

**Community Bank LPs** — Over 100 community banks invest in the fund and gain early access to vetted technology solutions.

**Portfolio Companies** — 17 bank-enabling fintechs receive not just capital, but direct connections to banks ready to adopt their solutions.

**Industry Partners** — Organizations like ICBA, the American Fintech Council, and the ThinkTECH Accelerator amplify our collective impact.

The result: 100+ vendor contracts signed between LPs and portfolio companies, our first portfolio exit (Adlumin, acquired by N-able in 2024), and a growing track record of community banks winning with technology.

## Join the Ecosystem

Whether you're a community bank exploring technology partnerships or a fintech founder building for the banking industry, BankTech Ventures is here to help.

---

*BankTech Ventures — Investing in the Future of Community Banking.*`,
    hashtags: ["#BankTechVentures", "#Ecosystem", "#CommunityBanking"],
    cta: "Learn more at banktechventures.com",
    platform: "blog",
  }),
};

// ── Newsletter Templates ──

export const NEWSLETTER_TEMPLATES = {
  "quarterly-update": (quarter: string, openingLetter: string, portfolioHighlights: string, lookingAhead: string) => ({
    title: `BankTech Ventures ${quarter} Update`,
    body: `${openingLetter}

## Key Portfolio Themes

${portfolioHighlights}

## Looking Ahead

${lookingAhead}

---

*BankTech Ventures — Investing in the Future of Community Banking. Learn more at [banktechventures.com](https://banktechventures.com).*`,
    hashtags: ["#BankTechVentures", "#CommunityBanking"],
    cta: "Stay connected — subscribe to our newsletter at banktechventures.com",
    platform: "newsletter",
  }),
};
