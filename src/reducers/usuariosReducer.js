/*
    Reducer que contiene la información del estado de nuestros usuarios
*/

//State inicial
const INITIAL_STATE = {
    usuarios: [],
};

//Exportando el estado de usuarios
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "traer_usuarios":
            /* 
                Retornamos todo lo que tenia en el estado, y sobreescribimos la información 
                que tiene el estado en ese momento, con la información que el action entrega.
            */
            return { ...state, usuarios: action.payload };

        default:
            return state;
    }
};
