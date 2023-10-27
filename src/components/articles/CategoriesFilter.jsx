import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  IoBookmarksOutline, IoBookOutline,
} from 'react-icons/io5';
import { useParams } from 'react-router';
import { useGetArticleCategoryQuery } from '../../store/api';

function CategoriesFilter() {
  const { category } = useParams();
  const { data: categoryData, isLoading: categoryIsLoading } = useGetArticleCategoryQuery();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];

  return (
    <Grid
      item
      xs={12}
      md={2}
      className="fixed-container"
      sx={{ flexDirection: 'column' }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 'bold' }}
      >
        Categories
      </Typography>
      {categoryData && categoryData.map((item) => {
        if (categoryIsLoading) {
          return (
            <CircularProgress />
          );
        }
        return (
          <Link
            to={`/users/${userId}/technical-articles/${item.name}`}
            key={item.id}
            className={category === item.name ? 'category-active-link' : 'category-link'}
          >
            {item.name}
          </Link>
        );
      })}
      <div style={{ borderTop: '1px solid #ebedf2', margin: '10px 0' }} />
      <Link
        to={`/users/${userId}/technical-articles`}
        className={!category && pathParts[4] !== 'favorite-articles' ? 'category-active-link' : 'category-link'}
      >
        <IoBookOutline />
        All articles
      </Link>
      <Link
        to={`/users/${userId}/technical-articles/favorite-articles`}
        className={pathParts[4] === 'favorite-articles' ? 'category-active-link' : 'category-link'}
      >
        <IoBookmarksOutline />
        Favorites
      </Link>
    </Grid>
  );
}

export default CategoriesFilter;
