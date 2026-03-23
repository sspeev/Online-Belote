const Features = () => {
  return (
    <>
      {/* BEGIN: Features Section */}
      <section
        className="section-padding bg-brand-softgray relative z-20 pt-10 pb-10"
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
    </>
  )
}

export default Features