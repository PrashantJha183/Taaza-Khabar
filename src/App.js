import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Bookmark from "./Components/Bookmark";
import NewsState from "./Components/Context/NewsState";

const App = () => {
  const apiKey = process.env.REACT_APP_TAAZA_KHABAR_API;
  const [progress, setProgress] = useState(0);
  return (
    <>
      <BrowserRouter>
        <NewsState>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress} />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="general"
                  pageSize={100}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="entertainment"
                  pageSize={100}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="business"
                  pageSize={100}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="health"
                  pageSize={100}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="science"
                  pageSize={100}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="sports"
                  pageSize={100}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  apiKey={apiKey}
                  setProgress={setProgress}
                  key="technology"
                  pageSize={100}
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              path="/savednews"
              element={<Bookmark category="bookmark" />}
            />
          </Routes>
        </NewsState>
      </BrowserRouter>
    </>
  );
};

export default App;
