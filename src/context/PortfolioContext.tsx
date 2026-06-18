/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { isFirebaseConfigured } from '@/firebase/config'
import {
  addDocument,
  updateDocument,
  deleteDocument,
  setDocument,
  reorderCollection,
  subscribeToCollection,
  subscribeToDocument,
} from '@/firebase/db'
import {
  heroData as staticHero,
  aboutData as staticAbout,
  skillCategories as staticSkills,
  projects as staticProjects,
  timelineItems as staticTimeline,
  serviceItems as staticServices,
  testimonialsItems as staticTestimonials,
} from '@/data/portfolioData'
import type { Project, SkillCategory, TimelineItem, ServiceItem, TestimonialItem } from '@/types'

type WithId<T> = T & { id: string; sortOrder?: number }

interface HeroData {
  name: string
  title: string
  shortIntro: string
  location: string
  cvUrl: string
  avatarUrl: string
  socials: { label: string; href: string; icon: string }[]
}

interface AboutData {
  intro: string
  education: string
  passion: string
  goals: string
  photoUrl: string
}

interface PortfolioContextValue {
  hero: HeroData
  about: AboutData
  skillCategories: SkillCategory[]
  projects: WithId<Project>[]
  timelineItems: WithId<TimelineItem>[]
  serviceItems: WithId<ServiceItem>[]
  testimonialsItems: WithId<TestimonialItem>[]
  loading: boolean
  updateHero: (data: Partial<HeroData>) => Promise<void>
  updateAbout: (data: Partial<AboutData>) => Promise<void>
  updateSkills: (categories: SkillCategory[]) => Promise<void>
  addProject: (data: Omit<Project, 'id'>) => Promise<void>
  updateProject: (id: string, data: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  reorderProjects: (orderedIds: string[]) => Promise<void>
  addTimelineItem: (data: Omit<TimelineItem, 'id'>) => Promise<void>
  updateTimelineItem: (id: string, data: Partial<TimelineItem>) => Promise<void>
  deleteTimelineItem: (id: string) => Promise<void>
  reorderTimelineItems: (orderedIds: string[]) => Promise<void>
  addService: (data: Omit<ServiceItem, 'id'>) => Promise<void>
  updateService: (id: string, data: Partial<ServiceItem>) => Promise<void>
  deleteService: (id: string) => Promise<void>
  reorderServices: (orderedIds: string[]) => Promise<void>
  addTestimonial: (data: Omit<TestimonialItem, 'id'>) => Promise<void>
  updateTestimonial: (id: string, data: Partial<TestimonialItem>) => Promise<void>
  deleteTestimonial: (id: string) => Promise<void>
  reorderTestimonials: (orderedIds: string[]) => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function attachIds<T>(items: T[], offset = 0): WithId<T>[] {
  return items.map((item, i) => ({ ...item, id: uid(), sortOrder: offset + i }))
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroData>(staticHero)
  const [about, setAbout] = useState<AboutData>(staticAbout)
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(staticSkills)
  const [projects, setProjects] = useState<WithId<Project>[]>(attachIds(staticProjects))
  const [timelineItems, setTimelineItems] = useState<WithId<TimelineItem>[]>(
    staticTimeline.map((t, i) => ({ ...t, id: t.id, sortOrder: i })) as WithId<TimelineItem>[]
  )
  const [serviceItems, setServiceItems] = useState<WithId<ServiceItem>[]>(attachIds(staticServices))
  const [testimonialsItems, setTestimonialsItems] = useState<WithId<TestimonialItem>[]>(
    staticTestimonials.map((t, i) => ({ ...t, id: t.id, sortOrder: i })) as WithId<TestimonialItem>[]
  )
  const heroRef = useRef(hero)
  const aboutRef = useRef(about)
  const [loading] = useState(false)

  useEffect(() => { heroRef.current = hero }, [hero])
  useEffect(() => { aboutRef.current = about }, [about])

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return
    }

    const unsubs: (() => void)[] = []

    unsubs.push(
      subscribeToDocument<HeroData>('hero', 'main', (data) => {
        if (data) setHero(data)
      })
    )

    unsubs.push(
      subscribeToDocument<AboutData>('about', 'main', (data) => {
        if (data) setAbout(data)
      })
    )

    unsubs.push(
      subscribeToDocument<{ categories: SkillCategory[] }>('skills', 'main', (data) => {
        if (data?.categories) setSkillCategories(data.categories)
      })
    )

    unsubs.push(
      subscribeToCollection<WithId<Project>>('projects', (data) => {
        if (data.length > 0) setProjects(data)
      })
    )

    unsubs.push(
      subscribeToCollection<WithId<TimelineItem>>('timeline', (data) => {
        if (data.length > 0) setTimelineItems(data)
      })
    )

    unsubs.push(
      subscribeToCollection<WithId<ServiceItem>>('services', (data) => {
        if (data.length > 0) setServiceItems(data)
      })
    )

    unsubs.push(
      subscribeToCollection<WithId<TestimonialItem>>('testimonials', (data) => {
        if (data.length > 0) setTestimonialsItems(data)
      })
    )

    return () => unsubs.forEach((u) => u())
  }, [])

  const updateHero = useCallback(async (data: Partial<HeroData>) => {
    const next = { ...heroRef.current, ...data }
    setHero(next)
    if (isFirebaseConfigured) {
      await setDocument('hero', 'main', next as Record<string, unknown>)
    }
  }, [])

  const updateAbout = useCallback(async (data: Partial<AboutData>) => {
    const next = { ...aboutRef.current, ...data }
    setAbout(next)
    if (isFirebaseConfigured) {
      await setDocument('about', 'main', next as Record<string, unknown>)
    }
  }, [])

  const updateSkills = useCallback(async (categories: SkillCategory[]) => {
    setSkillCategories(categories)
    if (isFirebaseConfigured) {
      await setDocument('skills', 'main', { categories } as Record<string, unknown>)
    }
  }, [])

  const addProject = useCallback(async (data: Omit<Project, 'id'>) => {
    if (isFirebaseConfigured) {
      const ref = await addDocument('projects', data as Record<string, unknown>)
      setProjects((prev) => [...prev, { ...data, id: ref.id, sortOrder: prev.length }])
    } else {
      setProjects((prev) => [...prev, { ...data, id: uid(), sortOrder: prev.length }])
    }
  }, [])

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
    if (isFirebaseConfigured) {
      await updateDocument('projects', id, data as Record<string, unknown>)
    }
  }, [])

  const deleteProject = useCallback(async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    if (isFirebaseConfigured) {
      await deleteDocument('projects', id)
    }
  }, [])

  const reorderProjects = useCallback(async (orderedIds: string[]) => {
    setProjects((prev) => {
      const map = new Map(prev.map((p) => [p.id, p]))
      return orderedIds.map((id, i) => ({ ...map.get(id)!, sortOrder: i }))
    })
    if (isFirebaseConfigured) {
      await reorderCollection('projects', orderedIds)
    }
  }, [])

  const addTimelineItem = useCallback(async (data: Omit<TimelineItem, 'id'>) => {
    if (isFirebaseConfigured) {
      const ref = await addDocument('timeline', { ...data, tags: data.tags ?? [] } as Record<string, unknown>)
      setTimelineItems((prev) => [...prev, { ...data, id: ref.id, sortOrder: prev.length }])
    } else {
      setTimelineItems((prev) => [...prev, { ...data, id: uid(), sortOrder: prev.length }])
    }
  }, [])

  const updateTimelineItem = useCallback(async (id: string, data: Partial<TimelineItem>) => {
    setTimelineItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
    if (isFirebaseConfigured) {
      await updateDocument('timeline', id, data as Record<string, unknown>)
    }
  }, [])

  const deleteTimelineItem = useCallback(async (id: string) => {
    setTimelineItems((prev) => prev.filter((t) => t.id !== id))
    if (isFirebaseConfigured) {
      await deleteDocument('timeline', id)
    }
  }, [])

  const reorderTimelineItems = useCallback(async (orderedIds: string[]) => {
    setTimelineItems((prev) => {
      const map = new Map(prev.map((t) => [t.id, t]))
      return orderedIds.map((id, i) => ({ ...map.get(id)!, sortOrder: i }))
    })
    if (isFirebaseConfigured) {
      await reorderCollection('timeline', orderedIds)
    }
  }, [])

  const addService = useCallback(async (data: Omit<ServiceItem, 'id'>) => {
    if (isFirebaseConfigured) {
      const ref = await addDocument('services', data as Record<string, unknown>)
      setServiceItems((prev) => [...prev, { ...data, id: ref.id, sortOrder: prev.length }])
    } else {
      setServiceItems((prev) => [...prev, { ...data, id: uid(), sortOrder: prev.length }])
    }
  }, [])

  const updateService = useCallback(async (id: string, data: Partial<ServiceItem>) => {
    setServiceItems((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
    if (isFirebaseConfigured) {
      await updateDocument('services', id, data as Record<string, unknown>)
    }
  }, [])

  const deleteService = useCallback(async (id: string) => {
    setServiceItems((prev) => prev.filter((s) => s.id !== id))
    if (isFirebaseConfigured) {
      await deleteDocument('services', id)
    }
  }, [])

  const reorderServices = useCallback(async (orderedIds: string[]) => {
    setServiceItems((prev) => {
      const map = new Map(prev.map((s) => [s.id, s]))
      return orderedIds.map((id, i) => ({ ...map.get(id)!, sortOrder: i }))
    })
    if (isFirebaseConfigured) {
      await reorderCollection('services', orderedIds)
    }
  }, [])

  const addTestimonial = useCallback(async (data: Omit<TestimonialItem, 'id'>) => {
    if (isFirebaseConfigured) {
      const ref = await addDocument('testimonials', data as Record<string, unknown>)
      setTestimonialsItems((prev) => [...prev, { ...data, id: ref.id, sortOrder: prev.length }])
    } else {
      setTestimonialsItems((prev) => [...prev, { ...data, id: uid(), sortOrder: prev.length }])
    }
  }, [])

  const updateTestimonial = useCallback(async (id: string, data: Partial<TestimonialItem>) => {
    setTestimonialsItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
    if (isFirebaseConfigured) {
      await updateDocument('testimonials', id, data as Record<string, unknown>)
    }
  }, [])

  const deleteTestimonial = useCallback(async (id: string) => {
    setTestimonialsItems((prev) => prev.filter((t) => t.id !== id))
    if (isFirebaseConfigured) {
      await deleteDocument('testimonials', id)
    }
  }, [])

  const reorderTestimonials = useCallback(async (orderedIds: string[]) => {
    setTestimonialsItems((prev) => {
      const map = new Map(prev.map((t) => [t.id, t]))
      return orderedIds.map((id, i) => ({ ...map.get(id)!, sortOrder: i }))
    })
    if (isFirebaseConfigured) {
      await reorderCollection('testimonials', orderedIds)
    }
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        hero,
        about,
        skillCategories,
        projects,
        timelineItems,
        serviceItems,
        testimonialsItems,
        loading,
        updateHero,
        updateAbout,
        updateSkills,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addTimelineItem,
        updateTimelineItem,
        deleteTimelineItem,
        reorderTimelineItems,
        addService,
        updateService,
        deleteService,
        reorderServices,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        reorderTestimonials,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return ctx
}
