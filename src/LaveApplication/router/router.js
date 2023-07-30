import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layouts/Rootlayout";
import Dashbord from "../pages/Dashbord";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HodDassBord from "../pages/HodDassBord";
import StaffDashbord from "../pages/StaffDashbord";
import ProtectedRoute from "./layouts/ProtectedRoute";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashbord />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashbord/hod" element={
                <ProtectedRoute allowedRoles={"hod"}>
                    <HodDassBord />
                </ProtectedRoute>} />
            <Route path="dashbord/staff" element={
                <ProtectedRoute allowedRoles={"staff"}>
                    <StaffDashbord />
                </ProtectedRoute>
            } />
        </Route>
    )
)