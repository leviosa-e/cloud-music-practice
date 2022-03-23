import styled from "styled-components";
import style from "../../assets/global-style";

export const NavContainer = styled.div`
  position: fixed;
  top: 95px;
  overflow: hidden;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: auto;
  .title {
    margin: 10px 0 10px 10px;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
  }
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid ${style["border-color"]}
  box-sizing: border-box;
  .img_wrapper {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .name {
    color: ${style["font-color-desc"]}
    font-size: ${style["font-size-m"]}
    font-weight: 500;
  }
`;

export const EnterLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`;
