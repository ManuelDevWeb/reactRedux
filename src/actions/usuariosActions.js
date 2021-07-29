/*
    Los actions son funciones, describen que algo paso, pero no especifican cómo cambió el
    estado de la aplicación en respuesta. Esto último es trabajo de los reducers.
*/
//Importando axios
import Axios from 'axios';

export const traerTodos = () => {
    return async (dispatch) => {
        //Petición a una Fake API
        const respuesta = await Axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        //Dispatch permite actualizar el reducer
        dispatch({
            //Caso a ejecutar
            type: 'traer_usuarios',
            //Información que enviamos al reducer
            payload: respuesta.data
        })
    }
}