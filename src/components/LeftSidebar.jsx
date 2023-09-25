import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Input,
  useTheme,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getBuildings, logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { getPosts } from "../redux/postSlice";
import { addPost } from "../api";

export default function LeftSidebar() {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { status, buildings } = useSelector((state) => state.auth);
  // const { _id } = JSON.parse(localStorage.getItem("login"));

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  React.useEffect(() => {
    dispatch(getBuildings());
  }, [dispatch]);

  const [postText, setPostText] = React.useState("");
  const [postTitle, setPostTitle] = React.useState("");
  const handleAddPost = async () => {
    const data = await addPost({ title: postTitle, description: postText });
    if (data) {
      // dispatch(getPosts());
      navigate("/");
      setPostText("");
      setPostTitle("");
    }
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%", marginTop: "10px" }}>
        <Box textAlign="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <img src="/logo.png" alt="logo" width="50px" />
          </Link>
        </Box>
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.action.active,
                  }}
                  primary="My Building"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          {status === "success" &&
            buildings.map((building) => (
              <NavLink
                to={`/${building.building_name}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor: "inherit",
                }}
              >
                <ListItem
                  button
                  sx={{
                    borderRadius: "28px",
                    margin: ".5rem 0",
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon fontSize="medium" color="action" />
                  </ListItemIcon>
                  <Hidden lgDown>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "18px",
                        color: theme.palette.action.active,
                      }}
                      primary={building.building_name}
                    />
                  </Hidden>
                </ListItem>
              </NavLink>
            ))}
          <ListItem
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <FavoriteIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Likes"
              />
            </Hidden>
          </ListItem>
          <ListItem
            id="basic-button"
            button
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
            onClick={() => {
              dispatch(logout());
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: theme.palette.action.active,
                }}
                primary="Logout"
              />
            </Hidden>
          </ListItem>
        </List>
        <Hidden lgDown>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            fullWidth
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Post"}
          len={postText.trimStart().length}
          handleSave={handleAddPost}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box padding=".5rem 0">
                  <Input
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="What's happening?"
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
