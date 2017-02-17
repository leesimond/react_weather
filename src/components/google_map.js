import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

export default (props) => {
  return (
    <div>
      <GoogleMapLoader
        containerElement={ <div style={{height: '22em'}} /> }
        googleMapElement={
      <GoogleMap zoom={11} center={{lat: props.lat, lng: props.lon}} />
      }
      />
    </div>
  );
}
