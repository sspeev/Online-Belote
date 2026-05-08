import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    
    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}
