import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import * as configs from "../../apiConfigs";
import * as actions from "../../slices/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import millify from "millify";

const Exchanges = () => {
  const dispatchAction = useDispatch();
  const lessThan1200 = useMediaQuery("(max-width: 1200px)");
  const { exchanges } = useSelector((state) => state.crypto);

  React.useEffect(() => {
    fetch(configs.baseURL + "/exchanges", {
      method: "GET",
      headers: configs.headers,
    })
      .then((res) => res.json())
      .then((response) => {
        dispatchAction(
          actions.update_exchanges({ exchanges: response.data.exchanges })
        );
      });
  }, [dispatchAction]);

  return (
    <Box>
      {exchanges.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Accordion disabled TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  xs={12}
                  sm={2}
                  pb={lessThan1200 ? (theme) => theme.spacing(2) : 0}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    pl={(theme) => theme.spacing(2)}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">24h Trade Volume</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Markets</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Change</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
          </Accordion>
          {exchanges.value.map((exchange, ndx) => {
            return (
              <Accordion key={ndx} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid
                      item
                      display="flex"
                      alignItems="center"
                      xs={12}
                      sm={2}
                      pb={lessThan1200 ? (theme) => theme.spacing(4) : 0}
                    >
                      <img
                        src={exchange.iconUrl}
                        alt={exchange.name}
                        style={{
                          width: "30px",
                          userSelect: "none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        pl={(theme) => theme.spacing(2)}
                      >
                        {exchange.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {`$ ${millify(exchange.volume)}`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {millify(exchange.numberOfMarkets)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {`${millify(exchange.marketShare)} %`}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {HTMLReactParser(`${exchange.description}`)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Exchanges;
