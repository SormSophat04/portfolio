import { useState, useRef, type ChangeEvent } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage } from '@/firebase/storage'
import { isFirebaseConfigured } from '@/firebase/config'

interface ImageUploaderProps {
  currentUrl: string
  folder: string
  onUpload: (url: string) => void
  alt?: string
}

export function ImageUploader({ currentUrl, folder, onUpload, alt }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB')
      return
    }

    setUploading(true)
    setProgress(0)
    try {
      const url = await uploadImage(file, folder, setProgress)
      onUpload(url)
    } catch {
      alert('Failed to upload image')
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (!isFirebaseConfigured) {
    return (
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Image URL</label>
        <input
          value={currentUrl}
          onChange={(e) => onUpload(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Image URL (Firebase not configured)"
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {currentUrl && (
        <div className="relative inline-block">
          <img
            src={currentUrl}
            alt={alt || 'Preview'}
            className="w-32 h-32 rounded-xl object-cover border border-white/10"
          />
          {!uploading && (
            <button
              onClick={() => onUpload('')}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
              type="button"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Uploading... {Math.round(progress)}%
          </>
        ) : (
          <>
            <Upload size={16} />
            {currentUrl ? 'Change Image' : 'Upload Image'}
          </>
        )}
      </button>
    </div>
  )
}
