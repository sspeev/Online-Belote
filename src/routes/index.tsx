import { createFileRoute } from '@tanstack/react-router'
import Index from '@/app/components/pages/indexPage/Index'

export const Route = createFileRoute('/')({
  component: Index,
})
