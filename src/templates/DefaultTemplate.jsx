import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { COLORS } from '../components/COLORS';
import Header from '../components/header/Header';

function DefaultTemplate({ children }) {
  return (
    <Header>
      <div style={{ backgroundColor: COLORS.body, padding: '50px', minHeight: '100vh' }}>
        <Grid
          container
          sx={{
            gap: '20px',
          }}
        >
          {children}
        </Grid>
      </div>
    </Header>
  );
}

DefaultTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default DefaultTemplate;
