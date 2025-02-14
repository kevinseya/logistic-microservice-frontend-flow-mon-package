import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: -0.180653,  
  lng: -78.467834
};

// Zoom por defecto
const defaultZoom = 12;

const LocationPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  // Cargamos la librería de Google Maps con la API Key
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyATOtx1lxiwLzbbZWaeI21ZcqzZ6CvxT7I" //process.env.REACT_APP_MAPS_API_KEY  // o tu key "hardcodeada"
  });

  // Esta función se ejecuta cuando el usuario hace clic en el mapa
  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    // Notificamos al padre la coordenada seleccionada
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={defaultZoom}
          onClick={handleMapClick}
        >
          {/* Si hay un markerPosition, dibujamos un Marker */}
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </>
  );
};

export default React.memo(LocationPicker);
