import ArticleImage from "./ArticleImage";
import Card from "../Card";
import { Truncate, Formatdate } from "../../helpers/Util";

export const ArticleCardCarousel = ({ articleTitle, articleAlias, articleId, articleIntroText, articleImages, articleCreated, onClick }) => {
  return (
    <Card
      onClickData={articleId}
      onClick={(articleId) => {
        onClick(articleId);
      }}
    >
      <ArticleImage images={articleImages} alt={articleAlias} />
      <div className="card-body">
        <h5 className="card-title">{articleTitle}</h5>

        {articleCreated && (
          <div className="card-text text-muted mb-2">
            <Formatdate date={articleCreated} />
          </div>
        )}

        <div
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: articleIntroText ? Truncate(articleIntroText, 100) : null,
          }}
        />
      </div>
    </Card>
  );
};

ArticleCardCarousel.defaultProps = {
  articleTitle: "no-title",
  articleAlias: "no-alias",
  articleId: 0,
  articleIntroText: "no-intro-text",
  articleImages: JSON.stringify({}),
  articleCreated: "2022-09-06 11:09:39",
};

export const ArticlesCardPlaceholder = () => {
  return (
    <Card>
      <img src={"./assets/images/article-no-image.png"} className="card-img-top placeholder" />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-4"></span>
        </p>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
        </p>
      </div>
    </Card>
  );
};
