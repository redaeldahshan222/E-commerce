import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react'
export const authContext = createContext()

export default function LoggedAuthProvider({children}) {
  let name;
    const [token, setToken] = useState(null)
    if(localStorage.getItem("token")!=null){
  const decode= jwtDecode(localStorage.getItem("token"));
  name=decode.name;
}
//   console.log("name",name);
return <authContext.Provider value={{token,name, setToken}}>
{children}
</authContext.Provider>
}
