import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css'
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/mainPage/MainPage";
import SearchResults from "./pages/SearchResults";
import SysAdmin from "./pages/SysAdmin";
import MyProperties from "./pages/myProperties";
import AddProperty from "./pages/addProperty";
import ReservationPage from "./pages/Reservation";
import PropertyDetail from "./pages/PropertyDetail";

const App = () => {

  const router = createBrowserRouter([
    {
      element: <MainPage />,
      path: "/",
    },
    {
      element: <SysAdmin />,
      path: "/sysadmin",
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
    },
    {
      element: <MyProperties />,
      path: "/my-properties",
    },
    {
      element: <AddProperty />,
      path: "/add-properties",
    },
     {
      element: <ReservationPage/>,
      path: "/reservation/:id",
    },
     {
  element: <PropertyDetail />,
  path: "/property/:id",
},
  ]);
  return (
    <div>
     
        <RouterProvider router={router} />
      
    </div>
  );
};
export default App;
