import MainPage from "@/pages";
import FaqPage from "@/pages/FaqPage";
import NotFound from "@/pages/NotFound";
import UserMain from "@/pages/user/UserMain";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/faq" element={<FaqPage />}></Route>
      <Route
        path="/user/main"
        element={<PrivateRoute Component={UserMain} />}
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  const location = useLocation();
  return auth ? (
    <Component />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RoutesList;
