import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { COLORS } from '../COLORS';
import { useGetHomeworksQuery, useGetUserQuery } from '../../store/api';

function StatusLesson({ courseId, lessonId, userId }) {
  const { data, isLoading } = useGetHomeworksQuery({ courseId, lessonId });
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);

  if (isLoading || isUserLoading) {
    return (
      <CircularProgress />
    );
  }
  const userHomeworks = Object.keys(userData.homeworks);
  const homeworksProLesson = data.reduce((acc, curr) => {
    if (userHomeworks.includes(curr.id)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const amountHomeworksDone = `${homeworksProLesson} out of ${data.length} homeworks done`;

  if (data.length === 0) {
    return (
      <Stack
        className="status-no-homeworks"
        direction="row"
      >
        <Typography
          variant="caption"
          align="right"
          sx={{ fontWeight: 'bold', color: COLORS.white }}
        >
          No homework
        </Typography>
      </Stack>
    );
  } if (data.length === homeworksProLesson) {
    return (
      <Stack
        className="status-all-homeworks-done"
        direction="row"
      >
        <Typography
          variant="caption"
          align="right"
          sx={{ fontWeight: 'bold', color: COLORS.white }}
        >
          {amountHomeworksDone}
        </Typography>
      </Stack>
    );
  } return (
    <Stack
      className="status-no-homeworks-done"
      direction="row"
    >
      <Typography
        variant="caption"
        align="right"
        sx={{ fontWeight: 'bold', color: COLORS.white }}
      >
        {amountHomeworksDone}
      </Typography>
    </Stack>
  );
}

StatusLesson.propTypes = {
  courseId: PropTypes.string.isRequired,
  lessonId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default StatusLesson;
