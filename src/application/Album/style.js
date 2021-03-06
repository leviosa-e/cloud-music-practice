import styled from "styled-components";
import globalStyle from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  background: ${globalStyle["background-color"]};
  z-index: 1000;
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

export const TopDesc = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  margin-bottom: 20px;
  padding: 5px 20px;
  padding-bottom: 50px;
  background-size: 100%;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${(props) => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(20px);
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
      z-index: 10;
    }
  }
  .img_wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: ${globalStyle["font-size-s"]};
      line-height: 15px;
      color: ${globalStyle["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${globalStyle["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${globalStyle["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${globalStyle["font-size-m"]};
        color: ${globalStyle["font-color-desc-v2"]};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: -100px 0 0 0;
  padding: 0 30px 20px 30px;
  > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${globalStyle["font-size-s"]};
    color: ${globalStyle["font-color-light"]};
    font-weight: 500;
    z-index: 1000;
    .iconfont {
      font-size: 20px;
    }
  }
`;

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  background: ${globalStyle["highlight-background-color"]};
  .first_line {
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 10px;
    padding: 10px 0;
    border-bottom: 1px solid ${globalStyle["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${globalStyle["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${globalStyle["font-size-s"]};
        color: ${globalStyle["font-color-desc-v2"]};
      }
      > span {
        vertical-align: top;
      }
    }
    .add_list,
    .isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 130px;
      line-height: 34px;
      color: ${globalStyle["font-color-light"]};
      font-size: 0;
      vertical-align: top;
      border-radius: 3px;
      background: ${globalStyle["theme-color"]};
      .iconfont {
        margin: 0 5px 0 10px;
        vertical-align: top;
        font-size: 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      color: ${globalStyle["font-color-desc"]};
      background: ${globalStyle["background-color"]};
    }
  }
`;

export const SongItem = styled.ul`
  > li {
    display: flex;
    align-items: center;
    height: 60px;
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      height: 100%;
      padding: 5px 0;
      border-bottom: 1px solid ${globalStyle["border-color"]};
      ${globalStyle.noWrap()};
      > span {
        ${globalStyle.noWrap()};
      }
      > span:first-child {
        color: ${globalStyle["font-color-desc"]};
      }
      > span:last-child {
        font-size: ${globalStyle["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;
