import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    "html, body": {
      backgroundColor: props.colorMode === "dark" ? "#161f2e" : "white",
    },
  }),
};

const theme = extendTheme({ config, styles });
export default theme;
