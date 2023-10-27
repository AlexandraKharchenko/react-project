import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { Button, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IoBookmarksOutline } from 'react-icons/io5';
import Stack from '@mui/material/Stack';
import Header from '../../components/header/Header';
import { COLORS } from '../../components/COLORS';
import { useGetArticlesQuery, useGetUserQuery, useCreateFavoriteArticleMutation } from '../../store/api';

function ArticleItemPage() {
  const { userId, articleId } = useParams();
  const { data: articleData, isLoading } = useGetArticlesQuery();
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery(userId);
  const [createFavorite] = useCreateFavoriteArticleMutation();

  const handleFavorite = async (id) => {
    if (userData.favoriteArticles.includes(id)) {
      const updatedUserData = userData.favoriteArticles.filter((item) => item !== id);
      await createFavorite({ id: userId, data: updatedUserData }).unwrap();
    } else {
      const updatedUserData = [...userData.favoriteArticles, id];
      await createFavorite({ id: userId, data: updatedUserData }).unwrap();
    }
  };

  if (isLoading || userDataLoading) {
    return (
      <CircularProgress />
    );
  }
  const isArticleFavorite = userData.favoriteArticles.includes(articleId);
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
            variant={isArticleFavorite ? 'contained' : 'outlined'}
            color="secondary"
            sx={{ gap: '1ßpx' }}
            endIcon={<IoBookmarksOutline />}
            onClick={() => handleFavorite(article.id)}
          >
            {isArticleFavorite ? 'Remove from favorite' : 'Add to favorite'}
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

export default ArticleItemPage;
