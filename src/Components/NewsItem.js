import React from "react";
const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, date2, source } =
    props;
  return (
    <>
      <div className="my-3">
        <div className="card">
          <div
            className="d-flex justify-content-end position-absolute"
            style={{ right: 0 }}
          >
            <span className=" badge bg-info">
              {source.name}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img
            className="card-img-top"
            src={
              imageUrl
                ? imageUrl
                : "https://www.journaldugeek.com/content/uploads/2022/10/anonymous.jpg"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
