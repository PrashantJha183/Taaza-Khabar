import React, { useContext, useEffect, useState } from "react";
import NewsContext from "./Context/NewsContext";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, date2, source } =
    props;

  const { savedNews } = useContext(NewsContext);
  const [isBookmarked, setIsBookmarked] = useState(
    localStorage.getItem(newsUrl) === "true"
  );

  const handleBookmark = async () => {
    try {
      // Call the savedNews function from the context with the news details
      await savedNews(
        title,
        description,
        imageUrl,
        newsUrl,
        author,
        source.name,
        date,
        date2
      );
      setIsBookmarked(true); // Update the bookmarked state
      localStorage.setItem(newsUrl, "true"); // Save the bookmarked state to local storage
    } catch (error) {
      console.error("Error bookmarking news item:", error);
    }
  };

  useEffect(() => {
    const isArticleBookmarked = localStorage.getItem(newsUrl) === "true";
    setIsBookmarked(isArticleBookmarked);
  }, [newsUrl]);

  return (
    <>
      <div className="my-2">
        <div className="card">
          <div
            className="d-flex justify-content-end position-absolute"
            style={{ right: 0 }}
          >
            <span className="badge bg-info">
              {source.name}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img
            className="card-img-top"
            src={
              imageUrl ||
              "https://www.journaldugeek.com/content/uploads/2022/10/anonymous.jpg"
            }
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toLocaleDateString()} at{" "}
                {new Date(date2).toLocaleTimeString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noreferrer"
            >
              Read More
            </a>
            <form
              method="post"
              onSubmit={(e) => e.preventDefault()}
              className="d-inline position-absolute px-5 mx-4"
            >
              <button
                type="submit"
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={handleBookmark}
                disabled={isBookmarked}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
