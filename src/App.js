// routes
import { useRoutes } from "react-router-dom";
import { routeConfigs } from "./routes/index";
// redux
import { Provider } from "react-redux";
import store from "./store";
// style
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";

function App() {
  const routes = useRoutes(routeConfigs);
  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />
      {routes}
    </div>
  );
}

export default App;
