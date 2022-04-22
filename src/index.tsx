import * as React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    height: 100vh;
    background-image: linear-gradient(0deg, #f794a4 0%, #fdd6bd 100%);    
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

const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;

  ::before {
    backdrop-filter: red;
  }
`;

const App: React.FC = () => {
  return (
    <Container>
      <GlobalStyle />
      <AppContainer>
        <h1>React, Typescript & Styled-Components</h1>
        <h2>Start editing to see some magic happen!</h2>
      </AppContainer>
    </Container>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
