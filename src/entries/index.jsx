import React from "react";
import ReactDOM from "react-dom";
import Main from "../containers/Main";
import { Provider, createStore, combineReducer } from "components/redux";
const main = (state = 0, action) => {
	switch (action.type) {
		case "add":
			return state + 1;
		default:
  }
  return state;
};
console.log(createStore, combineReducer)
ReactDOM.render(
	<Provider store={createStore(combineReducer({ main }))}>
		<Main />
	</Provider>,
	document.getElementById("root")
);
