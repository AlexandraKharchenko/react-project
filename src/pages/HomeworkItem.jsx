import { useParams } from 'react-router';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../components/header/Header';
import { useGetCoursesQuery, useGetHomeworkItemQuery, useGetUsersQuery } from '../store/api';
import { COLORS } from '../components/colors';

// eslint-disable-next-line react/prop-types
function UsersHomework({ homeworkId }) {
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }
  const usersPassed = data.filter((user) => user.homeworks['5']);
  console.log(usersPassed, homeworkId, data, 'users');
  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: COLORS.white,
        padding: '25px',
      }}
    >

      <Typography variant="body1"> Hausaufgabe bestanden</Typography>

      <Typography variant="body1"> Hausaufgabe nicht bestanden</Typography>
    </Grid>
  );
}
function HomeworkItem() {
  const { course, lesson, homework } = useParams();
  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];
  const userId = pathParts[2];
  // eslint-disable-next-line max-len
  const courseName = !coursesIsDataLoading && coursesData.find((iitem) => iitem.name === paramValue);
  const { data, isLoading } = useGetHomeworkItemQuery({ courseId: courseName.id, lessonId: lesson, homeworkId: homework });

  if (isLoading || coursesIsDataLoading) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Header>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          height: '100%', backgroundColor: COLORS.body, padding: '70px 50px', gap: '20px',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: COLORS.white,
            padding: '25px',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Homework #
            {' '}
            {data.id}
            -
            {' '}
            {data.title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: COLORS.white,
            padding: '25px',
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {data.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" color="secondary" endIcon={<IoArrowForwardOutline />}>
              <Link
                to={`/users/${userId}/courses/${course}/lessons/${lesson}`}
                style={{
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                Back to lesson
              </Link>
            </Button>
          </Box>
        </Grid>
        <UsersHomework homeworkId={homework} />
      </Grid>
    </Header>
  );
}

export default HomeworkItem;
