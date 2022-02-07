import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Top, Tab, TabItem } from "./style";

function Home(props) {
  const activeClassName = "selected";
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe714;</span>
        <span className="title">Cloud Music</span>
        <span className="iconfont search">&#xe8ef;</span>
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
    </div>
  );
}

export default React.memo(Home);
