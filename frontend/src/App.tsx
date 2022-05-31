import React, { useState } from 'react';
import Header from './components/header/Header';
import GoogleMap from "./components/map/GoogleMap";

function App() {
  const [mapCenter, setMapCenter] = useState({ lat: 31.0461, lng: 34.8516 });  // intial location for center;
  const [zoom, setZoom] = useState(7);

  return (
    <div>
      <Header setMapCenter={setMapCenter} setZoom={setZoom} />
      <GoogleMap center={mapCenter} zoom={zoom} />
    </div>
  );
}

export default App;
