import { useState, useRef, useEffect } from 'react'
import { useDarkMode } from '@/hooks/common/useDarkMode'
import { Sun, Moon, ShieldAlert, X } from 'lucide-react'
import gsap from 'gsap'

const Navbar = () => {
  const { isDark, toggleDarkMode } = useDarkMode()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Modal GSAP entrance/exit
  useEffect(() => {
    if (isPopupOpen && modalRef.current && overlayRef.current) {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' },
      )
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          delay: 0.05,
        },
      )
    }
  }, [isPopupOpen])

  const handleClosePopup = () => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced || !modalRef.current || !overlayRef.current) {
      setIsPopupOpen(false)
      return
    }
    const tl = gsap.timeline({ onComplete: () => setIsPopupOpen(false) })
    tl.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.15, ease: 'power2.in' },
      '-=0.1',
    )
  }

  return (
    <>
      <nav
        className="fixed top-0 w-full z-40 bg-brand-offwhite/80 dark:bg-background-dark/80 dark:border-white/10 dark:text-slate-100 backdrop-blur-[10px] border-b border-gray-200 transition-all"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-burnt rounded flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-semibold tracking-tight text-xl">
              BELOTE.
            </span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium uppercase tracking-widest">
            <a className="hover:text-brand-burnt transition" href="#features">
              Features
            </a>
            <a className="hover:text-brand-burnt transition" href="#experience">
              Experience
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors mr-2 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="px-5 py-2 border border-brand-charcoal dark:border-slate-100 rounded-full hover:bg-brand-charcoal hover:text-white dark:hover:bg-white dark:hover:text-background-dark transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
            {/* Mobile Menu Icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>
      </nav>

      {/* Premium Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            style={{ opacity: 0 }}
            onClick={handleClosePopup}
          ></div>

          {/* Modal Box */}
          <div
            ref={modalRef}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full mx-auto shadow-2xl border border-slate-100 dark:border-white/10 relative z-10 flex flex-col items-center text-center gap-6"
            style={{ opacity: 0, transform: 'scale(0.9)' }}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X className="size-5" />
            </button>

            <div className="size-16 rounded-2xl bg-brand-burnt/10 flex items-center justify-center text-brand-burnt">
              <ShieldAlert className="size-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Under Construction
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Authentication is not implemented yet. We are working on
                bringing this feature to you soon!
              </p>
            </div>

            <button
              onClick={handleClosePopup}
              className="w-full py-3 bg-brand-charcoal dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-brand-burnt dark:hover:bg-brand-burnt dark:hover:text-white transition-all cursor-pointer shadow-md hover:shadow-brand-burnt/20"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
