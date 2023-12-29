import {useEffect} from 'react';
import {Link, useRouteError} from 'react-router-dom';

import {ReactComponent as AstronautSvg} from './astronaut.svg';
import {ReactComponent as PlanetSvg} from './planet.svg';

type RouteError = {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
};

export function ErrorBoundary() {
  useEffect(() => {
    const scriptId = 'particles-cdn';
    const scriptUrl =
      'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.id = scriptId;
      script.async = true;
      script.onload = () => require('./initParticles.js');
      document.body.appendChild(script);
      require('./styles.css');
    }
  }, []);

  const ex = useRouteError() as RouteError;
  const path = global.location.pathname.toLowerCase();
  const isPlayground = path.includes('playground');
  const description = isPlayground
    ? 'Add "cities" or "rentalscape" to the path'
    : "Looks like that page doesn't exist";

  return (
    <section className='denied__main'>
      <div id='particles_bg'></div>
      <div className='denied__wrapper'>
        <h1>{ex.status}</h1>
        <h3>
          <span>LOST IN {path}?</span>
          <p>{description}.</p>
        </h3>
        <AstronautSvg />
        <PlanetSvg />
        <Link to='..' relative='path' className='denied__link'>
          Go Home
        </Link>
      </div>
    </section>
  );
}
