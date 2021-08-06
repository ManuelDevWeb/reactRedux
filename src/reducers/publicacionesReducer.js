/*
    Reducer que contiene la información del estado de nuestros usuarios
*/

import {
    ACTUALIZAR,
    ERROR,
    CARGANDO,
    ACTUALIZAR_COMENTARIOS,
    ERROR_COMENTARIOS,
    CARGANDO_COMENTARIOS,
} from "../types/publicacionesTypes";

//State inicial
const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: "",
    cargandoComentarios: false,
    errorComentarios: "",
};

//Exportando el estado de las publicaciones
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTUALIZAR:
            //Retornamos todo lo que tenia en el estado, y sobreescribimos la información que tiene
            //el estado en ese momento, con la información que el action entrega.
            return {
                ...state,
                publicaciones: action.payload,
                cargando: false,
                error: "",
            };
        case CARGANDO:
            return {...state, cargando: true };
        case ERROR:
            return {...state, error: action.payload, cargando: false };
        case ACTUALIZAR_COMENTARIOS:
            //Retornamos todo lo que tenia en el estado, y sobreescribimos la información que tiene
            //el estado en ese momento, con la información que el action entrega.
            return {
                ...state,
                publicaciones: action.payload,
                cargandoComentarios: false,
                errorComentarios: "",
            };
        case CARGANDO_COMENTARIOS:
            return {...state, cargandoComentarios: true };
        case ERROR_COMENTARIOS:
            return {
                ...state,
                errorComentarios: action.payload,
                cargandoComentarios: false,
            };
        default:
            return state;
    }
};