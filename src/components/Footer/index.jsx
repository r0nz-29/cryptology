import { AppBar, Box, Grid } from "@mui/material";
import reactjs from "../../images/react-js.svg";
import redux from "../../images/redux.svg";
import materialui from "../../images/material-ui.svg";
import rapidapi from "../../images/rapidapi.svg";

const Footer = () => {
  return (
    <Box>
      <AppBar
        position="absolute"
        color="info"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "none",
          p: (theme) => theme.spacing(2),
          borderTop: "1px solid ",
          borderTopColor: (theme) => theme.palette.divider,
        }}
      >
        <Grid container alignContent="center" justifyContent="space-between">
          {[reactjs, redux, materialui, rapidapi].map((icon, ndx) => (
            <Grid item key={ndx}>
              <img src={icon} alt="stack" style={{ width: "30px" }} />
            </Grid>
          ))}
        </Grid>
      </AppBar>
    </Box>
  );
};
export default Footer;
