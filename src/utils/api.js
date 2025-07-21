// src/utils/api.js
let idCounter = 1;
let memoryStore = [];

export const createShortLink = async (longUrl, validity, shortcode) => {
  const code = shortcode || Math.random().toString(36).substring(2, 7);
  const shortUrl = `http://localhost:3000/${code}`;
  const expiry = new Date(Date.now() + (validity || 30) * 60000);

  if (memoryStore.some((entry) => entry.shortUrl === shortUrl)) {
    throw new Error('Shortcode already exists.');
  }

  const entry = {
    id: idCounter++,
    longUrl,
    shortUrl,
    createdAt: new Date().toISOString(),
    expiry: expiry.toISOString(),
    clicks: 0,
  };
  memoryStore.push(entry);
  return entry;
};

export const getShortenedLinks = async () => memoryStore;
