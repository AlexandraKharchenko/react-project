import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLocation } from 'react-router-dom';
import { COLORS } from '../COLORS';
import { useGetUserQuery } from '../../store/api';

function DoughnutContainer() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];
  const { data, isLoading } = useGetUserQuery(userId);

  ChartJS.register(ArcElement, Tooltip, Legend);

  let countTo50 = 0;
  let countFrom51To75 = 0;
  let countFrom76To100 = 0;

  if (!isLoading) {
    const notes = Object.values(data.homeworks);
    notes.map((item) => {
      if (item <= 50 && item > 0) countTo50 += 1;
      else if (item >= 51 && item <= 75 && item > 0) countFrom51To75 += 1;
      else if (item >= 76 && item <= 100 && item > 0) countFrom76To100 += 1;
      return null;
    });
  }

  const dataDoughnut = {
    labels: ['0-50 points', '50-75 points', '76-100 points'],
    datasets: [
      {
        data: [countTo50, countFrom51To75, countFrom76To100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <LoadingButton
        size="large"
        loading
      />
    );
  } return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '30px',
        backgroundColor: COLORS.white,
      }}
    >
      <Stack spacing={{ xs: 2 }} direction="column" useFlexGap flexWrap="wrap">
        <Typography variant="h5" align="center">Quality of homeworks</Typography>
        <Doughnut data={dataDoughnut} />
        <Box>
          <Typography>
            Grades from 0 to 50:
            {' '}
            {countTo50}
          </Typography>
          <Typography>
            Grades from 51 to 75:
            {' '}
            {countFrom51To75}
          </Typography>
          <Typography>
            Grades from 76 to 100:
            {' '}
            {countFrom76To100}
          </Typography>
        </Box>

      </Stack>
    </Box>

  );
}

export default DoughnutContainer;
