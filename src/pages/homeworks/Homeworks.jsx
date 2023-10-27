import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useGetCoursesQuery, useGetHomeworksQuery, useGetLessonsQuery } from '../../store/api';
import DefaultTemplate from '../../templates/DefaultTemplate';
import Card from '../../components/Card';

function LessonHomeworks({ courseId, lessonId }) {
  const { data: homeworksData, isLoading } = useGetHomeworksQuery({ courseId, lessonId });
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];
  const userId = pathParts[2];

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (homeworksData.length) {
    return (
      <>
        {homeworksData.map((homework) => {
          const date = new Date(homework.deadline);

          return (
            <Card key={homework.id} lessonId={lessonId} description={homework.description} date={date} paramValue={paramValue} userId={userId} title={homework.title} courseNameId={courseId} homeworkPage homeworkId={homework.id} />
          );
        })}
      </>
    );
  }
}
LessonHomeworks.propTypes = {
  lessonId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};
function Homeworks() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];

  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  const courseName = !coursesIsDataLoading && coursesData.find((course) => course.name === paramValue);
  const { data: lessonsData, isLoading: lessonsIsDataLoading } = useGetLessonsQuery(courseName.id);

  if (coursesIsDataLoading || lessonsIsDataLoading) {
    return (
      <CircularProgress />
    );
  } return (
    <DefaultTemplate>
      {lessonsData.map((lesson) => (
        <LessonHomeworks key={lesson.id} courseId={courseName.id} lessonId={lesson.id} />
      ))}
    </DefaultTemplate>
  );
}

export default Homeworks;
