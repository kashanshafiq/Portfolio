export type DiagramKind = 'structure' | 'wall' | 'water' | 'schedule' | 'quantity' | 'road'
export interface Project {
  slug: string
  title: string
  category: 'Structures' | 'Water' | 'Planning' | 'Transportation'
  tools: string[]
  summary: string
  context: string
  scope: string[]
  outcome: string
  contribution: string
  diagram: DiagramKind
  source: string[]
}
export interface Experience {
  slug: string
  organization: string
  role: string
  period: string
  location: string
  domain: string
  summary: string
  context: string
  details: string[]
  tools: string[]
  achievements: string[]
  learnings: string[]
}

export interface ResearchMethod {
  title: string
  detail: string
}

export interface ResearchItem {
  slug: string
  title: string
  shortTitle: string
  status: string
  period: string
  venue: string
  authors: string[]
  doi: string
  summary: string
  context: string
  overviewText: string[]
  methods: ResearchMethod[]
  tools: string[]
  citation: string
}
