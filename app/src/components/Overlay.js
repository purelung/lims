import React, { ReactElement } from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1050;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = ({ children, height, width }) => (
  <StyledOverlay
    style={{
      height: height,
      width: width,
    }}
  >
    {children}
  </StyledOverlay>
);

export default Overlay;
