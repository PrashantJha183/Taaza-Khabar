import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Bookmark from "./Components/Bookmark";
import NewsState from "./Components/Context/NewsState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";

const App = () => {
  const [alert, setAlert] = useState(null);
  const apiKey = process.env.REACT_APP_TAAZA_KHABAR_API;
  const [progress, setProgress] = useState(0);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <BrowserRouter>
      <NewsState>
        <Navbar />
        <Alert alert={alert} />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="general"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="entertainment"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="business"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="health"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="science"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="sports"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                apiKey={apiKey}
                setProgress={setProgress}
                pageSize={100}
                country="in"
                category="technology"
                showAlert={showAlert}
              />
            }
          />
          <Route
            path="/savednews"
            element={
              <Bookmark
                category="bookmark"
                setProgress={setProgress}
                showAlert={showAlert}
              />
            }
          />

          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </NewsState>
    </BrowserRouter>
  );
};

export default App;
