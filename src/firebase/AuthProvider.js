import {createContext, useState, useEffect, useContext} from "react";
import self_auth from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await self_auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = self_auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        handleLogout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
