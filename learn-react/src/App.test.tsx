import {render, screen} from '@testing-library/react';
import App from './App';

test('renders the navigation links', () => {
    render(<App/>);
    expect(screen.getByRole('link', {name: /home/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /posts/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /about/i})).toBeInTheDocument();
});