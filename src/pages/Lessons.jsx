import { Button, CircularProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { COLORS } from '../components/colors';
import { useGetCoursesQuery, useGetLessonsQuery } from '../store/api';
import Header from '../components/header/Header';

function Lessons() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[2];

  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  // eslint-disable-next-line max-len
  const courseName = !coursesIsDataLoading && coursesData.find((course) => course.name === paramValue);
  const { data: lessonsData, isLoading: lessonsIsLoading } = useGetLessonsQuery(courseName?.id);

  if (coursesIsDataLoading || lessonsIsLoading) {
    return (
      <CircularProgress />
    );
  }

  console.log(lessonsData, 'lessons');
  return (
    <Header>
      <div>
        <Grid
          container
          sx={{
            height: '100%', backgroundColor: COLORS.body, padding: '70px 50px', gap: '20px',
          }}
        >
          {lessonsData.map((lesson) => {
            const date = new Date(lesson.created);
            return (
              <Grid
                key={lesson.id}
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
                  {lesson.title}
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
                  {lesson.description.slice(0, 300)}
                  ...
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
                      to={`/courses/${paramValue}/lessons/${lesson.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      To lesson
                    </Link>
                  </Button>
                </Stack>
              </Grid>
            );
          })}

        </Grid>
      </div>
    </Header>
  );
}

export default Lessons;
