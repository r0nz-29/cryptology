import React from "react";
import millify from "millify";
import { Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";

const Home = () => {
  const { stats } = useSelector((state) => state.crypto);
  return (
    <>
      <Typography
        variant="h4"
        color="text.primary"
        pb={(theme) => theme.spacing(2)}
      >
        Global Crypto Stats
      </Typography>
      {stats.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {[
            { title: "Total Currencies", value: stats.value?.total },
            {
              title: "Total Exchanges",
              value: millify(stats.value?.totalExchanges),
            },
            {
              title: "Total Market Cap",
              value: millify(stats.value?.totalMarketCap),
            },
            {
              title: "Total 24h Volume",
              value: millify(stats.value?.total24hVolume),
            },
            {
              title: "Total Markets",
              value: millify(stats.value?.totalMarkets),
            },
          ].map((item, ndx) => {
            return (
              <Grid item xs={12} sm={6} key={ndx}>
                <Paper elevation={3}>
                  <Typography variant="body1" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    {item.value}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Cryptocurrencies minified />
      <News minified />
    </>
  );
};

export default Home;
