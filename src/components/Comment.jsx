import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Comment({ comment }) {
  return (
    <Box
      padding="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src="/logo.png" alt="lgoog" width="50px" />
        </Grid>
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
                    {comment.author}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {comment.created_at}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {comment.comment}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
