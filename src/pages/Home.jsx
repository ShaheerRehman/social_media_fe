import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import AssistantIcon from "@mui/icons-material/Assistant";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/postSlice";
import AddPost from "../components/AddPost";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Home() {
  const [author, setAuthor] = React.useState("");
  const [apartment_number, setApartment_number] = React.useState(null);
  const [reset, setReset] = React.useState(false);
  const dispatch = useDispatch();
  const { building } = useParams();
  const { status, posts } = useSelector((state) => state.post);
  useEffect(() => {
    if (author !== "") {
      building === undefined &&
        dispatch(
          getPosts({ building: "mine", author, apartment_number: null })
        );
      building !== undefined &&
        dispatch(getPosts({ building, author, apartment_number: null }));
      setAuthor("");
    }
    if (apartment_number !== null) {
      building === undefined &&
        dispatch(
          getPosts({ building: "mine", author: null, apartment_number })
        );
      building !== undefined &&
        dispatch(getPosts({ building, author: null, apartment_number }));
      setApartment_number(null);
    }
  }, [author, apartment_number, dispatch]);

  useEffect(() => {
    if (building === undefined) {
      dispatch(
        getPosts({ building: "mine", author: null, apartment_number: null })
      );
    } else {
      dispatch(getPosts({ building, author: null, apartment_number: null }));
    }
    setReset(false);
  }, [dispatch, building, reset]);

  return (
    <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="h6"
              component={Link}
              onClick={() => {
                setAuthor("");
                setApartment_number(null);
                setReset(true);
              }}
            >
              All Feed - {building === undefined ? "My Building" : building}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <AssistantIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box height="92vh" sx={{ overflowY: "scroll" }}>
        {building === undefined && <AddPost />}
        <Box textAlign="center" marginTop="1rem">
          {status === "loading" && (
            <CircularProgress size={20} color="primary" />
          )}
        </Box>
        {status === "success" &&
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              setApartment_number={setApartment_number}
              setAuthor={setAuthor}
              building={building === undefined ? "mine" : building}
            />
          ))}
      </Box>
    </Box>
  );
}
