import {MapboxStyleSwitcherControl} from 'mapbox-gl-style-switcher';
import {type ControlPosition, useControl} from 'react-map-gl';

/** @see https://visgl.github.io/react-map-gl/docs/api-reference/use-control */

export default function StyleSwitcherControl(props: {
  position: ControlPosition;
}) {
  useControl(() => new MapboxStyleSwitcherControl(), {
    position: props.position,
  });
  return null;
}
