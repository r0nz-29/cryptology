import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import millify from "millify";

const Cryptocurrencies = ({ minified }) => {
  const { coinList } = useSelector((state) => state.crypto);
  const history = useHistory();

  let shortList = [];
  if (minified) {
    for (let index = 0; index < 10; index++) {
      shortList[index] = coinList.value[index];
    }
  }

  return (
    <Box>
      {
        minified && (
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
                Top 10 Cryptocurrencies in the world
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => history.push("/cryptocurrencies")}>
                view more
              </Button>
            </Grid>
          </Grid>
        )
        //  (
        // <TextField
        //   label="Search coins"
        //   fullWidth
        //   sx={{ mb: (theme) => theme.spacing(4) }}
        // />
        // )
      }
      {coinList.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {shortList.length > 0
            ? shortList.map((coin, ndx) => {
                return (
                  <Grid item key={ndx} xs={12} sm={6} lg={4} xl={3}>
                    <Paper
                      elevation={3}
                      onClick={() => history.push(`/coins/${coin.id}`)}
                    >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        pb={(theme) => theme.spacing(4)}
                      >
                        <Grid item>
                          <Typography
                            variant="h6"
                            color="text.primary"
                            fontWeight="bold"
                          >
                            {coin.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img
                            src={coin.iconUrl}
                            alt={coin.name}
                            style={{ width: "30px", userSelect: "none" }}
                          />
                        </Grid>
                      </Grid>
                      <Typography pb={(theme) => theme.spacing(1)}>
                        Price: {`${millify(coin.price)} USD`}
                      </Typography>
                      <Typography pb={(theme) => theme.spacing(1)}>
                        Market Cap: {millify(coin.marketCap)}
                      </Typography>
                      <Typography pb={(theme) => theme.spacing(1)}>
                        Daily Change: {millify(coin.change)}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })
            : coinList.value.map((coin, ndx) => (
                <Grid item key={ndx} xs={12} sm={6} lg={4} xl={3}>
                  <Paper
                    elevation={3}
                    onClick={() => history.push(`/coins/${coin.id}`)}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      pb={(theme) => theme.spacing(4)}
                    >
                      <Grid item>
                        <Typography
                          variant="h6"
                          color="text.primary"
                          fontWeight="bold"
                        >
                          {coin.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img
                          src={coin.iconUrl}
                          alt={coin.name}
                          style={{ width: "30px" }}
                        />
                      </Grid>
                    </Grid>
                    <Typography pb={(theme) => theme.spacing(1)}>
                      Price: {`${millify(coin.price)} USD`}
                    </Typography>
                    <Typography pb={(theme) => theme.spacing(1)}>
                      Market Cap: {millify(coin.marketCap)}
                    </Typography>
                    <Typography pb={(theme) => theme.spacing(1)}>
                      Daily Change: {millify(coin.change)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      )}
    </Box>
  );
};

export default Cryptocurrencies;
