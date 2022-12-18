import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Listing from "../Listing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/listing",
    exact: true,
    element: <Listing />,
  },
]);

export default router;
