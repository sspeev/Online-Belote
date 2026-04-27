import { Link } from '@tanstack/react-router'
import { Instagram, Github } from 'lucide-react'

const Footer = () => {
  return (
    <>
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
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">
                Navigate
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <Link className="hover:text-white transition" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" to="/create">
                    Create Lobby
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" to="/join">
                    Join Lobby
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">
                Company
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a className="hover:text-white transition" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Support
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs">
              © 2026 Belote Redefined. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                className="text-gray-500 hover:text-white transition" 
                href="https://www.instagram.com/_stoyan.peev.520_/?" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a 
                className="text-gray-500 hover:text-white transition" 
                href="https://github.com/sspeev" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Github className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer