
// types
import { Route } from '@/routes/error'
import { useNavigate } from '@tanstack/react-router'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'

const Error = () => {
  const { message } = Route.useSearch()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-offwhite dark:bg-background-dark p-6 transition-colors duration-200">
      <div className="w-full max-w-lg bg-white border border-brand-softgray shadow-[0_10px_30px_rgba(45,45,45,0.1)] rounded-3xl p-8 md:p-12 dark:bg-brand-charcoal/30 dark:border-slate-800 backdrop-blur-md relative overflow-hidden">
        {/* Subtle radial highlights */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 rounded-2xl bg-red-100/80 dark:bg-red-900/20 flex items-center justify-center mb-6 shadow-inner border border-red-200/50 dark:border-red-800/30">
            <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>

          <h1 className="text-3xl font-bold text-brand-charcoal dark:text-white tracking-tight mb-2">
            Oops!
          </h1>
          
          <p className="text-gray-500 dark:text-slate-400 text-base md:text-lg mb-8 max-w-sm">
            {message || 'An unexpected error occurred. Please try again.'}
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-4 bg-brand-charcoal text-white rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCcw className="w-5 h-5 animate-spin-slow" />
              <span>Retry</span>
            </button>
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex-1 px-6 py-4 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all flex items-center justify-center gap-2 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-charcoal cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
