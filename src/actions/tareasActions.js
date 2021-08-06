/*
    Los actions son funciones, describen que algo paso, pero no especifican cómo cambió el
    estado de la aplicación en respuesta. Esto último es trabajo de los reducers.
*/
//Importando axios
import Axios from "axios";
//Importando Types (Variables)
import {
    TRAER_TODAS,
    CARGANDO,
    ERROR,
    CAMBIO_USUARIO_ID,
    CAMBIO_TITLE,
    GUARDAR,
    ACTUALIZAR,
    LIMPIAR,
} from "../types/tareasTypes";

//Los 3 casos de una función asíncrona son: Cargando, error, exitoso.

export const traerTodas = () => {
    return async(dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });
        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Petición a una Fake API
            const respuesta = await Axios.get(
                "https://jsonplaceholder.typicode.com/todos"
            );

            const tareas = {};

            //Normalizando objeto
            respuesta.data.map(
                (tarea) =>
                //Al objeto con ese Id de usuario, le pasamos todo lo que hay en tareas con ese id de usuario
                (tareas[tarea.userId] = {
                    ...tareas[tarea.userId],
                    [tarea.id]: {
                        ...tarea,
                    },
                })
            );

            //Dispatch permite actualizar el reducer
            dispatch({
                //Caso a ejecutar
                type: TRAER_TODAS,
                //Información que enviamos al reducer
                payload: tareas,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            //console.log("Error: ", error.message);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Información de tareas no disponible.",
            });
        }
    };
};

//Action para cambiar id de usuario
export const cambioUsuarioId = (usuarioId) => {
    return (dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CAMBIO_USUARIO_ID,
            payload: usuarioId,
        });
    };
};

//Action para cambiar titulo
export const cambioTitle = (title) => {
    return (dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CAMBIO_TITLE,
            payload: title,
        });
    };
};

//Action para guardar tarea
export const agregar = (nuevaTarea) => {
    return async(dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });

        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Enviamos la nueva tarea a la API, mediante post
            const respuesta = await Axios.post(
                "https://jsonplaceholder.typicode.com/todos",
                nuevaTarea
            );
            //console.log(respuesta.data);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: GUARDAR,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            //console.log("Error: ", error.message);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Intente más tarde",
            });
        }
    };
};

//Action para editar tarea
export const editar = (tareaEditada) => {
    return async(dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });

        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Enviamos la nueva tarea a la API, mediante post
            const respuesta = await Axios.put(
                `https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,
                tareaEditada
            );
            //console.log(respuesta.data);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: GUARDAR,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            //console.log("Error: ", error.message);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Intente más tarde",
            });
        }
    };
};

//Action para el checkbox
export const cambioCheck = (usuarioId, tareaId) => {
    return (dispatch, getState) => {
        const { tareas } = getState().tareasReducer;
        const seleccionada = tareas[usuarioId][tareaId];

        const actualizadas = {
            ...tareas,
        };
        actualizadas[usuarioId] = {
            ...tareas[usuarioId],
        };
        actualizadas[usuarioId][tareaId] = {
            ...tareas[usuarioId][tareaId],
            completed: !seleccionada.completed,
        };

        //Dispatch permite actualizar el reducer
        dispatch({
            type: ACTUALIZAR,
            payload: actualizadas,
        });
    };
};

//Action para eliminar tarea
export const eliminar = (tareaId) => {
    return async(dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });

        //Try intenta hacer todo lo que hay en el bloque
        try {
            const respuesta = await Axios.delete(
                `https://jsonplaceholder.typicode.com/todos/${tareaId}`
            );
            //console.log(respuesta);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: TRAER_TODAS,
                payload: {},
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Error al intentar eliminar",
            });
        }
    };
};

//Action para limpiar formulario
export const limpiarFormulario = () => {
    return (dispatch) => {
        dispatch({
            type: LIMPIAR,
        });
    };
};