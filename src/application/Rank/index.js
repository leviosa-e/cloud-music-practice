import React, { useEffect } from "react";
// redux
import { connect } from "react-redux";
import { getRankList } from "./store";
import { filterIndex, filterIdx } from "../../api/utils";
// components
import Scroll from "../../components/scroll";
import Loading from "../../baseUI/loading";
// route
import { useNavigate, Outlet } from "react-router-dom";
// import { routeConfigs } from "../../routes";
// style
import { Container, List, ListItem, SongList } from "./style";
import { EnterLoading } from "../Singers/style";

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  const rankList = list.toJS();

  // const routes = useRoutes(routeConfigs);

  const navigate = useNavigate();

  useEffect(() => {
    if (!rankList.length) getRankListDataDispatch();
    // eslint-disable-next-line
  }, []);

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  const enterDetail = (detail) => {
    navigate(`/rank/${detail.id}`);
    /* const idx = filterIdx(name);
    if (idx === null) {
      alert("暂无相关数据");
      return;
    } */
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        ))}
      </SongList>
    ) : null;
  };

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.coverImgId + "" + Math.random()}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="rank" />
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      <Outlet></Outlet>
      {/* {routes} */}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
