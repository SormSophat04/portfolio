import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { DnDSortableItem } from '@/components/admin/DnDSortableItem'
import { ImageUploader } from '@/components/admin/ImageUploader'
import type { TestimonialItem } from '@/types'

const defaultTestimonial = {
  name: '',
  role: '',
  company: '',
  avatarUrl: '',
  content: '',
}

export function TestimonialsManager() {
  const { testimonialsItems, addTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials } = usePortfolio()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...defaultTestimonial })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const sorted = [...testimonialsItems].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const reset = () => {
    setForm({ ...defaultTestimonial })
    setEditId(null)
    setOpen(false)
  }

  const handleEdit = (id: string) => {
    const t = testimonialsItems.find((x) => x.id === id)
    if (!t) return
    setForm({
      name: t.name,
      role: t.role,
      company: t.company,
      avatarUrl: t.avatarUrl,
      content: t.content,
    })
    setEditId(id)
    setOpen(true)
  }

  const handleSave = async () => {
    const data: Omit<TestimonialItem, 'id'> = {
      name: form.name || '',
      role: form.role || '',
      company: form.company || '',
      avatarUrl: form.avatarUrl || '',
      content: form.content || '',
    }
    try {
      if (editId) {
        await updateTestimonial(editId, data)
      } else {
        await addTestimonial(data)
      }
      reset()
    } catch {
      alert('Failed to save testimonial')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      try {
        await deleteTestimonial(id)
      } catch {
        alert('Failed to delete testimonial')
      }
    }
  }

  const getInitials = (name: string) =>
    name.split(' ').map((p) => p[0]).join('').toUpperCase().substring(0, 2)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const ids = sorted.map((t) => t.id)
    const oldIndex = ids.indexOf(active.id as string)
    const newIndex = ids.indexOf(over.id as string)
    reorderTestimonials(arrayMove(ids, oldIndex, newIndex))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-display">Testimonials</h1>
        <button
          onClick={() => { reset(); setOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sorted.map((t) => (
              <DnDSortableItem key={t.id} id={t.id}>
                <div className="glassmorphism rounded-2xl p-4 border-white/5 flex items-start gap-4">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {getInitials(t.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold font-display">{t.name}</h3>
                    <p className="text-xs text-slate-400">{t.role} &middot; {t.company}</p>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{t.content}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(t.id)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </DnDSortableItem>
            ))}
            {testimonialsItems.length === 0 && (
              <p className="text-sm text-slate-500 font-mono text-center py-12">No testimonials yet.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glassmorphism rounded-2xl p-6 w-full max-w-lg mx-4 border-white/5">
            <h2 className="text-lg font-bold text-white font-display mb-5">
              {editId ? 'Edit Testimonial' : 'New Testimonial'}
            </h2>

            <div className="space-y-4">
              {(['name', 'role', 'company'] as const).map((f) => (
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
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Avatar</label>
                <ImageUploader
                  currentUrl={form.avatarUrl}
                  folder="testimonials"
                  onUpload={(url) => setForm({ ...form, avatarUrl: url })}
                  alt="Testimonial avatar"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
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
