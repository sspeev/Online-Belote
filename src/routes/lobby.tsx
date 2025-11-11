import { createFileRoute } from '@tanstack/react-router';
import Waiting from '../app/components/lobby/Waiting.tsx';

export const Route = createFileRoute('/')({
  component: Waiting,
})