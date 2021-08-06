/*
    Los actions son funciones, describen que algo paso, pero no especifican cómo cambió el
    estado de la aplicación en respuesta. Esto último es trabajo de los reducers.
*/
//Importando axios
import Axios from "axios";
//Importando Types (Variables)
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

//Los 3 casos de una función asíncrona son: Cargando, error, exitoso.

export const traerTodos = () => {
    return async(dispatch) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });
        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Petición a una Fake API
            const respuesta = await Axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            //Dispatch permite actualizar el reducer
            dispatch({
                //Caso a ejecutar
                type: TRAER_TODOS,
                //Información que enviamos al reducer
                payload: respuesta.data,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            console.log("Error: ", error.message);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Información de usuario no disponible.",
            });
        }
    };
};