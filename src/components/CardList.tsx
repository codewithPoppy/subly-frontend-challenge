import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants';
import { Medium } from '../types';
import Card from './Card';
import './CardList.css';

const CardList: React.FC = () => {
  const [media, setMedia] = useState<Medium[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="card-list">
      {media.map((medium) => (
        <Card key={medium.id} medium={medium} />
      ))}
    </div>
  );
};

export default CardList;