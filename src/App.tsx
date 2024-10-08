import React from 'react';
import CardList from './components/CardList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Subly Media Library</h1>
      <CardList />
    </div>
  );
};

export default App;