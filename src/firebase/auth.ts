import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from './config'

export async function login(email: string, password: string) {
  if (!auth) throw new Error('Firebase not configured')
  return signInWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  if (!auth) return
  return signOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

export { isFirebaseConfigured }
