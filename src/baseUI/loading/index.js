import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import style from "../../assets/global-style";

const loading = keyframes`
  0% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(0.0);
  }
`;

const LoadingWrapper = styled.div`
  > div {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 50%;
    opacity: 0.6;
    background-color: ${style["theme-color"]};
    animation: ${loading} 1.4s infinite ease-in;
    z-index: 1000;
  }
  > div:nth-child(2) {
    animation-delay: -0.7s;
  }
`;

function Loading(props) {
  const { show } = props;
  return (
    <LoadingWrapper style={show ? { display: "" } : { display: "none" }}>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}

Loading.defaultProps = {
  show: true,
};

Loading.propTypes = {
  show: PropTypes.bool,
};

export default React.memo(Loading);
