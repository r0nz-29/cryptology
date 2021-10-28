import {
  Typography,
  Box,
  Grid,
  Paper,
  List,
  CircularProgress,
  Card,
  Button,
  ButtonGroup,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import millify from "millify";
import * as configs from "../../apiConfigs";
import * as actions from "../../slices/cryptoSlice";
import { useParams } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MoneyIcon from "@mui/icons-material/Money";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import WineBarIcon from "@mui/icons-material/WineBar";
import InfoIcon from "@mui/icons-material/Info";
import TagIcon from "@mui/icons-material/Tag";
import BoltIcon from "@mui/icons-material/Bolt";
import { useDispatch, useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
import Chart from "./Chart";
import { Row } from "../Utils";

const CoinDetails = () => {
  const { coinid } = useParams();
  const dispatchAction = useDispatch();
  const { coinDetails, theme } = useSelector((state) => state.crypto);
  const [timeperiod, setTimeperiod] = React.useState("1y");
  const lessThan900 = useMediaQuery("(max-width: 900px)");
  const lessThan600 = useMediaQuery("(max-width: 600px)");

  const durations = ["24h", "7d", "30d", "1y", "5y"];

  React.useEffect(() => {
    fetch(configs.baseURL + `/coin/${coinid}`, {
      method: "GET",
      headers: configs.headers,
    })
      .then((res) => res.json())
      .then((response) => {
        dispatchAction(actions.update_coin({ coin: response.data.coin }));
      });

    fetch(configs.baseURL + `/coin/${coinid}/history/${timeperiod}`, {
      method: "GET",
      headers: configs.headers,
    })
      .then((res) => res.json())
      .then((response) => {
        dispatchAction(
          actions.update_history({ coinHistory: response.data.history })
        );
      });
  }, [coinid, dispatchAction, timeperiod]);

  return (
    <Box>
      {coinDetails.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          columnSpacing={2}
        >
          <Grid item>
            <img
              src={coinDetails.value.iconUrl}
              alt={coinDetails.value.name}
              style={{
                width: "40px",
                userSelect: "none",
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="text.primary"
              fontWeight="bold"
              textAlign="center"
            >
              {coinDetails.value.name}
            </Typography>
          </Grid>
          {!lessThan600 && (
            <Grid item textAlign="center" ml={(theme) => theme.spacing(2)}>
              <ButtonGroup variant="text" color="info">
                {durations.map((item, ndx) => {
                  return (
                    <Button
                      key={ndx}
                      onClick={() => setTimeperiod(item)}
                      sx={{
                        color:
                          timeperiod === item
                            ? "#4FD1C5"
                            : (theme) => theme.palette.text.primary,
                        backgroundColor:
                          timeperiod === item
                            ? "#4FD1C530"
                            : (theme) => theme.palette.background.paper,
                        fontSize: "16px",
                      }}
                    >
                      {item}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Grid>
          )}
          <Grid item flex={2} textAlign="right">
            <Typography variant="body1" color="text.primary" fontWeight="bold">
              Current Price: {lessThan600 && <br />} ${" "}
              {millify(coinDetails.value.price)}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        justifyContent="space-around"
        mt={(theme) => theme.spacing(8)}
        mb={(theme) => theme.spacing(lessThan900 ? 2 : 8)}
        spacing={2}
      >
        {!lessThan600 && (
          <Grid item xs={12} pb={(theme) => theme.spacing(10)}>
            {coinDetails.isLoading ? (
              <CircularProgress />
            ) : (
              <Chart history={coinDetails.history} />
            )}
          </Grid>
        )}
        <Grid item xs={12} md={5} lg={6} xl={5}>
          <Paper>
            <Typography variant="h5" color="text.primary" fontWeight="bold">
              {coinDetails.value.name} Statistics
            </Typography>
            {coinDetails.isLoading ? (
              <CircularProgress />
            ) : (
              <List>
                {[
                  {
                    icon: <MoneyIcon />,
                    title: "Price to USD",
                    feature: `$ ${millify(coinDetails.value.price)}`,
                  },
                  {
                    icon: <TagIcon />,
                    title: "Rank",
                    feature: millify(coinDetails.value.rank),
                  },
                  {
                    icon: <BoltIcon />,
                    title: "24h Volume",
                    feature: `$ ${millify(coinDetails.value.volume)}`,
                  },
                  {
                    icon: <LocalMallIcon />,
                    title: "Market Cap",
                    feature: `$ ${millify(coinDetails.value.marketCap)}`,
                  },
                  {
                    icon: <WineBarIcon />,
                    title: "All time high (Daily Avg.)",
                    feature: `$ ${millify(
                      coinDetails.value.allTimeHigh.price
                    )}`,
                  },
                ].map((item, ndx) => {
                  return <Row key={ndx} item={item} divider={ndx !== 4} />;
                })}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={6} xl={5}>
          <Paper>
            <Typography variant="h5" color="text.primary" fontWeight="bold">
              More Statistics
            </Typography>
            {coinDetails.isLoading ? (
              <CircularProgress />
            ) : (
              <List>
                {[
                  {
                    icon: <MoneyIcon />,
                    title: "Number of Markets",
                    feature: `${millify(coinDetails.value.numberOfMarkets)}`,
                  },
                  {
                    icon: <TagIcon />,
                    title: "Number of Exchanges",
                    feature: millify(coinDetails.value.numberOfExchanges),
                  },
                  {
                    icon: <InfoIcon />,
                    title: "Approved Supply",
                    feature: coinDetails.value.approvedSupply ? (
                      <CheckIcon color="success" />
                    ) : (
                      <HighlightOffIcon color="danger" />
                    ),
                  },
                  {
                    icon: <InfoIcon />,
                    title: "Total Supply",
                    feature: `$ ${millify(
                      coinDetails.value.circulatingSupply
                    )}`,
                  },
                  {
                    icon: <InfoIcon />,
                    title: "Circulating Supply",
                    feature: `$ ${millify(
                      coinDetails.value.allTimeHigh.price
                    )}`,
                  },
                ].map((item, ndx) => {
                  return <Row key={ndx} item={item} divider={ndx !== 4} />;
                })}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        direction="row-reverse"
        justifyContent="space-around"
      >
        {coinDetails.isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item xs={12} md={5} lg={6} xl={5}>
              <Card>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight="bold"
                  pb={(theme) => theme.spacing(2)}
                >
                  Useful Links
                </Typography>
                {coinDetails.value.links.map((item, ndx) => {
                  return <Row key={ndx} item={item} links />;
                })}
              </Card>
            </Grid>
            <Grid item xs={12} md={5} lg={6} xl={5}>
              <Typography
                variant="h6"
                color={
                  theme.mode === "light" ? "text.primary" : "text.secondary"
                }
                fontWeight="bold"
              >
                About {coinDetails.value.name}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                textAlign="justify"
                color={
                  theme.mode === "light" ? "text.primary" : "text.secondary"
                }
              >
                {HTMLReactParser(coinDetails.value.description)}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CoinDetails;
