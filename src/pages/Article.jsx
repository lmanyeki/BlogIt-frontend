// import { Container, Box } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import AuthorInfo from '../components/articles/AuthorInfo';
// import ArticleContent from '../components/articles/ArticleContent';
// import RelatedArticles from '../components/articles/RelatedArticles';
// import api from '../api/blogService';

// const Article = () => {
//   const { id } = useParams();

//   const { data: article, isLoading } = useQuery({
//     queryKey: ['article', id],
//     queryFn: () => api.getArticleById(id)
//   });

//   const { data: authorArticles } = useQuery({
//     queryKey: ['authorArticles', article?.author.id],
//     queryFn: () => api.getArticlesByAuthor(article?.author.id),
//     enabled: !!article
//   });

//   const { data: allArticles } = useQuery({
//     queryKey: ['allArticles'],
//     queryFn: () => api.getAllArticles(),
//     enabled: !authorArticles || authorArticles.length <= 1
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (!article) return <div>Article not found</div>;

//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
//         <AuthorInfo 
//           author={article.author} 
//           publishedAt={article.publishedAt} 
//         />
        
//         <ArticleContent 
//           title={article.title}
//           featuredImage={article.featuredImage}
//           content={article.content}
//         />
//       </Box>

//       <RelatedArticles 
//         currentArticleId={article.id}
//         authorArticles={authorArticles || []}
//         allArticles={allArticles || []}
//       />
//     </Container>
//   );
// };

// export default Article;