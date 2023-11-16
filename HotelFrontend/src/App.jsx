
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobleCotext from "./contextApi/GlobleContex";
import { Administracion } from "./page/Administracion";
import { Login } from "./page/Login";

import { RoutesPublic } from "./routes/routesPublic";

function App() {

  const [LoginAdmin, setLogin] = useState(false)


  useEffect(() => {
    const loggedIn = localStorage.getItem("Token")
    if(loggedIn) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    }, [LoginAdmin])

    const loginFun = () => {
      setLogin(true)
  }
  
  return (
    <>
    <GlobleCotext>
      <BrowserRouter>
        <Routes>
        <Route  path="/*" element={<RoutesPublic />}/>
        <Route path="/login" element={<Login loginFun={loginFun} />}/>
          {
            LoginAdmin ? <Route path="/administracion" element={<Administracion />}/> : <></>
          }
        </Routes>
      </BrowserRouter>
      </GlobleCotext>
    </>
  );
}

export default App;
