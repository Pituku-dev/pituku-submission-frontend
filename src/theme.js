import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Lexend, sans-serif",
    body: "Lexend, sans-serif",
  },
  initialColorMode: "light",
  useSystemColorMode: true,
});

export default theme;
