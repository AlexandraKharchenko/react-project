import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { COLORS } from '../COLORS';
import { useGetHomeworksQuery, useGetUserQuery } from '../../store/api';

function StatusLesson(props) {
  const { courseId, lessonId, userId } = props;
  const { currentData, isFetching } = useGetHomeworksQuery({ courseId, lessonId });
  const { currentData: userData, isFetching: isUserLoading } = useGetUserQuery(userId);
  const userHomeworks = userData && Object.keys(userData.homeworks);
  const homeworksProLesson = !isFetching && currentData.reduce((acc, curr) => {
    if (userHomeworks.includes(curr.id)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (isFetching || isUserLoading) {
    return (
      <CircularProgress />
    );
  } const amountHomeworksDone = `${homeworksProLesson} out of ${currentData.length} homeworks done`;

  if (currentData.length === 0) {
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
  } if (currentData.length === homeworksProLesson) {
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
