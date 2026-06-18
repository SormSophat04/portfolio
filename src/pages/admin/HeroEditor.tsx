import { useState } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { ImageUploader } from '@/components/admin/ImageUploader'

export function HeroEditor() {
  const { hero, updateHero } = usePortfolio()
  const [form, setForm] = useState({ ...hero })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await updateHero({
        name: form.name,
        title: form.title,
        shortIntro: form.shortIntro,
        location: form.location,
        cvUrl: form.cvUrl,
        avatarUrl: form.avatarUrl,
        socials: form.socials.filter((s) => s.label && s.href),
      })
      setMsg('Saved!')
    } catch {
      setMsg('Failed to save')
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-display mb-8">Hero Section</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {[
          { label: 'Name', key: 'name' },
          { label: 'Title', key: 'title' },
          { label: 'Location', key: 'location' },
          { label: 'CV URL', key: 'cvUrl' },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
              {field.label.toUpperCase()}
            </label>
            <input
              value={(form as Record<string, unknown>)[field.key] as string}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            AVATAR
          </label>
          <ImageUploader
            currentUrl={form.avatarUrl}
            folder="hero"
            onUpload={(url) => setForm({ ...form, avatarUrl: url })}
            alt="Avatar"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
            SHORT INTRO
          </label>
          <textarea
            value={form.shortIntro}
            onChange={(e) => setForm({ ...form, shortIntro: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
          />
        </div>

        <fieldset>
          <legend className="text-xs font-medium text-slate-400 mb-3 font-mono uppercase">
            Social Links
          </legend>
          <div className="space-y-3">
            {form.socials.map((s, i) => (
              <div key={i} className="flex gap-3">
                <input
                  placeholder="Label"
                  value={s.label}
                  onChange={(e) => {
                    const next = [...form.socials]
                    next[i] = { ...next[i], label: e.target.value }
                    setForm({ ...form, socials: next })
                  }}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <input
                  placeholder="URL"
                  value={s.href}
                  onChange={(e) => {
                    const next = [...form.socials]
                    next[i] = { ...next[i], href: e.target.value }
                    setForm({ ...form, socials: next })
                  }}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
        </fieldset>

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
