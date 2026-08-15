import { createFileRoute } from '@tanstack/react-router'
import Profile from '@/app/components/pages/profilePage/Profile'

export const Route = createFileRoute('/profile')({
  component: Profile,
})
