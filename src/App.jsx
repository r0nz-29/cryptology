import React from "react";
import SideBar from "./components/Drawer";
import { Box, useMediaQuery } from "@mui/material";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import * as configs from "./apiConfigs";
import * as actions from "./slices/cryptoSlice";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CoinDetails from "./components/CoinDetails";
import News from "./components/News";
import Exchanges from "./components/Exchanges";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import Header from "./components/Header";

function App() {
  const dispatchAction = useDispatch();
  const { theme } = useSelector((state) => state.crypto);
  const lessThan1200 = useMediaQuery("(max-width: 1200px)");

  const query = "crypto+currency";
  const count = 100;
  React.useEffect(() => {
    fetch(configs.baseURL + "/coins?limit=100", {
      method: "GET",
      headers: configs.headers,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "success") {
          dispatchAction(actions.update_stats({ stats: response.data.stats }));
          dispatchAction(actions.update_coins({ coins: response.data.coins }));
        }
      });

    fetch(
      configs.bingBaseURL +
        `?q=${query}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
      {
        method: "GET",
        headers: configs.bingNewsHeaders,
      }
    )
      .then((res) => res.json())
      .then((response) =>
        dispatchAction(actions.update_news({ news: response.value }))
      );
  }, [dispatchAction]);

  return (
    <ThemeProvider theme={theme.mode === "light" ? lightTheme : darkTheme}>
      <Box
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        pb="80px"
      >
        {lessThan1200 && <Header />}
        <SideBar />
        <Box
          ml={lessThan1200 ? 0 : "240px"}
          p={(theme) => theme.spacing(lessThan1200 ? 2 : 8)}
          pt={(theme) => theme.spacing(4)}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/cryptocurrencies"
              component={Cryptocurrencies}
            />
            <Route exact path="/news" component={News} />
            <Route exact path="/coins/:coinid" component={CoinDetails} />
            <Route exact path="/exchanges" component={Exchanges} />
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
