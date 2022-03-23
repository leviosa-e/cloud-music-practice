import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Home from "../application/Home";
/* import Recommend from "../application/Recommend";
import Rank from "../application/Rank";
import Singers from "../application/Singers";
import Singer from "../application/Singer";
import Album from "../application/Album";
import Search from "../application/Search"; */
const RecommendComponent = lazy(() => import("../application/Recommend"));
const SingersComponent = lazy(() => import("../application/Singers"));
const RankComponent = lazy(() => import("../application/Rank"));
const AlbumComponent = lazy(() => import("../application/Album"));
const SingerComponent = lazy(() => import("./../application/Singer"));
const SearchComponent = lazy(() => import("./../application/Search"));

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

export const routeConfigs = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        exact: true,
        element: <Navigate to="/recommend" />,
      },
      {
        path: "/recommend",
        element: SuspenseComponent(RecommendComponent)(),
        children: [
          {
            path: "/recommend/:id",
            element: SuspenseComponent(AlbumComponent)(),
          },
        ],
      },
      {
        path: "/singers",
        element: SuspenseComponent(SingersComponent)(),
        key: "singers",
        children: [
          {
            path: "/singers/:id",
            element: SuspenseComponent(SingerComponent)(),
          },
        ],
      },
      {
        path: "/rank",
        element: SuspenseComponent(RankComponent)(),
        key: "rank",
        children: [
          {
            path: "/rank/:id",
            element: SuspenseComponent(AlbumComponent)(),
          },
        ],
      },
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: SuspenseComponent(AlbumComponent)(),
      },
      {
        path: "/search",
        exact: true,
        key: "search",
        element: SuspenseComponent(SearchComponent)(),
      },
    ],
  },
];
