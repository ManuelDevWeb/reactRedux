//Importando React
import React from 'react';
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando Link
import { Link } from 'react-router-dom';
//Importando estilos
import '../../iconos.css';

//Creando componente
const Tabla = (props) => {
    //Funcion que almacena la información de los usuarios que viene desde el state
    const ponerFilas = () => {
        return (
            //Iterando sobre los usuarios almacenados en el state
            props.usuarios.map((usuario, key) => (
                <tr key={usuario.id}>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.website}</td>
                    <td>
                        <Link to={`/publicaciones/${key}`}>
                            <div className="eye-solid2 icon"></div>
                        </Link>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <table className="tabla">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Enlace</th>
                </tr>
            </thead>
            <tbody>{ponerFilas()}</tbody>
        </table>
    );
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con el state actual de usuarios
const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
};

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps)(Tabla);
