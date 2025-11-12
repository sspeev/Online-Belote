import { createFileRoute } from '@tanstack/react-router';
import Create from '../../app/components/lobby/Create';

export const Route = createFileRoute('/lobby/create')({
    component: Create,
});