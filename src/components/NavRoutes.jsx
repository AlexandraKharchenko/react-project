import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Homeworks from '../pages/homeworks/Homeworks';
import Lessons from '../pages/lessons/Lessons';
import TechnicalArticles from '../pages/articles/TechnicalArticles';
import ErrorPage from '../pages/ErrorPage';
import ArticleItemPage from '../pages/articles/ArticleItemPage';
import FavoriteArticles from '../pages/articles/FavoriteArticles';
import LessonItem from '../pages/lessons/LessonItem';
import HomeworkItem from '../pages/homeworks/HomeworkItem';
import Login from '../pages/Login';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users/:userId/dashboard" element={<Dashboard />} />
      <Route path="/users/:userId/courses/:course/homeworks/:homework?" element={<Homeworks />} />
      <Route path="/users/:userId/courses/:course/lessons/" element={<Lessons />} />
      <Route path="/users/:userId/courses/:course/lessons/:lessonId" element={<LessonItem />} />
      <Route path="/users/:userId/courses/:course/lessons/:lesson/homeworks/:homework" element={<HomeworkItem />} />
      <Route path="/users/:userId/technical-articles/:category?" element={<TechnicalArticles />} />
      <Route path="/users/:userId/technical-articles/favorite-articles" element={<FavoriteArticles />} />
      <Route path="/users/:userId/technical-articles/article/:articleId" element={<ArticleItemPage />} />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default NavRoutes;
