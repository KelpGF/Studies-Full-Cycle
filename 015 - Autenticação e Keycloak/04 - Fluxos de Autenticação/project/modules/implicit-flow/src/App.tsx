import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Callback } from "./Callback";
import { Admin } from "./Admin";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "admin",
    element: (
      <Admin />
    ),
  },
  {
    path: "callback",
    element: <Callback />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
