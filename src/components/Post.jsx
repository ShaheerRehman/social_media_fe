import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link, useNavigate } from "react-router-dom";
import { addComment, deletePost, likeOrDislikePost } from "../api";
import { useDispatch } from "react-redux";
import { getPosts, updateLike } from "../redux/postSlice";
import Modal from "./Modal";

export default function Post({
  post,
  profile,
  building,
  setAuthor,
  setApartment_number,
}) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  // const [params, setParams] = useState({ author: "", apartment_number: null });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { username } = JSON.parse(localStorage.getItem("login"));
  const handleLike = async () => {
    dispatch(updateLike({ id: post.id }));
    const response = await likeOrDislikePost({ post: post.id });
    // if (response.message !== "Post updated successfully.") {
    //   dispatch(updateLike({ id: post.id }));
    // }
  };
  const handleAddComment = async () => {
    const response = await addComment({ post: post.id, comment: commentText });
    if (response) {
      setCommentText("");
    }
  };

  const handleAuthorClick = (author) => {
    setAuthor(author);
  };

  const apartmentClick = (apartment_number) => {
    setApartment_number(apartment_number);
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    const confirmation = window.confirm("Are you sure to delete this post?");
    if (!confirmation) return;
    const response = await deletePost({ id: post.id });
    console.log(response);
    if (response.status === 204) {
      dispatch(getPosts(building));
    }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Link
        to={`/posts/${post.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          padding="1rem"
          sx={{
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          <Grid container flexWrap="nowrap">
            {/* <Grid item sx={{ paddingRight: "1rem" }}>
              <Link to={`/profile/${post.author._id}`}>
                <img src="/logo.png" alt="lgoog" width="50px" />
              </Link>
            </Grid> */}
            <Grid item flexGrow="1">
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid item>
                    <Box display="flex">
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        component={Link}
                        onClick={() => handleAuthorClick(post.author)}
                      >
                        {post.author}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                        component={Link}
                        onClick={() => apartmentClick(post.apartment_number)}
                      >
                        {post.apartment}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        .
                      </Typography>
                      <Typography
                        sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                      >
                        {post.created_at}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", color: "#555" }}>
                        {post.description}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    {post.author === username && (
                      <IconButton
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(e);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={(e) => e.stopPropagation()}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={(e) => handleDeletePost(e)}>
                        Delete Post
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginRight="5rem"
                  marginTop=".8rem"
                >
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleModalOpen();
                    }}
                    size="small"
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike();
                    }}
                    size="small"
                  >
                    {post.is_liked ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          handleSave={handleAddComment}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
