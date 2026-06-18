import { useState, useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthChange } from '@/firebase/auth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<boolean | null>(null)

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      setUser(!!u)
    })
    return unsub
  }, [])

  if (user === null) {
    return (
      <div className="min-h-screen bg-[#05060f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}
