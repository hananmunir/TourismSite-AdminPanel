import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Themeroutes from "./routes/Router";

const App = () => {
 
  const routing = useRoutes(Themeroutes);

  return <div className="dark">{routing}</div>;
};

export default App;
