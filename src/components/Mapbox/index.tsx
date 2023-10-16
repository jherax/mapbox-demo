import 'mapbox-gl/dist/mapbox-gl.css';

import {useState} from 'react';
import MapGL, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import styled from 'styled-components';

import config from '../../config/app.cfg';

const Wrapper = styled.section`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
`;

/** @see https://visgl.github.io/react-map-gl/docs/get-started */

type ViewPortState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export default function Mapbox() {
  const mapUri = `mapbox://styles/mapbox/streets-v11`;
  const [viewport, setViewport] = useState<ViewPortState>({
    longitude: -120.14637931639679,
    latitude: 39.155002149253676,
    zoom: 9,
  });

  return (
    <Wrapper id='Mapbox'>
      <MapGL
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={config.api.mapboxAccessToken}
        style={{width: '100%', height: '100%'}}
        mapStyle={mapUri}
        initialViewState={viewport}
        onMove={evt => setViewport(evt.viewState)}
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} />
        <NavigationControl />
        <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </Wrapper>
  );
}
