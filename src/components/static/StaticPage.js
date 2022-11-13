import React from "react";

export const StaticPage = ({ item }) => {
  return (
    <>
      <h2 className="mt-3">{item.title}</h2>

      <div
        className="content-wrapper"
        dangerouslySetInnerHTML={{
          __html: item.introtext ? item.introtext : null,
        }}
      />
    </>
  );
};

export const StaticPagePlaceHolder = () => {
  return (
    <>
      <div className="article-image-full"></div>
      <h2 className="mt-3 placeholder-glow">
        <span className="placeholder col-6"></span>
      </h2>

      <div className="placeholder-glow">
        <span className="placeholder col-7"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-6"></span>

        <span className="placeholder col-7"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-6"></span>
      </div>
    </>
  );
};
