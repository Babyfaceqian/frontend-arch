import React from "react";
import styles from "./Main.less";
import worm from "utils/worm";
import * as Fetch from "./api/main";
import { connect } from "components/redux";
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentWillMount() {}
	componentDidMount() {
    this.props.dispatch({
      type: 'add'
    })
  }
	render() {
    console.log("this.props", this.props);
    const { main } = this.props;
		return (
			<div className={styles.main}>
				<button onClick={this.getWeather}>{main}</button>
			</div>
		);
	}
	getWeather = async () => {
		let res = await Fetch.getSatin({}, true);
		if (res && res.code == 200) {
			console.log(res);
			this.setState({ data: res.data });
		}
	};
}

export default connect(
	(state) => {
    console.log('state22', state);
    return {
      main: state.main
    }
  },
	(dispatch) => ({
    dispatch
  })
)(Main);
