import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import { Dashboard, Courses, Login, Shop, Register, Home, About, CourseSummary, LoadingPage } from "./pages";
import { Provider } from "react-redux";
import store from "./store";
import { checkAuthenticated } from "./actions/auth";
import { updateToken } from "./actions/auth";
import { load_user } from "./actions/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute component={Dashboard}/>,
  },
  {
    path: "/courses",
    element: <PrivateRoute component={Courses}/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/shop",
    element: <PrivateRoute component={Shop}/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/aboutus",
    element: <About />,
  },
  {
    path: "/course/:courseId",
    element: <CourseSummary />,
  },
  {
    path: "loading",
    element: <LoadingPage />,
  },

  // for testing purposes:

]);

// Check if the user is authenticated before rendering the app
store.dispatch(checkAuthenticated()).then(() => {
  store.dispatch(load_user());
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
