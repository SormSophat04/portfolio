import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, Trash2 } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { DnDSortableItem } from '@/components/admin/DnDSortableItem'
import type { SkillCategory } from '@/types'

export function SkillsManager() {
  const { skillCategories, updateSkills } = usePortfolio()
  const [categories, setCategories] = useState<SkillCategory[]>(skillCategories)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const clean = categories
        .map((cat) => ({
          ...cat,
          skills: cat.skills.filter((s) => s.name.trim()),
        }))
        .filter((c) => c.name.trim())
      await updateSkills(clean)
      setCategories(clean)
      setMsg('Saved!')
    } catch {
      setMsg('Failed to save')
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(''), 2000)
    }
  }

  const addCategory = () => {
    setCategories([...categories, { name: '', icon: 'code', skills: [] }])
  }

  const removeCategory = (i: number) => {
    setCategories(categories.filter((_, idx) => idx !== i))
  }

  const addSkill = (catIdx: number) => {
    const next = [...categories]
    next[catIdx] = { ...next[catIdx], skills: [...next[catIdx].skills, { name: '', level: 50 }] }
    setCategories(next)
  }

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const next = [...categories]
    next[catIdx] = { ...next[catIdx], skills: next[catIdx].skills.filter((_, i) => i !== skillIdx) }
    setCategories(next)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = categories.findIndex((_, i) => `cat-${i}` === active.id)
    const newIndex = categories.findIndex((_, i) => `cat-${i}` === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    setCategories(arrayMove(categories, oldIndex, newIndex))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-display">Skills</h1>
        <div className="flex items-center gap-3">
          {msg && <span className="text-sm text-emerald-400 font-mono">{msg}</span>}
          <button
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Category
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories.map((_, i) => `cat-${i}`)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {categories.map((cat, catIdx) => (
              <DnDSortableItem key={`cat-${catIdx}`} id={`cat-${catIdx}`} handle={false}>
                <div className="glassmorphism rounded-2xl p-5 border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      value={cat.name}
                      onChange={(e) => {
                        const next = [...categories]
                        next[catIdx] = { ...next[catIdx], name: e.target.value }
                        setCategories(next)
                      }}
                      placeholder="Category name"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                    <input
                      value={cat.icon}
                      onChange={(e) => {
                        const next = [...categories]
                        next[catIdx] = { ...next[catIdx], icon: e.target.value }
                        setCategories(next)
                      }}
                      placeholder="icon (layout/server/database/cloud)"
                      className="w-48 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                    <button onClick={() => removeCategory(catIdx)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="ml-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-3 overflow-x-auto">
                        <input
                          value={skill.name}
                          onChange={(e) => {
                            const next = [...categories]
                            next[catIdx].skills[skillIdx] = { ...next[catIdx].skills[skillIdx], name: e.target.value }
                            setCategories(next)
                          }}
                          placeholder="Skill name"
                          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={skill.level}
                          onChange={(e) => {
                            const next = [...categories]
                            next[catIdx].skills[skillIdx] = { ...next[catIdx].skills[skillIdx], level: Number(e.target.value) }
                            setCategories(next)
                          }}
                          className="w-20 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <button onClick={() => removeSkill(catIdx, skillIdx)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addSkill(catIdx)}
                      className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-2 cursor-pointer"
                    >
                      <Plus size={14} />
                      Add Skill
                    </button>
                  </div>
                </div>
              </DnDSortableItem>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-slate-500 font-mono text-center py-12">No categories yet.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
