import { useRef, type ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type PageTransitionProps = {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isGameRoute = location.pathname.includes('/game/')

  useGSAP(() => {
    if (!containerRef.current || isGameRoute) return

    // Kill any in-progress animations on this container
    gsap.killTweensOf(containerRef.current)

    // Detect if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Just ensure it's visible, no animation
      gsap.set(containerRef.current, { opacity: 1, y: 0 })
      return
    }

    // Detect mobile for lighter animation
    const isMobile = window.innerWidth < 768

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: isMobile ? 20 : 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.4 : 0.6,
        ease: 'power3.out',
        clearProps: 'transform', // clean up inline styles after animation
      },
    )
  }, { scope: containerRef, dependencies: [location.pathname] })

  // Game routes get no wrapper animation (they manage their own)
  if (isGameRoute) {
    return <>{children}</>
  }

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}

export default PageTransition
