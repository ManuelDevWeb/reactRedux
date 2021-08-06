/*
    Reducer que contiene la información del estado de nuestros usuarios
*/
//Importando Types (Variables)
import { TRAER_TODOS, ERROR, CARGANDO } from "../types/usuariosTypes";

//State inicial
const INITIAL_STATE = {
    usuarios: [],
    cargando: false,
    error: "",
};

//Exportando el estado de usuarios
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_TODOS:
            //Retornamos todo lo que tenia en el estado, y sobreescribimos la información que tiene
            //el estado en ese momento, con la información que el action entrega.
            return {
                ...state,
                usuarios: action.payload,
                cargando: false,
                error: "",
            };
        case CARGANDO:
            return {...state, cargando: true };
        case ERROR:
            return {...state, error: action.payload, cargando: false };
        default:
            return state;
    }
};