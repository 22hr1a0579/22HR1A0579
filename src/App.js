// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import ShortenerForm from './components/ShortenerForm';
import ShortenedLinks from './components/ShortenedLinks';
import Statistics from './components/Statistics';
import Redirector from './Redirector';

const App = () => {
  const [links, setLinks] = useState([]);
  const [showStats, setShowStats] = useState(false);

 const handleCreate = (newLinks) => {
  // Accept single or multiple
  setLinks(prev => [...prev, ...(Array.isArray(newLinks) ? newLinks : [newLinks])]);
};


  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
          <Button color="inherit" onClick={() => setShowStats(!showStats)}>
            {showStats ? 'Shortener' : 'Statistics'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              {showStats ? <Statistics /> : (
                <>
                  <ShortenerForm onCreate={handleCreate} />
                  <ShortenedLinks links={links} />
                </>
              )}
            </>
          } />
          <Route path="/:code" element={<Redirector />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
