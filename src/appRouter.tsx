import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

import Autocomplete from './views/Autocomplete';
import {ErrorBoundary} from './views/ErrorBoundary';
import {Playground} from './views/Playground';
import Rentalscape from './views/Rentalscape';

/**
 * @see https://reactrouter.com/en/main/route/route
 */
const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />} errorElement={<ErrorBoundary />}>
      <Route path='' element={<Autocomplete maxWidth='500px' />} />
      <Route path='/mapbox' element={<Rentalscape />} />
      <Route path='/playground/:gqlConn' element={<Playground />} />
    </Route>,
  ),
);

export default AppRouter;
