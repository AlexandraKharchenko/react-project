import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  IoArrowForwardOutline, IoBookmarksOutline,
} from 'react-icons/io5';
import { COLORS } from '../COLORS';
import { useCreateFavoriteArticleMutation } from '../../store/api';
import './styles.css';

function ArticleItem(props) {
  const {
    article, categoryData, categoryIsLoading, date, userId, userData,
  } = props;

  const [createFavorit] = useCreateFavoriteArticleMutation();

  const handleFavorit = async (articleId) => {
    if (userData.favoriteArticles.includes(articleId)) {
      const updatedUserData = userData.favoriteArticles.filter((item) => item !== articleId);
      await createFavorit({ id: userId, data: updatedUserData }).unwrap();
    } else {
      const updatedUserData = [...userData.favoriteArticles, articleId];
      await createFavorit({ id: userId, data: updatedUserData }).unwrap();
    }
  };
  const isArticleFavorite = userData.favoriteArticles.includes(article.id);

  return (
    <Grid
      item
      xs={12}
      md={5}
      sx={{
        backgroundColor: COLORS.white,
        padding: '50px 25px 90px 25px',
        position: 'relative',
      }}
      key={article.id}
    >
      <Stack
        spacing={{
          xs: 1,
        }}
        sx={{
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '10px',
          top: '10px',
        }}
        direction="row"
      >
        {categoryData && categoryData.filter((item) => article.category.includes(+item.id)).map((item) => {
          if (categoryIsLoading) {
            return (
              <CircularProgress />
            );
          }
          return (
            <Typography
              key={item.id}
              variant="caption"
              align="right"
              sx={{ fontWeight: 'bold' }}
            >
              {item.name}
            </Typography>
          );
        })}
      </Stack>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {article.title}
      </Typography>
      <Stack
        spacing={{
          xs: 1,
        }}
        direction="row"
        sx={{
          borderTop: '1px solid #ebedf2',
          borderBottom: '1px solid #ebedf2',
          padding: '10px 0',
        }}
      >
        <Typography variant="body2" sx={{ color: '#9c9fa6' }}>
          Date of publication:
        </Typography>
        <Typography sx={{ color: '#b66dff' }}>{date.toLocaleDateString()}</Typography>
      </Stack>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ fontWeight: 'bold', paddingTop: '10px' }}
      >
        Short description:
      </Typography>
      {' '}
      <Typography variant="body1" sx={{ color: '#9c9fa6' }}>
        {article.description.slice(0, 200)}
        ...
      </Typography>
      <Stack
        spacing={1}
        className="button-container"
        direction="row"
      >
        <Button
          variant={isArticleFavorite ? 'contained' : 'outlined'}
          color="secondary"
          endIcon={<IoBookmarksOutline />}
          onClick={() => handleFavorit(article.id)}
        >
          {isArticleFavorite ? 'Saved' : 'Save'}
        </Button>
        <Button variant="outlined" color="secondary" endIcon={<IoArrowForwardOutline />}>
          <Link
            to={`/users/${userId}/technical-articles/article/${article.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Read
          </Link>
        </Button>
      </Stack>
    </Grid>
  );
}

export default ArticleItem;
