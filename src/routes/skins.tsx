import { createFileRoute } from '@tanstack/react-router'
import Skins from '@/app/components/pages/skinsPage/Skins'

export const Route = createFileRoute('/skins')({
  component: Skins,
})
