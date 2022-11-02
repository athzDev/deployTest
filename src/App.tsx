import React from 'react';
import styled from "styled-components";
import PageRouter from './router/index';
import './App.css';
import "./fonts/fonts.scss";

function App() {
  return (
    <MainWrapper>
      <PageRouter />
    </MainWrapper>
  );
}

export default App;

const MainWrapper = styled.div`
  width: 100%;
  font-family: 'Inter';
  height: auto;
`;

// const BodyWrapper = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   margin-top: 30px;
// `;