// src/components/ShortenedLinks.js
import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const ShortenedLinks = ({ links }) => {
  const handleVisit = (link) => {
    const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');
    const clicks = stats[link.shortUrl] || [];
    clicks.push({
      timestamp: new Date().toISOString(),
      source: document.referrer || 'Direct',
      location: 'India (Mock)',
    });
    stats[link.shortUrl] = clicks;
    localStorage.setItem('clickStats', JSON.stringify(stats));
    window.location.href = link.longUrl;
  };

  return (
    <>
      <Typography variant="h6" mt={4}>Shortened URLs</Typography>
      <List>
        {links.map((link) => (
          <ListItem key={link.id}>
            <ListItemText
              primary={`${link.shortUrl}`}
              secondary={`Expires: ${new Date(link.expiry).toLocaleString()}`}
            />
            <Button onClick={() => handleVisit(link)}>Visit</Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ShortenedLinks;
