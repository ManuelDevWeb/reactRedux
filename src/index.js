import React from "react";
//Importando ReactDOM
import ReactDOM from "react-dom";
//Importando elementos Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
//Importando Redux-thunk
import reduxThunk from 'redux-thunk';

//Importando estilos
import "./index.css";

//Importando Reducers
import reducers from './reducers';
//Importando componente App
import App from "./components/App";


//Almacenamiento de toda nuestra aplicación
const store = createStore(
  //Reducers de nuestra aplicación
  reducers,
  //Estado inicial
  {},
  //Agregando middleware para uso de los actions
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  /*
    El Provider es el componente de Redux en el cual encerraremos nuestra aplicación 
    para que puedan comunicarse los componentes entre ellos. 
  */
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
