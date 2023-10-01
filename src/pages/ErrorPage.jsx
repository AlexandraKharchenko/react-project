import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

function ErrorPage() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{
          width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10,
        }}
        >
          <Typography variant="h2" color="error">Error</Typography>
          <Typography variant="h5" color="error">It looks like this page does not exist :(</Typography>
        </Box>
      </Container>
    </>
  );
}

export default ErrorPage;
