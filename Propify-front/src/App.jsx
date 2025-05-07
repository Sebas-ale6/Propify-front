import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/mainPage/MainPage";




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
    }

  ]);
  return (
    <div>
     
        <RouterProvider router={router} />
      
    </div>
  );
};
export default App;
