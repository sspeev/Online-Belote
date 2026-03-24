import { useDarkMode } from '@/hooks/useDarkMode'

import sunLight from '@/assets/svgs/SunLight.svg'
import moonDark from '@/assets/svgs/Moon.svg'

const Navbar = () => {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <>
      {/* BEGIN: Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-offwhite/80 dark:bg-[#221610cc] dark:border-white/10 dark:text-slate-100 backdrop-blur-[10px] border-b border-gray-200 transition-all">
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
              {isDark ? <img src={sunLight} alt="sun-light" className="size-5" /> : <img src={moonDark} alt="moon-dark" className="size-5" />}
            </button>
            <button className="px-5 py-2 border border-brand-charcoal dark:border-slate-100 rounded-full hover:bg-brand-charcoal hover:text-white dark:hover:bg-white dark:hover:text-[#221610] transition-colors cursor-pointer">
              Login
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <img src={sunLight} alt="sun-light" className="size-5" /> : <img src={moonDark} alt="moon-dark" className="size-5" />}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </div>
        </div>
      </nav>
      {/* END: Navigation */}
    </>
  )
}

export default Navbar
