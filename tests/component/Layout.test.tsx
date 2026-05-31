import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Layout from '@/app/Layout.tsx';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'

vi.mock('@/api/session/endpoints', () => ({
  issueCookie: vi.fn(),
}))

describe('Layout Component', () => {
  it('should render without crashing', () => {
    const rootRoute = createRootRoute({ component: Layout })
    const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() })
    
    act(() => {
      render(<RouterProvider router={router} />);
    });
    expect(document.body).toBeDefined();
  });
});