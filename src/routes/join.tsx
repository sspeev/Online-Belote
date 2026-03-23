import { createFileRoute } from '@tanstack/react-router'
import Join from '@/app/components/pages/Join'

export const Route = createFileRoute('/join')({
  component: Join,
})
