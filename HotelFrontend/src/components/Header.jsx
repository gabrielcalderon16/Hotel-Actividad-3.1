import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloudIcon from '@mui/icons-material/Cloud';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [weather, setWeather] = useState(null);

  const newPath = useLocation().pathname;
  const navigate = useNavigate();


  const [AdminSession, setAdminSession] = useState(false)


  useEffect(() => {

    if(newPath === '/administracion')  {
      setAdminSession(true)
    }else {
      setAdminSession(false)
      
    }
  }, [newPath])
  

  useEffect(() => {
    // Realiza la solicitud a la API.
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          appid: "526e623d5410aeb1422b110c381b09a0",
          units: "metric",
          q: "Amazonas,Venezuela"
        }
      })
      .then(response => {
        // Verifica si la solicitud fue exitosa.
        if (response.status === 200) {
          // Decodifica la respuesta JSON.
          const data = response.data;

          // Obtiene la información del clima.
          const weather = data["weather"][0];
          const temperature = data["main"]["temp"];

          // Actualiza el estado de la aplicación.
          setWeather({
            weather: weather["description"],
            temperature: temperature
          });
        }
      })
      .catch(error => {
        // Handle error.
      });
  }, []);

  const logout = () => {
    setIsMenu(false)
    localStorage.removeItem('Token')
    navigate("/")
  }



  return (
    <>
      <div className="flex justify-between items-center p-4 pt-8 container m-auto">
        {
          AdminSession ?
           <>
           </>
            :
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
              <ul className="list-none capitalize flex">
                <Link to={"/"}><li className="px-4 relative cursor-pointer">Dashboard</li></Link>
                <Link to={"/Category"}><li className="px-4 relative cursor-pointer">Categorias</li></Link>
                <Link to={"/Blogs"}><li className="px-4 relative cursor-pointer">Blogs</li></Link>
                <Link to={"/Reservar"}><li className="px-4 relative cursor-pointer">Reservar</li></Link>
              </ul>
            </div> 
        }
        
        <div className="w-20 md:w-30">

        {
          AdminSession ?
          <img src={logo} alt="logo" />
          :  
          <Link to={'/'}>
           <img src={logo} alt="logo" />
          </Link>
        }
          
        </div>
        <div >
          <span>
            Temperatura 
          <span className="p-1"> {weather?.temperature} °C</span>
          <CloudIcon/>
          </span>
        </div>
        <div className="block md:hidden px-8 p-4" onClick={() => setIsMenu(!isMenu)}>
          <DensityMediumIcon />
        </div>

        {
          AdminSession ?
            <div className={`hidden md:block ${isMenu ? "block" : "hidden"}`}>
              <ul className="list-none capitalize flex">
                <li className="px-4 relative cursor-pointer" onClick={logout}>Cerrar sesion</li>
              </ul>
            </div> 
            :
            <>
            </>
        }

      </div>
      <div className="reletive">
      {
          AdminSession ?
          <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
          <li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={logout}>Cerrar sesion</li>
          </ul>
        </div>
          :  
          <div className={`${isMenu ? "block" : "hidden"} bg-[#d27548] text-white md:hidden absolute rounded left-0 right-0`}>
          <ul className="list-none capitalize flex flex-col">
          <Link to={"/"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Dashboard</li></Link>
          <Link to={"/Category"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Categorias</li></Link>
          <Link to={"/Blogs"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Blogs</li></Link>
          <Link to={"/Reservar"}><li className="p-1 text-center cursor-pointer hover:bg-orange-700" onClick={() => setIsMenu(false)}>Reservar</li></Link>
          </ul>
        </div>
        }
      </div>
    </>
  );
};

export default Header;
