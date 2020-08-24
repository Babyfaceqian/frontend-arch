import React from "react";
import ReactDOM from "react-dom";
import Main from "../containers/Main";
import { Provider, createStore, combineReducer } from "components/redux";
ReactDOM.render(
	<Provider store={createStore(combineReducer({ main }))}>
		<Main />
	</Provider>,
	document.getElementById("root")
);
