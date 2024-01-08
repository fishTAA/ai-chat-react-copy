import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// This is a test to check if the "learn react" link is rendered in the App component.
test('renders learn react link', () => { 
  render(<App />);
  
   // Get the link element with text "learn react"
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
