import React from "react";
//Importando react router
import { BrowserRouter, Route } from "react-router-dom";

//Importando componente Menu
import Menu from "./Menu";
//Importando componente Usuarios
import Usuarios from "./Usuarios";

const Tareas = () => {
  return <div>Tareas</div>;
};

//Creando componente
const App = () => {
  return (
    //Permite al resto de las rutas funcionar
    <BrowserRouter>
      <Menu />
      <div className="margen">
        {/*Rutas de nuestra App*/}
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
      </div>
    </BrowserRouter>
  );
};

//Exportando componente
export default App;

{
  /*Componente que nos sirve para representar 1 sola ruta de varias que podemos poner dentro del componente*/
}
