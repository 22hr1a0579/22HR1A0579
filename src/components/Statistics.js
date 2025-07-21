// src/components/Statistics.js
import React, { useEffect, useState } from 'react';
import { getShortenedLinks } from '../utils/api';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const Statistics = () => {
  const [links, setLinks] = useState([]);
  const [clickStats, setClickStats] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getShortenedLinks();
      setLinks(data);
      const stats = JSON.parse(localStorage.getItem('clickStats') || '{}');
      setClickStats(stats);
    })();
  }, []);

  return (
    <>
      <Typography variant="h6">URL Statistics</Typography>
      <List>
        {links.map((link) => {
          const clicks = clickStats[link.shortUrl] || [];
          return (
            <ListItem key={link.id} alignItems="flex-start">
              <ListItemText
                primary={`Short URL: ${link.shortUrl}`}
                secondary={
                  <>
                    <div>Created: {new Date(link.createdAt).toLocaleString()}</div>
                    <div>Expires: {new Date(link.expiry).toLocaleString()}</div>
                    <div>Total Clicks: {clicks.length}</div>
                    <ul>
                      {clicks.map((click, i) => (
                        <li key={i}>
                          Time: {new Date(click.timestamp).toLocaleString()},
                          Source: {click.source},
                          Location: {click.location}
                        </li>
                      ))}
                    </ul>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Statistics;
