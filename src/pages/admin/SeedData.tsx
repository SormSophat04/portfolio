import { useState } from 'react'
import { isFirebaseConfigured } from '@/firebase/config'
import { setDocument, addDocument } from '@/firebase/db'
import {
  heroData,
  aboutData,
  skillCategories,
  projects,
  timelineItems,
  serviceItems,
  testimonialsItems,
} from '@/data/portfolioData'

export function SeedData() {
  const [msg, setMsg] = useState('')
  const [seeding, setSeeding] = useState(false)

  const handleSeed = async () => {
    if (!isFirebaseConfigured) {
      setMsg('Firebase is not configured.')
      return
    }
    if (!window.confirm('This will push all static data to Firestore. Continue?')) return
    setSeeding(true)
    setMsg('')

    try {
      await setDocument('hero', 'main', heroData as Record<string, unknown>)
      await setDocument('about', 'main', aboutData as Record<string, unknown>)
      await setDocument('skills', 'main', { categories: skillCategories } as Record<string, unknown>)

      for (const p of projects) {
        await addDocument('projects', { ...p } as Record<string, unknown>)
      }
      for (const t of timelineItems) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = t
        await addDocument('timeline', rest as Record<string, unknown>)
      }
      for (const s of serviceItems) {
        await addDocument('services', { ...s } as Record<string, unknown>)
      }
      for (const t of testimonialsItems) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = t
        await addDocument('testimonials', rest as Record<string, unknown>)
      }

      setMsg('All data seeded successfully! Refreshing...')
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Seed failed')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-display mb-4">Seed Data</h1>
      <p className="text-sm text-slate-400 mb-6 font-sans max-w-lg">
        Push all existing static portfolio data to Firestore. Use this once to initialize
        your Firestore database after setting up Firebase.
      </p>

      <button
        onClick={handleSeed}
        disabled={seeding}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {seeding ? 'Seeding...' : 'Seed Firestore from Static Data'}
      </button>

      {msg && (
        <p className={`mt-4 text-sm font-mono ${msg.includes('success') ? 'text-emerald-400' : 'text-red-400'}`}>
          {msg}
        </p>
      )}
    </div>
  )
}
