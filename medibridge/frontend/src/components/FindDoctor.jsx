import { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { FiSearch, FiMapPin, FiPhone, FiStar, FiNavigation, FiActivity, FiX, FiExternalLink, FiClock } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import './FindDoctor.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.25rem',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

const FindDoctor = () => {
  const [searchParams] = useSearchParams();
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [searchType, setSearchType] = useState('doctor');
  const sectionRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const lat = parseFloat(searchParams.get('lat'));
    const lng = parseFloat(searchParams.get('lng'));

    if (lat && lng) {
      const pos = { lat, lng };
      setUserLocation(pos);
      setMapCenter(pos);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          setMapCenter(pos);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Set to default New York if permission denied
          setUserLocation(defaultCenter);
          setMapCenter(defaultCenter);
        },
        { timeout: 10000 }
      );
    } else {
      setUserLocation(defaultCenter);
      setMapCenter(defaultCenter);
    }
  }, [searchParams]);

  useEffect(() => {
    if (specialty && userLocation && isLoaded) {
      performSearch('doctor');
    }
  }, [specialty, userLocation, isLoaded]);

  const performSearch = async (type) => {
    if (!userLocation) {
      console.warn('No user location available for search');
      return;
    }

    setLoading(true);
    setSearchType(type);

    try {
      const endpoint = type === 'hospital' ? '/hospitals' : '';
      const response = await fetch(`/api/doctors${endpoint}?lat=${userLocation.lat}&lng=${userLocation.lng}&specialty=${encodeURIComponent(specialty)}`);

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setDoctors(type === 'hospital' ? data.hospitals : data.doctors);

      if (data.doctors?.[0]?.location || data.hospitals?.[0]?.location) {
        setMapCenter(data.doctors?.[0]?.location || data.hospitals?.[0]?.location);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadError) return <div className="error-screen">Error loading Google Maps. Please check your API key.</div>;
  if (!isLoaded) return <div className="loading-screen"><div className="spinner"></div><p>Initialising Maps...</p></div>;

  return (
    <section className="find-doctor section" ref={sectionRef}>
      <div className="container">
        <div className="search-header glass-card animate-on-scroll">
          <h2>Find <span className="text-gradient">Medical Care</span></h2>
          <p className="search-sub">Expert assistance is just a click away. Select a category to begin.</p>
          <div className="search-controls">
            <div className="input-with-icon">
              <FiSearch />
              <input
                id="specialty-search-input"
                type="text"
                placeholder="Specialty (e.g. Cardiologist, Dentist, General Surgeon)"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
            <div className="search-buttons">
              <button
                id="find-doctors-btn"
                className={`btn ${searchType === 'doctor' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => performSearch('doctor')}
                disabled={loading}
              >
                {loading && searchType === 'doctor' ? <span className="spinner-small"></span> : <><FiActivity /> Find Doctors</>}
              </button>
              <button
                id="find-hospitals-btn"
                className={`btn ${searchType === 'hospital' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => performSearch('hospital')}
                disabled={loading}
              >
                {loading && searchType === 'hospital' ? <span className="spinner-small"></span> : <><FiMapPin /> Nearby Hospitals</>}
              </button>
            </div>
          </div>
        </div>

        <div className="results-layout">
          <div className="list-side">
            {doctors.length > 0 ? (
              doctors.map((item, idx) => (
                <div key={item.id || idx} className="place-card glass-card" onClick={() => {
                  setSelectedPlace(item);
                  setMapCenter(item.location);
                }}>
                  <div className="place-header">
                    <h4>{item.name}</h4>
                    <div className="rating">
                      <FiStar /> {item.rating || 'N/A'} <span>({item.user_ratings_total || 0})</span>
                    </div>
                  </div>
                  <p className="address"><FiMapPin /> {item.address}</p>

                  <div className="place-info-tags">
                    <span className={`status-tag ${item.open_now ? 'open' : 'closed'}`}>
                      <FiClock /> {item.open_now ? 'Open Now' : 'Closed'}
                    </span>
                    {item.types?.includes('health') && <span className="type-tag">Verified Health Provider</span>}
                  </div>

                  <div className="place-footer">
                    <button className="contact-btn">
                      <FiPhone /> Contact
                    </button>
                    <a href={item.maps_link} target="_blank" rel="noreferrer" className="directions-link">
                      <FiExternalLink /> Directions
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="place-no-results glass-card">
                <div className="no-res-icon"><FiActivity /></div>
                <h3>No Results Found</h3>
                <p>Try searching for a different specialty or allow location access to see nearby clinics.</p>
              </div>
            )}
          </div>

          <div className="map-side glass-card">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
              options={{
                styles: [
                  { "elementType": "geometry", "stylers": [{ "color": "#121212" }] },
                  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#121212" }] },
                  { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
                  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#2c2c2c" }] }
                ]
              }}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }}
                  title="Your Location"
                />
              )}
              {doctors.map(item => (
                <Marker
                  key={item.id}
                  position={item.location}
                  onClick={() => setSelectedPlace(item)}
                />
              ))}
              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.location}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="info-window-content">
                    <h5>{selectedPlace.name}</h5>
                    <p>{selectedPlace.address}</p>
                    <div className="info-window-footer">
                      <a href={selectedPlace.maps_link} target="_blank" rel="noreferrer">
                        Directions <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
