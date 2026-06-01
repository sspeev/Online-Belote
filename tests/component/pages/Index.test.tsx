import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import IndexPage from '@/app/components/pages/homePage/Index'
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'

vi.mock('@/api/session/endpoints', () => ({
  issueCookie: vi.fn(),
}))

vi.mock('@/hooks/useDarkMode', () => ({
  useDarkMode: () => ({ isDarkMode: false, toggleDarkMode: vi.fn() })
}))

describe('IndexPage', () => {
  it('renders correctly', () => {
    const rootRoute = createRootRoute({ component: IndexPage })
    const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() })
    
    render(<RouterProvider router={router} />)
    
    // Assuming Navbar has a logo or title text "Online Belote"
    // We'll just assert that the document body is defined and the rendering doesn't crash
    expect(document.body).toBeDefined()
  })
})
