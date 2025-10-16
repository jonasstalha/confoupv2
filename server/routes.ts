import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEntrepriseProfileSchema, insertBureauProfileSchema, insertBoDocumentSchema, insertAlertSchema, insertFavoriteSchema, insertEntrepriseBoxSchema, insertBoxAlertSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  app.get("/api/users/by-firebase-uid/:firebaseUid", async (req, res) => {
    const user = await storage.getUserByFirebaseUid(req.params.firebaseUid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.createUser(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Entreprise Profile routes
  app.get("/api/entreprise-profiles/by-user/:userId", async (req, res) => {
    const profile = await storage.getEntrepriseProfile(req.params.userId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  app.post("/api/entreprise-profiles", async (req, res) => {
    try {
      const data = insertEntrepriseProfileSchema.parse(req.body);
      const profile = await storage.createEntrepriseProfile(data);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Bureau Profile routes
  app.get("/api/bureau-profiles/by-user/:userId", async (req, res) => {
    const profile = await storage.getBureauProfile(req.params.userId);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  });

  app.post("/api/bureau-profiles", async (req, res) => {
    try {
      const data = insertBureauProfileSchema.parse(req.body);
      const profile = await storage.createBureauProfile(data);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // BO Document routes
  app.get("/api/bo-documents", async (req, res) => {
    const documents = await storage.getAllBoDocuments();
    res.json(documents);
  });

  app.get("/api/bo-documents/latest", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const documents = await storage.getLatestBoDocuments(limit);
    res.json(documents);
  });

  app.get("/api/bo-documents/:id", async (req, res) => {
    const document = await storage.getBoDocument(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  });

  app.post("/api/bo-documents", async (req, res) => {
    try {
      const data = insertBoDocumentSchema.parse(req.body);
      const document = await storage.createBoDocument(data);
      res.status(201).json(document);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Alert routes
  app.get("/api/alerts/by-user/:userId", async (req, res) => {
    const alerts = await storage.getAlertsByUserId(req.params.userId);
    res.json(alerts);
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const data = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(data);
      res.status(201).json(alert);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/alerts/:id/read", async (req, res) => {
    await storage.markAlertAsRead(req.params.id);
    res.json({ success: true });
  });

  // Favorite routes
  app.get("/api/favorites/by-user/:userId", async (req, res) => {
    const favorites = await storage.getFavoritesByUserId(req.params.userId);
    res.json(favorites);
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const data = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.createFavorite(data);
      res.status(201).json(favorite);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    await storage.deleteFavorite(req.params.id);
    res.json({ success: true });
  });

  // Entreprise Box routes
  app.get("/api/entreprise-boxes/by-bureau/:bureauUserId", async (req, res) => {
    const boxes = await storage.getEntrepriseBoxesByBureauId(req.params.bureauUserId);
    res.json(boxes);
  });

  app.get("/api/entreprise-boxes/:id", async (req, res) => {
    const box = await storage.getEntrepriseBox(req.params.id);
    if (!box) {
      return res.status(404).json({ error: "Box not found" });
    }
    res.json(box);
  });

  app.post("/api/entreprise-boxes", async (req, res) => {
    try {
      const data = insertEntrepriseBoxSchema.parse(req.body);
      const box = await storage.createEntrepriseBox(data);
      res.status(201).json(box);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/entreprise-boxes/:id", async (req, res) => {
    try {
      const box = await storage.updateEntrepriseBox(req.params.id, req.body);
      res.json(box);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Box Alert routes
  app.get("/api/box-alerts/by-box/:boxId", async (req, res) => {
    const alerts = await storage.getBoxAlertsByBoxId(req.params.boxId);
    res.json(alerts);
  });

  app.post("/api/box-alerts", async (req, res) => {
    try {
      const data = insertBoxAlertSchema.parse(req.body);
      const alert = await storage.createBoxAlert(data);
      res.status(201).json(alert);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/box-alerts/:id/resolve", async (req, res) => {
    await storage.markBoxAlertAsResolved(req.params.id);
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
