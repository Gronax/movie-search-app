import { createTheme } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";
import LinkBehavior from "../utils/LinkBehavior";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
