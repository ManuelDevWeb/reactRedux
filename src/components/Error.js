import React from 'react'

//Importando estilos
import './styles/Error.css';
//Importando imagen
import imgError from '../images/errorImage.svg';

//Creando componente
const Error = (props) => {
    const { mensaje } = props;
    return (
        <div className="center error">
            <img src={imgError} alt="Error" />
            <h2>{mensaje}</h2>
        </div>
    );
}

//Exportando componente 
export default Error;