import {
  AppBar,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggle_drawer } from "../../slices/cryptoSlice";
import { useHistory } from "react-router";

const Header = () => {
  const lessThan1200 = useMediaQuery("(max-width: 1200px)");
  const dispatchAction = useDispatch();
  const history = useHistory();
  return (
    <>
      <AppBar
        position={lessThan1200 ? "fixed" : "sticky"}
        color="info"
        sx={{
          py: (theme) => theme.spacing(1.8),
          boxShadow: !lessThan1200 && "none",
          top: lessThan1200 && "auto",
          bottom: lessThan1200 && 0,
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <IconButton color="primary" onClick={() => history.push("/")}>
                <QueryStatsIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                component="span"
                variant="h4"
                fontWeight="900"
                color="text.primary"
              >
                Cryptology
              </Typography>
            </Grid>
            {lessThan1200 && (
              <Grid item>
                <IconButton
                  onClick={() => {
                    dispatchAction(toggle_drawer());
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default Header;
