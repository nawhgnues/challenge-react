import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import App from "./App";
import NotFound from "./screens/Notfound";
import ErrorComponent from "./components/ErrorComponent";
import Champion from "./screens/Champion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/champion/:championId",
        element: <Champion />,
        errorElement: <ErrorComponent />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
