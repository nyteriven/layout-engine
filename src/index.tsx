import * as React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { LayoutDemo } from "./LayoutEngine";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    height: 100vh;
    background-image: linear-gradient(0deg, #f794a4 0%, #fdd6bd 100%);    
  }
  pre {
    margin: 0;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Center)`
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Container>
      <GlobalStyle />
      <LayoutDemo />
    </Container>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
