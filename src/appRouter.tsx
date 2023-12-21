import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

import Autocomplete from './views/Autocomplete';
import Rentalscape from './views/Rentalscape';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route path='' element={<Autocomplete maxWidth='500px' />} />
      <Route path='/mapbox-gl' element={<Rentalscape />} />
    </Route>,
  ),
);

export default AppRouter;
