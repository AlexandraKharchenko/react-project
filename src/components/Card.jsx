import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IoArrowForwardOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';
import './lessons/styles.css';
import { COLORS } from './COLORS';
import StatusHomework from './homeworks/StatusHomework';
import StatusLesson from './lessons/StatusLesson';

function Card(props) {
  const {
    lessonId, userId, title, date, description, homeworkPage, homeworkId, courseNameId,
  } = props;
  return (
    <Grid
      item
      xs={12}
      md={5}
      lg={3}
      sx={{
        backgroundColor: COLORS.white,
        position: 'relative',
        padding: '50px 25px 90px 25px',
      }}
    >
      {homeworkPage ? <StatusHomework userId={userId} homeworkId={homeworkId} /> : <StatusLesson courseId={courseNameId} lessonId={lessonId} userId={userId} />}
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {title}
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
        {description.slice(0, 300)}
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
          {homeworkPage ? (
            <Link
              to={`/users/${userId}/courses/${courseNameId}/lessons/${lessonId}/homeworks/${homeworkId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              To Homework
            </Link>
          ) : (
            <Link
              to={`/users/${userId}/courses/${courseNameId}/lessons/${lessonId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              To lesson
            </Link>
          )}
        </Button>
      </Stack>
    </Grid>
  );
}

Card.propTypes = {
  lessonId: PropTypes.string.isRequired,
  homeworkPage: PropTypes.bool,
  courseNameId: PropTypes.string.isRequired,
  homeworkId: PropTypes.string,
  userId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  description: PropTypes.string.isRequired,
};

Card.defaultProps = {
  homeworkPage: false,
  homeworkId: undefined,
};
export default Card;
