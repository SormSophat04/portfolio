import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { DnDSortableItem } from '@/components/admin/DnDSortableItem'
import type { TimelineItem } from '@/types'

const defaultItem = {
  type: 'education' as const,
  title: '',
  organization: '',
  duration: '',
  description: '',
  tags: '',
}

export function TimelineManager() {
  const { timelineItems, addTimelineItem, updateTimelineItem, deleteTimelineItem, reorderTimelineItems } = usePortfolio()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, string>>({ ...defaultItem })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const sorted = [...timelineItems].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const reset = () => {
    setForm({ ...defaultItem })
    setEditId(null)
    setOpen(false)
  }

  const handleEdit = (id: string) => {
    const item = timelineItems.find((x) => x.id === id)
    if (!item) return
    setForm({
      type: item.type,
      title: item.title,
      organization: item.organization,
      duration: item.duration,
      description: item.description,
      tags: (item.tags || []).join(', '),
    })
    setEditId(id)
    setOpen(true)
  }

  const handleSave = async () => {
    const data: Omit<TimelineItem, 'id'> = {
      type: (form.type as TimelineItem['type']) || 'education',
      title: form.title || '',
      organization: form.organization || '',
      duration: form.duration || '',
      description: form.description || '',
      tags: (form.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    }
    try {
      if (editId) {
        await updateTimelineItem(editId, data)
      } else {
        await addTimelineItem(data)
      }
      reset()
    } catch {
      alert('Failed to save timeline item')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this item?')) {
      try {
        await deleteTimelineItem(id)
      } catch {
        alert('Failed to delete timeline item')
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const ids = sorted.map((t) => t.id)
    const oldIndex = ids.indexOf(active.id as string)
    const newIndex = ids.indexOf(over.id as string)
    reorderTimelineItems(arrayMove(ids, oldIndex, newIndex))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-display">Timeline</h1>
        <button
          onClick={() => { reset(); setOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sorted.map((item) => (
              <DnDSortableItem key={item.id} id={item.id}>
                <div className="glassmorphism rounded-2xl p-4 border-white/5 flex items-start gap-4">
                  <span className="px-2 py-1 rounded text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0 mt-0.5">
                    {item.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold font-display">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.organization} &middot; {item.duration}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </DnDSortableItem>
            ))}
            {timelineItems.length === 0 && (
              <p className="text-sm text-slate-500 font-mono text-center py-12">No timeline items yet.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glassmorphism rounded-2xl p-6 w-full max-w-lg mx-4 border-white/5">
            <h2 className="text-lg font-bold text-white font-display mb-5">
              {editId ? 'Edit Timeline Item' : 'New Timeline Item'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                >
                  <option value="education">Education</option>
                  <option value="experience">Experience</option>
                  <option value="certification">Certification</option>
                  <option value="project">Project</option>
                </select>
              </div>

              {(['title', 'organization', 'duration'] as const).map((f) => (
                <div key={f}>
                  <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">{f}</label>
                  <input
                    value={form[f]}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Laravel, AWS"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={reset} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                {editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
