import React from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";

const HomeWrapper = ({ building }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Home building={building} />
    </Layout>
  );
};

export default HomeWrapper;
