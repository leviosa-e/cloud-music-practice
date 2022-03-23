import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAlbumList, changeEnterLoading } from "./store/actionCreators";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
import Loading from "../../baseUI/loading";
import MusicNote from "../../baseUI/music-note/index";
import Scroll from "../../components/scroll";
import SongsList from "../SongsList";
import { isEmptyObject } from "../../api/utils";
import { HEADER_HEIGHT } from "../../api/config";
import { Container, TopDesc, Menu } from "./style";
import style from "../../assets/global-style";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

  const {
    currentAlbum: currentAlbumImmutable,
    enterLoading,
    songsCount,
  } = props;
  const { getAlbumDataDispatch } = props;

  const headerEl = useRef();
  const musicNoteRef = useRef();

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const currentAlbum = currentAlbumImmutable
    ? currentAlbumImmutable.toJS()
    : {};

  /* //mock 数据
  const currentAlbum = {
    creator: {
      avatarUrl:
        "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      nickname: "浪里推舟",
    },
    coverImgUrl:
      "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks: [
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热",
        },
      },
    ],
  }; */

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos) => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDOM = headerEl.current;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDOM.style.backgroundColor = style["theme-color"];
        headerDOM.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDOM.style.backgroundColor = "";
        headerDOM.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  const renderTopDesc = () => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="coverImg" />
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">
            {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万
          </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="avatar" />
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div>
    </TopDesc>
  );

  const renderMenu = () => (
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </Menu>
  );

  /* const renderSongList = () => (
    <SongList>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            {" "}
            播放全部{" "}
            <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
          </span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {currentAlbum.tracks.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    </SongList>
  ); */

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={songsCount}>
        <Header
          ref={headerEl}
          title={"返回"}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll onScroll={handleScroll} bounceTop={false}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
                musicAnimation={musicAnimation}
              ></SongsList>
            </div>
          </Scroll>
        ) : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(["album", "currentAlbum"]),
  enterLoading: state.getIn(["album", "enterLoading"]),
  songsCount: state.getIn(["player", "playList"]).size,
});

const mapDispatchToProps = (dispatch) => ({
  getAlbumDataDispatch(id) {
    dispatch(changeEnterLoading(true));
    dispatch(getAlbumList(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
