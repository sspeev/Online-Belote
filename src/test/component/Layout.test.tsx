import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Layout from '@/app/Layout.tsx';

describe('Layout Component', () => {
  it('should render without crashing', () => {
    render(<Layout />);
    expect(document.body).toBeDefined();
  });
});