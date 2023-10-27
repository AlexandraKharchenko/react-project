import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IoBookmarksOutline } from 'react-icons/io5';
import Stack from '@mui/material/Stack';
import Header from '../components/header/Header';
import { COLORS } from '../components/colors';
import { useCreateFavoriteArticleMutation, useGetArticlesQuery } from '../store/api';

function Article() {
  const { articleId } = useParams();
  const { data: articleData, isLoading } = useGetArticlesQuery();
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

  const article = articleData.filter((item) => item.id === articleId)[0];
  return (
    <Header>
      <Box sx={{ height: '100vh', backgroundColor: COLORS.body, padding: '70px 50px' }}>
        <Stack
          spacing={{
            xs: 3,
          }}
          sx={{
            alignItems: 'flex-end',
          }}
          direction="column"
        >
          <Button
            variant={article.isFavorite ? 'contained' : 'outlined'}
            color="secondary"
            sx={{ gap: '1ßpx' }}
            endIcon={<IoBookmarksOutline />}
            onClick={() => handleFavorite(article.id, article.isFavorite)}
          >
            {article.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
          </Button>
          <Box sx={{ backgroundColor: COLORS.white, padding: '50px 50px' }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {article.title}
            </Typography>
            <Typography variant="body1">
              {article.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Header>
  );
}

export default Article;
