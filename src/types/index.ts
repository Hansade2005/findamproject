export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
  avatar: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  status: 'open' | 'closed';
  ownerId: string;
  ownerName: string;
  teamSize: number;
  currentMembers: number;
  createdAt: string;
}

export interface Application {
  id: string;
  projectId: string;
  userId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export const CATEGORIES = [
  'Web Development',
  'Mobile App',
  'AI / Machine Learning',
  'Game Development',
  'Data Science',
  'Open Source',
  'Design',
  'Blockchain',
  'IoT',
  'Other',
];

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  projectId: string;
  createdAt: string;
}

export const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export const SKILLS_LIST = [
  'React', 'Vue', 'Angular', 'TypeScript', 'JavaScript',
  'Node.js', 'Python', 'Rust', 'Go', 'Java', 'C++', 'C#',
  'Swift', 'Kotlin', 'Flutter', 'React Native',
  'PostgreSQL', 'MongoDB', 'Firebase', 'GraphQL', 'REST API',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'UI/UX Design', 'Figma', 'Blockchain', 'Solidity',
  'Unity', 'Unreal Engine', 'WebGL', 'Three.js',
];

export interface Notification {
  id: string;
  userId: string;
  type: 'application_received' | 'application_accepted' | 'application_rejected' | 'new_comment' | 'new_message';
  title: string;
  description: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
}
