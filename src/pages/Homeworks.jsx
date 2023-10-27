import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, CircularProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  IoArrowForwardOutline,
} from 'react-icons/io5';
import Grid from '@mui/material/Grid';
import { COLORS } from '../components/colors';
import { useGetCoursesQuery, useGetHomeworksQuery } from '../store/api';
import Header from '../components/header/Header';

function Homeworks() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[2];

  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  // eslint-disable-next-line max-len
  const sortedHomeworks = !coursesIsDataLoading && coursesData.filter((course) => course.name === paramValue);
  const { data: homeworksData, isLoading: homeworksIsLoading } = useGetHomeworksQuery({ courseId: sortedHomeworks[0]?.id || '', lessonId: 1 });

  if (coursesIsDataLoading || homeworksIsLoading) {
    return (
      <CircularProgress />
    );
  }

  if (sortedHomeworks.length === 0) {
    return (
      <Header>
        <p>No matching homeworks found.</p>
      </Header>
    );
  }

  console.log(homeworksData, 'homeworks');
  return (
    <Header>
      <div>
        <Grid
          container
          sx={{ height: '100%', backgroundColor: COLORS.body, padding: '70px 50px' }}
        >

          <Grid
            item
            xs={12}
            md={4}
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
              title
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
                Due by:
              </Typography>
              <Typography sx={{ color: '#b66dff' }}>date</Typography>
            </Stack>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontWeight: 'bold', paddingTop: '10px' }}
            >
              Short description:
            </Typography>
            {' '}
            <Typography variant="body1" sx={{ color: '#9c9fa6' }}>
              description
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
                  to="/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  To homework
                </Link>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Header>
  );
}

export default Homeworks;
