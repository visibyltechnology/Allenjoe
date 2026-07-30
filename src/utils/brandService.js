import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const BRANDS_COLLECTION = 'brands';

export const listenToBrands = (onUpdate) => {
  if (!db) {
    onUpdate(DEFAULT_BRANDS);
    return () => {};
  }
  const q = query(collection(db, BRANDS_COLLECTION), orderBy('order', 'asc'));

  const mergeBrands = (dbBrands) => {
    const map = new Map();
    DEFAULT_BRANDS.forEach(b => map.set(b.name.toLowerCase(), { ...b }));
    dbBrands.forEach(b => map.set(b.name.toLowerCase(), { ...b }));
    return Array.from(map.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  return onSnapshot(q,
    (snap) => {
      const dbBrands = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      onUpdate(mergeBrands(dbBrands));
    },
    (err) => {
      console.warn('[brandService] orderBy query failed, falling back:', err.message);
      const fallback = query(collection(db, BRANDS_COLLECTION));
      onSnapshot(fallback, (snap) => {
        const dbBrands = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        onUpdate(mergeBrands(dbBrands));
      });
    }
  );
};

export const addBrand = async (brandData) => {
  const docRef = await addDoc(collection(db, BRANDS_COLLECTION), {
    ...brandData,
    order: Date.now(),
    createdAt: new Date()
  });
  return docRef.id;
};

export const updateBrand = async (brandId, updates) => {
  await updateDoc(doc(db, BRANDS_COLLECTION, brandId), updates);
};

export const deleteBrand = async (brandId) => {
  await deleteDoc(doc(db, BRANDS_COLLECTION, brandId));
};

/**
 * Allenjoe default brands — Solar/CCTV manufacturers
 */
export const DEFAULT_BRANDS = [
  { name: 'Luminous',    order: 0 },
  { name: 'Victron',     order: 1 },
  { name: 'Growatt',     order: 2 },
  { name: 'Deye',        order: 3 },
  { name: 'Felicity',    order: 4 },
  { name: 'Hisense',     order: 5 },
  { name: 'Hikvision',   order: 6 },
  { name: 'Dahua',       order: 7 },
  { name: 'Reolink',     order: 8 },
  { name: 'Canadian Solar', order: 9 },
  { name: 'Jinko',       order: 10 },
  { name: 'Pylontech',   order: 11 },
  { name: 'BYD',         order: 12 },
  { name: 'Allenjoe',    order: 13 },
];
