export interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl: string
  featured: boolean
  category: 'web' | 'mobile' | 'system'
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'certification' | 'project';
  title: string;
  organization: string;
  duration: string;
  description: string;
  tags?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  content: string;
}

