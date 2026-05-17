import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      // ---------- Section heading fade-up + gold divider width animation ----------
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      }

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { width: 0 },
          {
            width: 80,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        )
      }

      // ---------- Feature cards staggered reveal from bottom ----------
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(
          '[data-purpose="feature-card"]',
        )
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        })

        // Feature card icons: delayed scale pop after card appears
        const icons = cardsRef.current.querySelectorAll(
          '[data-purpose="feature-icon"]',
        )
        gsap.from(icons, {
          scale: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(2)',
          delay: 0.3,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-brand-softgray dark:bg-brand-charcoal relative z-20 py-24"
        data-purpose="features-grid"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl font-bold mb-4 text-brand-charcoal dark:text-brand-offwhite"
            >
              Built for Players Who Care
            </h2>
            <div
              ref={dividerRef}
              className="h-1 bg-brand-gold mx-auto mb-6"
              style={{ width: 0 }}
            ></div>
            <p className="text-gray-500">
              Every detail is designed to keep you in the game.
            </p>
          </div>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group" data-purpose="feature-card">
              <div
                data-purpose="feature-icon"
                className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-charcoal dark:text-brand-offwhite">
                Social Play
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Play free with friends, family, or anyone online.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group" data-purpose="feature-card">
              <div
                data-purpose="feature-icon"
                className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-charcoal dark:text-brand-offwhite">
                Seamless Flow
              </h3>
              <p className="text-gray-500 leading-relaxed">
                No lag, no delays. Our custom engine ensures that every card
                play is fluid and instantaneous.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group" data-purpose="feature-card">
              <div
                data-purpose="feature-icon"
                className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-charcoal dark:text-brand-offwhite">
                Premium Design
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Minimalist interface designed to keep your focus on the strategy
                and the cards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
