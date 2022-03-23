import styled from "styled-components";
import globalStyle from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  background: #f2f3f4;
  z-index: 100;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
    transition: transform 0.3s;
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
    transition: transform 0.3s;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  z-index: 50;
  transform-origin: top;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;

export const CollectButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index: 50;
  background: ${globalStyle["theme-color"]};
  color: ${globalStyle["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size: 14px;
    letter-spacing: 5px;
  }
`;

export const SongListWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  > div {
    position: absolute;
    left: 0;
    overflow: visible;
    width: 100%;
  }
`;

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`;
