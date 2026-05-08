import { createFileRoute } from '@tanstack/react-router'
import Index from '@/app/components/pages/homePage/Index'

export const Route = createFileRoute('/')({
  component: Index,
})
