import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
// redux
import { connect } from "react-redux";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import { HEADER_HEIGHT } from "./../../api/config";
import Header from "../../baseUI/header";
import Loading from "../../baseUI/loading";
import MusicNote from "../../baseUI/music-note/index";
import Scroll from "../../components/scroll";
import SongsList from "../SongsList";
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from "./style";

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);

  const { artist: immutableArtist, songs: immutableSongs, loading } = props;
  const { getSingerDataDispatch } = props;

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  const navigate = useNavigate();
  const params = useParams();

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  const musicNoteRef = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const id = params.id;
    getSingerDataDispatch(id);
    //eslint-disable-next-line
  }, []);

  // 作为一个传给子组件的方法，我们需要用 useCallback 进行包裹，防止不必要的重渲染
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  /*   const artist = {
    picUrl:
      "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
    ],
  }; */

  const handleScroll = useCallback((pos) => {
    const height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
    // console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    // 处理往下拉的情况，效果：图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 往上滑动，但是遮罩还没超过 Header 部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <Header
          handleClick={setShowStatusFalse}
          title={artist.name}
          ref={header}
        ></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        <MusicNote ref={musicNoteRef}></MusicNote>
        {loading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = (state) => ({
  artist: state.getIn(["singerInfo", "artist"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingerDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getSingerInfo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
