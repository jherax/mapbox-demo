import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

import Applicant from './views/Applicant';
import Rentalscape from './views/Rentalscape';

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route path='' element={<Rentalscape />} />
      <Route path='applicant' element={<Applicant />} />
    </Route>,
  ),
);

export default AppRouter;
