import React from "react";
import styles from "./Main.less";
import CountDown from "../components/countDown";
export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1357,
		};
	}
	componentWillMount() {}
	async componentDidMount() {
		setTimeout(() => this.setState({ count: 9753 }), 6000);
	}
	render() {
		return (
			<div>
				<CountDown count={this.state.count} />
			</div>
		);
	}
}
