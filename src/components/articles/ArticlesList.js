import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config/config";
import { ArticleCardCarousel, ArticlesCardPlaceholder } from "./ArticleCard";

const ArticlesList = ({
  items = {},
  isLoading,
  catRef = config.articles.type,
}) => {
  let history = useHistory();
  useEffect(() => {}, [isLoading]);

  return !isLoading ? (
    Object.keys(items).length > 0 ? (
      items.map((article) => (
        <ArticleCardCarousel
          key={article.id}
          articleTitle={article.title}
          articleAlias={article.alias}
          articleId={article.id}
          articleIntroText={article.introtext}
          articleImages={article.images}
          articleCreated={article.created}
          onClick={(articleId) => {
            history.push(`/page/${catRef}/${articleId}`);
          }}
        />
      ))
    ) : (
      <>No articles to display</>
    )
  ) : (
    <>
      <ArticlesCardPlaceholder />
      <ArticlesCardPlaceholder />
    </>
  );
};
export default ArticlesList;
