import { useState, createContext, useContext } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    const login = user => {
        window.localStorage.setItem("myuser", JSON.stringify(user));
        setUser(user)
    }
    
    const logout = () => { 
        window.localStorage.setItem("myuser", null);
        window.localStorage.setItem("USER_TOKEN", null);
        setUser (null)
    }
   let x = window.localStorage.getItem("myuser");
    

    return (
        <AuthContext.Provider value={{user, login, logout, x}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}
