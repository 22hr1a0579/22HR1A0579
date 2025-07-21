// src/components/ShortenerForm.js

import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { createShortLink } from '../utils/api';
import { logAction, logError } from '../utils/logger';

const ShortenerForm = ({ onCreate }) => {
  const [urlInputs, setUrlInputs] = useState([
    { longUrl: '', validity: 30, shortcode: '' },
  ]);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidUrl = (url) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(url);

  const handleChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = field === 'validity' ? Number(value) : value;
    setUrlInputs(updated);
  };

  const addInput = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, { longUrl: '', validity: 30, shortcode: '' }]);
    }
  };

  const removeInput = (index) => {
    if (urlInputs.length === 1) return;
    const updated = [...urlInputs];
    updated.splice(index, 1);
    setUrlInputs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const validInputs = urlInputs.filter((input) => isValidUrl(input.longUrl));

    if (validInputs.length === 0) {
      setErrorMessage('Please enter at least one valid URL.');
      return;
    }

    try {
      const results = await Promise.all(
        validInputs.map((input) =>
          createShortLink(input.longUrl, input.validity, input.shortcode)
        )
      );

      results.forEach((link) =>
        logAction('Shortened URL Created', {
          longUrl: link.longUrl,
          shortUrl: link.shortUrl,
          expiry: link.expiry,
        })
      );

      onCreate(results);
      setUrlInputs([{ longUrl: '', validity: 30, shortcode: '' }]);
    } catch (err) {
      logError('Shortening Error', err.message);
      setErrorMessage(err.message || 'Something went wrong.');
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Shorten up to 5 URLs
      </Typography>
      {errorMessage && (
        <Typography color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urlInputs.map((input, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} md={10}>
                <TextField
                  label={`Long URL #${index + 1}`}
                  fullWidth
                  required
                  value={input.longUrl}
                  onChange={(e) =>
                    handleChange(index, 'longUrl', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <IconButton
                  onClick={() => removeInput(index)}
                  disabled={urlInputs.length === 1}
                  sx={{ mt: 1 }}
                >
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={6} md={5}>
                <TextField
                  label="Validity (minutes)"
                  type="number"
                  fullWidth
                  value={input.validity}
                  onChange={(e) =>
                    handleChange(index, 'validity', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6} md={5}>
                <TextField
                  label="Custom Shortcode"
                  fullWidth
                  value={input.shortcode}
                  onChange={(e) =>
                    handleChange(index, 'shortcode', e.target.value)
                  }
                />
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button
              onClick={addInput}
              disabled={urlInputs.length >= 5}
              startIcon={<Add />}
              sx={{ mb: 2 }}
            >
              Add Another URL
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Shorten All URLs
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ShortenerForm;
