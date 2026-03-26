import React from 'react';
import DOMPurify from 'dompurify';

const MedicalStory = ({ content }) => {
  return (
    <div className="medical-story card">
      <h3>Medical Case Story</h3>
      <div className="story-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      <button className="btn-secondary mt-1">Read Full Story</button>
      <Link to="/admin">
          <button className="btn-nav"></button>
        </Link>
    </div>
  );
};

export default MedicalStory;
