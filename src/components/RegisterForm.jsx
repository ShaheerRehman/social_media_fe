import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/authSlice";
import { getPosts } from "../redux/postSlice";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    username: "",
    building_name: "",
    apartment_number: null,
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));
    dispatch(getPosts("mine"));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name="username"
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter username"
        type="text"
        required
      />
      <TextField
        name="building_name"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter building name"
        type="text"
        required
      />
      <TextField
        name="apartment_number"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter apartment number"
        type="number"
        required
      />
      <TextField
        name="email"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Email"
        type="email"
        required
      />
      <TextField
        name="password"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Password"
        type="password"
        required
      />
      <Button
        disabled={
          registerData.email.trimStart().length === 0 ||
          registerData.password.trimStart().length === 0 ||
          registerData.building_name.trimStart().length === 0 ||
          registerData.username.trimStart().length === 0 ||
          registerData.apartment_number === null
        }
        type="submit"
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="contained"
        color="primary"
      >
        {status === "loading" ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
