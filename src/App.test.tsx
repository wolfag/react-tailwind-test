import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { TODO_KEY } from './App';

test('given saved todos when app is loaded then show those', () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(['hello', 'youtube']));
  render(<App />);
  const linkElement = screen.getByText('hello');
  expect(linkElement).toBeInTheDocument();
});

test('given saved todos when adding another todo then show saved and new todo', () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(['hello']));
  render(<App />);

  const inputElement = screen.getByTestId('todo-input');
  const buttonElement = screen.getByText('Add');

  fireEvent.change(inputElement, { target: { value: 'youtube' } });
  fireEvent.click(buttonElement);

  const linkElement = screen.getByText('youtube');
  expect(linkElement).toBeInTheDocument();
});

test('given saved todos when deleting specific todo then remaining todo', () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(['hello', 'youtube']));
  render(<App />);

  const deleteIcon = screen.getByTestId('delete-youtube');

  const linkElement = screen.getByText('youtube');
  fireEvent.click(deleteIcon);

  expect(linkElement).not.toBeInTheDocument();
});
