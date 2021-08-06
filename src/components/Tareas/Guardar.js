import React, { Component } from "react";
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando Redirect
import { Redirect } from "react-router";
//Importando Spinner
import Spinner from "../Spinner";
//Importando Error
import Error from "../Error";
//Importando actions de tareas
import * as tareasActions from "../../actions/tareasActions";

//Creando componente
class Guardar extends Component {
    componentDidMount() {
        const {
            match: {
                params: { usuarioId, tareaId },
            },
            tareas,
            cambioTitle,
            cambioUsuarioId,
            limpiarFormulario,
        } = this.props;

        //Validando que usuarioId y tareaId vengan por parametro
        if (usuarioId && tareaId) {
            const tarea = tareas[usuarioId][tareaId];
            //Cambiando los valores al reducer
            cambioUsuarioId(tarea.userId);
            cambioTitle(tarea.title);
        } else {
            limpiarFormulario();
        }
    }

    //Función para cambiar el input de idUsuario
    cambioUsuarioId = (event) => {
        //Enviemos lo que el usuario escribe al action cambioUsuarioId
        this.props.cambioUsuarioId(event.target.value);
    };

    //Función para cambiar el input de title
    cambioTitulo = (event) => {
        //Enviamos lo que el usuario escribe al action cambioTitle
        this.props.cambioTitle(event.target.value);
    };

    //Función para guardar tarea
    guardarTarea = () => {
        const {
            usuId,
            titulo,
            agregar,
            match: {
                params: { usuarioId, tareaId },
            },
            tareas,
            editar,
        } = this.props;

        //Nueva tarea y los valores serán los valores del state actualizado
        const nuevaTarea = {
            userId: usuId,
            title: titulo,
            completed: false,
        };

        //Si viene usuarioId y tareaId por parametro ejecutamos lo siguiente
        if (usuarioId && tareaId) {
            const tarea = tareas[usuarioId][tareaId];
            const tareaEditada = {
                ...nuevaTarea,
                completed: tarea.completed,
                id: tarea.id,
            };
            editar(tareaEditada);
        } else {
            //Enviamos tarea al action
            agregar(nuevaTarea);
        }
    };

    //Función para deshabilitar boton
    deshabilitar = () => {
        const { titulo, usuId, cargando } = this.props;

        //Si está cargando lo deshabilitamos
        if (cargando) {
            return true;
        }

        //Validando que haya informacion en los input
        if (!usuId || !titulo) {
            return true;
        }

        //Si todo está correcto, lo habilitamos
        return false;
    };

    //Función para mostrar el error o cargando
    mostrarAccion = () => {
        const { cargando, error } = this.props;

        if (cargando) {
            return <Spinner />;
        }

        if (error) {
            return <Error mensaje={error} />;
        }
    };

    render() {
        return (
            <div>
                {
                    //Si regresar es verdadero redireccionamos
                    this.props.regresar ? <Redirect to="/tareas" /> : ""
                }
                <h1>Guardar Tarea</h1>

                <label>Usuario id:</label>
                <input
                    type="number"
                    value={this.props.usuId}
                    onChange={this.cambioUsuarioId}
                />
                <br />
                <br />

                <label>Titulo</label>
                <input
                    type="text"
                    value={this.props.titulo}
                    onChange={this.cambioTitulo}
                />
                <br />
                <br />

                <button onClick={this.guardarTarea} disabled={this.deshabilitar()}>
                    Guardar
                </button>
                {this.mostrarAccion()}
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
export default connect(mapStateToProps, tareasActions)(Guardar);
