import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  useGetLessonsQuery,
} from '../../store/api';
import DefaultTemplate from '../../templates/DefaultTemplate';
import './styles.css';
import Card from '../../components/Card';

function Lessons() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const courseNameId = pathParts[4];
  const userId = pathParts[2];

  const {
    currentData: lessonsData,
    isFetching,
  } = useGetLessonsQuery(courseNameId);

  if (isFetching) {
    return (
      <CircularProgress />
    );
  }
  return (
    <DefaultTemplate>
      {lessonsData.map((lesson) => {
        const date = new Date(lesson.created);
        return (
          <Card key={lesson.id} lessonId={lesson.id} description={lesson.description} date={date} userId={userId} title={lesson.title} courseNameId={courseNameId} />
        );
      })}
    </DefaultTemplate>
  );
}

export default Lessons;
