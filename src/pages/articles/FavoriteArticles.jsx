import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useGetArticleCategoryQuery, useGetArticlesQuery, useGetUserQuery } from '../../store/api';
import ArticleTemplate from '../../templates/ArticleTemplate';
import CategoriesFilter from '../../components/articles/CategoriesFilter';
import ArticleItem from '../../components/articles/ArticleItem';
import { COLORS } from '../../components/COLORS';

function FavoriteArticles() {
  const { data: articleData, isLoading } = useGetArticlesQuery();
  const { data: categoryData, isLoading: categoryIsLoading } = useGetArticleCategoryQuery();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery(userId);

  if (isLoading || userDataLoading) {
    return (
      <CircularProgress />
    );
  }

  const favoriteArticles = articleData.filter((item) => userData.favoriteArticles.includes(item.id));

  return (
    <ArticleTemplate>
      <CategoriesFilter />
      {favoriteArticles.length === 0 ? (
        <Box sx={{
          backgroundColor: COLORS.white, padding: '60px', display: 'flex', justifyContent: 'center', margin: '0 auto',
        }}
        >
          <Typography variant="h5">Currently no favorite articles</Typography>
        </Box>
      )
        : favoriteArticles.map((article) => {
          const date = new Date(article.createdAt);
          return (
            <ArticleItem article={article} key={article.id} categoryData={categoryData} categoryIsLoading={categoryIsLoading} date={date} userId={userId} userData={userData} />
          );
        })}

    </ArticleTemplate>
  );
}

export default FavoriteArticles;
