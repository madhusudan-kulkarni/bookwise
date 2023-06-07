import { useDataContext } from "../context/dataContext";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

export function Auth({children}){
    const location = useLocation();
    const { state } = useDataContext();

    return state.isLoggedIn ? children : <Navigate to="/login" state={{from:location}}/>;
}