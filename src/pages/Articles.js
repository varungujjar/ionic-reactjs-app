import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../config/config";
import axios from "../config/axios";
import PageLayout from "../components/PageLayout";
import ArticlesList from "../components/articles/ArticlesList";

const Articles = ({ catRef }) => {
  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.articles.type,
            catid: config[catRef].catid,
          },
        })
        .then((response) => {
          // messages(response);
          setArticlesItems(response.data.data);
          setArticlesLoading(false);
        });
    }, config.timeOutDelay);
  };

  useEffect(() => {
    if (articlesLoading) {
      GetArticlesItems();
    }
  }, [catRef]);

  return (
    <PageLayout title={config[catRef].name}>
      <ArticlesList
        items={articlesItems}
        isLoading={articlesLoading}
        catRef={catRef}
      />
    </PageLayout>
  );
};
export default Articles;
