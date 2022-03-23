import styled from "styled-components";
import style from "../../assets/global-style";

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  // 注意在这里背景改为自配置参数控制
  ${(props) =>
    props.showBackground
      ? `background: ${style["highlight-background-color"]};`
      : ""}
  .first_line {
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 10px;
    padding: 10px 0;
    border-bottom: 1px solid ${style["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${style["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${style["font-size-s"]};
        color: ${style["font-color-desc-v2"]};
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
      right: 0;
      top: 0;
      bottom: 0;
      width: 130px;
      line-height: 34px;
      color: ${style["font-color-light"]};
      font-size: 0;
      vertical-align: top;
      background: ${style["theme-color"]};
      border-radius: 3px;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      color: ${style["font-color-desc"]};
      background: ${style["background-color"]};
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
      border-bottom: 1px solid ${style["border-color"]};
      ${style.noWrap()};
      > span {
        ${style.noWrap()};
      }
      > span:first-child {
        color: ${style["font-color-desc"]};
      }
      > span:last-child {
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;
