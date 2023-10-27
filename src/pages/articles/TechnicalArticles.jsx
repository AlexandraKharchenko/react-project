import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useGetArticleCategoryQuery, useGetArticlesQuery, useGetUserQuery } from '../../store/api';
import ArticleTemplate from '../../templates/ArticleTemplate';
import './styles.css';
import CategoriesFilter from '../../components/articles/CategoriesFilter';
import ArticleItem from '../../components/articles/ArticleItem';

function TechnicalArticles() {
  const { data: articleData, isLoading } = useGetArticlesQuery();
  const { data: categoryData, isLoading: categoryIsLoading } = useGetArticleCategoryQuery();

  const params = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery(userId);

  if (isLoading || userDataLoading) {
    return (
      <CircularProgress />
    );
  }
  const filteredCategories = !categoryIsLoading && categoryData.filter((category) => category.name === params.category);
  const filteredArticles = params.category ? articleData.filter((article) => article.category.includes(+filteredCategories[0].id)) : articleData;

  return (
    <ArticleTemplate>
      <CategoriesFilter />
      {filteredArticles.map((article) => {
        const date = new Date(article.createdAt);
        return (
          <ArticleItem article={article} key={article.id} categoryData={categoryData} categoryIsLoading={categoryIsLoading} date={date} userId={userId} userData={userData} />
        );
      })}
    </ArticleTemplate>
  );
}

export default TechnicalArticles;
