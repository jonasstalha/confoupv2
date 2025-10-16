import {
  type User,
  type InsertUser,
  type EntrepriseProfile,
  type InsertEntrepriseProfile,
  type BureauProfile,
  type InsertBureauProfile,
  type BoDocument,
  type InsertBoDocument,
  type Alert,
  type InsertAlert,
  type Favorite,
  type InsertFavorite,
  type EntrepriseBox,
  type InsertEntrepriseBox,
  type BoxAlert,
  type InsertBoxAlert,
  type AlertWithDocument,
  type BoxAlertWithDocument,
  type BoxWithAlerts,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Entreprise Profiles
  getEntrepriseProfile(userId: string): Promise<EntrepriseProfile | undefined>;
  createEntrepriseProfile(profile: InsertEntrepriseProfile): Promise<EntrepriseProfile>;

  // Bureau Profiles
  getBureauProfile(userId: string): Promise<BureauProfile | undefined>;
  createBureauProfile(profile: InsertBureauProfile): Promise<BureauProfile>;

  // BO Documents
  getAllBoDocuments(): Promise<BoDocument[]>;
  getLatestBoDocuments(limit?: number): Promise<BoDocument[]>;
  getBoDocument(id: string): Promise<BoDocument | undefined>;
  createBoDocument(doc: InsertBoDocument): Promise<BoDocument>;

  // Alerts
  getAlertsByUserId(userId: string): Promise<AlertWithDocument[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(alertId: string): Promise<void>;

  // Favorites
  getFavoritesByUserId(userId: string): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: string): Promise<void>;

  // Entreprise Boxes
  getEntrepriseBoxesByBureauId(bureauUserId: string): Promise<BoxWithAlerts[]>;
  getEntrepriseBox(id: string): Promise<EntrepriseBox | undefined>;
  createEntrepriseBox(box: InsertEntrepriseBox): Promise<EntrepriseBox>;
  updateEntrepriseBox(id: string, box: Partial<EntrepriseBox>): Promise<EntrepriseBox>;

  // Box Alerts
  getBoxAlertsByBoxId(boxId: string): Promise<BoxAlertWithDocument[]>;
  createBoxAlert(alert: InsertBoxAlert): Promise<BoxAlert>;
  markBoxAlertAsResolved(alertId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private entrepriseProfiles: Map<string, EntrepriseProfile>;
  private bureauProfiles: Map<string, BureauProfile>;
  private boDocuments: Map<string, BoDocument>;
  private alerts: Map<string, Alert>;
  private favorites: Map<string, Favorite>;
  private entrepriseBoxes: Map<string, EntrepriseBox>;
  private boxAlerts: Map<string, BoxAlert>;

  constructor() {
    this.users = new Map();
    this.entrepriseProfiles = new Map();
    this.bureauProfiles = new Map();
    this.boDocuments = new Map();
    this.alerts = new Map();
    this.favorites = new Map();
    this.entrepriseBoxes = new Map();
    this.boxAlerts = new Map();

    // Initialize with mock BO documents
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockDocs: BoDocument[] = [
      {
        id: randomUUID(),
        title: "Décret sur la conformité environnementale des entreprises industrielles",
        titleAr: "مرسوم بشأن الامتثال البيئي للشركات الصناعية",
        reference: "BO-2025-001",
        publishDate: new Date("2025-01-15"),
        category: "regulatory",
        sector: "industrie",
        contentFr: "Ce décret établit les nouvelles normes environnementales...",
        contentAr: "يحدد هذا المرسوم المعايير البيئية الجديدة...",
        summaryFr: "Nouvelles normes environnementales obligatoires pour les entreprises industrielles, incluant la réduction des émissions de CO2 de 30% d'ici 2026.",
        summaryAr: "معايير بيئية جديدة إلزامية للشركات الصناعية، بما في ذلك تخفيض انبعاثات ثاني أكسيد الكربون بنسبة 30٪ بحلول عام 2026.",
        priority: "urgent",
        pdfUrl: null,
      },
      {
        id: randomUUID(),
        title: "Loi sur la fiscalité des petites et moyennes entreprises",
        titleAr: "قانون الضرائب للمؤسسات الصغيرة والمتوسطة",
        reference: "BO-2025-002",
        publishDate: new Date("2025-01-12"),
        category: "tax",
        sector: "commerce",
        contentFr: "Cette loi modifie le régime fiscal...",
        contentAr: "يعدل هذا القانون النظام الضريبي...",
        summaryFr: "Réduction de l'impôt sur les sociétés de 25% à 20% pour les PME avec un chiffre d'affaires inférieur à 10 millions MAD.",
        summaryAr: "تخفيض ضريبة الشركات من 25٪ إلى 20٪ للمؤسسات الصغيرة والمتوسطة ذات رقم الأعمال الأقل من 10 ملايين درهم.",
        priority: "medium",
        pdfUrl: null,
      },
      {
        id: randomUUID(),
        title: "Arrêté relatif aux normes de sécurité au travail",
        titleAr: "قرار يتعلق بمعايير السلامة في العمل",
        reference: "BO-2025-003",
        publishDate: new Date("2025-01-10"),
        category: "legal",
        sector: "construction",
        contentFr: "Cet arrêté définit les nouvelles exigences...",
        contentAr: "يحدد هذا القرار المتطلبات الجديدة...",
        summaryFr: "Mise en place obligatoire de protocoles de sécurité renforcés dans le secteur de la construction, incluant des formations trimestrielles.",
        summaryAr: "تطبيق إلزامي لبروتوكولات سلامة معززة في قطاع البناء، بما في ذلك التدريبات الفصلية.",
        priority: "urgent",
        pdfUrl: null,
      },
      {
        id: randomUUID(),
        title: "Circulaire sur la digitalisation des procédures administratives",
        titleAr: "منشور حول رقمنة الإجراءات الإدارية",
        reference: "BO-2025-004",
        publishDate: new Date("2025-01-08"),
        category: "regulatory",
        sector: "administration",
        contentFr: "Cette circulaire encourage la transition numérique...",
        contentAr: "يشجع هذا المنشور التحول الرقمي...",
        summaryFr: "Obligation de soumettre toutes les déclarations fiscales par voie électronique à partir du 1er mars 2025.",
        summaryAr: "إلزام تقديم جميع الإقرارات الضريبية إلكترونياً اعتباراً من 1 مارس 2025.",
        priority: "medium",
        pdfUrl: null,
      },
      {
        id: randomUUID(),
        title: "Dahir portant loi sur la protection des données personnelles",
        titleAr: "ظهير شريف بقانون حماية البيانات الشخصية",
        reference: "BO-2025-005",
        publishDate: new Date("2025-01-05"),
        category: "legal",
        sector: "technologie",
        contentFr: "Ce dahir renforce la protection des données...",
        contentAr: "يعزز هذا الظهير حماية البيانات...",
        summaryFr: "Nouvelles obligations de conformité RGPD pour toutes les entreprises traitant des données personnelles, avec amendes pouvant atteindre 2% du CA.",
        summaryAr: "التزامات جديدة للامتثال لحماية البيانات لجميع الشركات التي تعالج البيانات الشخصية، مع غرامات تصل إلى 2٪ من رقم الأعمال.",
        priority: "urgent",
        pdfUrl: null,
      },
    ];

    mockDocs.forEach((doc) => {
      this.boDocuments.set(doc.id, doc);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.firebaseUid === firebaseUid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      firebaseUid: insertUser.firebaseUid || null,
    };
    this.users.set(id, user);
    return user;
  }

  // Entreprise Profiles
  async getEntrepriseProfile(userId: string): Promise<EntrepriseProfile | undefined> {
    return Array.from(this.entrepriseProfiles.values()).find((p) => p.userId === userId);
  }

  async createEntrepriseProfile(
    insertProfile: InsertEntrepriseProfile
  ): Promise<EntrepriseProfile> {
    const id = randomUUID();
    const profile: EntrepriseProfile = { ...insertProfile, id };
    this.entrepriseProfiles.set(id, profile);
    return profile;
  }

  // Bureau Profiles
  async getBureauProfile(userId: string): Promise<BureauProfile | undefined> {
    return Array.from(this.bureauProfiles.values()).find((p) => p.userId === userId);
  }

  async createBureauProfile(insertProfile: InsertBureauProfile): Promise<BureauProfile> {
    const id = randomUUID();
    const profile: BureauProfile = { ...insertProfile, id };
    this.bureauProfiles.set(id, profile);
    return profile;
  }

  // BO Documents
  async getAllBoDocuments(): Promise<BoDocument[]> {
    return Array.from(this.boDocuments.values());
  }

  async getLatestBoDocuments(limit = 10): Promise<BoDocument[]> {
    const docs = Array.from(this.boDocuments.values());
    return docs
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);
  }

  async getBoDocument(id: string): Promise<BoDocument | undefined> {
    return this.boDocuments.get(id);
  }

  async createBoDocument(insertDoc: InsertBoDocument): Promise<BoDocument> {
    const id = randomUUID();
    const doc: BoDocument = { ...insertDoc, id };
    this.boDocuments.set(id, doc);
    return doc;
  }

  // Alerts
  async getAlertsByUserId(userId: string): Promise<AlertWithDocument[]> {
    const userAlerts = Array.from(this.alerts.values()).filter((a) => a.userId === userId);
    return Promise.all(
      userAlerts.map(async (alert) => {
        const document = await this.getBoDocument(alert.boDocumentId);
        return { ...alert, document: document! };
      })
    );
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id, 
      createdAt: new Date(),
      isRead: insertAlert.isRead ?? false,
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async markAlertAsRead(alertId: string): Promise<void> {
    const alert = this.alerts.get(alertId);
    if (alert) {
      this.alerts.set(alertId, { ...alert, isRead: true });
    }
  }

  // Favorites
  async getFavoritesByUserId(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter((f) => f.userId === userId);
  }

  async createFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = { ...insertFavorite, id, createdAt: new Date() };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async deleteFavorite(id: string): Promise<void> {
    this.favorites.delete(id);
  }

  // Entreprise Boxes
  async getEntrepriseBoxesByBureauId(bureauUserId: string): Promise<BoxWithAlerts[]> {
    const boxes = Array.from(this.entrepriseBoxes.values()).filter(
      (b) => b.bureauUserId === bureauUserId
    );
    return Promise.all(
      boxes.map(async (box) => {
        const alerts = await this.getBoxAlertsByBoxId(box.id);
        return { ...box, alerts };
      })
    );
  }

  async getEntrepriseBox(id: string): Promise<EntrepriseBox | undefined> {
    return this.entrepriseBoxes.get(id);
  }

  async createEntrepriseBox(insertBox: InsertEntrepriseBox): Promise<EntrepriseBox> {
    const id = randomUUID();
    const box: EntrepriseBox = { ...insertBox, id, createdAt: new Date() };
    this.entrepriseBoxes.set(id, box);
    return box;
  }

  async updateEntrepriseBox(
    id: string,
    updates: Partial<EntrepriseBox>
  ): Promise<EntrepriseBox> {
    const box = this.entrepriseBoxes.get(id);
    if (!box) throw new Error("Box not found");
    const updated = { ...box, ...updates };
    this.entrepriseBoxes.set(id, updated);
    return updated;
  }

  // Box Alerts
  async getBoxAlertsByBoxId(boxId: string): Promise<BoxAlertWithDocument[]> {
    const boxAlerts = Array.from(this.boxAlerts.values()).filter((a) => a.boxId === boxId);
    return Promise.all(
      boxAlerts.map(async (alert) => {
        const document = await this.getBoDocument(alert.boDocumentId);
        return { ...alert, document: document! };
      })
    );
  }

  async createBoxAlert(insertAlert: InsertBoxAlert): Promise<BoxAlert> {
    const id = randomUUID();
    const alert: BoxAlert = { 
      ...insertAlert, 
      id, 
      createdAt: new Date(),
      isResolved: insertAlert.isResolved ?? false,
    };
    this.boxAlerts.set(id, alert);
    return alert;
  }

  async markBoxAlertAsResolved(alertId: string): Promise<void> {
    const alert = this.boxAlerts.get(alertId);
    if (alert) {
      this.boxAlerts.set(alertId, { ...alert, isResolved: true });
    }
  }
}

export const storage = new MemStorage();
