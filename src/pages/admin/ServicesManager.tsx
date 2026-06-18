import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { DnDSortableItem } from '@/components/admin/DnDSortableItem'
import type { ServiceItem } from '@/types'

const defaultService = { title: '', description: '', icon: 'code' }

export function ServicesManager() {
  const { serviceItems, addService, updateService, deleteService, reorderServices } = usePortfolio()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...defaultService })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const sorted = [...serviceItems].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const reset = () => {
    setForm({ ...defaultService })
    setEditId(null)
    setOpen(false)
  }

  const handleEdit = (id: string) => {
    const s = serviceItems.find((x) => x.id === id)
    if (!s) return
    setForm({ title: s.title, description: s.description, icon: s.icon })
    setEditId(id)
    setOpen(true)
  }

  const handleSave = async () => {
    const data: Omit<ServiceItem, 'id'> = {
      title: form.title || '',
      description: form.description || '',
      icon: form.icon || 'code',
    }
    try {
      if (editId) {
        await updateService(editId, data)
      } else {
        await addService(data)
      }
      reset()
    } catch {
      alert('Failed to save service')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this service?')) {
      try {
        await deleteService(id)
      } catch {
        alert('Failed to delete service')
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const ids = sorted.map((s) => s.id)
    const oldIndex = ids.indexOf(active.id as string)
    const newIndex = ids.indexOf(over.id as string)
    reorderServices(arrayMove(ids, oldIndex, newIndex))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-display">Services</h1>
        <button
          onClick={() => { reset(); setOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map((s) => s.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((s) => (
              <DnDSortableItem key={s.id} id={s.id} className="flex-col items-stretch">
                <div className="glassmorphism rounded-2xl p-5 border-white/5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold font-display">{s.title}</h3>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(s.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              </DnDSortableItem>
            ))}
            {serviceItems.length === 0 && (
              <p className="text-sm text-slate-500 font-mono text-center py-12 col-span-full">No services yet.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glassmorphism rounded-2xl p-6 w-full max-w-lg mx-4 border-white/5">
            <h2 className="text-lg font-bold text-white font-display mb-5">
              {editId ? 'Edit Service' : 'New Service'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>

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
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                >
                  <option value="code">Code</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="figma">Figma</option>
                  <option value="terminal">Terminal</option>
                </select>
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
