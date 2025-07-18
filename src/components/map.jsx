// MapPage.jsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import pregnancyImg from '../assets/pregnancy.png';
import { motion } from 'framer-motion';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = {
  lat: 0.0,
  lng: 0.0,
};

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [directionsPlace, setDirectionsPlace] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(coords);
          setIsLocationLoaded(true);
          setMarkers([{
            position: coords,
            title: 'Your Location',
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }]);
          map && map.panTo(coords);
        },
        () => alert('Location access denied.')
      );
    } else {
      alert('Geolocation not supported.');
    }
  };

  const showNearbyPlaces = (type) => {
    const endpoint = `http://localhost:3100/api/v1/maps/nearby?type=${type}&lat=${currentPosition.lat}&lng=${currentPosition.lng}`;
    axios.get(endpoint)
      .then((response) => {
        const data = response.data;
        const places = data.places || [];
        setSelectedPlaces(places);
        const newMarkers = places.map(place => ({
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
          place,
        }));
        setMarkers(prev => [
          ...prev.filter(m => m.title === 'Your Location'),
          ...newMarkers
        ]);
      })
      .catch(() => alert('Failed to fetch nearby places'));
  };

  const launchGoogleMaps = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPosition.lat},${currentPosition.lng}&destination=${place.lat},${place.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-4 text-white bg-black bg-opacity-50"
      >
        <h1 className="text-3xl font-bold">Location Of PregMama</h1>
      </motion.div>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={isLocationLoaded ? 14 : 5}
          onLoad={setMap}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              title={marker.title}
              icon={marker.icon || undefined}
              onClick={() => marker.place && setDirectionsPlace(marker.place)}
            />
          ))}
          {directionsPlace && (
            <Polyline
              path={[currentPosition, { lat: directionsPlace.lat, lng: directionsPlace.lng }]}
              options={{
                strokeColor: '#00bcd4',
                strokeOpacity: 0.8,
                strokeWeight: 5,
                geodesic: true,
                icons: [{ icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW }, offset: '100%' }]
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {directionsPlace && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl w-11/12 max-w-md"
        >
          <h2 className="text-lg font-semibold mb-2">{directionsPlace.name}</h2>
          <p className="text-sm mb-2">{directionsPlace.address}</p>
          <div className="flex justify-between">
            <button
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setDirectionsPlace(null)}
            >
              Close
            </button>
            <button
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
              onClick={() => launchGoogleMaps(directionsPlace)}
            >
              Open in Google Maps
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={() => showNearbyPlaces('antenatal clinics')}
          className="bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Find Antenatal Clinics
        </motion.button>

        <motion.button
          onClick={() => showNearbyPlaces('hospitals')}
          className="bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Find Hospitals
        </motion.button>

        <motion.button
          onClick={getUserLocation}
          className="bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Recenter Map
        </motion.button>
      </motion.div>
    </div>
  );
}
