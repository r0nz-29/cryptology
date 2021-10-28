import {
  Button,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import React from "react";
import { open_in_new_tab } from "../Utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const News = ({ minified }) => {
  const history = useHistory();
  const { news } = useSelector((state) => state.crypto);
  let count = 100;
  if (minified) count = 10;
  return (
    <Box>
      {minified && (
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          mt={(theme) => theme.spacing(5)}
        >
          <Grid item>
            <Typography
              variant="h4"
              color="text.primary"
              pb={(theme) => theme.spacing(4)}
            >
              Latest Crypto News
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => history.push("/news")}>view more</Button>
          </Grid>
        </Grid>
      )}
      {news.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {news.value.map((item, ndx) => {
            return (
              <React.Fragment key={ndx}>
                {ndx < count && (
                  <Grid item xs={12} md={6} xl={3}>
                    <Card
                      onClick={() => {
                        open_in_new_tab(`${item.url}`);
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.image?.thumbnail.contentUrl}
                        sx={{ maxHeight: "200px" }}
                      />
                      <CardContent>
                        <Typography
                          variant="h5"
                          color="text.primary"
                          fontWeight="bold"
                          pb={(theme) => theme.spacing(2)}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default News;
