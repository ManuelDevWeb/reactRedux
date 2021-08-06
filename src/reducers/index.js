/*
    Los reducers son los encargados de contener la información de los estados.
    Por ejemplo si estamos hablando de usuario componente el reducer tiene el 
    estado de estos usuarios y se los entrega al store.
*/

//Importando elementos redux
import { combineReducers } from "redux";

//Importando reducer usuarios
import usuariosReducer from "./usuariosReducer";
//Importando reducer publicaciones
import publicacionesReducer from "./publicacionesReducer";
//Importando reducer tareas
import tareasReducer from "./tareasReducer";

//Exportando los reducers que combinaremos
export default combineReducers({
    usuariosReducer,
    publicacionesReducer,
    tareasReducer,
});