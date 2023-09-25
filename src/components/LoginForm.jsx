import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../redux/authSlice";
import { getPosts } from "../redux/postSlice";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    dispatch(getPosts("mine"));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Username"
          type="text"
          required
          name="username"
        />
        <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Password"
          type="password"
          required
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
        />
        <Button
          disabled={
            loginData.username.trimStart().length === 0 ||
            loginData.password.trimStart().length === 0
          }
          sx={{
            width: "100%",
            margin: "1.5rem 0",
            padding: "12px 0",
            borderRadius: "28px",
          }}
          variant="contained"
          color="primary"
          type="submit"
        >
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </>
  );
}
