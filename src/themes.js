import { createGlobalStyle } from "styled-components";

// Light Theme Config
export const lightTheme = {
  bg: "#ffffff",
  text: "#000000",
  backgroundText: "#DADCE0",
};

// Dark Theme Config
export const darkTheme = {
  bg: "#262626",
  text: "#e1e2e2",
  backgroundText: "#474b4f",
};

// Replace primary and secondary colors

export const GlobalStyles = createGlobalStyle`

    :root {
      --primary: #04005e;
      --secondary:#440bd4;
      --tertiary:#ff2079;
      --accent: #e92efb;
      --text : ${(props) => props.theme.text};
      --backgroundText : ${(props) => props.theme.backgroundText};
      --bg : ${(props) => props.theme.bg};
    }
    
    body {
        background-color : ${(props) => props.theme.bg};
        transition: all 0.25s linear;
    }

`;

