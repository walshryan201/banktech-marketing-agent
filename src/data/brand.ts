// BankTech Ventures Brand Data & Portfolio Companies
// Source: banktechventures.com, BusinessWire, LinkedIn

export const BRAND = {
  name: "BankTech Ventures",
  tagline: "Investing in the Future of Community Banking",
  founded: 2021,
  headquarters: "Sandy, Utah",
  totalInvested: "$60M+",
  portfolioCount: 17,
  lpCount: "100+",
  mission:
    "BankTech Ventures is a strategic investment fund focused on investing in early-stage tech companies that support the future of the community banking industry, ultimately helping community banks become more resilient, innovative, and better serve their retail and commercial customers.",
  valueProps: [
    "First venture fund created for and by key leaders in community banking",
    "Over 100 community banks as limited partners",
    "17+ portfolio company investments across banking technology",
    "100+ vendor contracts signed between LPs and portfolio companies",
    "Deep ecosystem connecting bankers, fintech founders, and industry organizations",
    "First portfolio exit in 2024 (Adlumin acquired by N-able)",
  ],
  audiences: {
    communityBanks: {
      label: "Community Banks & Credit Unions",
      painPoints: [
        "Digital transformation pressure",
        "Competing with large banks and neobanks",
        "Regulatory compliance burden",
        "Customer retention and deposit growth",
        "Technology vendor evaluation",
        "Commercial lending modernization",
      ],
      messaging:
        "BankTech Ventures helps community banks access cutting-edge technology solutions through our curated portfolio of bank-enabling fintechs, backed by the collective wisdom of 100+ community bank partners.",
    },
    fintechStartups: {
      label: "Fintech Startups",
      painPoints: [
        "Navigating bank partnerships and regulatory requirements",
        "Understanding community bank needs",
        "Building trust with financial institutions",
        "Scaling bank-ready solutions",
        "Distribution to community banking market",
      ],
      messaging:
        "BankTech Ventures provides strategic capital, deep banking expertise, and direct access to 100+ community bank partners ready to pilot and adopt solutions.",
    },
    investors: {
      label: "Investors & LPs",
      painPoints: [
        "Finding vetted fintech investments",
        "Understanding banking technology landscape",
        "Portfolio diversification in fintech",
      ],
      messaging:
        "BankTech Ventures offers a unique ecosystem approach — community banks invest alongside, providing built-in distribution and feedback loops for portfolio companies.",
    },
  },
  tone: {
    voice: "Professional, human, and value-forward. Authoritative but approachable. Community-focused. Innovation-forward without hype.",
    dos: [
      "Use 'community banking' and 'ecosystem' language",
      "Highlight collaboration between banks and fintechs",
      "Reference real portfolio companies and outcomes",
      "Emphasize practical innovation over hype",
      "Celebrate LP/portfolio company wins together",
    ],
    donts: [
      "Don't use overly technical jargon without context",
      "Don't position against big banks aggressively",
      "Don't overpromise returns or outcomes",
      "Don't ignore regulatory context",
      "Don't use generic fintech buzzwords without substance",
    ],
  },
  hashtags: [
    "#CommunityBanking",
    "#BankTech",
    "#Fintech",
    "#BankInnovation",
    "#CommunityBanks",
    "#BankTechVentures",
    "#FinancialInnovation",
    "#BankingTechnology",
    "#ICBA",
    "#FintechInvesting",
  ],
  partners: ["ICBA", "American Fintech Council", "ThinkTECH Accelerator", "Community Bankers Association of Georgia", "CBAI / CBSC"],
};

export interface PortfolioCompany {
  name: string;
  category: string;
  description: string;
  investmentYear: number;
  stage: string;
  status: "active" | "exited";
  tags: string[];
}

export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    name: "Blooma",
    category: "Lending & CRE",
    description:
      "Cloud-based lending intelligence platform revolutionizing CRE operations. Empowers users to make informed investment decisions while reducing loan origination time by up to 85%.",
    investmentYear: 2022,
    stage: "Series A",
    status: "active",
    tags: ["lending", "CRE", "AI", "origination"],
  },
  {
    name: "CNote",
    category: "Deposits & Impact",
    description:
      "Empowers institutions to align their deposits to high-impact community financial institutions, such as community banks and CDFIs.",
    investmentYear: 2022,
    stage: "Series A",
    status: "active",
    tags: ["deposits", "impact investing", "ESG", "CDFIs"],
  },
  {
    name: "PortX",
    category: "Middleware & Integration",
    description:
      "Middleware platform that helps speed up fintech innovation in banking. Enables banks like Colony Bank to accelerate digital transformation by streamlining integrations.",
    investmentYear: 2023,
    stage: "Series A",
    status: "active",
    tags: ["middleware", "integration", "API", "digital transformation"],
  },
  {
    name: "Stablecore",
    category: "Digital Assets",
    description:
      "Programmable trust infrastructure for institutional stablecoin and tokenized deposit payments.",
    investmentYear: 2025,
    stage: "Seed",
    status: "active",
    tags: ["stablecoin", "digital assets", "tokenization", "payments"],
  },
  {
    name: "Vero Technologies",
    category: "Commercial Lending",
    description:
      "Commercial lending platform partnering with banks and credit unions to offer new commercial credit products and streamline underwriting.",
    investmentYear: 2023,
    stage: "Series A",
    status: "active",
    tags: ["commercial lending", "underwriting", "credit"],
  },
  {
    name: "ZSuite Technologies",
    category: "Treasury Management",
    description:
      "Helps financial institutions add differentiated services to their cash and treasury management toolbox.",
    investmentYear: 2022,
    stage: "Series B",
    status: "active",
    tags: ["treasury", "cash management", "commercial banking"],
  },
  {
    name: "Torpago",
    category: "Commercial Cards",
    description:
      "Commercial card and spend management platform enabling banks to offer modern corporate card products to their business customers.",
    investmentYear: 2024,
    stage: "Series B",
    status: "active",
    tags: ["commercial cards", "spend management", "corporate"],
  },
  {
    name: "Revio",
    category: "Customer Intelligence",
    description:
      "Customer insights platform empowering bankers with actionable information. Republic Bank of Chicago partnered with Revio to drive customer growth.",
    investmentYear: 2023,
    stage: "Seed",
    status: "active",
    tags: ["customer intelligence", "data analytics", "growth"],
  },
  {
    name: "Equabli",
    category: "Collections & Recovery",
    description:
      "Lifecycle debt management platform that gives banks a structured, data-driven way to handle delinquent accounts while preserving relationships.",
    investmentYear: 2024,
    stage: "Series A",
    status: "active",
    tags: ["collections", "recovery", "compliance", "delinquency"],
  },
  {
    name: "Filejet",
    category: "Document Management",
    description:
      "Automates business filings and entity management across jurisdictions, reducing operational risk and regulatory friction for commercial clients.",
    investmentYear: 2024,
    stage: "Seed",
    status: "active",
    tags: ["documents", "automation", "compliance"],
  },
  {
    name: "Monit",
    category: "Commercial Banking",
    description:
      "Platform focused on attracting and retaining small-to-medium-sized businesses for community banks.",
    investmentYear: 2024,
    stage: "Series A",
    status: "active",
    tags: ["SMB", "commercial banking", "retention"],
  },
  {
    name: "SOLO",
    category: "Data & Underwriting",
    description:
      "Collaborative data collection platform built alongside community banks. Turns underwriting from a one-time, opaque process into an ongoing, proactive, transparent system that identifies the path to any financial product or outcome.",
    investmentYear: 2024,
    stage: "Seed",
    status: "active",
    tags: ["data collection", "underwriting", "collaboration"],
  },
  {
    name: "Adlumin",
    category: "Cybersecurity",
    description:
      "Cybersecurity platform providing managed detection and response for community banks. First BankTech portfolio exit — acquired by N-able in November 2024.",
    investmentYear: 2022,
    stage: "Series B",
    status: "exited",
    tags: ["cybersecurity", "MDR", "security", "exit"],
  },
];

export const CONTENT_THEMES = [
  {
    id: "portfolio-spotlight",
    label: "Portfolio Company Spotlight",
    description: "Feature a portfolio company and its impact on community banking",
    icon: "🔦",
  },
  {
    id: "industry-trends",
    label: "Industry Trends & Insights",
    description: "Commentary on banking technology trends and market dynamics",
    icon: "📊",
  },
  {
    id: "ecosystem-value",
    label: "Ecosystem Value",
    description: "Highlight the LP-portfolio company connection and ecosystem wins",
    icon: "🤝",
  },
  {
    id: "thought-leadership",
    label: "Thought Leadership",
    description: "Position BankTech team as experts in bank-fintech collaboration",
    icon: "💡",
  },
  {
    id: "event-recap",
    label: "Event Recap & Promotion",
    description: "Conference attendance, speaking engagements, networking events",
    icon: "🎤",
  },
  {
    id: "milestone",
    label: "Milestone & Achievement",
    description: "Fund milestones, portfolio exits, partnership announcements",
    icon: "🏆",
  },
  {
    id: "education",
    label: "Educational Content",
    description: "Fintech boot camps, regulatory guidance, digital transformation how-tos",
    icon: "📚",
  },
  {
    id: "community",
    label: "Community & Culture",
    description: "Team highlights, LP stories, community bank partner features",
    icon: "🏘️",
  },
  {
    id: "community-bank-shoutout",
    label: "Community Bank Shoutout",
    description: "Celebrate LP banks and their accomplishments",
    icon: "🏦",
  },
  {
    id: "curated-insight",
    label: "Curated Industry Insight",
    description: "Share and comment on relevant third-party articles",
    icon: "📰",
  },
  {
    id: "behind-the-scenes",
    label: "Behind the Scenes",
    description: "Team moments, culture, travel, meetups",
    icon: "🎬",
  },
];

export const SOCIAL_PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", maxChars: 3000, icon: "💼" },
  { id: "twitter", label: "X (Twitter)", maxChars: 280, icon: "🐦" },
  { id: "twitter-thread", label: "X Thread", maxChars: 1400, icon: "🧵" },
];

export const CONTENT_STRATEGY = {
  postingCadence: "2x per week, Tue & Thu",
  monthlyGoal: "8-9 posts/month",
  contentCategories: [
    { id: "thought-piece", label: "Thought Pieces", description: "Authored by team members, covering trends and BTV perspective" },
    { id: "feature-past-posts", label: "Feature Past Posts", description: "Reshare and boost high-performing older content" },
    { id: "portco-highlight", label: "PortCo Highlights", description: "Spotlight portfolio company news, traction, or partnerships" },
    { id: "community-bank-shoutout", label: "Community Bank Shoutouts", description: "Celebrate LP banks and their accomplishments" },
    { id: "behind-the-scenes", label: "Behind-the-Scenes", description: "Team moments, culture, travel, meetups" },
    { id: "curated-insights", label: "Curated Industry Insights", description: "Share and comment on relevant third-party articles" },
  ],
  toneTest: "Professional, human, value-forward — imagine if Barack Obama was saying it",
  visualGuidance: "Encourage carousels, thumbnails, and short videos. Visual content drives 2-3x engagement.",
};

export const TEAM_MEMBERS = [
  { name: "Brandon Oliver", role: "Team Lead / Content", focus: "Thought pieces, articles, industry analysis" },
  { name: "Ryan", role: "Strategy / Leadership", focus: "Strategic vision, investor relations" },
  { name: "Katie", role: "Team / Events", focus: "Event recaps, conference coverage" },
  { name: "Carey", role: "Team / Portfolio", focus: "Portfolio company updates" },
  { name: "Pam", role: "Team / Operations", focus: "Operations, community engagement" },
];

export const FUTURE_TOPICS = [
  "Innovation is not a short term goal — building a long-term technology strategy",
  "Your employees are your greatest strength — people-first banking technology",
  "AI is not your enemy — practical AI applications for community banks",
  "How BankTech delivers value to portfolio companies (Loom video + blog post)",
  "Enabling your bank for growth — what fintech can actually deliver",
];

export const PORTFOLIO_THEMES = [
  { theme: "Agentic and applied AI for underwriting and risk", companies: ["SOLO"] },
  { theme: "Delinquency management and revenue resilience", companies: ["Equabli"] },
  { theme: "Entity management and compliance automation", companies: ["Filejet"] },
];

export const NEWSLETTER_SECTIONS = [
  "Opening letter / Year in Review",
  "Key portfolio themes",
  "Fund II update",
  "Strategic policy and advocacy partners",
  "Conference and events presence",
  "Looking ahead",
];
