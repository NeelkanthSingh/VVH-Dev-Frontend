import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import PrivateRoute from "./PrivateRoutes";
import Homepage from "../pages/Homepage";
import Documents from "../pages/Documents";
import LogoutComponent from "../components/Logout"
import Error404 from "../pages/404Error";
import FileRoute from "../pages/FileRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<PrivateRoute> <Homepage /> </PrivateRoute>}/>
      <Route path="/docs" element={<PrivateRoute> <Documents /> </PrivateRoute>}/>
      <Route path="/logout" element={<LogoutComponent />}/>
      <Route path="/file/:username/:doc" element={<FileRoute />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
