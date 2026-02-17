const express = require('express');
const axios = require('axios');
const router = express.Router();

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;

// @route   GET /api/doctors
// @desc    Search for doctors using Google Places API
router.get('/', async (req, res) => {
  try {
    const { lat, lng, specialty, radius = 15000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    const query = specialty ? `${specialty} clinic` : 'medical clinic';

    console.log(`Searching for: ${query} at ${lat},${lng} with radius ${radius}`);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: query,
          location: `${lat},${lng}`,
          radius: radius,
          key: GOOGLE_MAPS_KEY
        }
      }
    );

    console.log(`Google API Response Status: ${response.data.status}`);
    if (response.data.error_message) {
      console.error(`Google API error_message: ${response.data.error_message}`);
    }

    const doctors = response.data.results.slice(0, 10).map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      open_now: place.opening_hours ? place.opening_hours.open_now : null,
      location: place.geometry.location,
      types: place.types,
      maps_link: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`
    }));

    res.json({
      doctors,
      count: doctors.length
    });
  } catch (error) {
    console.error('Google Places API error:', error.message);
    res.status(500).json({ message: 'Error fetching doctors from Google Maps', error: error.message });
  }
});

// @route   GET /api/doctors/hospitals
// @desc    Search for hospitals nearby
router.get('/hospitals', async (req, res) => {
  try {
    const { lat, lng, radius = 15000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: 'hospital',
          location: `${lat},${lng}`,
          radius: radius,
          key: GOOGLE_MAPS_KEY
        }
      }
    );

    const hospitals = response.data.results.slice(0, 10).map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      open_now: place.opening_hours ? place.opening_hours.open_now : null,
      location: place.geometry.location,
      maps_link: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`
    }));

    res.json({
      hospitals,
      count: hospitals.length
    });
  } catch (error) {
    console.error('Google Places API error:', error.message);
    res.status(500).json({ message: 'Error fetching hospitals from Google Maps' });
  }
});

module.exports = router;
