import React, { useState, useEffect } from 'react';
import { API_ENDPOINT, STATUS_READY, STATUS_ERROR, STATUS_TRANSCRIBING } from '../constants';
import { Medium } from '../types';
import Card from './Card';
import '../styles/CardList.css';

const CardList: React.FC = () => {
  const [media, setMedia] = useState<Medium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null); // Add status filter
  const [languageFilter, setLanguageFilter] = useState<string | null>(null); // Add language filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMedia(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMedia = media.filter((medium) => {
    if (statusFilter && medium.status !== statusFilter) {
      return false;
    }
    if (languageFilter && !medium.languages.includes(languageFilter)) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      {/* Filter Controls */}
      <div>
        <label htmlFor="status-select">Filter by Status:</label>
        <select id="status-select" value={statusFilter || ""} onChange={(e) => setStatusFilter(e.target.value || null)}>
          <option value="">All</option>
          <option value={STATUS_READY}>Ready</option>
          <option value={STATUS_TRANSCRIBING}>Transcribing</option>
          <option value={STATUS_ERROR}>Error</option>
        </select>

        <label htmlFor="language-select">Filter by Language:</label>
        <select id="language-select" value={languageFilter || ""} onChange={(e) => setLanguageFilter(e.target.value || null)}>
          <option value="">All</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>

      </div>

      <div className="card-list">
        {filteredMedia.map((medium) => (
          <Card key={medium.id} medium={medium} />
        ))}
      </div>
    </div>
  );
};

export default CardList;