import express from 'express';
import { db } from './storage';

const router = express.Router();

// Get user by internal id
router.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  // naive lookup by id
  const user = (db.users as any).__all().find((u: any) => u.id === id) || null;
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Get user by Firebase UID
router.get('/api/users/by-firebase-uid/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await db.users.findFirst({ where: { firebaseUid: uid } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by firebase uid', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
