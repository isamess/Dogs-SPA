import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import { BrowserRouter } from 'react-router-dom';


//envuelvo todo en un Provider para que Redux me funcione correctamente
ReactDOM.render(
  <Provider store={store}>  
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

//index se encarga de llamar a los comps que queremos mostrar según a donde navegue el usuario
//BrowserRouter se usa para los servidores que manejan peticiones dinámicas. Si no lo usara, no funcionarían nuestros links

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
