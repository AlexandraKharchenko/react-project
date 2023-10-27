import { useParams } from 'react-router';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Input as BaseInput } from '@mui/base/Input';
import { forwardRef, useState } from 'react';
import {
  useGetCoursesQuery,
  useGetHomeworkItemQuery,
  useGetUsersQuery,
  useGetMessagesQuery, useCreateMessageMutation,
} from '../../store/api';
import { COLORS } from '../../components/COLORS';
import DefaultTemplate from '../../templates/DefaultTemplate';
import './styles.css';

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;
const TextareaElement = styled('textarea', {
  shouldForwardProp: (prop) => !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
  () => `
  width: 100%;
  resize: none;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: #1C2025;
  background: #ffff;
  border: 1px solid #DAE2ED;
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05)
};

  &:hover {
    border-color: #3399FF;
  }

  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px #80BFFF;
  }
`,
);
const Input = forwardRef((props, ref) => (
  <BaseInput
    slots={{
      root: RootDiv,
      input: 'input',
      textarea: TextareaElement,
    }}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...props}
    ref={ref}
  />
));
function Messages({ userId, homeworkId }) {
  const { data, isLoading } = useGetMessagesQuery(userId);
  const [createMessage] = useCreateMessageMutation();
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleMessage = async (value) => {
    await createMessage({ userId, comment: value, homeworkId }).unwrap();
    setInputValue('');
  };
  if (isLoading) {
    return (
      <CircularProgress />
    );
  }
  const comments = data.filter((item) => item.homeworkId === homeworkId);

  return (
    <>
      {!!comments.length && (
        <Stack spacing={1}>
          <Typography variant="subtitle1" color={COLORS.green}>Your message:</Typography>
          {comments.map((comment) => (<div key={comment.id} style={{ border: '1px solid #ebedf2', padding: '10px' }}>{comment.comment}</div>))}
        </Stack>
      )}
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add your homework</Typography>
        <Input
          aria-label="Demo input"
          multiline
          placeholder="Type something…"
          value={inputValue}
          onChange={handleInputChange}
          rows={5}
        />
        <div>
          <Button color="secondary" variant="outlined" onClick={() => handleMessage(inputValue)}>
            Send
          </Button>
        </div>
      </Stack>

    </>
  );
}
Messages.propTypes = {
  userId: PropTypes.string.isRequired,
  homeworkId: PropTypes.string.isRequired,
};

function UsersHomework({ userId }) {
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }
  const usersPassed = data.filter((user) => user.homeworks[userId]);
  const usersNotPassed = data.filter((user) => !user.homeworks[userId]);

  return (
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
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}> Homework passed</Typography>
        <Stack spacing={2} direction="row">
          {usersPassed.map((user) => (
            <Typography
              variant="body1"
              sx={{
                padding: '5px 10px', backgroundColor: COLORS.green, color: COLORS.white, fontWeight: 'bold',
              }}
              key={user.id}
            >
              {user.name}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <hr style={{ width: '100%' }} />
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Didn`t pass homework</Typography>
        <Stack spacing={2} direction="row">
          {usersNotPassed.map((user) => (
            <Typography
              variant="body1"
              sx={{
                padding: '5px 10px', backgroundColor: COLORS.red, color: COLORS.white, fontWeight: 'bold',
              }}
              key={user.id}
            >
              {user.name}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
}
UsersHomework.propTypes = {
  userId: PropTypes.string.isRequired,
};
function HomeworkItem() {
  const { course, lesson, homework } = useParams();
  const { data: coursesData, isLoading: coursesIsDataLoading } = useGetCoursesQuery();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const paramValue = pathParts[4];
  const userId = pathParts[2];
  const courseName = !coursesIsDataLoading && coursesData.find((item) => item.name === paramValue);
  const { data, isLoading } = useGetHomeworkItemQuery({ courseId: courseName.id, lessonId: lesson, homeworkId: homework });

  if (isLoading || coursesIsDataLoading) {
    return (
      <CircularProgress />
    );
  }
  console.log(data);

  return (
    <DefaultTemplate>
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
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
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
        <Messages userId={userId} homeworkId={homework} />
      </Grid>
      <UsersHomework homeworkId={homework} userId={userId} />
    </DefaultTemplate>
  );
}

export default HomeworkItem;
