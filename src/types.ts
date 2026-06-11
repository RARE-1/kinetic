export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'ios' | 'android' | 'cross-platform';
  tags: string[];
  description: string;
  detailedDescription: string;
  image: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  challenges: string;
  solutions: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  avatar: string;
  content: string;
  rating: number;
  projectAssociated: string;
  verified?: number;
}

export interface LifecycleStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  createdAt: string;
}
