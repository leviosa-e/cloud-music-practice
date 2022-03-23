import React from "react";
import styled from "styled-components";
import globalStyle from "../../assets/global-style";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  padding-top: 0;
  line-height: 40px;
  color: ${globalStyle["font-color-light"]};
  /* color: ${globalStyle["theme-color"]}; */
  z-index: 100;
  .back {
    width: 20px;
    margin-right: 5px;
    font-size: 20px;
    /* color: ${globalStyle["theme-color"]}; */
  }
  > h1 {
    font-size: ${globalStyle["font-size-l"]};
    font-weight: 700;
  }
  .Marquee {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    height: 35px;
  }
  .text {
    /* position: absolute; */
    animation: marquee 10s linear infinite;
  }
  @keyframes marquee {
    from {
      /* left: 100%; */
      transform: translateX(100%);
    }
    to {
      /* left: -100%; */
      transform: translateX(-100%);
    }
  }
`;

// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? <h1 className="Marquee"></h1> : <h1>{title}</h1>}
    </HeaderContainer>
  );
});

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false,
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
};

export default React.memo(Header);
