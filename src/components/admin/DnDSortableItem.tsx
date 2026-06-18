import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { ReactNode } from 'react'

interface DnDSortableItemProps {
  id: string
  children: ReactNode
  className?: string
  handle?: boolean
}

export function DnDSortableItem({ id, children, className = '', handle = true }: DnDSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  if (!handle) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`cursor-grab active:cursor-grabbing touch-none ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} className={`flex items-start gap-3 ${className}`}>
      <button
        {...attributes}
        {...listeners}
        className="mt-3 p-1 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-white/5 transition-colors cursor-grab active:cursor-grabbing touch-none"
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
