import React from "react";
import styles from "./Main.less";
import MyCalendar from "components/myCalendar";
import DateDistribution from "components/dateDistribution";
import "antd/dist/antd.css";
export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={styles.main}>
				<div className={styles.wrapper}>
					{/* <MyCalendar /> */}
					<DateDistribution />
				</div>
			</div>
		);
	}
}
