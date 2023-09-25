import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  isLoggedIn: false,
  user: {},
  profile: {},
  userStatus: "idle",
  users: [],
  buildings: [],
};

export const loginUser = createAsyncThunk("users/token", async (userData) => {
  const { data } = await axios.post("/users/token/", userData);
  return data;
});

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData) => {
    try {
      const response = await axios.post("/users/", userData);
      if (response.status === 201) {
        const data = response.data;
        return data; // Return the response data for updating the state
      } else {
        alert(response.data.username[0]); // Display any error message from the server
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error registering user:", error);
      throw error; // Rethrow the error to indicate a failed promise
    }
  }
);

export const getBuildings = createAsyncThunk("users/buildings", async () => {
  const { data } = await axios.get("/users/buildings/");
  return data;
});

export const getUsers = createAsyncThunk("users/get", async () => {
  const { data } = await axios.get("/users/");
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout: (state, action) => {
      localStorage.clear();
      state.isLoggedIn = false;
      axios.defaults.headers.common["authorization"] = null;
      state.posts = [];
      state.postDetails = {};
      state.comments = [];
      state.user = {};
      state.users = [];
      state.buildings = [];
      state = initialState;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const token = action.payload.token;
      const id = action.payload.id;
      const email = action.payload.email;
      const username = action.payload.username;
      localStorage.setItem(
        "login",
        JSON.stringify({ token, id, email, username, isLoggedIn: true })
      );
      state.user.id = id;
      state.user.email = email;
      state.user.username = username;
      state.status = "success";
      state.isLoggedIn = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = "success";
      const token = action.payload.token;
      const id = action.payload.id;
      const email = action.payload.email;
      const username = action.payload.username;
      localStorage.setItem(
        "login",
        JSON.stringify({ token, id, email, username, isLoggedIn: true })
      );
      state.user.id = id;
      state.user.email = email;
      state.user.username = username;
      state.isLoggedIn = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
    },

    [getBuildings.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBuildings.fulfilled]: (state, action) => {
      state.status = "success";
      state.buildings = action.payload;
    },
    [getBuildings.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getUsers.pending]: (state, action) => {
      state.userStatus = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userStatus = "success";
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.userStatus = "failed";
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
