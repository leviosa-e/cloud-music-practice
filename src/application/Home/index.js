import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Player from "../Player";
import { Top, Tab, TabItem } from "./style";

function Home(props) {
  const activeClassName = "selected";

  const navigate = useNavigate();

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Cloud Music</span>
        <span className="iconfont search" onClick={() => navigate("/search")}>
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/singers"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/rank"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player></Player>
    </div>
  );
}

export default React.memo(Home);
