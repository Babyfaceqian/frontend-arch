import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(reducers, initialState = {}) {

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );

    // if (module.hot) {
    //     module.hot.accept('./reducers/app', () => {
    //         const nextRootReducer = require('./reducers/app').default;
    //         store.replaceReducer(nextRootReducer);
    //     })
    // }
    return store;
}