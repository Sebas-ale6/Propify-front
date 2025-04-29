import { createBrowserRouter, RouterProvider } from "react-router-dom";


import LoginPage from "./pages/Login";




const App = () => {

  const router = createBrowserRouter([
    {
      element: <LoginPage />,
      path: "/",
    }
   
  ]);
  return (
    <div>
     
        <RouterProvider router={router} />
      
    </div>
  );
};
export default App;
