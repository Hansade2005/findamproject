import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { User, Project, Application } from '../types';

interface FindAProjectDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-email': string };
  };
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-owner': string; 'by-category': string; 'by-status': string };
  };
  applications: {
    key: string;
    value: Application;
    indexes: { 'by-project': string; 'by-user': string };
  };
}

let db: IDBPDatabase<FindAProjectDB>;

async function getDB() {
  if (!db) {
    db = await openDB<FindAProjectDB>('findamproject-db', 1, {
      upgrade(database) {
        // Users store
        const userStore = database.createObjectStore('users', { keyPath: 'id' });
        userStore.createIndex('by-email', 'email', { unique: true });

        // Projects store
        const projectStore = database.createObjectStore('projects', { keyPath: 'id' });
        projectStore.createIndex('by-owner', 'ownerId');
        projectStore.createIndex('by-category', 'category');
        projectStore.createIndex('by-status', 'status');

        // Applications store
        const appStore = database.createObjectStore('applications', { keyPath: 'id' });
        appStore.createIndex('by-project', 'projectId');
        appStore.createIndex('by-user', 'userId');
      },
    });
  }
  return db;
}

// Simple hash function (for demo purposes — not cryptographically secure)
export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const database = await getDB();
  const user: User = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  await database.add('users', user);
  return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const database = await getDB();
  return database.getFromIndex('users', 'by-email', email);
}

export async function getUserById(id: string): Promise<User | undefined> {
  const database = await getDB();
  return database.get('users', id);
}

export async function updateUser(user: User): Promise<void> {
  const database = await getDB();
  await database.put('users', user);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(data: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const database = await getDB();
  const project: Project = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  await database.add('projects', project);
  return project;
}

export async function getAllProjects(): Promise<Project[]> {
  const database = await getDB();
  return database.getAll('projects');
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const database = await getDB();
  return database.get('projects', id);
}

export async function getProjectsByOwner(ownerId: string): Promise<Project[]> {
  const database = await getDB();
  return database.getAllFromIndex('projects', 'by-owner', ownerId);
}

export async function updateProject(project: Project): Promise<void> {
  const database = await getDB();
  await database.put('projects', project);
}

export async function deleteProject(id: string): Promise<void> {
  const database = await getDB();
  await database.delete('projects', id);
}

// ─── Applications ─────────────────────────────────────────────────────────────

export async function createApplication(
  data: Omit<Application, 'id' | 'createdAt'>
): Promise<Application> {
  const database = await getDB();
  const app: Application = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  await database.add('applications', app);
  return app;
}

export async function getApplicationsByProject(projectId: string): Promise<Application[]> {
  const database = await getDB();
  return database.getAllFromIndex('applications', 'by-project', projectId);
}

export async function getApplicationsByUser(userId: string): Promise<Application[]> {
  const database = await getDB();
  return database.getAllFromIndex('applications', 'by-user', userId);
}

export async function updateApplication(app: Application): Promise<void> {
  const database = await getDB();
  await database.put('applications', app);
}

export async function getUserApplicationForProject(
  userId: string,
  projectId: string
): Promise<Application | undefined> {
  const apps = await getApplicationsByUser(userId);
  return apps.find((a) => a.projectId === projectId);
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export async function seedIfEmpty(): Promise<void> {
  const database = await getDB();
  const count = await database.count('projects');
  if (count > 0) return;

  // Create a demo user
  const demoUser: User = {
    id: 'demo-user-1',
    name: 'Alice Chen',
    email: 'alice@example.com',
    password: hashPassword('password123'),
    bio: 'Full-stack developer passionate about open source and collaborative projects.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    avatar: '',
    createdAt: new Date().toISOString(),
  };
  try { await database.add('users', demoUser); } catch (_) { /* already exists */ }

  const demoUser2: User = {
    id: 'demo-user-2',
    name: 'Bob Martinez',
    email: 'bob@example.com',
    password: hashPassword('password123'),
    bio: 'Mobile developer and UI/UX enthusiast.',
    skills: ['Flutter', 'Kotlin', 'Figma', 'Firebase'],
    avatar: '',
    createdAt: new Date().toISOString(),
  };
  try { await database.add('users', demoUser2); } catch (_) { /* already exists */ }

  const seedProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'Open Source Code Review Tool',
      description: 'Building a collaborative code review platform that integrates with GitHub and GitLab. Looking for developers who love developer tooling and want to improve the code review experience for teams worldwide. The tool will feature AI-assisted reviews, inline comments, and approval workflows.',
      category: 'Web Development',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL'],
      status: 'open',
      ownerId: 'demo-user-1',
      ownerName: 'Alice Chen',
      teamSize: 5,
      currentMembers: 2,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'proj-2',
      title: 'AI-Powered Recipe Generator',
      description: 'An app that uses machine learning to generate personalized recipes based on dietary restrictions, available ingredients, and nutritional goals. We\'re building a smart meal planning assistant that learns from user preferences over time.',
      category: 'AI / Machine Learning',
      skills: ['Python', 'Machine Learning', 'React', 'REST API', 'PostgreSQL'],
      status: 'open',
      ownerId: 'demo-user-2',
      ownerName: 'Bob Martinez',
      teamSize: 4,
      currentMembers: 1,
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    {
      id: 'proj-3',
      title: 'Multiplayer Puzzle Game',
      description: 'A real-time multiplayer puzzle game with procedurally generated levels. Players can compete or collaborate to solve increasingly complex puzzles. The game features a custom physics engine and an ELO ranking system.',
      category: 'Game Development',
      skills: ['Unity', 'C#', 'WebGL', 'Node.js', 'Firebase'],
      status: 'open',
      ownerId: 'demo-user-1',
      ownerName: 'Alice Chen',
      teamSize: 6,
      currentMembers: 3,
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    },
    {
      id: 'proj-4',
      title: 'Decentralized Freelance Marketplace',
      description: 'A blockchain-based freelance platform where smart contracts handle payments and escrow. No middlemen, lower fees, and trustless transactions. Looking for blockchain devs and frontend engineers.',
      category: 'Blockchain',
      skills: ['Solidity', 'React', 'TypeScript', 'Ethereum', 'Web3.js'],
      status: 'open',
      ownerId: 'demo-user-2',
      ownerName: 'Bob Martinez',
      teamSize: 4,
      currentMembers: 2,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'proj-5',
      title: 'Cross-Platform Fitness Tracker',
      description: 'A mobile app that tracks workouts, nutrition, and sleep. Features include wearable device integration, social challenges with friends, and personalized AI coaching. Building with Flutter for iOS and Android.',
      category: 'Mobile App',
      skills: ['Flutter', 'Dart', 'Firebase', 'Machine Learning', 'UI/UX Design'],
      status: 'open',
      ownerId: 'demo-user-2',
      ownerName: 'Bob Martinez',
      teamSize: 5,
      currentMembers: 2,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 'proj-6',
      title: 'Developer Portfolio Generator',
      description: 'A CLI tool that automatically generates beautiful developer portfolio websites from a simple YAML config file. Supports multiple themes, project showcases, and one-click deployment to Vercel or Netlify.',
      category: 'Open Source',
      skills: ['TypeScript', 'Node.js', 'React', 'Figma'],
      status: 'closed',
      ownerId: 'demo-user-1',
      ownerName: 'Alice Chen',
      teamSize: 3,
      currentMembers: 3,
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
  ];

  for (const project of seedProjects) {
    try { await database.add('projects', project); } catch (_) { /* already exists */ }
  }
}
