import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 0.25rem solid grey;
  border-right: 0.25rem solid grey;
  border-bottom: 0.25rem solid grey;
  border-left: 0.25rem solid black;
  background: transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  z-index: 1060;
`;

export const Spinner = ({ className = "" }) => <StyledSpinner />;

export default Spinner;
