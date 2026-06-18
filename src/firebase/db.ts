import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  writeBatch,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  type FirestoreError,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

function checkDb() {
  if (!db) throw new Error('Firebase not configured')
  return db
}

export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
  if (!isFirebaseConfigured) return null
  const d = checkDb()
  const docSnap = await getDoc(doc(d, collectionName, docId))
  if (!docSnap.exists()) return null
  return { ...docSnap.data(), id: docSnap.id } as T
}

export async function getCollection<T>(collectionName: string): Promise<T[]> {
  if (!isFirebaseConfigured) return []
  const d = checkDb()
  const q = query(collection(d, collectionName), orderBy('sortOrder', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as T)
}

export async function addDocument(collectionName: string, data: Record<string, unknown>) {
  const d = checkDb()
  return addDoc(collection(d, collectionName), {
    ...data,
    sortOrder: Date.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
) {
  const d = checkDb()
  return updateDoc(doc(d, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteDocument(collectionName: string, docId: string) {
  const d = checkDb()
  return deleteDoc(doc(d, collectionName, docId))
}

export async function setDocument(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
) {
  const d = checkDb()
  return setDoc(doc(d, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function reorderCollection(
  collectionName: string,
  orderedIds: string[]
) {
  const d = checkDb()
  const batch = writeBatch(d)
  orderedIds.forEach((id, index) => {
    batch.update(doc(d, collectionName, id), { sortOrder: index })
  })
  await batch.commit()
}

export function subscribeToCollection<T>(
  collectionName: string,
  callback: (items: T[]) => void,
  errorCallback?: (error: FirestoreError) => void
) {
  if (!isFirebaseConfigured) return () => {}
  const d = checkDb()
  const q = query(collection(d, collectionName), orderBy('sortOrder', 'asc'))
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ ...d.data(), id: d.id }) as T)
      callback(items)
    },
    errorCallback
  )
}

export function subscribeToDocument<T>(
  collectionName: string,
  docId: string,
  callback: (item: T | null) => void,
  errorCallback?: (error: FirestoreError) => void
) {
  if (!isFirebaseConfigured) return () => {}
  const d = checkDb()
  return onSnapshot(
    doc(d, collectionName, docId),
    (snap) => {
      if (!snap.exists()) {
        callback(null)
        return
      }
      callback({ ...snap.data(), id: snap.id } as T)
    },
    errorCallback
  )
}
