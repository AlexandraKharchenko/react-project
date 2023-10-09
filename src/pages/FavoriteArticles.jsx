import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  IoArrowForwardOutline, IoBookmarksOutline, IoBookOutline,
} from 'react-icons/io5';
import { COLORS } from '../components/colors';
import Header from '../components/header/Header';
import { useGetArticleCategoryQuery, useGetArticlesQuery, useCreateFavoriteArticleMutation } from '../store/api';

function FavoriteArticles() {
  const { data: articleData, isLoading } = useGetArticlesQuery();
  const { data: categoryData, isLoading: categoryIsLoading } = useGetArticleCategoryQuery();
  const [createFavorite] = useCreateFavoriteArticleMutation();

  const handleFavorite = async (id, favorite) => {
    const requestData = await createFavorite({ id, favorite: !favorite }).unwrap();
    console.log(requestData);
  };

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  const favoriteArticles = articleData.filter((item) => item.isFavorite);

  return (
    <Header>
      <Box sx={{
        backgroundColor: COLORS.body,
        padding: '70px 0 70px 50px',
        position: 'relative',
        width: '100%',
        display: 'flex',
      }}
      >
        <Grid
          container
          sx={{
            gap: '20px',
            marginRight: '300px',
          }}
        >
          {favoriteArticles.length === 0 ? <div>no articles</div>
            : favoriteArticles.map((article) => {
              const date = new Date(article.createdAt);

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
                    {article.description.slice(0, 300)}
                    ...
                  </Typography>
                  <Stack
                    spacing={2}
                    sx={{
                      justifyContent: 'flex-end',
                      right: 25,
                      position: 'absolute',
                      bottom: 30,
                    }}
                    direction="row"
                  >
                    <Button
                      variant={article.isFavorite ? 'contained' : 'outlined'}
                      color="secondary"
                      sx={{ gap: '1ßpx' }}
                      endIcon={<IoBookmarksOutline />}
                      onClick={() => handleFavorite(article.id, article.isFavorite)}
                    >
                      {article.isFavorite ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outlined" color="secondary" endIcon={<IoArrowForwardOutline />}>
                      <Link
                        to={`/technical-articles/article/${article.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        Read
                      </Link>
                    </Button>
                  </Stack>
                </Grid>

              );
            })}
        </Grid>
        <Box sx={{
          backgroundColor: COLORS.white,
          padding: '30px 25px 25px 30px',
          position: 'fixed',
          right: 0,
          width: '100%',
          maxWidth: '290px',
          display: 'flex',
          gap: '5px',
          flexDirection: 'column',
        }}
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
                to={`/technical-articles/${item.name}`}
                style={{
                  textDecoration: 'none',
                  color: '#b66dff',
                }}
                key={item.id}
              >
                {item.name}
              </Link>
            );
          })}
          <div style={{ borderTop: '1px solid #ebedf2', margin: '10px 0' }} />
          <Link
            to="/technical-articles"
            style={{
              textDecoration: 'none',
              color: '#b66dff',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <IoBookOutline />
            All articles
          </Link>
          <Link
            to="/technical-articles/favorite-articles"
            style={{
              textDecoration: 'none',
              color: '#b66dff',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <IoBookmarksOutline />
            Favorites
          </Link>
        </Box>
      </Box>
    </Header>
  );
}

export default FavoriteArticles;
