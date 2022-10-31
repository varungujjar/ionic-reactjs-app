import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { config } from "../../config/config";
import { ArticleCardCarousel, ArticlesCardPlaceholder } from "./ArticleCard";

const ArticlesSlider = ({ items = {}, isLoading }) => {
  let history = useHistory();
  useEffect(() => {}, [isLoading]);

  return !isLoading ? (
    <OwlCarousel key={0} className="owl-theme" {...config.videocarousel}>
      {Object.keys(items).length > 0 ? (
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
              history.push(`${config.articles.path}/${articleId}`);
            }}
          />
        ))
      ) : (
        <>No articles to display</>
      )}
    </OwlCarousel>
  ) : (
    <OwlCarousel {...config.videocarousel} key={1}>
      <ArticlesCardPlaceholder />
      <ArticlesCardPlaceholder />
    </OwlCarousel>
  );
};
export default ArticlesSlider;
