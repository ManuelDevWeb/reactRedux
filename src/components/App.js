import React from "react";
//Importando react router
import { BrowserRouter, Route } from "react-router-dom";

//Importando componente Menu
import Menu from "./Menu";
//Importando componente Usuarios
import Usuarios from "./Usuarios";
//Importando componente Publicaciones
import Publicaciones from "./Publicaciones";
//Importando componente Tareas
import Tareas from "./Tareas";
//Importando componente Guardar
import Guardar from "./Tareas/Guardar";

//Creando componente
const App = (props) => {
  return (
    //Permite al resto de las rutas funcionar
    <BrowserRouter>
      <Menu />
      <div className="margen">
        {/*Rutas de nuestra App*/}
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
        <Route exact path="/publicaciones/:key" component={Publicaciones} />
        <Route exact path="/tareas/guardar" component={Guardar} />
        <Route exact path="/tareas/guardar/:usuarioId/:tareaId" component={Guardar} />

      </div>
    </BrowserRouter>
  );
};

//Exportando componente
export default App;

{
  /*Componente que nos sirve para representar 1 sola ruta de varias que podemos poner dentro del componente*/
}
