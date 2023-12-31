import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { blue, red, teal } from '@mui/material/colors';
import {
  useGetHomeworksQuery, useGetLessonsQuery, useGetUserQuery,
} from '../../store/api';
import DefaultTemplate from '../../templates/DefaultTemplate';
import Card from '../../components/Card';

function LessonHomeworks(props) {
  const {
    courseId, lessonId, status,
  } = props;
  const { data: homeworksData, isLoading } = useGetHomeworksQuery({ courseId, lessonId });
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(userId);
  let filteredAr = [];

  if (isLoading || isUserLoading) {
    return (
      <CircularProgress />
    );
  }
  if (homeworksData.length) {
    if (status.beingChecked && status.notDone && status.note) {
      filteredAr = homeworksData;
    } else if (status.note && status.beingChecked) {
      filteredAr = homeworksData.filter((item) => item.id in userData.homeworks && userData.homeworks[item.id]);
    } else if (status.beingChecked && status.notDone) {
      filteredAr = homeworksData.filter((item) => !(item.id in userData.homeworks) || userData.homeworks[item.id] < 0);
    } else if (status.notDone && status.note) {
      filteredAr = homeworksData.filter((item) => !(item.id in userData.homeworks) || userData.homeworks[item.id] >= 0);
    } else if (status.note) {
      filteredAr = homeworksData.filter((item) => item.id in userData.homeworks && userData.homeworks[item.id] >= 0);
    } else if (status.beingChecked) {
      filteredAr = homeworksData.filter((item) => item.id in userData.homeworks && userData.homeworks[item.id] < 0);
    } else if (status.notDone) {
      filteredAr = homeworksData.filter((item) => !(item.id in userData.homeworks));
    } else {
      filteredAr = homeworksData;
    }

    return (
      <>
        {filteredAr.map((homework) => {
          const date = new Date(homework.deadline);
          return (
            <Card
              key={homework.id}
              lessonId={lessonId}
              description={homework.description}
              date={date}
              userId={userId}
              title={homework.title}
              courseNameId={courseId}
              homeworkPage
              homeworkId={homework.id}
            />
          );
        })}
      </>
    );
  }
  return null;
}

LessonHomeworks.propTypes = {
  lessonId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
};

function Homeworks() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const courseId = pathParts[4];

  const { currentData, isFetching } = useGetLessonsQuery(courseId);
  const [status, setStatus] = useState({
    note: false,
    beingChecked: false,
    notDone: false,
  });

  const handleNoteStatus = () => {
    setStatus((curState) => ({ ...curState, note: !curState.note }));
  };
  const handleBeingCheckedStatus = () => {
    setStatus((curState) => ({ ...curState, beingChecked: !curState.beingChecked }));
  };
  const handleNotDoneStatus = () => {
    setStatus((curState) => ({ ...curState, notDone: !curState.notDone }));
  };

  if (isFetching) {
    return (
      <CircularProgress />
    );
  }
  return (
    <DefaultTemplate>
      <Grid
        item
        xs={12}
      >
        <FormControlLabel
          control={(
            <Checkbox
              name="done"
              sx={{
                color: teal[200],
                '&.Mui-checked': {
                  color: teal[400],
                },
              }}
              checked={status.note}
              onChange={handleNoteStatus}
            />
                    )}
          label="Done"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={status.beingChecked}
              onChange={handleBeingCheckedStatus}
              name="Is being checked"
              sx={{
                color: blue[500],
                '&.Mui-checked': {
                  color: blue[700],
                },
              }}
            />
                    )}
          label="Is being checked"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={status.notDone}
              onChange={handleNotDoneStatus}
              name="not done"
              sx={{
                color: red.A200,
                '&.Mui-checked': {
                  color: red.A200,
                },
              }}
            />
                    )}
          label="Not done"
        />
      </Grid>
      {currentData.map((lesson) => (
        <LessonHomeworks
          key={lesson.id}
          courseId={courseId}
          lessonId={lesson.id}
          status={status}
          lessonsIsDataLoading={isFetching}
        />
      ))}
    </DefaultTemplate>
  );
}

export default Homeworks;
