import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {
  BsTelegram, BsYoutube, BsLinkedin, BsGithub, BsInstagram, BsFacebook,
} from 'react-icons/bs';
import Stack from '@mui/material/Stack';
import DoughnutContainer from '../components/dashboard/DoughnutContainer';
import BarChart from '../components/dashboard/BarChart';
import { COLORS } from '../components/COLORS';
import Header from '../components/header/Header';

function Dashboard() {
  return (
    <Header>
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.body }}>
        <Grid container rowSpacing={4} columnSpacing={0} sx={{ padding: '70px 50px' }}>
          <Grid item xs={12} sx={{ backgroundColor: COLORS.white, padding: '20px' }}>
            <Stack spacing={{ xs: 5 }} direction="row" justifyContent="space-between">
              <Typography variant="h6" color="#7e7e7e">
                Don't forget to subscribe to our social media and
                follow the news!
              </Typography>
              <Stack spacing={{ xs: 3 }} direction="row" useFlexGap flexWrap="wrap">
                <Link
                  href="https://telegram.org/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsTelegram fontSize={30} />
                </Link>
                <Link
                  href="https://youtube.com/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsYoutube fontSize={30} />
                </Link>
                <Link
                  href="https://de.linkedin.com/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsLinkedin fontSize={30} />
                </Link>
                <Link
                  href="https://github.com/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsGithub fontSize={30} />
                </Link>
                <Link
                  href="https://instagram.com/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsInstagram fontSize={30} />
                </Link>
                <Link
                  href="https://facebook.com/"
                  underline="none"
                  color="inherit"
                  rel="noopener"
                  target="_blank"
                >
                  <BsFacebook fontSize={30} />
                </Link>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={4} columnSpacing={4} alignItems="stretch">
              <Grid item xs={12} md={4}>
                <DoughnutContainer />
              </Grid>
              <Grid item xs={12} md={8}>
                <BarChart />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Header>
  );
}

export default Dashboard;
