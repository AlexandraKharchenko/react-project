import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Homework from '../pages/Homework';
import Lessons from '../pages/Lessons';
import TechnicalArticles from '../pages/TechnicalArticles';
import ErrorPage from '../pages/ErrorPage';
import Article from '../pages/Article';
import FavoriteArticles from '../pages/FavoriteArticles';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/:course/:homeworks" element={<Homework />} />
      <Route path="/:course/:lessons" element={<Lessons />} />
      <Route path="/technical-articles/:category?" element={<TechnicalArticles />} />
      <Route path="/technical-articles/favorite-articles" element={<FavoriteArticles />} />
      <Route path="/technical-articles/article/:articleId" element={<Article />} />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default NavRoutes;
