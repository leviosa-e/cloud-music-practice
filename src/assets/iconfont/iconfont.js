import { createGlobalStyle } from "styled-components";
import iconWoff2 from "./iconfont.woff2?t=1643805947609";
import iconWoff from "./iconfont.woff?t=1643805947609";
import iconTtf from "./iconfont.ttf?t=1643805947609";

export const IconStyle = createGlobalStyle`
  @font-face {
  font-family: "iconfont"; /* Project id 3168102 */
  src: url(${iconWoff2}) format('woff2'),
       url(${iconWoff}) format('woff'),
       url(${iconTtf}) format('truetype');
}

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
