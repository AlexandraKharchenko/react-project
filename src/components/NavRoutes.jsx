import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Homeworks from '../pages/Homeworks';
import Lessons from '../pages/Lessons';
import TechnicalArticles from '../pages/TechnicalArticles';
import ErrorPage from '../pages/ErrorPage';
import Article from '../pages/Article';
import FavoriteArticles from '../pages/FavoriteArticles';
import LessonItem from '../pages/LessonItem';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses/:course/homeworks/:homework?" element={<Homeworks />} />
      <Route path="/courses/:course/lessons/" element={<Lessons />} />
      <Route path="/courses/:course/lessons/:lessonId" element={<LessonItem />} />
      <Route path="/courses/:course/lessons/:lesson/homeworks/:homework" element={<div>item homework</div>} />
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
