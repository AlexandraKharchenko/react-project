import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useGetArticleCategoryQuery, useGetArticlesQuery, useGetUserQuery } from '../../store/api';
import ArticleTemplate from '../../templates/ArticleTemplate';
import './styles.css';
import CategoriesFilter from '../../components/articles/CategoriesFilter';
import ArticleItem from '../../components/articles/ArticleItem';

function TechnicalArticles() {
  const params = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const userId = pathParts[2];
  const { currentData: articleData, isFetching } = useGetArticlesQuery();
  const { currentData: categoryData, isFetching: categoryIsLoading } = useGetArticleCategoryQuery();
  const { data: userData, isLoading: userDataLoading } = useGetUserQuery(userId);

  const filteredCategories = !categoryIsLoading && categoryData.filter((category) => category.name === params.category);
  const filteredArticles = params.category ? articleData.filter((article) => article.category.includes(+filteredCategories[0].id)) : articleData;
  if (isFetching || userDataLoading) {
    return (
      <CircularProgress />
    );
  } return (
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
