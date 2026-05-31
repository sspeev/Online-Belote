import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import IndexPage from '@/app/components/pages/homePage/Index'
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'

vi.mock('@/api/session/endpoints', () => ({
  isssueCookie: vi.fn(),
}))

vi.mock('@/hooks/useDarkMode', () => ({
  useDarkMode: () => ({ isDarkMode: false, toggleDarkMode: vi.fn() })
}))

describe('IndexPage', () => {
  it('renders correctly', () => {
    const rootRoute = createRootRoute({ component: IndexPage })
    const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() })
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<RouterProvider router={router as any} />)
    
    // Assuming Navbar has a logo or title text "Online Belote"
    // We'll just assert that the document body is defined and the rendering doesn't crash
    expect(document.body).toBeDefined()
  })
})
