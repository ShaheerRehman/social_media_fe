import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAuth } from "./redux/authSlice";
import PostDetailsWrapper from "./components/PostDetailWrapper";
import HomeWrapper from "./components/HomeWrapper";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if ("login" in localStorage) {
      const login = JSON.parse(localStorage.getItem("login"));
      axios.defaults.headers.common["authorization"] = `Token ${login.token}`;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
    }
  }, [dispatch, isLoggedIn]);
  return (
    <Routes>
      {/* <PrivateRoute exact path="/profile/:id">
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
      <PrivateRoute exact path="/posts/:id">
        <Layout>
          <PostDetails />
        </Layout>
      </PrivateRoute> */}
      {/* <Route
        exact
        path="/posts/:id"
        element={isLoggedIn ? <PostDetails /> : <Navigate to="/login" />}
      /> */}
      <Route path="/posts/:id" element={<PostDetailsWrapper />} />
      <Route path="/:building?" element={<HomeWrapper />} />
      {/* <Route
        exact
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
