import React from "react"
import { Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../firebase/AuthProvider";

export default function PrivateRoute() {
    const { currentUser } = useAuth()

    return currentUser ? <Outlet />: <Navigate to="/signin" />;
}