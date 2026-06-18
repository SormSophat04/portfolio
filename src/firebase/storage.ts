import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, isFirebaseConfigured } from './config'

export async function uploadImage(
  file: File,
  folder: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error('Firebase Storage is not configured')
  }

  const ext = file.name.split('.').pop() || 'png'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const storageRef = ref(storage, `${folder}/${filename}`)
  const task = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(p)
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve(url)
      }
    )
  })
}
