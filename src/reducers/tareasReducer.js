/*
    Reducer que contiene la información del estado de nuestros usuarios
*/
//Importando Types (Variables)
import {
    TRAER_TODAS,
    ERROR,
    CARGANDO,
    CAMBIO_USUARIO_ID,
    CAMBIO_TITLE,
    GUARDAR,
    ACTUALIZAR,
    LIMPIAR,
} from "../types/tareasTypes";

//State inicial
const INITIAL_STATE = {
    tareas: {},
    cargando: false,
    error: "",
    usuId: "13",
    titulo: "Title",
    regresar: false,
};

//Exportando el estado de usuarios
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_TODAS:
            //Retornamos todo lo que tenia en el estado, y sobreescribimos la información que tiene
            //el estado en ese momento, con la información que el action entrega.
            return {
                ...state,
                tareas: action.payload,
                cargando: false,
                error: "",
                regresar: false,
            };
        case CARGANDO:
            return {...state, cargando: true };
        case ERROR:
            return {...state, error: action.payload, cargando: false };
        case CAMBIO_USUARIO_ID:
            return {...state, usuId: action.payload };
        case CAMBIO_TITLE:
            return {...state, titulo: action.payload };
        case GUARDAR:
            //Tareas:{} puesto que se vuelven a traer todas luego
            return {
                ...state,
                tareas: {},
                regresar: true,
                cargando: false,
                error: "",
                usuId: "",
                titulo: "",
            };
        case ACTUALIZAR:
            return {...state, tareas: action.payload };
        case LIMPIAR:
            return {...state, usuId: "", titulo: "" };
        default:
            return state;
    }
};