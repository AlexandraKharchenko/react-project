import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import { COLORS } from '../../components/COLORS';
import {
  useGetLessonItemQuery, useGetHomeworksQuery, useGetUserQuery, useGetMaterialsQuery,
} from '../../store/api';
import './styles.css';

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
  const isMaterialEmpty = data.length === 0 || data.some((item) => Object.keys(item.material).length === 0);

  if (!isMaterialEmpty) {
    return (
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
          {data.map((material) => Object.entries(material.material).map(([key, item]) => (
            <ListItem disablePadding key={material.id}>
              {item && (
              <ListItemText>
                <Link
                  to={item}
                  target="_blank"
                  className="material-link"
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
    );
  }
}

Materials.propTypes = {
  lessonId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};
function Homework({ courseId, lessonId, windowWidth }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const courseNameId = pathParts[4];
  const userId = pathParts[2];
  const { data: lessonsData, isLoading: lessonsIsLoading } = useGetHomeworksQuery({
    courseId,
    lessonId,
  });
  const { data: userData, isLoading: userDataIsLoading } = useGetUserQuery(userId);

  if (lessonsIsLoading || userDataIsLoading) {
    return (
      <CircularProgress />
    );
  } if (lessonsData.length) {
    return (
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
                <TableCell align="left" sx={{ fontSize: '1em', fontWeight: 'bold', display: windowWidth < 1024 ? 'none' : 'table-cell' }}>Due by</TableCell>
                <TableCell align="left" sx={{ fontSize: '1em', fontWeight: 'bold', display: windowWidth < 1024 ? 'none' : 'table-cell' }} />
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonsData.map((item) => {
                const homeworkStatus = userData.homeworks[item.id];
                const date = new Date(item.deadline);
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={item.id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-cell-title"
                    >
                      {item.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: windowWidth < 1024 ? 'none' : 'table-cell' }}
                    >
                      {date.toLocaleDateString()}
                    </TableCell>
                    <TableCell align="left" sx={{ display: windowWidth < 1024 ? 'none' : 'table-cell' }}>
                      {homeworkStatus > 0 && (
                      <div className="homework-status-note">
                        <Typography
                          variant="caption"
                          align="right"
                          sx={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center' }}
                        >
                          Note:
                          {' '}
                          {homeworkStatus}
                        </Typography>
                      </div>
                      )}
                      {homeworkStatus < 0 && (
                      <div className="homework-status-is-being-checked">
                        <Typography
                          variant="caption"
                          align="right"
                          sx={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center' }}
                        >
                          Is being checked
                        </Typography>
                      </div>
                      )}
                      {!homeworkStatus && (
                      <div className="homework-status-no-homework-done">
                        <Typography
                          variant="caption"
                          align="right"
                          sx={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center' }}
                        >
                          not done
                        </Typography>
                      </div>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<IoArrowForwardOutline />}
                      >
                        <Link
                          to={`/users/${userId}/courses/${courseNameId}/lessons/${lessonId}/homeworks/${item.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {windowWidth < 1440 ? '' : 'To Homework'}
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

    );
  }
}

Homework.propTypes = {
  lessonId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
};

function LessonItem() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { lessonId } = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const courseNameId = pathParts[4];
  const { currentData, isFetching } = useGetLessonItemQuery({
    courseId: courseNameId,
    lessonId,
  });

  if (isFetching) {
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
          minHeight: '100vh', backgroundColor: COLORS.body, padding: '50px', gap: '20px',
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
            sx={{ fontWeight: 'bold' }}
          >
            Lesson #
            {currentData.id}
            -
            {' '}
            {currentData.title}
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
          {!!currentData.src && (

          <Box sx={{ display: 'flex', justifyContent: 'center' }} className="iframe-box">
            <iframe
              className="iframe-video"
              loading="lazy"
              src={currentData.src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Box>
          )}
          <Typography align="center" variant="body1">
            {currentData.description}
          </Typography>
        </Grid>
        <Materials courseId={courseNameId} lessonId={lessonId} />
        <Homework courseId={courseNameId} lessonId={lessonId} windowWidth={windowWidth} />
      </Grid>
    </Header>
  );
}

export default LessonItem;
