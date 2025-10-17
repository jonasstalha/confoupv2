import firebase from './firebase';

// Using firebase compat (project already imports compat in firebase.ts)
const firestore = firebase.firestore();

// Collections: users, favorites, boDocuments, entrepriseProfiles, bureauProfiles, entrepriseBoxes, alerts

export async function getUserByFirebaseUid(uid: string) {
  if (!uid) return null;

  // Try reading by document id (recommended pattern: store user doc under UID)
  try {
    const docRef = firestore.collection('users').doc(uid);
    const snap = await docRef.get();
    if (snap.exists) return { id: snap.id, ...(snap.data() as any) };
  } catch (e) {
    // ignore and fallback to query
  }

  // Fallback: query by firebaseUid field (existing data model)
  const q = await firestore.collection('users').where('firebaseUid', '==', uid).limit(1).get();
  if (q.empty) return null;
  const doc = q.docs[0];
  return { id: doc.id, ...doc.data() } as any;
}

export async function createUser(data: { firebaseUid: string; email: string; displayName?: string; role: string }) {
  const ref = await firestore.collection('users').add(data);
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() } as any;
}

export async function getFavoritesByUser(userId: string) {
  if (!userId) return [];
  const q = await firestore.collection('favorites').where('userId', '==', userId).get();
  return q.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function addFavorite({ userId, boDocumentId }: { userId: string; boDocumentId: string }) {
  const ref = await firestore.collection('favorites').add({ userId, boDocumentId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() };
}

export async function removeFavorite(favoriteId: string) {
  await firestore.collection('favorites').doc(favoriteId).delete();
}

export async function getBoDocumentsLatest(limit = 50) {
  const q = await firestore.collection('boDocuments').orderBy('publishDate', 'desc').limit(limit).get();
  return q.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function createEntrepriseProfile(data: any) {
  const ref = await firestore.collection('entrepriseProfiles').add(data);
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() };
}

export async function createBureauProfile(data: any) {
  const ref = await firestore.collection('bureauProfiles').add(data);
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() };
}

export async function addEntrepriseBox(data: any) {
  const ref = await firestore.collection('entrepriseBoxes').add(data);
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() };
}

export async function getEntrepriseBoxesByBureau(bureauUserId: string) {
  const q = await firestore.collection('entrepriseBoxes').where('bureauUserId', '==', bureauUserId).get();
  const boxes = await Promise.all(q.docs.map(async (d) => {
    const box = { id: d.id, ...(d.data() as any) };
    // populate alerts if stored as subcollection
    const alertsSnap = await firestore.collection('entrepriseBoxes').doc(d.id).collection('alerts').get();
    box.alerts = alertsSnap.docs.map((a) => ({ id: a.id, ...(a.data() as any) }));
    return box;
  }));
  return boxes;
}

export async function getAlertsByUser(userId: string) {
  const q = await firestore.collection('alerts').where('userId', '==', userId).get();
  return q.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function createAlert(data: any) {
  const ref = await firestore.collection('alerts').add(data);
  const snap = await ref.get();
  return { id: ref.id, ...snap.data() };
}

export async function markAlertRead(alertId: string) {
  await firestore.collection('alerts').doc(alertId).update({ isRead: true });
}
