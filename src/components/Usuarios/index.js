import React, { Component } from "react";
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando las acciones del usuario
import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {

    //Montaje componente
    componentDidMount() {
        this.props.traerTodos();
    }

    //Funcion que almacena la información de los usuarios que viene desde el state
    ponerFilas = () => {
        return (
            //Iterando sobre los usuarios almacenados en el state
            this.props.usuarios.map((usuario) => (
                <tr key={usuario.id}>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.website}</td>
                </tr>
            ))
        );
    };

    render() {
        //console.log(this.props);
        return (
            <div>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Enlace</th>
                        </tr>
                    </thead>
                    <tbody>{this.ponerFilas()}</tbody>
                </table>
            </div>
        );
    }
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con ese estado
const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer
}

//Acciones

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps, usuariosActions)(Usuarios);
