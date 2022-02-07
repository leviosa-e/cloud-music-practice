import { Navigate } from "react-router-dom";
import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Rank from "../application/Rank";
import Singers from "../application/Singers";

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
        element: <Recommend />,
      },
      {
        path: "/singers",
        element: <Singers />,
      },
      {
        path: "/rank",
        element: <Rank />,
      },
    ],
  },
];
