import { render, screen } from "@testing-library/react";
import { ArticleCardCarousel } from "../ArticleCard";

test("Article Cards Test Default", () => {
  render(<ArticleCardCarousel />);
  const seeText = screen.getByText("no-title");
  expect(seeText).toBeInTheDocument();
});

test("Article Cards Test with Props", () => {
  render(<ArticleCardCarousel articleTitle={"This is a title"} />);
  const seeText = screen.getByText("This is a title");
  expect(seeText).toBeInTheDocument();
});
