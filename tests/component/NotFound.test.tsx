import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotFound from '@/app/components/common/NotFound'

// 1. Mock the router hook so we can spy on it during the test without needing a real RouterProvider
const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

describe('NotFound Component Integration Test', () => {
  const originalBack = window.history.back

  beforeEach(() => {
    // 2. Mock window.history.back since jsdom doesn't fully support navigation
    window.history.back = vi.fn()
  })

  afterEach(() => {
    // 3. Restore original functions and clear mocks to not bleed into other tests
    window.history.back = originalBack
    vi.clearAllMocks()
  })

  it('renders the 404 text and message correctly', () => {
    render(<NotFound />) // Mount the component in the virtual DOM
    
    // Query the virtual DOM just like a user would look for text
    expect(screen.getByText('404')).toBeDefined()
    expect(
      screen.getByText(/Oops! The page you're looking for doesn't exist/i)
    ).toBeDefined()
  })

  it('calls navigate to home when Home button is clicked', () => {
    render(<NotFound />)
    
    // Find the button by its accessible role and name
    const homeBtn = screen.getByRole('button', { name: /Home/i })
    
    // Simulate user click
    fireEvent.click(homeBtn)
    
    // Verify the component reacted correctly by calling the routing hook
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
  })

  it('calls window.history.back when Go Back button is clicked', () => {
    render(<NotFound />)
    
    const backBtn = screen.getByRole('button', { name: /Go Back/i })
    fireEvent.click(backBtn)
    
    expect(window.history.back).toHaveBeenCalled()
  })
})
