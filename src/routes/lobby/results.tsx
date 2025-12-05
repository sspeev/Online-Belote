import { createFileRoute } from '@tanstack/react-router';
import Results from '@/app/components/lobby-temp/Results';

// URL will be, for example, /lobby-temp/123/results
export const Route = createFileRoute('/lobby/results')({
    component: Results,
});