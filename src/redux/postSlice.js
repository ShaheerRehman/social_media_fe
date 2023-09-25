import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  posts: [],
  postDetails: {},
  commentStatus: "idle",
  comments: [],
};
// const storedData = localStorage.getItem("login");
// const { token } = JSON.parse(storedData);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ building, author, apartment_number }) => {
    let url = "/posts/";
    if (building) {
      url += `?building_name=${building}`;
    }
    if (author) {
      url += `&author=${author}`;
    }
    if (apartment_number) {
      url += `&apartment_number=${apartment_number}`;
    }
    const { data } = await axios.get(url);
    return data;
  }
);

export const getPostDetails = createAsyncThunk(
  "post/getPostDetails",
  async (id) => {
    const { data } = await axios.get(
      "/posts/" + id
      // {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // }
    );
    return data;
  }
);

export const getComments = createAsyncThunk("post/getComments", async (id) => {
  const { data } = await axios.get(
    "/comments/" + id
    // {
    //   headers: {
    //     Authorization: `Token ${token}`,
    //   },
    // }
  );
  return data;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateLike: (state, action) => {
      console.log(action);
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index].is_liked = !state.posts[index].is_liked;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.postDetails = action.payload;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getComments.pending]: (state, action) => {
      state.commentStatus = "loading";
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentStatus = "success";
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.commentStatus = "failed";
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;
