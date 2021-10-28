import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import RedditIcon from "@mui/icons-material/Reddit";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";

export function open_in_new_tab(url) {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href = url;
  a.click();
}

export function getIcon(string) {
  switch (string) {
    case "twitter":
      return <TwitterIcon />;
    case "discord":
      return <ChildCareIcon />;
    case "telegram":
      return <TelegramIcon />;
    case "reddit":
      return <RedditIcon />;
    case "youtube":
      return <YouTubeIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "github":
      return <GitHubIcon />;
    case "website":
      return <LanguageIcon />;
    default:
      break;
  }
}

export const Row = ({ item, divider, links }) => {
  return (
    <>
      <ListItem
        button
        onClick={() => {
          if (links) open_in_new_tab(item.url);
        }}
      >
        <ListItemIcon>{links ? getIcon(item.type) : item.icon}</ListItemIcon>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body1" color="text.primary">
              {links ? item.name : item.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="span"
              variant="h6"
              color="text.primary"
              fontWeight="bolder"
              sx={{ float: "right" }}
            >
              {item.feature}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      {divider && <Divider />}
    </>
  );
};
