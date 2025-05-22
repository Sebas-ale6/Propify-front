import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/mainPage/MainPage";
import SearchResults from "./pages/SearchResults";



const App = () => {

  const router = createBrowserRouter([
    {
      element: <MainPage />,
      path: "/",
    },
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: <RegisterPage />,
      path: "/register",
    },
    {
      element: <SearchResults />,
      path: "/search",
    }

  ]);
  return (
    <div>
     
        <RouterProvider router={router} />
      
    </div>
  );
};
export default App;
