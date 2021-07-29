import React from "react";
//Importando Link
import { Link } from "react-router-dom";

//Creando componente
const Menu = () => {
    return (
        <nav id="menu">
            <Link to="/">Usuarios</Link>
            <Link to="/tareas">Tareas</Link>
        </nav>
    );
};

//Exportando componente
export default Menu;
