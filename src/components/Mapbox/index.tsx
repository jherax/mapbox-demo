import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-style-switcher/styles.css';

import {useRef, useState} from 'react';
import MapGL, {
  FullscreenControl,
  GeolocateControl,
  type MapRef,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import styled from 'styled-components';

import config from '../../config/app.cfg';
import StyleSwitcherControl from '../StyleSwitcherControl';

const Wrapper = styled.section`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
`;

type ViewPortState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

/** @see https://visgl.github.io/react-map-gl/docs/get-started */

export default function Mapbox() {
  const mapUri = `mapbox://styles/mapbox/streets-v11`;
  const [viewport, setViewport] = useState<ViewPortState>({
    longitude: -120.14637931639679,
    latitude: 39.155002149253676,
    zoom: 9,
  });

  const mapRef = useRef<MapRef>(null);
  return (
    <Wrapper id='Mapbox'>
      <MapGL
        ref={mapRef}
        mapLib={import('mapbox-gl')}
        mapboxAccessToken={config.api.mapboxAccessToken}
        style={{width: '100%', height: '100%'}}
        mapStyle={mapUri}
        initialViewState={viewport}
        onMove={evt => setViewport(evt.viewState)}
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude} />
        <GeolocateControl
          position='bottom-right'
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        <FullscreenControl position='bottom-right' />
        <NavigationControl position='bottom-right' />
        <StyleSwitcherControl position='bottom-right' />
      </MapGL>
    </Wrapper>
  );
}
