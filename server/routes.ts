import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertScanResultSchema, insertQuizResultSchema } from "@shared/schema";
import { z } from "zod";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and process image for face scanning
  app.post("/api/scan/face", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const { scanType = "age_progression" } = req.body;
      
      // Convert buffer to base64 for storage
      const originalImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Mock processing results
      const results = {
        scanType,
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        detected: true,
        ageProgression: scanType === "age_progression" ? {
          currentAge: Math.floor(Math.random() * 20) + 20,
          futureAges: {
            "20_years": "processed_image_20.jpg",
            "40_years": "processed_image_40.jpg", 
            "60_years": "processed_image_60.jpg"
          }
        } : undefined,
        styleTransform: scanType !== "age_progression" ? {
          style: scanType,
          processedImage: "processed_style_image.jpg"
        } : undefined
      };

      const scanResult = await storage.createScanResult({
        userId: 1, // Mock user ID
        scanType: "face",
        originalImage,
        processedImage: originalImage, // For now, return original
        results
      });

      res.json(scanResult);
    } catch (error) {
      console.error("Face scan error:", error);
      res.status(500).json({ error: "Face scanning failed" });
    }
  });

  // Emotion detection from image
  app.post("/api/scan/emotion", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const originalImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Mock emotion analysis results
      const emotions = {
        happiness: Math.floor(Math.random() * 40) + 60, // 60-100%
        sadness: Math.floor(Math.random() * 20) + 5,    // 5-25%
        anger: Math.floor(Math.random() * 15) + 2,      // 2-17%
        fear: Math.floor(Math.random() * 10) + 1,       // 1-11%
        surprise: Math.floor(Math.random() * 25) + 10,  // 10-35%
        stress: Math.floor(Math.random() * 30) + 10,    // 10-40%
        authentic: Math.random() > 0.3 // 70% chance of authentic smile
      };

      const analysis = `Analysis: You're showing ${emotions.happiness > 70 ? 'genuine' : 'moderate'} happiness with ${emotions.stress > 25 ? 'elevated' : 'low'} stress levels. ${emotions.authentic ? 'Your smile reaches your eyes - authentic joy detected.' : 'There\'s some tension suggesting mixed emotions.'}`;

      const results = {
        emotions,
        analysis,
        faceDetected: true,
        confidence: 0.89
      };

      const scanResult = await storage.createScanResult({
        userId: 1, // Mock user ID
        scanType: "emotion",
        originalImage,
        processedImage: originalImage,
        results
      });

      res.json(scanResult);
    } catch (error) {
      console.error("Emotion detection error:", error);
      res.status(500).json({ error: "Emotion detection failed" });
    }
  });

  // Voice analysis
  app.post("/api/scan/voice", upload.single("audio"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file provided" });
      }

      // Mock voice analysis
      const personality = {
        confidence: Math.floor(Math.random() * 30) + 70,
        creativity: Math.floor(Math.random() * 40) + 60,
        empathy: Math.floor(Math.random() * 35) + 65,
        leadership: Math.floor(Math.random() * 45) + 55,
        introversion: Math.floor(Math.random() * 60) + 20
      };

      const soulReading = generateSoulReading(personality);

      const results = {
        personality,
        soulReading,
        voiceCharacteristics: {
          tone: personality.confidence > 80 ? "confident" : "gentle",
          pace: "moderate",
          clarity: 0.85
        }
      };

      const scanResult = await storage.createScanResult({
        userId: 1, // Mock user ID
        scanType: "voice",
        originalImage: null,
        processedImage: null,
        results
      });

      res.json(scanResult);
    } catch (error) {
      console.error("Voice analysis error:", error);
      res.status(500).json({ error: "Voice analysis failed" });
    }
  });

  // Submit quiz answers and get predictions
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      console.log("Quiz submission request body:", req.body);
      
      // Validate only the required fields
      const { userId, answers } = req.body;
      
      if (!userId || !answers) {
        return res.status(400).json({ error: "Missing userId or answers" });
      }
      
      // Generate predictions based on answers
      const predictions = generateQuizPredictions(answers);
      
      const quizResult = await storage.createQuizResult({
        userId,
        answers,
        predictions
      });

      res.json(quizResult);
    } catch (error) {
      console.error("Quiz submission error:", error);
      res.status(500).json({ error: "Quiz submission failed" });
    }
  });

  // Get daily secret
  app.get("/api/secret/today", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      let todaySecret = await storage.getTodaySecret(userId);
      
      if (!todaySecret) {
        // Generate new secret for today
        const secret = generateDailySecret();
        todaySecret = await storage.createDailySecret({
          userId,
          secret,
          revealDate: new Date()
        });
      }

      res.json(todaySecret);
    } catch (error) {
      console.error("Daily secret error:", error);
      res.status(500).json({ error: "Failed to get daily secret" });
    }
  });

  // Mock ad watching endpoint
  app.post("/api/watch-ad", async (req, res) => {
    try {
      // First ensure user exists
      let user = await storage.getUser(1);
      if (!user) {
        user = await storage.createUser({
          username: "demo_user",
          password: "demo_pass"
        });
      }
      
      // Simulate ad watching - give user a free scan
      const updatedUser = await storage.updateUser(1, { 
        freeScansRemaining: (user.freeScansRemaining || 0) + 1
      });
      
      res.json({ 
        success: true, 
        message: "Ad watched successfully! +1 free scan added.",
        freeScansRemaining: updatedUser.freeScansRemaining 
      });
    } catch (error) {
      console.error("Ad watching error:", error);
      res.status(500).json({ error: "Ad watching failed" });
    }
  });

  // Get user scan history
  app.get("/api/history", async (req, res) => {
    try {
      const userId = 1; // Mock user ID
      const scanHistory = await storage.getScanResultsByUser(userId);
      const quizHistory = await storage.getQuizResultsByUser(userId);
      
      res.json({
        scans: scanHistory,
        quizzes: quizHistory
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateSoulReading(personality: any): string {
  const readings = [
    `Your voice carries the energy of a natural ${personality.leadership > 70 ? 'leader' : 'collaborator'}. There's wisdom in your tone that suggests you've learned from past challenges.`,
    `I sense ${personality.empathy > 80 ? 'deep empathy' : 'balanced emotional intelligence'} in your vocal patterns. You have an innate ability to understand others' hidden feelings.`,
    `Your speech reveals ${personality.creativity > 75 ? 'exceptional creativity' : 'practical innovation'}. The universe whispers ideas to you in quiet moments.`,
    `There's a ${personality.confidence > 80 ? 'strong' : 'gentle'} spiritual energy in your voice. You're meant to inspire others through authentic expression.`
  ];
  
  return readings[Math.floor(Math.random() * readings.length)];
}

function generateQuizPredictions(answers: any): any {
  const locations = ["Swiss Mountains", "Malibu Beach", "Tokyo Penthouse", "London Townhouse", "New York Loft"];
  const careers = ["Tech Innovator", "Creative Director", "Wellness Coach", "Environmental Scientist", "Digital Artist"];
  const partners = ["Soulmate from college", "Travel companion", "Creative collaborator", "Childhood friend", "Someone you meet at a coffee shop"];
  
  return {
    futureLocation: locations[Math.floor(Math.random() * locations.length)],
    careerPath: careers[Math.floor(Math.random() * careers.length)],
    loveLife: partners[Math.floor(Math.random() * partners.length)],
    wealthLevel: Math.floor(Math.random() * 5) + 3, // 3-7 out of 10
    personalityTrait: "Intuitive problem-solver with magnetic charisma",
    lifeTheme: "Adventure and meaningful connections"
  };
}

function generateDailySecret(): string {
  const secrets = [
    "Your hidden talent lies in understanding people's true emotions. In an alternate universe, you're a renowned psychic detective.",
    "The universe has marked you as someone who will inspire a major breakthrough in your field within the next 3 years.",
    "Your greatest fear is also your greatest strength - the ability to see potential failures before they happen gives you incredible foresight.",
    "In dreams, you've been visiting a place that will become significant in your real life. Pay attention to recurring locations.",
    "Your voice has a unique frequency that naturally calms anxious minds. You're meant to be a healer.",
    "There's an unfinished creative project from your past that holds the key to your future success. The universe is waiting for you to revisit it.",
    "Your intuition is actually a form of time-perception - you sense future outcomes before they manifest.",
    "You have an invisible magnetic field that draws like-minded souls. Your tribe is slowly gathering around you."
  ];
  
  return secrets[Math.floor(Math.random() * secrets.length)];
}
