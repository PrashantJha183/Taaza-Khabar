import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Spinner from "../Components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Bookmark = (props) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const { data: bookmarkedNews, error } = useSWR(
    "http://localhost:5000/api/news/fetchsavednews",
    async (url) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("token"),
        },
      });
      props.setProgress(30);
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarked news");
      }
      props.setProgress(70);
      console.log("props of 70: ", props.setProgress(70));
      const data = await response.json();
      setLoading(false);
      props.setProgress(100);
      console.log("Data", data);
      return data.sort((a, b) => new Date(b.Saveddate) - new Date(a.Saveddate));
    }
  );

  const Capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `Taaza-Khabar - ${Capital(props.category)}`;
    // eslint-disable-next-lines
    const fetchUsername = async () => {
      const name = await Username();
      setUsername(name);
    };
    // console.log("kya username", username);
    fetchUsername();
  }, []);
  console.log("kya username", username);

  const DeleteSavednewsArticles = async (id, newsUrl, title) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/news/deletesavednews/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete news article");
      }

      // Remove the item from local storage
      localStorage.removeItem(newsUrl);

      mutate("http://localhost:5000/api/news/fetchsavednews");

      console.log("Deleted the article: " + id);
      const cleanTitle = title.replace(/['"]+/g, ""); // Remove single and double quotes
      props.showAlert("Deleted " + cleanTitle + " successfully", "success");
    } catch (error) {
      console.error("Error deleting news article:", error);
      props.showAlert("Error deleting saved news articles", "danger");
    }
  };

  const Username = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/fetchuserdata",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authToken: localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log("Username:", json.name);
    return json.name;
  };

  if (error) {
    return (
      <div
        className="text-center"
        style={{
          display: "grid",
          placeItems: "center",
          height: "100",
          fontSize: "40px",
        }}
      >
        Error in fetching data
      </div>
    );
  }

  if (!bookmarkedNews || bookmarkedNews.length === 0) {
    return (
      <div
        className="text-center my-3"
        style={{
          display: "grid",
          placeItems: "center",
          height: "100",
          fontSize: "40px",
        }}
      >
        No articles bookmarked
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center my-3">
        Taaza-Khabar - Top {Capital(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={bookmarkedNews.length}
        next={() => {}}
        hasMore={false}
        loader={<Spinner />}
      >
        <div className="container">
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
                          DeleteSavednewsArticles(
                            item._id,
                            item.newsUrl,
                            item.title
                          );
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-center container">
                      Saved on {new Date(item.Saveddate).toLocaleDateString()}{" "}
                      at {new Date(item.Saveddate).toLocaleTimeString()} by{" "}
                      {username && <span>{username}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Bookmark;
