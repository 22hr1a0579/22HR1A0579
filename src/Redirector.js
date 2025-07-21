// src/Redirector.js
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getShortenedLinks } from './utils/api';

const Redirector = () => {
  const { code } = useParams();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const links = await getShortenedLinks();
      const match = links.find(l => l.shortUrl.endsWith(`/${code}`));
      if (match) setUrl(match.longUrl);
    })();
  }, [code]);

  if (url) return <Navigate to={url} />;
  return <p>Redirecting...</p>;
};

export default Redirector;
