import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-SourceSansPro bg-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
