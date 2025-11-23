import { createFileRoute } from '@tanstack/react-router';
import Create from '@/app/components/common/Create';

export const Route = createFileRoute('/create')({
    component: Create,
});