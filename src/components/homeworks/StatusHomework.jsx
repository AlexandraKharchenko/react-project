import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { COLORS } from '../COLORS';
import { useGetUserQuery } from '../../store/api';
import './styles.css';

function StatusHomework({
  userId, homeworkId,
}) {
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);

  if (isUserLoading) {
    return (
      <CircularProgress />
    );
  }

  if (userData.homeworks[homeworkId] > 0) {
    return (
      <Stack
        className="status-note"
        direction="row"
      >
        <Typography
          variant="caption"
          align="right"
          sx={{ fontWeight: 'bold', color: COLORS.white }}
        >
          Your note:
          {' '}
          {userData.homeworks[homeworkId]}
        </Typography>
      </Stack>
    );
  } if (userData.homeworks[homeworkId] < 0) {
    return (
      <Stack
        className="status-is-being-checked"
        direction="row"
      >
        <Typography
          variant="caption"
          align="right"
          sx={{ fontWeight: 'bold', color: COLORS.white }}
        >
          Is being checked
        </Typography>
      </Stack>
    );
  } return (
    <Stack
      className="status-no-homework-done"
      direction="row"
    >
      <Typography
        variant="caption"
        align="right"
        sx={{ fontWeight: 'bold', color: COLORS.white }}
      >
        Not done
      </Typography>
    </Stack>
  );
}

StatusHomework.propTypes = {
  userId: PropTypes.string.isRequired,
  homeworkId: PropTypes.string.isRequired,
};

export default StatusHomework;
