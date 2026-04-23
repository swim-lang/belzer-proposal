import { useEffect, useRef, useState, type ReactNode } from 'react'

export function UnfoldGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`unfold ${active ? 'is-active' : ''} ${className ?? ''}`}>
      {children}
    </div>
  )
}
