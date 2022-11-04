import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import './GoogleMap.css'
const GMap = ({ location, zoomLevel }) => (
  <div className="google-map">
   {
    //    console.log(location) &&
         <GoogleMapReact
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAP_KEY}` }}
      center={location}
      defaultZoom={zoomLevel}
    >
      <LocationPin
        lat={location.lng}
        lng={location.lat}
        text={location.address}
      />
    </GoogleMapReact>
    }
  </div>
)

export default GMap