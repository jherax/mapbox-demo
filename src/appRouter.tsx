import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

import Rentalscape from './views/Rentalscape';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route path='' element={<Rentalscape />} />
    </Route>,
  ),
);

export default AppRouter;
