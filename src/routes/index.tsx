import { createFileRoute } from '@tanstack/react-router';
import Index from '@/app/components/common/Index.tsx';

export const Route = createFileRoute('/')({
  component: Index,
})