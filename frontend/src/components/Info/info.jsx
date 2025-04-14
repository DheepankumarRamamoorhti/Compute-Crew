// import React from "react";
// import "./info.css";

// const InfoMessage = () => {
//   return (
//     <div >
//       <h2 className="info-container">Info</h2>
//     </div>
//   );
// };

// export default InfoMessage;
import React, { useState } from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';
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
          {/* <Typography variant="h5" component="div">
            Welcome!
          </Typography> */}
          <Button
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoMessage;