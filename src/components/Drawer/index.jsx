import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../Header";
import { toggle_theme, toggle_drawer } from "../../slices/cryptoSlice";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MultipleStopOutlinedIcon from "@mui/icons-material/MultipleStopOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { useMediaQuery } from "@mui/material";
import Footer from "../Footer";

const SideBar = () => {
  const history = useHistory();
  const dispatchAction = useDispatch();
  const { theme, showDrawer } = useSelector((state) => state.crypto);
  const lessThan1200 = useMediaQuery("(max-width: 1200px)");

  function navigate(nav) {
    switch (nav) {
      case "Home":
        history.push("/");
        break;
      case "Exchanges":
        history.push("/exchanges");
        break;
      case "Cryptocurrencies":
        history.push("/cryptocurrencies");
        break;
      case "News":
        history.push("/news");
        break;

      case "Toggle theme":
        dispatchAction(toggle_theme(theme.mode === "light" ? "dark" : "light"));
        break;

      default:
        history.push("/");
        break;
    }
  }

  return (
    <Drawer
      variant={lessThan1200 ? "temporary" : "permanent"}
      open={showDrawer}
      anchor={lessThan1200 ? "top" : "left"}
      onClose={() => dispatchAction(toggle_drawer())}
    >
      {!lessThan1200 && <Header />}
      <List sx={{ width: lessThan1200 ? "100%" : "260px" }}>
        {[
          { title: "Home", icon: <HomeIcon /> },
          {
            title: "Cryptocurrencies",
            icon: <LocalAtmOutlinedIcon />,
          },
          { title: "Exchanges", icon: <MultipleStopOutlinedIcon /> },
          { title: "News", icon: <CallToActionOutlinedIcon /> },
          {
            title: "Toggle theme",
            icon:
              theme.mode === "light" ? <NightsStayIcon /> : <Brightness7Icon />,
          },
        ].map((item, ndx) => {
          return (
            <ListItem
              button
              key={ndx}
              onClick={() => {
                navigate(item.title);
                if (lessThan1200) dispatchAction(toggle_drawer());
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography variant="body1" color="text.primary">
                  {item.title}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      {!lessThan1200 && <Footer />}
    </Drawer>
  );
};

export default SideBar;
