import { useEffect, useRef, type ReactNode, type JSX } from 'react'

export function Reveal({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: keyof JSX.IntrinsicElements }) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.reveal = 'in'
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])
  const Component = Tag as any
  return (
    <Component ref={ref as any} data-reveal="out" className={className}>
      {children}
    </Component>
  )
}
