import { createFileRoute } from '@tanstack/react-router'
import Error from '@/app/components/common/Error'

type ErrorSearchParams = {
  message?: string
}

export const Route = createFileRoute('/error')({
  validateSearch: (search: Record<string, unknown>): ErrorSearchParams => {
    return {
      message: (search.message as string) || undefined,
    }
  },
  component: Error,
})