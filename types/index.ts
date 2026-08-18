export interface Project {
  num: string
  title: string
  stack: string
  copy: string
  learned: string
  link: string
  linkLabel: string
  isCaseStudy?: boolean
  caseStudyPath?: string
}

export interface Experience {
  period: string
  title: string
  company: string
  bullets: string[]
}

export interface LearningItem {
  topic: string
  status: string
  description: string
}

export interface Skill {
  category: string
  items: string
}

export interface MousePosition {
  x: number
  y: number
  nx: number // normalized -1 to 1
  ny: number
}
