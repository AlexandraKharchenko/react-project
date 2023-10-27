import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
  useGetCoursesQuery, useGetLessonsQuery,
} from '../../store/api';
import DefaultTemplate from '../../templates/DefaultTemplate';
import './styles.css';
import Card from '../../components/Card';

function Lessons() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];
  const userId = pathParts[2];

  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  const courseName = !coursesIsDataLoading && coursesData.find((course) => course.name === paramValue);
  const { data: lessonsData, isLoading: lessonsIsLoading } = useGetLessonsQuery(courseName?.id);

  if (coursesIsDataLoading || lessonsIsLoading) {
    return (
      <CircularProgress />
    );
  }
  return (
    <DefaultTemplate>
      {lessonsData.map((lesson) => {
        const date = new Date(lesson.created);
        return (
          <Card key={lesson.id} lessonId={lesson.id} description={lesson.description} date={date} paramValue={paramValue} userId={userId} title={lesson.title} courseNameId={courseName.id} />
        );
      })}
    </DefaultTemplate>
  );
}

export default Lessons;
