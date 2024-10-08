import { faCircleExclamation, faLanguage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';
import React, { useMemo } from "react";
import { STATUS_ERROR, STATUS_READY, STATUS_TRANSCRIBING } from '../constants';
import { Medium } from "../types";
import ProgressBar from './ProgressBar';
import "../styles/Card.css";

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
              <button className="delete-button"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <span className="language-count">
              <span className="icon">
                <FontAwesomeIcon icon={faLanguage} />
              </span>
              <span className="text">{languages.length} Languages</span>
            </span>
          </div>
        );
      case STATUS_ERROR:
        return (<div className="card-content error">
          <div className="error-content">
            <FontAwesomeIcon icon={faCircleExclamation} className="error-content-icon" />
            <p className="error-content-text">
              &nbsp;&nbsp;An error occurred while processing your file. Delete file to try again, and report issue if the problem persists.
            </p>
          </div>
          <div className="buttons">
            <button className="delete-btn">Delete file</button>
            <button className="report-btn">Report issue</button>
          </div>
        </div>)
      case STATUS_TRANSCRIBING:
        return (
          <div className="card-content transcribing">
            <img src={cover} alt={name} className="cover-image" />
            <div className="overlay">
              <div className='transcribing-text'>Transcribing subtitles</div>
              <ProgressBar />
            </div>
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