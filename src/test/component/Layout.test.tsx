import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '@/app/Layout.tsx';

vi.mock('@tanstack/react-router', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe('Layout Component', () => {
  it('should render without crashing', () => {
    render(<Layout />);
    expect(document.body).toBeDefined();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});