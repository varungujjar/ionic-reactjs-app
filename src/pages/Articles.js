import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../config/config";
import api from "../config/axios";
import PageLayout from "../components/PageLayout";
import ArticlesList from "../components/articles/ArticlesList";
import { setToast } from "../components/Toast";
import GlobalContext from "../helpers/Context";

const Articles = ({ catRef }) => {
  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  const context = useContext(GlobalContext);

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await api
        .get(null, {
          params: {
            type: config.articles.type,
            catid: config[catRef].catid,
          },
        })
        .then((response) => {
          setToast(context, response.data);
          setArticlesItems(response.data.data);
          setArticlesLoading(false);
        })
        .catch((error) => {
          setToast(context, {
            message: error.toJSON().message,
            type: "danger",
          });
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
