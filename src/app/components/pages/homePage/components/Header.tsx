import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from '@tanstack/react-router'

gsap.registerPlugin(ScrollTrigger)

const CardFace = ({ suit }: { suit: string }) => (
  <div className="w-full h-full bg-linear-to-br from-brand-burnt to-brand-gold relative shadow-inner p-2.5 md:p-3.5 flex flex-col justify-between border border-white/20">
    <div className="flex flex-col items-center self-start leading-none gap-0.5 md:gap-1 text-brand-offwhite drop-shadow-sm">
      <span className="text-[1.1rem] md:text-2xl lg:text-3xl font-bold font-sans">
        A
      </span>
      <span className="text-sm md:text-lg lg:text-xl">{suit}</span>
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-brand-offwhite">
      <span className="text-6xl md:text-8xl lg:text-9xl">{suit}</span>
    </div>
    <div className="flex flex-col items-center self-end leading-none gap-0.5 md:gap-1 rotate-180 text-brand-offwhite drop-shadow-sm">
      <span className="text-[1.1rem] md:text-2xl lg:text-3xl font-bold font-sans">
        A
      </span>
      <span className="text-sm md:text-lg lg:text-xl">{suit}</span>
    </div>
  </div>
)

const Header = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2, // Small delay so it's not starting before render completes
      })
      // Parallax effect (y-axis moves indefinitely down as long as you scroll)
      gsap.to(cardRef.current, {
        y: () =>
          (document.documentElement.scrollHeight - window.innerHeight) * 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // Animation mapping to the first 100vh of scrolling (scale, rotation, x-axis offset)
      gsap.to(cardRef.current, {
        x: 100,
        rotationY: 360,
        rotationX: 45,
        scale: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // Opacity fades out once we scroll past 1.5 viewport heights
      gsap.to(cardRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => `${window.innerHeight * 1.5} top`,
          end: () => `${window.innerHeight * 1.5 + 500} top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: textContainerRef },
  )

  return (
    <>
      {/* BEGIN: Hero Section */}
      <header
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100"
        data-purpose="hero-container"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div className="z-10" ref={textContainerRef}>
            <h1 className="leading-[1.1] text-6xl md:text-8xl font-bold mb-6 hero-anim">
              Belote <br />
              <span className="text-brand-burnt">Redefined.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed hero-anim">
              Invite friends, join lobbies and play with elegance.
            </p>
            <div className="flex flex-wrap gap-4 hero-anim">
              <Link
                to="/create"
                className="inline-block text-center px-8 py-4 bg-brand-charcoal text-brand-offwhite rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20"
              >
                Create
              </Link>

              <Link
                to="/join"
                className="inline-block text-center px-8 py-4 bg-transparent border-2 border-brand-charcoal dark:border-brand-offwhite dark:text-brand-offwhite text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-brand-offwhite dark:hover:bg-brand-offwhite dark:hover:text-brand-charcoal transition-all"
              >
                Join
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center perspective-1000 overflow-visible py-20">
            {/* Floating 3D Card that follows scroll */}
            <div
              id="spinning-card"
              ref={cardRef}
              className="relative w-[140px] h-[200px] md:w-[200px] md:h-[290px] lg:w-[240px] lg:h-[340px] transform-3d transition-transform duration-100 ease-out"
            >
              {/* Ace of Spades */}
              <div className="absolute inset-0 transform -rotate-12 -translate-x-12 translate-y-4 md:-translate-x-20 md:translate-y-6 lg:-translate-x-24 lg:translate-y-8 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-10 rounded-xl overflow-hidden shadow-2xl bg-brand-offwhite border border-brand-softgray">
                <CardFace suit="♠" />
              </div>
              {/* Ace of Hearts */}
              <div className="absolute inset-0 transform -rotate-6 -translate-x-4 translate-y-1 md:-translate-x-6 md:translate-y-2 lg:-translate-x-8 lg:translate-y-3 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-20 rounded-xl overflow-hidden shadow-2xl bg-brand-offwhite border border-brand-softgray">
                <CardFace suit="♥" />
              </div>
              {/* Ace of Diamonds */}
              <div className="absolute inset-0 transform rotate-6 translate-x-4 translate-y-1 md:translate-x-6 md:translate-y-2 lg:translate-x-8 lg:translate-y-3 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-30 rounded-xl overflow-hidden shadow-2xl bg-brand-offwhite border border-brand-softgray">
                <CardFace suit="♦" />
              </div>
              {/* Ace of Clubs */}
              <div className="absolute inset-0 transform rotate-12 translate-x-12 translate-y-4 md:translate-x-20 md:translate-y-6 lg:translate-x-24 lg:translate-y-8 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-40 rounded-xl overflow-hidden shadow-2xl bg-brand-offwhite border border-brand-softgray">
                <CardFace suit="♣" />
              </div>
            </div>
            {/* Background Elements */}
            <div className="absolute -z-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </header>
      {/* END: Hero Section */}
    </>
  )
}

export default Header
