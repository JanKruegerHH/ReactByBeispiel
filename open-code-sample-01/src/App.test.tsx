import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
});

test('renders stock checkbox', () => {
  render(<App />);
  expect(screen.getByLabelText(/only show products in stock/i)).toBeInTheDocument();
});

test('renders category headings', () => {
  render(<App />);
  expect(screen.getByText('Fruits')).toBeInTheDocument();
  expect(screen.getByText('Vegetables')).toBeInTheDocument();
});

test('renders all product names', () => {
  render(<App />);
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Dragonfruit')).toBeInTheDocument();
  expect(screen.getByText('Passionfruit')).toBeInTheDocument();
  expect(screen.getByText('Spinach')).toBeInTheDocument();
  expect(screen.getByText('Pumpkin')).toBeInTheDocument();
  expect(screen.getByText('Peas')).toBeInTheDocument();
});
