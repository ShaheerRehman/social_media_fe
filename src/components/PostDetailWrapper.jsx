// PostDetailsWrapper.js
import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import PostDetails from "../pages/PostDetails";
import { Navigate } from "react-router-dom";

const PostDetailsWrapper = ({ id }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <PostDetails id={id} />
    </Layout>
  );
};

export default PostDetailsWrapper;
