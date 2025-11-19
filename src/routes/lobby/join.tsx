import { createFileRoute } from '@tanstack/react-router'
import Join from '@/app/components/lobby/Join'

export const Route = createFileRoute('/lobby/join')({
  component: Join,
})
