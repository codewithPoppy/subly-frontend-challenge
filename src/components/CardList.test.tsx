import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardList from './CardList';
import { API_ENDPOINT, STATUS_READY, STATUS_ERROR, STATUS_TRANSCRIBING } from '../constants';
import { Medium } from '../types';
import Card from './Card';


const mockData: Medium[] = [
    { id: '1', name: 'Video 1', status: STATUS_READY, languages: ['en', 'es'], createdAt: '1990-01-01', updatedAt:'1990-01-01', cover: '' },
    { id: '2', name: 'Video 2', status: STATUS_TRANSCRIBING, languages: ['fr'], createdAt: '1990-01-01', updatedAt:'1990-01-01', cover: '' },
    { id: '3', name: 'Video 3', status: STATUS_ERROR, languages: ['de'], createdAt: '1990-01-01', updatedAt:'1990-01-01', cover: '' },
  ];
  
  let mockFetch: jest.SpiedFunction<typeof fetch>;
  
  beforeEach(() => {
    mockFetch = jest.spyOn(global, 'fetch');
    mockFetch.mockResolvedValue(
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
          } as Response) // Type assertion to satisfy Response type
      );
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

test('renders loading state initially', () => {
    render(<CardList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders card list after fetching data', async () => {
    render(<CardList />);
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    mockData.forEach((medium) => {
        expect(screen.getByText(medium.name)).toBeInTheDocument();
    });
});

test('renders error message on fetch error', async () => {
    const errorMessage = 'Network error';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage)); // Use mockFetch

    render(<CardList />);
    await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
});

test('filters by status', async () => {
    render(<CardList />);
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    userEvent.selectOptions(screen.getByLabelText('Filter by Status:'), STATUS_READY);
    expect(screen.getByText('Video 1')).toBeVisible();
    expect(screen.queryByText('Video 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Video 3')).not.toBeInTheDocument();

    userEvent.selectOptions(screen.getByLabelText('Filter by Status:'), "");
    mockData.forEach((medium) => {
        expect(screen.getByText(medium.name)).toBeInTheDocument();
    });
});

test('filters by language', async () => {
    render(<CardList />);
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    userEvent.selectOptions(screen.getByLabelText('Filter by Language:'), 'fr');
    expect(screen.getByText('Video 2')).toBeVisible();
    expect(screen.queryByText('Video 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Video 3')).not.toBeInTheDocument();

    userEvent.selectOptions(screen.getByLabelText('Filter by Language:'), "");
    mockData.forEach((medium) => {
        expect(screen.getByText(medium.name)).toBeInTheDocument();
    });
});


test('filters by both status and language', async () => {
    render(<CardList />);
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    userEvent.selectOptions(screen.getByLabelText('Filter by Status:'), STATUS_READY);
    userEvent.selectOptions(screen.getByLabelText('Filter by Language:'), 'en');

    expect(screen.getByText('Video 1')).toBeVisible();
    expect(screen.queryByText('Video 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Video 3')).not.toBeInTheDocument();
});


jest.mock('./Card', () => ({ medium }: { medium: Medium }) => (
    <div data-testid={`card-${medium.id}`}>{medium.name}</div>
));