import { useEffect, useState } from "react";
import { documentText } from "ionicons/icons";
import PageLayout from "../components/PageLayout";
import {
  StaticPagePlaceHolder,
  StaticPage,
} from "../components/static/StaticPage";
import axios from "../config/axios";
import { config } from "../config/config";

const Static = ({ id }) => {
  const [articlesItems, setArticlesItems] = useState({});
  const [articlesLoading, setArticlesLoading] = useState(true);

  const GetArticlesItems = () => {
    setTimeout(async () => {
      await axios
        .get(null, {
          params: {
            type: config.articles.type,
            id: id,
          },
        })
        .then((response) => {
          setArticlesItems(response.data.data);
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
  }, [id]);

  return (
    <PageLayout
      title={articlesItems.title ? articlesItems.title : null}
      icon={documentText}
    >
      {Object.keys(articlesItems).length > 0 && !articlesLoading ? (
        <StaticPage item={articlesItems} />
      ) : (
        <StaticPagePlaceHolder />
      )}
    </PageLayout>
  );
};

export default Static;
