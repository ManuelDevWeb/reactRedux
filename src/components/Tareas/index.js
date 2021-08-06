import React, { Component } from "react";
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando Link
import { Link } from "react-router-dom";
//Importando las acciones de las tareas
import * as tareasActions from "../../actions/tareasActions";
//Importando Spinner
import Spinner from "../Spinner";
//Importando Error
import Error from "../Error";

//Creando componente statefull
class Tareas extends Component {
    componentDidMount() {
        //Si no hay tareas, las traemos
        if (!Object.keys(this.props.tareas).length) {
            this.props.traerTodas();
        }
    }

    componentDidUpdate() {
        const { tareas, cargando, traerTodas } = this.props
        //Si no hay tareas, las traemos y cuando no este cargando
        if (!Object.keys(tareas).length && !cargando) {
            traerTodas();
        }
    }

    //Función para mostar contenido
    mostrarContenido = () => {
        //Estos props vienen del reducer de tareas
        const { tareas, cargando, error } = this.props;

        //Validando si hay un error
        if (error) {
            return <Error mensaje={error} />;
        }

        //Validando si esta cargando y no hay tareas
        if (cargando && Object.keys(tareas).length === 0) {
            return <Spinner />;
        }

        //Object.keys para convertir en un arreglo de keys
        //Mapeando arreglo de keys de las tareas
        return Object.keys(tareas).map((userId) => (
            <div key={userId}>
                <h2>Usuario {userId}</h2>
                <div className="contenedor_tareas">{this.ponerTareas(userId)}</div>
            </div>
        ));
    };

    //Función para poner las tareas en el contenido
    ponerTareas = (userId) => {
        //Destructurando tareas
        const { tareas, cambioCheck, eliminar } = this.props;
        //Tareas por usuario
        const porUsuario = {
            ...tareas[userId],
        };

        return Object.keys(porUsuario).map((tareaId) => (
            <div key={tareaId}>
                <input
                    type="checkbox"
                    defaultChecked={porUsuario[tareaId].completed}
                    onChange={() => cambioCheck(userId, tareaId)}
                />
                {porUsuario[tareaId].title}
                <button className="m_left">
                    <Link to={`/tareas/guardar/${userId}/${tareaId}`}>Editar</Link>
                </button>
                <button className="m_left" onClick={() => eliminar(tareaId)}>
                    Eliminar
                </button>
            </div>
        ));
    };

    render() {
        //console.log(this.props);
        return (
            <div>
                <button>
                    <Link to="/tareas/guardar">Agregar</Link>
                </button>
                {this.mostrarContenido()}
            </div>
        );
    }
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con ese estado
const mapStateToProps = ({ tareasReducer }) => {
    return tareasReducer;
};

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps, tareasActions)(Tareas);
