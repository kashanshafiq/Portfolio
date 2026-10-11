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
  organization: string
  role: string
  period: string
  summary: string
  details: string[]
}
