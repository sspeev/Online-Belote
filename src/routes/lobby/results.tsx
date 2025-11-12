import { createFileRoute } from '@tanstack/react-router';
import { Results } from '@/app/components/lobby/Results.tsx';

// URL will be, for example, /lobby/123/results
export const Route = createFileRoute('/lobby/results')({
    component: Results,
});