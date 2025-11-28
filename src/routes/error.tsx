import { createFileRoute } from '@tanstack/react-router'
import Error from '@/app/components/common/Error.tsx'

export const Route = createFileRoute('/error')({
  component: Error,
})
