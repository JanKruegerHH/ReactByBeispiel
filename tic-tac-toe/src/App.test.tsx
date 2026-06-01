import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the tic-tac-toe board', () => {
  render(<App />);
  expect(screen.getByText('Next player: X')).toBeInTheDocument();
  expect(screen.getByText('Restart')).toBeInTheDocument();
});