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
          authToken: localStorage.getItem("token"),
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

  return (
    <NewsContext.Provider value={{ savedNews }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
