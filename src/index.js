import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";


import Form from './form/form'
import reportWebVitals from './reportWebVitals';

const reducers = {
  form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);
console.log("store",store)

ReactDOM.render(
     <Provider store={store}>
      <Form onSubmit={values => alert(JSON.stringify(values))} />
     </Provider>,
  document.getElementById('root')
);


reportWebVitals();
