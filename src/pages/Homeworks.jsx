import { Link, useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useGetCoursesQuery, useGetHomeworksQuery, useGetLessonsQuery } from '../store/api';
import Header from '../components/header/Header';
import { COLORS } from '../components/colors';

// eslint-disable-next-line react/prop-types
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
          const date = new Date(homework.created);
          return (
            <Grid
              key={homework.id}
              item
              xs={12}
              md={5}
              lg={3}
              sx={{
                backgroundColor: COLORS.white,
                padding: '50px 25px 90px 25px',
                position: 'relative',

              }}
            >
              <Stack
                spacing={{
                  xs: 1,
                }}
                sx={{
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  backgroundColor: '#fe7c96',
                  padding: '5px',
                }}
                direction="row"
              >

                <Typography
                  variant="caption"
                  align="right"
                  sx={{ fontWeight: 'bold', color: COLORS.white }}
                >
                  status
                </Typography>

              </Stack>

              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {homework.title}
              </Typography>
              <Stack
                spacing={{
                  xs: 1,
                }}
                direction="row"
                sx={{
                  borderTop: '1px solid #ebedf2',
                  borderBottom: '1px solid #ebedf2',
                  padding: '10px 0',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: '#9c9fa6' }}>
                  Date:
                </Typography>
                <Typography sx={{ color: '#b66dff' }}>{date.toLocaleDateString()}</Typography>
              </Stack>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: 'bold', paddingTop: '10px' }}
              >
                Description:
              </Typography>
              {' '}
              <Typography variant="body1" sx={{ color: '#9c9fa6' }}>
                {/* {lesson.description.slice(0, 300)}
                ... */}
              </Typography>
              <Stack
                spacing={2}
                sx={{
                  justifyContent: 'flex-start',
                  left: 25,
                  position: 'absolute',
                  bottom: 30,
                }}
                direction="row"
              >
                <Button variant="contained" color="secondary" endIcon={<IoArrowForwardOutline />}>
                  <Link
                    to={`/users/${userId}/courses/${paramValue}/lessons/${lessonId}/homeworks/${homework.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    To homework
                  </Link>
                </Button>
              </Stack>
            </Grid>
          );
        })}
      </>
    );
  }
}
function Homeworks() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];

  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  // eslint-disable-next-line max-len
  const courseName = !coursesIsDataLoading && coursesData.find((course) => course.name === paramValue);

  const { data: lessonsData, isLoading: lessonsIsDataLoading } = useGetLessonsQuery(courseName.id);

  if (coursesIsDataLoading || lessonsIsDataLoading) {
    return (
      <CircularProgress />
    );
  } return (
    <Header>
      <Grid
        container
        sx={{
          height: '100%', backgroundColor: COLORS.body, padding: '70px 50px', gap: '20px',
        }}
      >
        {lessonsData.map((lesson) => {
          console.log(lesson, 'lesson');
          return (
            <LessonHomeworks key={lesson.id} courseId={courseName.id} lessonId={lesson.id} />
          );
        })}
      </Grid>
    </Header>
  );
}

export default Homeworks;
