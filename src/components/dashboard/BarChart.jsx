import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { COLORS } from '../colors';
import { useGetUsersQuery } from '../../store/api';

function BarChart() {
  const { data, isLoading } = useGetUsersQuery();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        display: false,
      },
    },
  };

  const labels = isLoading ? [] : data.map((item) => item.name);

  const dataBar = {
    labels,
    datasets: [
      {
        data: isLoading ? [] : data.map((item) => item.grade),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  return (
    isLoading
      ? (
        <LoadingButton
          size="large"
          loading
        />
      )
      : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: '30px',
            backgroundColor: COLORS.white,
          }}
        >
          <Stack spacing={{ xs: 3 }} direction="column" useFlexGap flexWrap="wrap">
            <Typography variant="h5" align="center">Course evaluation</Typography>
            <Bar options={options} data={dataBar} />
          </Stack>

        </Box>
      )
  );
}

export default BarChart;
