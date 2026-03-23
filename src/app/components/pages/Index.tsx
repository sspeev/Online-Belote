import { useEffect, useRef } from 'react'
import AS from '@/assets/cardImages/AS.png'
import AH from '@/assets/cardImages/AH.png'
import AD from '@/assets/cardImages/AD.png'
import AC from '@/assets/cardImages/AC.png'
import GamePreview from '@/assets/common/ebavka.png'

const IndexPage = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const card = cardRef.current
      if (!card) return

      const scrolled = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate rotation and position based on scroll progress
      // Progress from 0 to 1 over the first viewport height
      const progress = Math.min(scrolled / windowHeight, 1)

      // Rotate 360 degrees as you scroll down
      const rotationY = progress * 360
      const rotationX = progress * 45

      // Move card down and across as we scroll
      const translateY = scrolled * 0.8
      const translateX = progress * 100

      // Scale down slightly as it moves into the feature section
      const scale = 1 - progress * 0.2

      card.style.transform = `
        translateY(${translateY}px) 
        translateX(${translateX}px) 
        rotateY(${rotationY}deg) 
        rotateX(${rotationX}deg) 
        scale(${scale})
      `

      // Fade out slightly when deep in the page to not overlap other content too much
      if (scrolled > windowHeight * 1.5) {
        card.style.opacity = Math.max(
          0,
          1 - (scrolled - windowHeight * 1.5) / 500,
        ).toString()
      } else {
        card.style.opacity = '1'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      {/* BEGIN: Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-offwhite/80 backdrop-blur-[10px] border-b border-gray-200">
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
            <button className="px-5 py-2 border border-brand-charcoal rounded-full hover:bg-brand-charcoal hover:text-white transition">
              Login
            </button>
          </div>
          <div className="md:hidden">
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </div>
        </div>
      </nav>
      {/* END: Navigation */}

      {/* BEGIN: Hero Section */}
      <header
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        data-purpose="hero-container"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="leading-[1.1] text-6xl md:text-8xl font-bold mb-6">
              Belote <br />
              <span className="text-brand-burnt">Redefined.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
              Invite friends, join lobbies and play with elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-brand-charcoal text-white rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20">
                Create
              </button>

              <button className="px-8 py-4 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all">
                Join
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center perspective-1000 overflow-visible py-20">
            {/* Floating 3D Card that follows scroll */}
            <div
              id="spinning-card"
              ref={cardRef}
              className="relative w-[140px] h-[200px] transform-3d transition-transform duration-100 ease-out"
            >
              {/* Ace of Spades */}
              <div className="absolute inset-0 transform -rotate-12 -translate-x-12 translate-y-4 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-10 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src={AS}
                  alt="Ace of Spades"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </div>
              {/* Ace of Hearts */}
              <div className="absolute inset-0 transform -rotate-6 -translate-x-4 translate-y-1 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-20 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src={AH}
                  alt="Ace of Hearts"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </div>
              {/* Ace of Diamonds */}
              <div className="absolute inset-0 transform rotate-6 translate-x-4 translate-y-1 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-30 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src={AD}
                  alt="Ace of Diamonds"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </div>
              {/* Ace of Clubs */}
              <div className="absolute inset-0 transform rotate-12 translate-x-12 translate-y-4 hover:-translate-y-2 hover:rotate-0 transition-transform duration-300 z-40  rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                <img
                  src={AC}
                  alt="Ace of Clubs"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </div>
            </div>
            {/* Background Elements */}
            <div className="absolute -z-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </header>
      {/* END: Hero Section */}
      {/* BEGIN: Features Section */}
      <section
        className="section-padding bg-white relative z-20"
        data-purpose="features-grid"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Crafted for Connoisseurs
            </h2>
            <div className="h-1 w-20 bg-brand-gold mx-auto mb-6"></div>
            <p className="text-gray-500">
              Every animation, every sound effect, and every interaction is
              designed to provide a premium social experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group" data-purpose="feature-card">
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Social Play</h3>
              <p className="text-gray-500 leading-relaxed">
                Free to play with friends and family.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group" data-purpose="feature-card">
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Flow</h3>
              <p className="text-gray-500 leading-relaxed">
                No lag, no delays. Our custom engine ensures that every card
                play is fluid and instantaneous.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group" data-purpose="feature-card">
              <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-burnt group-hover:text-white transition-colors duration-300">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Design</h3>
              <p className="text-gray-500 leading-relaxed">
                Minimalist interface designed to keep your focus on the strategy
                and the cards.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* END: Features Section */}
      {/* BEGIN: Premium Experience Section */}
      <section
        className="section-padding bg-brand-offwhite overflow-hidden"
        data-purpose="experience-highlight"
        id="experience"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
              The New Standard
            </span>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Premium Experience
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-brand-burnt rounded-full p-1 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span>Custom deck designs and high-fidelity textures.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-brand-burnt rounded-full p-1 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span>Private rooms with customizable rules and variants.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-brand-burnt rounded-full p-1 text-white">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span>Comprehensive statistics and global rankings.</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square bg-brand-softgray rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Placeholder for in-game preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-400">
                    GAME PREVIEW
                  </span>
                  <img
                    alt="Game Preview"
                    className="mt-4 rounded-xl shadow-inner max-w-[80%] mx-auto"
                    src={GamePreview}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Premium Experience Section */}

      {/* BEGIN: Footer */}
      <footer
        className="bg-brand-charcoal text-white pt-20 pb-10"
        data-purpose="main-footer"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center text-brand-charcoal font-bold">
                  B
                </div>
                <span className="font-semibold tracking-tight text-xl">
                  BELOTE.
                </span>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">
                Bringing the tradition of Belote into the digital era with a
                focus on quality, community, and design.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Leaderboards
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs">
              © 2026 Belote Redefined. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
              >
                <span className="sr-only">
                  Twitter
                </span>
                𝕏
              </a>
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
              >
                <span className="sr-only">
                  Discord
                </span>
                💬
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </>
  )
}

export default IndexPage
