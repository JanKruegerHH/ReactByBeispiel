import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board';

test('starts with X as the next player and an empty board', () => {
    render(<Board />);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');
    expect(squares).toHaveLength(9);
    squares.forEach((square) => expect(square).toHaveTextContent(''));
});

test('alternates between X and O on each click', () => {
    render(<Board />);
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');

    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();

    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
});

test('ignores clicks on an already-filled square', () => {
    render(<Board />);
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[0]);

    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
});

test('declares a winner when three in a row are matched', () => {
    render(<Board />);
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');

    // X: 0, 1, 2 (top row)  O: 3, 4
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('does not allow further moves after a win', () => {
    render(<Board />);
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    fireEvent.click(squares[5]); // should be ignored
    expect(squares[5]).toHaveTextContent('');
    expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('restart clears the board and resets to X', () => {
    render(<Board />);
    const squares = screen.getAllByRole('button').filter((b) => b.textContent !== 'Restart');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(screen.getByText('Restart'));

    squares.forEach((square) => expect(square).toHaveTextContent(''));
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
});
