import React, { useState } from "react";
import NewsContext from "./NewsContext";

const NewsState = (props) => {
  const newsInitial = [];
  const [news, setNews] = useState(newsInitial);

  const savedNews = async (
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    source,
    date,
    date2
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/news/savednews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTk0YWJkNzczNWM2ZTAxYjA1NTRlIn0sImlhdCI6MTcwOTcxNjE5NH0.xEV9rXyovHuDI6AnTJCt5RC_j_ttZJq-zjVmWpoqUOc",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          newsUrl,
          author,
          source,
          date,
          date2,
          Saveddate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save news");
      }

      const savedData = await response.json();

      // Update news state with the saved news item
      setNews([...news, savedData]);
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  const DeleteSavedNewsArticle = (id) => {
    console.log("Deleted with id: " + id);
  };

  return (
    <NewsContext.Provider value={{ savedNews, DeleteSavedNewsArticle }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
