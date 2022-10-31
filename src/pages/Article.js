import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { documentText } from "ionicons/icons";
import PageLayout from "../components/PageLayout";
import {
  ArticlePagePlaceHolder,
  ArticlePage,
} from "../components/articles/ArticlePage";
import axios from "../config/axios";
import { config } from "../config/config";

import "./Article.css";

const Article = (props) => {
  const articleId = props.match.params.id;
  const [articlesCatName, setArticlesCatName] = useState(null);
  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  // useMemo(() => {
  //   setLoading(true);
  // }, [response, articleId]);

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.articles.type,
            id: articleId,
          },
        })
        .then((response) => {
          setArticlesItems(response.data.data);
          setArticlesCatName(
            response.data.data.catid === config.news.catid
              ? config.news.name
              : config.articles.name
          );
          // messages(response);
          setArticlesLoading(false);
        });
    }, config.timeOutDelay);
  };

  useEffect(() => {
    GetArticlesItems();
    return () => {
      setArticlesLoading(true);
    };
  }, [articleId]);

  return (
    <PageLayout title={articlesCatName} icon={documentText}>
      {Object.keys(articlesItems).length > 0 && !articlesLoading ? (
        <ArticlePage item={articlesItems} />
      ) : (
        <ArticlePagePlaceHolder />
      )}
    </PageLayout>
  );
};

export default Article;
