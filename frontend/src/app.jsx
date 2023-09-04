import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import {
  Dashboard,
  Courses,
  Login,
  Shop,
  Register,
  Home,
  About,
  CourseSummary,
  LoadingPage,
  Settings,
} from "./pages";
import { Provider } from "react-redux";
import store from "./store";
import { checkAuthenticated } from "./actions/auth";
import { load_user } from "./actions/profile";
import { useStateContext } from "./contexts/ContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute component={Dashboard} />,
  },
  {
    path: "/courses",
    element: <PrivateRoute component={Courses} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/shop",
    element: <PrivateRoute component={Shop} />,
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
  {
    path: "/settings",
    element: <PrivateRoute component={Settings} />,
  },
]);

// Check if the user is authenticated before rendering the app
store.dispatch(checkAuthenticated()).then(() => {
  store.dispatch(load_user());
});

const App = () => {
  const { currentMode, setCurrentMode } = useStateContext();

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <RouterProvider router={router} />
        </div>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
