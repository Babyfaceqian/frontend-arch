import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './model/configureStore';
import reducer from './model/reducer';
import Graph from './graph';
const store = configureStore(reducer);


export default React.forwardRef((props, ref) => (<Provider store={store} ><Graph {...props} ref={ref} /></Provider>))