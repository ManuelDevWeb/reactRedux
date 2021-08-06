import React, { Component } from "react";
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando las acciones del usuario
import * as usuariosActions from "../../actions/usuariosActions";

//Importando componente Tabla
import Tabla from "./Tabla";
//Importando componente Spinner
import Spinner from "../Spinner";
//Importando componente Error
import Error from "../Error";

class Usuarios extends Component {
    //Montaje componente
    componentDidMount() {
        //Si no hay usuarios los trae (Esto se hace para evitar doble busqueda)
        if (!this.props.usuarios.length) {
            //Ejecutando la función del actión
            this.props.traerTodos();
        }
    }

    //Función que muestra el contenido
    ponerContenido = () => {
        //Si cargando es true, se ejecuta estebloque
        if (this.props.cargando) {
            return <Spinner />;
        }

        //Si error es true, se ejecuta este bloque
        if (this.props.error) {
            return <Error mensaje={this.props.error} />;
        }

        return <Tabla />;
    };

    render() {
        return (
            <div>
                <h1>Usuarios</h1>
                {this.ponerContenido()}
            </div>
        );
    }
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con ese estado
const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
};

//Acciones

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps, usuariosActions)(Usuarios);
