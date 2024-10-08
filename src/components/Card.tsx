import React, { useMemo } from "react";
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Medium } from "../types";
import { STATUS_READY, STATUS_ERROR, STATUS_TRANSCRIBING } from '../constants'
import "./Card.css";

interface CardProps {
  medium: Medium;
}

const Card: React.FC<CardProps> = ({ medium }) => {
  const { name, cover, status, languages, updatedAt } = medium;

  const lastUpdated = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });

  const statusMessage = useMemo(() => {
    switch (status) {
      case STATUS_READY:
        return `Last Updated: ${lastUpdated}`;
      case STATUS_ERROR:
        return 'Error in processing';
      case STATUS_TRANSCRIBING:
        return 'Transcribing';
      default:
        return null;
    }
  }, [status, lastUpdated])

  const renderContent = () => {
    switch (status) {
      case STATUS_READY:
        return (
          <div className="card-content ready">
            <img src={cover} alt={name} className="cover-image" />
            <div className="overlay">
              <button className="edit-button">Edit</button>
              <span className="language-count">{languages.length} Languages</span>
            </div>
          </div>
        );
      case STATUS_ERROR:
        return (<div className="card-content error">
          <p><FontAwesomeIcon icon={faCircleExclamation} className="icon" />An error occurred while processing your file. Delete file to try again, and report issue if the problem persists.</p>
          <div className="buttons">
            <button className="delete-btn">Delete file</button>
            <button className="report-btn">Report issue</button>
          </div>
        </div>)
      case STATUS_TRANSCRIBING:
        return (
          <div className="card-content transcribing">
            <img src={cover} alt={name} className="cover-image" />
            <div className="loading-bar"></div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="card" key={medium.id}>
      <>{renderContent()}</>
      <div className="card-footer">
        <h2 className="card-title">{name}</h2>
        <p className="last-edited">{statusMessage}</p>
      </div>
    </div>
  );
};

export default Card;