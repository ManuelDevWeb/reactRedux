import React from "react";

//Importando estilos
import "./styles/Spinner.css";

//Creando componente
const Spinner = () => {
    return (
        <div className="center">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

//Exportando componente
export default Spinner;
