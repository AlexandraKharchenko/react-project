import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { COLORS } from '../components/COLORS';
import Header from '../components/header/Header';

function ArticleTemplate({ children }) {
  return (
    <Header>
      <div style={{
        backgroundColor: COLORS.body,
        padding: '50px',
        minHeight: '100vh',
      }}
      >
        <Grid
          container
          className="article-container"
        >
          {children}
        </Grid>
      </div>
    </Header>
  );
}

ArticleTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default ArticleTemplate;
