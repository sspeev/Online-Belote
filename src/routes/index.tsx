import { createFileRoute } from '@tanstack/react-router';
import Hero from '../app/components/lobby/Hero.tsx';

export const Route = createFileRoute('/')({
  component: Hero,
})