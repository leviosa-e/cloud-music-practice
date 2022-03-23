import React, { useEffect, useContext } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
// components
import Horizon from "../../baseUI/horizon-item";
import Loading from "../../baseUI/loading";
import Scroll from "../../components/scroll";
import { alphaTypes, categoryTypes } from "../../api/config";
// route
import { useNavigate, Outlet } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as actionCreators from "./store/actionCreators";
import { CategoryDataContext } from "./data";
// style
import { NavContainer, ListContainer, List, ListItem } from "./style";
import { CHANGE_ALPHA, CHANGE_CATEGORY } from "./data";

/* //mock 数据
const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
  return {
    picUrl:
      "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  };
}); */

function Singers(props) {
  /* const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState(""); */

  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();

  const navigate = useNavigate();

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = props;

  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;

  const handleUpdateCategory = (val) => {
    dispatch({ type: CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha);
  };
  const handleUpdateAlpha = (val) => {
    // setAlpha(val);
    dispatch({ type: CHANGE_ALPHA, data: val });
    updateDispatch(category, val);
  };
  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const enterDetail = (id) => {
    navigate(`/singers/${id}`);
  };

  useEffect(() => {
    if (!singerList.size) getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      src={require("./singer.png")}
                      width="100%"
                      height="100%"
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="singer"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={"分类（默认热门）："}
          handleClick={handleUpdateCategory}
          oldVal={category}
        ></Horizon>
        <Horizon
          list={alphaTypes}
          title={"首字母："}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizon>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
      <Outlet></Outlet>
    </div>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(actionCreators.getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(actionCreators.changePageCount(0)); // 由于改变了分类，所以pageCount清零
      dispatch(actionCreators.changeEnterLoading(true));
      dispatch(actionCreators.getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(actionCreators.changePullUpLoading(true));
      dispatch(actionCreators.changePageCount(count + 1));
      if (hot) dispatch(actionCreators.refreshMoreHotSingerList());
      else dispatch(actionCreators.refreshMoreSingerList(category, alpha));
    },
    // 顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(actionCreators.changePullDownLoading(true));
      dispatch(actionCreators.changePageCount(0));
      if (category === "" && alpha === "")
        dispatch(actionCreators.getHotSingerList());
      else dispatch(actionCreators.getSingerList(category, alpha));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
