import { useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { DnDSortableItem } from '@/components/admin/DnDSortableItem'
import { ImageUploader } from '@/components/admin/ImageUploader'
import type { Project } from '@/types'

const defaultProject = {
  title: '',
  description: '',
  tags: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
  category: 'web' as const,
}

type FormState = {
  title?: string
  description?: string
  tags?: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured?: boolean
  category?: 'web' | 'mobile' | 'system'
}

export function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = usePortfolio()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({ ...defaultProject })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const sorted = [...projects].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const reset = () => {
    setForm({ ...defaultProject })
    setEditId(null)
    setOpen(false)
  }

  const handleEdit = (id: string) => {
    const p = projects.find((x) => x.id === id)
    if (!p) return
    setForm({ ...p, tags: p.tags.join(', ') })
    setEditId(id)
    setOpen(true)
  }

  const handleSave = async () => {
    const data: Omit<Project, 'id'> = {
      title: form.title || '',
      description: form.description || '',
      tags: (form.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: form.githubUrl || '',
      liveUrl: form.liveUrl || '',
      imageUrl: form.imageUrl || '/placeholder.png',
      featured: form.featured ?? false,
      category: form.category || 'web',
    }
    try {
      if (editId) {
        await updateProject(editId, data)
      } else {
        await addProject(data)
      }
      reset()
    } catch {
      alert('Failed to save project')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id)
      } catch {
        alert('Failed to delete project')
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const ids = sorted.map((p) => p.id)
    const oldIndex = ids.indexOf(active.id as string)
    const newIndex = ids.indexOf(over.id as string)
    const reordered = arrayMove(ids, oldIndex, newIndex)
    reorderProjects(reordered)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white font-display">Projects</h1>
        <button
          onClick={() => { reset(); setOpen(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sorted.map((p) => (
              <DnDSortableItem key={p.id} id={p.id}>
                <div className="glassmorphism rounded-2xl p-4 border-white/5 flex items-start gap-4">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold font-display">{p.title}</h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{p.description}</p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-500">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button onClick={() => handleEdit(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </DnDSortableItem>
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-slate-500 font-mono text-center py-12">No projects yet.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glassmorphism rounded-2xl p-6 w-full max-w-lg mx-4 border-white/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white font-display mb-5">
              {editId ? 'Edit Project' : 'New Project'}
            </h2>

            <div className="space-y-4">
              {(['title', 'description'] as const).map((f) => (
                <div key={f}>
                  <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">{f}</label>
                  {f === 'description' ? (
                    <textarea
                      value={form[f] as string}
                      onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                    />
                  ) : (
                    <input
                      value={form[f] as string}
                      onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  )}
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Tags (comma separated)</label>
                <input
                  value={form.tags || ''}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, TypeScript, Tailwind"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>

              {(['githubUrl', 'liveUrl'] as const).map((f) => (
                <div key={f}>
                  <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">{f}</label>
                  <input
                    value={form[f] || ''}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Image</label>
                <ImageUploader
                  currentUrl={form.imageUrl || ''}
                  folder="projects"
                  onUpload={(url) => setForm({ ...form, imageUrl: url })}
                  alt="Project screenshot"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 font-mono uppercase">Category</label>
                <select
                  value={form.category || 'web'}
                  onChange={(e) => setForm({ ...form, category: e.target.value as 'web' | 'mobile' | 'system' })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="system">System</option>
                </select>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured || false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 accent-indigo-500"
                />
                Featured
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                {editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
