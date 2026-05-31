import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GamePreviewImage from '@/assets/common/GameplayReview.png'

gsap.registerPlugin(ScrollTrigger)

const GamePreview = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const imageColRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // ---------- Left column (text): fade + slide from left ----------
    if (textColRef.current) {
      gsap.from(textColRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Checklist items: staggered appearance with checkmark scale-in
      const listItems = textColRef.current.querySelectorAll('li')
      gsap.from(listItems, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Checkmark icons scale-in
      const checkIcons = textColRef.current.querySelectorAll('[data-purpose="check-icon"]')
      gsap.from(checkIcons, {
        scale: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: 'back.out(2)',
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }

    // ---------- Right column (image): parallax + scale ----------
    if (imageColRef.current) {
      gsap.from(imageColRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Subtle parallax — image moves slower than scroll
      gsap.to(imageColRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <>
      <section
        ref={sectionRef}
        className="py-24 bg-background-light dark:bg-background-dark overflow-hidden"
        data-purpose="experience-highlight"
        id="experience"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center pt-20 gap-16">
          <div ref={textColRef} className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
              The New Standard
            </span>
            <h2 className="text-5xl font-bold mb-8 leading-tight text-brand-charcoal dark:text-brand-offwhite">
              Premium Experience
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div data-purpose="check-icon" className="mt-1 bg-brand-burnt rounded-full p-1 text-brand-offwhite">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-brand-charcoal dark:text-brand-offwhite">Custom deck designs and high-fidelity textures.</span>
              </li>
              <li className="flex items-start gap-3">
                <div data-purpose="check-icon" className="mt-1 bg-brand-burnt rounded-full p-1 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-brand-charcoal dark:text-brand-offwhite">Private rooms with customizable rules and variants.</span>
              </li>
              <li className="flex items-start gap-3">
                <div data-purpose="check-icon" className="mt-1 bg-brand-burnt rounded-full p-1 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-brand-charcoal dark:text-brand-offwhite">Responsive UI so you can play anywhere.</span>
              </li>
            </ul>
          </div>
          <div ref={imageColRef} className="flex-1 w-full relative ">
            <div className="aspect-square  rounded-3xl overflow-hidden relative">
              {/* Placeholder for in-game preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">GAME PREVIEW</span>
                  <img
                    alt="Game Preview"
                    className="mt-4 rounded-xl shadow-inner max-w-[80%] mx-auto"
                    src={GamePreviewImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GamePreview