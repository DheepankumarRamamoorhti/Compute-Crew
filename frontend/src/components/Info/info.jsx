import React, { useState } from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import './info.css';

const InfoMessage = () => {
  const [articles, setArticles] = useState('');

  const handleClick = () => {
    setArticles('article 1, article 2, article 3');
  };

  return (
    <div className="card-container">
      <Card className="card">
        <CardContent>
          {/* 📰 Title with Icon aligned inline */}
          <div className="header-with-icon">
            <FontAwesomeIcon icon={faNewspaper} size="4x" style={{ marginRight: '16px', color: 'black' }} />
            <h1>Research Paper Summarizer</h1>
          </div>

          {/* <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleClick}
          >
            Click here to explore interesting articles
          </Button>

          {articles && (
            <Typography variant="body2" color="textSecondary" className="articles">
              {articles}
            </Typography>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoMessage;

