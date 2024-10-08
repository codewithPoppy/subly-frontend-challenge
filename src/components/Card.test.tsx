import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { Medium } from '../types';
import { STATUS_READY, STATUS_ERROR, STATUS_TRANSCRIBING } from '../constants'
import { formatDistanceToNow } from 'date-fns';

// Mock formatDistanceToNow to avoid changing test results over time
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'), // Import everything else from date-fns
  formatDistanceToNow: () => 'about 10 minutes ago', // Mock the specific function
}));

describe('Card Component', () => {
  const baseMedium: Medium = {
    name: "Test Medium",
    cover: "testcover.jpg",
    languages: ['en', 'es'],
    id: '1',
    createdAt: "2024-08-02T12:00:00Z",
    updatedAt: "2024-08-02T12:00:00Z",
    status: ''
  };


  it('renders Card component with ready status', () => {
    const testMedium = { ...baseMedium, status: STATUS_READY };
    render(<Card medium={testMedium} />);

    expect(screen.getByText(/test medium/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test medium/i })).toBeInTheDocument();
    expect(screen.getByText(/2 Languages/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Updated: about 10 minutes ago/i)).toBeInTheDocument(); // Uses mocked value
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('renders Card component with error status', () => {
    const testMedium = { ...baseMedium, status: STATUS_ERROR, errorMessage: "Test Error Message" };
    render(<Card medium={testMedium} />);

    expect(screen.getByRole('heading', { name: /test medium/i })).toBeInTheDocument();
    expect(screen.getByText("Error in processing")).toBeInTheDocument();

  });

  it('renders Card component with transcribing status', () => {
    const testMedium = { ...baseMedium, status: STATUS_TRANSCRIBING };
    render(<Card medium={testMedium} />);

    expect(screen.getByRole('heading', { name: /test medium/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test medium/i })).toBeInTheDocument();
    expect(screen.getByText(/Transcribing.../i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Check for loading bar (progressbar role)
  });

});