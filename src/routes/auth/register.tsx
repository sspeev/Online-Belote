import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '@/app/components/auth/RegisterForm'

export const Route = createFileRoute('/auth/register')({
    component: RegisterForm
})
