import React, { Component } from "react";
//Importando connect para conectar a reducer
import { connect } from "react-redux";
//Importando las acciones del usuario
import * as usuariosActions from "../../actions/usuariosActions";
//Importando las acciones de publicaciones
import * as publicacionesActions from "../../actions/publicacionesActions";
//Importando componente Spinner
import Spinner from "../Spinner";
//Importando componente Error
import Error from "../Error";
//Importando componente Comentarios
import Comentarios from "./Comentarios";

//Destructurando las funciones de los actions
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar, traerComentarios } = publicacionesActions;

//Creando componente
class Publicaciones extends Component {
    //Async para controlar los llamados asíncronos
    async componentDidMount() {
        //Los reducers no se pueden destructurar puesto que se van actualizando
        const {
            usuariosTraerTodos,
            //Desctructurando this.props.match.params.key
            match: { params: { key } },
            publicacionesTraerPorUsuario
        } = this.props;

        //Si no existen los usuarios, ejecuta el action de traer todos (Evitando llamados innecesarios).
        if (!this.props.usuariosReducer.usuarios.length) {
            //Espera a que traiga los usuarios
            await usuariosTraerTodos();
        }

        //Validando si hay un error
        if (this.props.usuariosReducer.error) {
            return;
        }

        //Si el usuario no tiene en su objeto la propiedad publicaciones_key: key, llama el método (Evitando llamados innecesarios y que se sobreescriba)
        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
            //Traemos las publicaciones del usuario
            await publicacionesTraerPorUsuario(key);
        }
    }

    //Función para manejar toda la info y estados de un usuario
    ponerUsuario = () => {
        //Cómo aca la funcion se llama en el render, se puede destructurar el reducer
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        //Validando si hay error
        if (usuariosReducer.error) {
            return <Error mensaje={usuariosReducer.error} />
        }

        //Validando si está cargando y que hayan usuarios
        if (usuariosReducer.cargando || !usuariosReducer.usuarios.length) {
            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[key].name;

        //Si todo salio exitoso retornamos lo siguiente
        return (
            <h1>Publicaciones de {nombre}</h1>
        )
    }

    //Función para manejar todas las publicaciones del usuario
    ponerPublicaciones = () => {
        //Cómo aca la funcion se llama en el render, se puede destructurar el reducer
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        //Validando que existan los usuarios
        if (!usuarios.length) {
            //Retornamos nada, porque lo estamos manejando en ponerUsuario
            return;
        }

        //Validando si hay un error
        if (usuariosReducer.error) {
            //Retornamos nada, porque lo estamos manejando en ponerUsuario
            return;
        }

        //Validando si están cargando las publicaciones
        if (publicacionesReducer.cargando) {
            return <Spinner />
        }

        //Validando si hay un error
        if (publicacionesReducer.error) {
            return <Error mensaje={publicacionesReducer.error} />
        }

        //Validando que existan las publicaciones
        if (!publicaciones.length) {
            //Retornamos nada porque debemos esperar a que los usuarios cargen
            return;
        }

        //Validando si el publicaciones_key se encuentre en el usuario
        if (!('publicaciones_key' in usuarios[key])) {
            //No retornamos nada porque lo estara buscando
            return;
        }

        const { publicaciones_key } = usuarios[key];

        //Si todo salio exitoso enviamos las publicaciones y los uaurios a la función
        return this.mostrarInfo(
            //Index del arreglo de publicaciones que se van agregando cuando se le da click a un usuario
            publicaciones[publicaciones_key],
            //Key de la lista de publicaciones de un usuario
            publicaciones_key

        )
    }

    //Función para mostrar informacion
    mostrarInfo = (publicaciones, publicaciones_keys) => {
        return (
            //Mapeando las publicaciones del usuario al que le corresponde ese key
            publicaciones.map((publicacion, comentarios_keys) => {
                return (
                    <div
                        className="pub_title"
                        key={publicacion.id}
                        //Al dar click llamamos la función mostrarComentarios
                        onClick={
                            () => this.mostrarComentarios(publicaciones_keys, comentarios_keys, publicacion.comentarios)
                        }
                    >
                        <h2>{publicacion.title}</h2>
                        <h3>{publicacion.body}</h3>
                        {
                            //Validando si la publicación está abierta o cerrada
                            (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ''
                        }
                    </div>
                )
            })
        )
    }

    //Función para mostrar comentarios
    mostrarComentarios = (publicaciones_keys, comentarios_keys, comentarios) => {
        //Llamando el action que abre o cierra la publicación
        this.props.abrirCerrar(publicaciones_keys, comentarios_keys);
        //Validando si ya tengo los comentarios, sino voy y los busco
        if (!comentarios.length) {
            //Llamando el action que trae los comentarios
            this.props.traerComentarios(publicaciones_keys, comentarios_keys);
            //console.log(comentarios);
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        );
    }
}

//Mapeando los reducers e indicamos que reducer queremos utilizar, para poder actualizar el componente con ese estado
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
};

//Mapeando los actions e indicamos que actions queremos utilizar
const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
}

//Exportando componente
//Connect permite conectar componente a los reducers y actions del reducer
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
