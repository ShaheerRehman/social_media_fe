import axios from "axios";

export const addPost = async (postData) => {
  const storedData = localStorage.getItem("login");
  const { token } = JSON.parse(storedData);
  try {
    const { data } = await axios.post("/posts/", postData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const addComment = async (commentData) => {
  const storedData = localStorage.getItem("login");
  const { token } = JSON.parse(storedData);
  try {
    const { data } = await axios.post("/comments/", commentData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const likeOrDislikePost = async (postData) => {
  const storedData = localStorage.getItem("login");
  const { token } = JSON.parse(storedData);
  try {
    const { data } = await axios.post("/likes/", postData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const deletePost = async (postData) => {
  const storedData = localStorage.getItem("login");
  const { token } = JSON.parse(storedData);
  try {
    const data = await axios.delete(`/posts/${postData.id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};
