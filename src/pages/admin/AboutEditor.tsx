import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { ImageUploader } from '@/components/admin/ImageUploader'

export function AboutEditor() {
  const { about, updateAbout } = usePortfolio()
  const [form, setForm] = useState({ ...about })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await updateAbout({
        intro: form.intro,
        education: form.education,
        passion: form.passion,
        goals: form.goals,
        photoUrl: form.photoUrl,
      })
      setMsg('Saved!')
    } catch {
      setMsg('Failed to save')
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2000)
  }

  const fields = [
    { label: 'Intro', key: 'intro' },
    { label: 'Education', key: 'education' },
    { label: 'Passion', key: 'passion' },
    { label: 'Goals', key: 'goals' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-display mb-8">About Section</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            PHOTO
          </label>
          <ImageUploader
            currentUrl={form.photoUrl}
            folder="about"
            onUpload={(url) => setForm({ ...form, photoUrl: url })}
            alt="Profile photo"
          />
        </div>

        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
              {f.label.toUpperCase()}
            </label>
            <textarea
              value={(form as Record<string, unknown>)[f.key] as string}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
            />
          </div>
        ))}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {msg && <span className="text-sm text-emerald-400 font-mono">{msg}</span>}
        </div>
      </form>
    </div>
  )
}
