import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const Capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    const updatedNews = async () => {
      try {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let pd = await data.json();
        props.setProgress(70);
        setArticles(pd.articles);
        setLoading(false);
        setTotalResults(pd.totalResults);
        props.setProgress(100);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    document.title = `Taaza-Khabar -${Capital(props.category)}`;
    updatedNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.category,
    props.country,
    props.apiKey,
    page,
    props.pageSize,
    props.setProgress,
  ]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let pd = await data.json();
    setArticles(articles.concat(pd.articles));
    setTotalResults(pd.totalResults);
  };

  const { showAlert } = props;

  return (
    <div className="container my-4">
      <h2 className="text-center" >
        Taaza-Khabar -Top {Capital(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row ">
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    showAlert={showAlert}
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 50)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown author"}
                    date={element.publishedAt}
                    date2={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = { country: "in", pageSize: 16, category: "General" };
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
