import {
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomeworkJS from '../pages/jsCourse/HomeworkJS';
import LessonsJS from '../pages/jsCourse/LessonsJS';
import HomeworkReact from '../pages/reactCourse/HomeworkReact';
import LessonsReact from '../pages/reactCourse/LessonsReact';
import TechnicalArticles from '../pages/TechnicalArticles';
import ErrorPage from '../pages/ErrorPage';

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/homework-js" element={<HomeworkJS />} />
      <Route path="/lessons-js" element={<LessonsJS />} />
      <Route path="/homework-react" element={<HomeworkReact />} />
      <Route path="/lessons-react" element={<LessonsReact />} />
      <Route path="/technical-articles" element={<TechnicalArticles />} />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default NavRoutes;
