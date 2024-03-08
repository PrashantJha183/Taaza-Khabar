import React, { useEffect } from "react";
import useSWR from "swr";
import Spinner from "../Components/Spinner";

const Bookmark = (props) => {
  const {
    data: bookmarkedNews,
    error,
    mutate,
  } = useSWR("http://localhost:5000/api/news/fetchsavednews", async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTk0YWJkNzczNWM2ZTAxYjA1NTRlIn0sImlhdCI6MTcwOTcxNjE5NH0.xEV9rXyovHuDI6AnTJCt5RC_j_ttZJq-zjVmWpoqUOc",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bookmarked news");
    }
    const data = await response.json();
    console.log("Data", data);
    return data;
  });
  const Capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `Taaza-Khabar - ${Capital(props.category)}`;
    // eslint-disable-next-line
  }, []);

  const DeleteSavednewsArticles = async (id, newsUrl) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/news/deletesavednews/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTk0YWJkNzczNWM2ZTAxYjA1NTRlIn0sImlhdCI6MTcwOTcxNjE5NH0.xEV9rXyovHuDI6AnTJCt5RC_j_ttZJq-zjVmWpoqUOc",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete news article");
      }

      // Remove the item from local storage
      localStorage.removeItem(newsUrl);

      // Update the cache to reflect the deletion
      mutate((prevData) => prevData.filter((item) => item._id !== id), false);

      console.log("Deleted the article: " + id);
    } catch (error) {
      console.error("Error deleting news article:", error);
    }
  };

  if (error)
    return (
      <div
        className="text-center"
        style={{
          display: "grid",
          placeItems: "center",
          height: "auto",
          fontSize: "40px",
        }}
      >
        Error in fetching data
      </div>
    );
  if (!bookmarkedNews) return <Spinner />;
  if (bookmarkedNews.length === 0)
    return (
      <div
        className="text-center"
        style={{
          display: "grid",
          placeItems: "center",
          height: "auto",
          fontSize: "40px",
        }}
      >
        No articles bookmarked
      </div>
    );

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        Taaza-Khabar - Top {Capital(props.category)} Headlines
      </h2>
      <div className="my-4 card-wrapper container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {bookmarkedNews.map((item) => (
            <div className="col" key={item._id}>
              <div className="card position-relative">
                <div className="position-absolute top-0 end-0">
                  <span className="badge bg-info">{item.source}</span>
                </div>
                <img
                  className="card-img-top"
                  src={
                    item.imageUrl ||
                    "https://www.journaldugeek.com/content/uploads/2022/10/anonymous.jpg"
                  }
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      By {item.author} on{" "}
                      {new Date(item.date).toLocaleDateString()} at{" "}
                      {new Date(item.date2).toLocaleTimeString()}
                    </small>
                  </p>
                  <a
                    href={item.newsUrl}
                    target="_blank"
                    className="btn btn-sm btn-primary"
                    rel="noreferrer"
                  >
                    Read More
                  </a>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => {
                      DeleteSavednewsArticles(item._id, item.newsUrl);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <p className="text-center">
                  Saved on {new Date(item.Saveddate).toLocaleDateString()} at{" "}
                  {new Date(item.Saveddate).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
