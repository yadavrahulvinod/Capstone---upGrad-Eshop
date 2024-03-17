import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './common/navbar/Navbar';
import { Provider } from 'react-redux';
import Store from './redux/store/Store';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>


    <Provider store={Store}>
    
      <Navbar/>
         <App/>
     
    </Provider>


   </React.StrictMode>
  
);

reportWebVitals();
