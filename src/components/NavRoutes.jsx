import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Homework from '../pages/Homework';
import Lessons from '../pages/Lessons';
import TechnicalArticles from '../pages/TechnicalArticles';
import ErrorPage from '../pages/ErrorPage';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:course/:homeworks" element={<Homework />} />
      <Route path="/:course/:lessons" element={<Lessons />} />
      <Route path="/technical-articles" element={<TechnicalArticles />} />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default NavRoutes;
