import { createFileRoute } from '@tanstack/react-router'
import Create from '@/app/components/pages/createPage/Create'

export const Route = createFileRoute('/create')({
  component: Create,
})
