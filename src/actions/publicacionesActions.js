/*
    Los actions son funciones, describen que algo paso, pero no especifican cómo cambió el
    estado de la aplicación en respuesta. Esto último es trabajo de los reducers.
*/
//Importando axios
import Axios from "axios";
//Importando Types (Variables)
import {
    ACTUALIZAR,
    ERROR,
    CARGANDO,
    ACTUALIZAR_COMENTARIOS,
    ERROR_COMENTARIOS,
    CARGANDO_COMENTARIOS,
} from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

//Los 3 casos de una función asíncrona son: Cargando, error, exitoso.
export const traerPorUsuario = (key) => {
    return async(dispatch, getState) => {
        //Dispatch permite actualizar el reducer
        dispatch({
            type: CARGANDO,
        });

        //Tenemos acceso al state actual
        let { usuarios } = getState().usuariosReducer;
        const { publicaciones } = getState().publicacionesReducer;
        const usuario_id = usuarios[key].id;

        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Petición a una fake API
            const respuesta = await Axios.get(
                `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
            );

            const nuevas = respuesta.data.map((publicacion) => ({
                ...publicacion,
                comentarios: [],
                abierto: false,
            }));

            //Vamos almacenando las publicaciones de los usuarios que vamos trayendo
            const publicacionesActualizadas = [...publicaciones, nuevas];

            //Dispatch permite actualizar el reducer de publicaciones
            dispatch({
                //Caso a ejecutar
                type: ACTUALIZAR,
                //Información que enviamos al reducer
                payload: publicacionesActualizadas,
            });

            //Si no hay publicacionesActualizadas, el primer usuario que traigamos tendra en su objeto el atributo publicaciones_key: 0
            //El segundo tendra el atributo publicaciones_key: 1 y asi sucesivamente.
            const publicaciones_key = publicacionesActualizadas.length - 1;

            //Actualizar usuarios
            const usuariosActualizados = [...usuarios];
            usuariosActualizados[key] = {
                ...usuarios[key],
                publicaciones_key,
            };

            //Dispatch permite actualizar el reducer de usuarios
            dispatch({
                //Caso a ejecutar
                type: USUARIOS_TRAER_TODOS,
                //Información que enviamos al reducer
                payload: usuariosActualizados,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            console.log("Error: ", error.message);
            //Dispatch permite actualizar el reducer
            dispatch({
                type: ERROR,
                payload: "Publicaciones no disponibles.",
            });
        }
    };
};

//Index del arreglo de publicaciones que se van agregando cuando se le da click a un usuario
//Key de la lista de publicaciones de un usuario
//Función para abrir o cerrar una publicacion, recibe las variables descritas
export const abrirCerrar = (publicaciones_keys, comentarios_keys) => {
    return async(dispatch, getState) => {
        //console.log(publicaciones_keys, comentarios_keys);
        //Trayendo el state actual para actualizarlo
        const { publicaciones } = getState().publicacionesReducer;
        const seleccionada = publicaciones[publicaciones_keys][comentarios_keys];

        const actualizada = {
            ...seleccionada,
            abierto: !seleccionada.abierto,
        };

        //Actualizando las publicaciones y yendo nivel por nivel puesto que tenemos arreglo de arreglos
        const publicacionesActualizadas = [...publicaciones];
        publicacionesActualizadas[publicaciones_keys] = [
            ...publicaciones[publicaciones_keys],
        ];
        publicacionesActualizadas[publicaciones_keys][comentarios_keys] =
            actualizada;

        //Dispatch permite actualizar el reducer de publicaciones
        dispatch({
            //Caso a ejecutar
            type: ACTUALIZAR,
            //Información que enviamos al reducer
            payload: publicacionesActualizadas,
        });
    };
};

//Función para traer los comentarios
export const traerComentarios = (publicaciones_keys, comentarios_keys) => {
    return async(dispatch, getState) => {
        //Dispatch permite actualizar el reducer de publicaciones
        dispatch({
            //Caso a ejecutar
            type: CARGANDO_COMENTARIOS,
        });

        //console.log(publicaciones_keys, comentarios_keys);
        //Trayendo el state actual para actualizarlo
        const { publicaciones } = getState().publicacionesReducer;
        const seleccionada = publicaciones[publicaciones_keys][comentarios_keys];

        //Try intenta hacer todo lo que hay en el bloque
        try {
            //Trayendo los comentarios de la publicación
            const respuesta = await Axios.get(
                `https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`
            );

            //Actualizando la información de la publicación con los comentarios
            const actualizada = {
                ...seleccionada,
                comentarios: respuesta.data,
            };

            //Actualizando las publicaciones y yendo nivel por nivel puesto que tenemos arreglo de arreglos
            const publicacionesActualizadas = [...publicaciones];
            publicacionesActualizadas[publicaciones_keys] = [
                ...publicaciones[publicaciones_keys],
            ];
            publicacionesActualizadas[publicaciones_keys][comentarios_keys] =
                actualizada;

            //Dispatch permite actualizar el reducer de publicaciones
            dispatch({
                //Caso a ejecutar
                type: ACTUALIZAR_COMENTARIOS,
                //Información que enviamos al reducer
                payload: publicacionesActualizadas,
            });
        } catch (error) {
            //Si hay un error, lo manejamos en el catch
            //Dispatch permite actualizar el reducer de publicaciones
            dispatch({
                //Caso a ejecutar
                type: ERROR_COMENTARIOS,
                payload: "Comentarios no disponibles.",
            });
        }
    };
};

/*
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
                "https://jsonplaceholder.typicode.com/posts"
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
                payload: "Algo salió mal, intente más tarde.",
            });
        }
    };
};
*/