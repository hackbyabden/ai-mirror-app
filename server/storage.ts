import { 
  users, 
  scanResults, 
  quizResults, 
  dailySecrets,
  type User, 
  type InsertUser,
  type ScanResult,
  type InsertScanResult,
  type QuizResult,
  type InsertQuizResult,
  type DailySecret,
  type InsertDailySecret
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  
  createScanResult(scanResult: InsertScanResult): Promise<ScanResult>;
  getScanResultsByUser(userId: number): Promise<ScanResult[]>;
  
  createQuizResult(quizResult: InsertQuizResult): Promise<QuizResult>;
  getQuizResultsByUser(userId: number): Promise<QuizResult[]>;
  
  createDailySecret(secret: InsertDailySecret): Promise<DailySecret>;
  getDailySecretsByUser(userId: number): Promise<DailySecret[]>;
  getTodaySecret(userId: number): Promise<DailySecret | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scanResults: Map<number, ScanResult>;
  private quizResults: Map<number, QuizResult>;
  private dailySecrets: Map<number, DailySecret>;
  private currentUserId: number;
  private currentScanId: number;
  private currentQuizId: number;
  private currentSecretId: number;

  constructor() {
    this.users = new Map();
    this.scanResults = new Map();
    this.quizResults = new Map();
    this.dailySecrets = new Map();
    this.currentUserId = 1;
    this.currentScanId = 1;
    this.currentQuizId = 1;
    this.currentSecretId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      isPremium: false,
      freeScansRemaining: 3,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const updatedUser = { ...existingUser, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createScanResult(insertScanResult: InsertScanResult): Promise<ScanResult> {
    const id = this.currentScanId++;
    const scanResult: ScanResult = {
      id,
      userId: insertScanResult.userId || null,
      scanType: insertScanResult.scanType,
      originalImage: insertScanResult.originalImage || null,
      processedImage: insertScanResult.processedImage || null,
      results: insertScanResult.results || null,
      createdAt: new Date()
    };
    this.scanResults.set(id, scanResult);
    return scanResult;
  }

  async getScanResultsByUser(userId: number): Promise<ScanResult[]> {
    return Array.from(this.scanResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  async createQuizResult(insertQuizResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.currentQuizId++;
    const quizResult: QuizResult = {
      id,
      userId: insertQuizResult.userId || null,
      answers: insertQuizResult.answers,
      predictions: insertQuizResult.predictions || null,
      createdAt: new Date()
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }

  async getQuizResultsByUser(userId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  async createDailySecret(insertSecret: InsertDailySecret): Promise<DailySecret> {
    const id = this.currentSecretId++;
    const secret: DailySecret = {
      id,
      userId: insertSecret.userId || null,
      secret: insertSecret.secret,
      revealed: false,
      revealDate: insertSecret.revealDate,
      createdAt: new Date()
    };
    this.dailySecrets.set(id, secret);
    return secret;
  }

  async getDailySecretsByUser(userId: number): Promise<DailySecret[]> {
    return Array.from(this.dailySecrets.values()).filter(
      (secret) => secret.userId === userId
    );
  }

  async getTodaySecret(userId: number): Promise<DailySecret | undefined> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return Array.from(this.dailySecrets.values()).find(
      (secret) => {
        const secretDate = new Date(secret.revealDate);
        secretDate.setHours(0, 0, 0, 0);
        return secret.userId === userId && secretDate.getTime() === today.getTime();
      }
    );
  }
}

export const storage = new MemStorage();
