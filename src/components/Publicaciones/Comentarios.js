import React from 'react';
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando Spinner
import Spinner from '../Spinner';
//Importando Error
import Error from '../Error';

//Creando componente
const Comentarios = (props) => {
    //Comentarios viene desde el index de publibaciones, el resto son los props del state
    const { comentarios, cargandoComentarios, errorComentarios } = props;

    //Validando si hay errores
    if (errorComentarios) {
        return <Error mensaje={errorComentarios} />
    }

    //Validando si cargando comentarios es verdadero o no hayan comentarios
    if (cargandoComentarios && !comentarios.length) {
        return <Spinner />
    }

    const ponerComentarios = () => {
        return (comentarios.map((comentario) => (
            <li key={comentario.id}>
                <b>
                    <u>
                        {comentario.email}
                    </u>
                </b>
                <br />
                {comentario.body}
            </li>
        )))
    }

    return (
        <ul>
            {ponerComentarios()}
        </ul>
    );
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con ese estado
const mapStateToProps = ({ publicacionesReducer }) => {
    return publicacionesReducer
}

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps)(Comentarios);