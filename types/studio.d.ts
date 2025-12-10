export interface TeamMember {
  name: string
  role: string
}

export interface StudioData {
  about: string
  mission: string
  vision: string
  team: TeamMember[]
  services: string[]
  projects: string[]
  contact: {
    website: string
    email: string
    phone: string
    location: string
  }
  objectives: string[]
  tagline: string
}
