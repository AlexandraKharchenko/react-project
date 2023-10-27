import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IoArrowForwardOutline, IoArrowRedoOutline } from 'react-icons/io5';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from '../components/header/Header';
import { COLORS } from '../components/colors';
import {
  useGetCoursesQuery, useGetLessonItemQuery, useGetHomeworksQuery, useGetMaterialsQuery,
} from '../store/api';

// eslint-disable-next-line react/prop-types
function Materials({ courseId, lessonId }) {
  const { data, isLoading } = useGetMaterialsQuery({
    courseId,
    lessonId,
  });

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    data.length && (
    <Grid
      item
      xs={12}
      lg={4}
      sx={{
        backgroundColor: COLORS.white,
        padding: '25px',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Additional material</Typography>
      <List>
        {data.map((material) => Object.entries(material.material).map(([key, item], index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem disablePadding key={index}>
            {item && (
            <ListItemText>
              <Link
                to={item}
                target="_blank"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {key}
                <IoArrowRedoOutline />
              </Link>
            </ListItemText>
            )}
          </ListItem>
        )))}
      </List>
    </Grid>
    )
  );
}

// eslint-disable-next-line react/prop-types
function Homework({ courseId, lessonId }) {
  const { data: lessonsData, isLoading: lessonsIsLoading } = useGetHomeworksQuery({
    courseId,
    lessonId,
  });

  if (lessonsIsLoading) {
    return (
      <CircularProgress />
    );
  }
  return (
    lessonsData.length && (
    <Grid
      item
      xs={12}
      lg={7}
      sx={{
        backgroundColor: COLORS.white,
        padding: '25px',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Homework for this lesson</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: '1em', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="left" sx={{ fontSize: '1em', fontWeight: 'bold' }}>Due by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessonsData.map((item) => {
              const date = new Date(item.deadline);
              return (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  key={item.id}
                >
                  <TableCell component="th" scope="row" sx={{ fontSize: '1em' }}>
                    {item.title}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      display: 'flex', gap: '20px', alignItems: 'center', fontSize: '1em',
                    }}
                  >
                    {date.toLocaleDateString()}
                    {' '}
                    <Button
                      variant="contained"
                      color="secondary"
                      endIcon={<IoArrowForwardOutline />}
                    >
                      <Link
                        to={`/courses/${courseId}/lessons/${lessonId}/homeworks/${item.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        To Homework
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="subtitle1" sx={{ color: '#198ae3' }}>
        Amount of homework:
        {lessonsData.length}
      </Typography>
    </Grid>
    )
  );
}

function LessonItem() {
  const { lessonId } = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[2];
  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  const courseName = !coursesIsDataLoading && coursesData.find((course) => course.name === paramValue);
  const { data: lessonsData, isLoading: lessonsIsLoading } = useGetLessonItemQuery({
    courseId: courseName?.id,
    lessonId,
  });

  if (coursesIsDataLoading || lessonsIsLoading) {
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
            padding: '20px 25px 0 25px',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold' }}
          >
            Lesson #
            {lessonsData.id}
            -
            {' '}
            {lessonsData.title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: COLORS.white,
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <iframe
              width="560"
              height="315"
              loading="lazy"
              src="https://www.youtube.com/embed/dN8MQpcW_P4?si=pO5mgBVoiid6NCRu"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Box>
          <Typography align="center" variant="body1">
            {lessonsData.description}
          </Typography>
          {/* <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ywUo0ZQpIrg?si=xg5OlqFmDkkS3t-S"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/pxn0wL_uSm4?si=aoXO0lLjPaceE9rB"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            /> */}
        </Grid>
        <Materials courseId={courseName?.id} lessonId={lessonId} />
        <Homework courseId={courseName?.id} lessonId={lessonId} />
      </Grid>
    </Header>
  );
}

export default LessonItem;
