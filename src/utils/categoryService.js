import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const CATEGORIES_COLLECTION = 'categories';

/**
 * Listen to all categories in real-time
 * @param {Function} onUpdate - Callback when categories change
 * @returns {Function} Unsubscribe function
 */
export const listenToCategories = (onUpdate) => {
  const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'));

  const mergeCats = (dbCats) => {
    const map = new Map();
    // Add defaults first
    DEFAULT_CATEGORIES.forEach(c => map.set(c.name.toLowerCase(), { ...c }));
    // Override/add DB categories
    dbCats.forEach(c => map.set(c.name.toLowerCase(), { ...c }));
    return Array.from(map.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  return onSnapshot(q,
    (snap) => {
      const dbCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(mergeCats(dbCats));
    },
    (err) => {
      // Likely a missing Firestore index — fall back to unordered query
      console.warn('[categoryService] orderBy query failed, falling back:', err.message);
      const fallback = query(collection(db, CATEGORIES_COLLECTION));
      onSnapshot(fallback, (snap) => {
        const dbCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        onUpdate(mergeCats(dbCats));
      });
    }
  );
};

export const addCategory = async (categoryData) => {
  const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...categoryData,
    order: Date.now(),
    createdAt: new Date()
  });
  return docRef.id;
};

export const updateCategory = async (categoryId, updates) => {
  await updateDoc(doc(db, CATEGORIES_COLLECTION, categoryId), updates);
};

export const deleteCategory = async (categoryId) => {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, categoryId));
};

/**
 * Allenjoe default categories — Solar & CCTV focus
 */
export const DEFAULT_CATEGORIES = [
  { name: 'All', order: 0 },
  { name: 'Inverters', order: 1 },
  { name: 'Solar Panels', order: 2 },
  { name: 'Batteries', order: 3 },
  { name: 'CCTV', order: 4 },
  { name: 'Accessories', order: 5 },
  { name: 'Automation Kits', order: 6 },
];

// Category color/style mapping for UI
export const CATEGORY_STYLES = {
  'Inverters':        { bg: 'rgba(245,130,32,0.1)', text: '#f58220', border: 'rgba(245,130,32,0.3)', dot: '#f58220', glow: 'rgba(245,130,32,0.15)' },
  'Solar Panels':     { bg: 'rgba(234,179,8,0.1)',  text: '#eab308', border: 'rgba(234,179,8,0.3)',  dot: '#eab308', glow: 'rgba(234,179,8,0.15)' },
  'Batteries':        { bg: 'rgba(34,197,94,0.1)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)',  dot: '#22c55e', glow: 'rgba(34,197,94,0.15)' },
  'CCTV':             { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)', dot: '#3b82f6', glow: 'rgba(59,130,246,0.15)' },
  'Accessories':      { bg: 'rgba(168,85,247,0.1)', text: '#a855f7', border: 'rgba(168,85,247,0.3)', dot: '#a855f7', glow: 'rgba(168,85,247,0.15)' },
  'Automation Kits':  { bg: 'rgba(239,68,68,0.1)',  text: '#ef4444', border: 'rgba(239,68,68,0.3)',  dot: '#ef4444', glow: 'rgba(239,68,68,0.15)' },
  'All':              { bg: 'rgba(255,255,255,0.05)', text: '#fff', border: 'rgba(255,255,255,0.1)', dot: '#fff',    glow: 'rgba(255,255,255,0.05)' },
};

export const getDefaultStyle = () => ({ bg: 'rgba(245,130,32,0.1)', text: '#f58220', border: 'rgba(245,130,32,0.3)', dot: '#f58220', glow: 'rgba(245,130,32,0.15)' });
