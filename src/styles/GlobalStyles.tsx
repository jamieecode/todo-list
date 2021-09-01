import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle` 
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        color: #000;
        
    }
    button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 0.3em;
        color: #fff;
    }

`;
