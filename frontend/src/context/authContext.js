import { createContext } from "react";

export const AuthContext=createContext()



export default function AuthContextProvider(props){
    const [user,setUser]=useState(null)

    const login=async()=>{

    }
    
    return <>
        <AuthContext.Provider value={{}}>
            {props.children}
        </AuthContext.Provider>
    </>
}