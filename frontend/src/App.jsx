import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/AdminDashboard";
import Errorpage from "./Pages/Errorpage";
import Borrow from "./Pages/Borrow";
import  Libdash from "./Pages/LibDashboard";
import Search from "./Pages/SearchResults"
// Layout
import Root from "./routes/Root";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root><Homepage /></Root>,
    errorElement: <Errorpage />,
  },
  {
    path: "/login",
    element: <Root><Login /></Root>,
  },
  {
    path: "/register",
    element: <Root><Register /></Root>,
  },
  {
    path: "/profile",
    element: <Root><Profile /></Root>,
  },
  {
    path: "/admin/dashboard",
    element: <Root><Dashboard /></Root>,
  },
  {
    path: "/borrow/:id", 
    element:<Root><Borrow/></Root>,
  },
  {
    path:"/lib/dashboard",
    element:<Root><Libdash/></Root>
  },
  {
    path:"/search",
    element:<Root><Search/></Root>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
