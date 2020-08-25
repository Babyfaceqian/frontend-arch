import React from "react";
import styles from "./index.less";
import { Calendar } from "antd";
import moment from "moment";
export default class MyCalendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: moment(),
			years: [],
			_dates: [],
		};
	}

	componentDidMount() {
		this.processData(this.props.dates);
	}

	processData = (dates) => {
		const _dates = dates.map((d) => moment(d));
		let years = new Set();
		dates.forEach((d) => {
			years.add(moment(d).year());
		});
		years = Array.from(years).sort();
		let startYear = Math.min(...years);
		let endYear = Math.max(...years);
		years = [];
		for (let i = startYear; i < endYear + 1; i++) {
			years.push(i);
		}
		this.setState({ years, current: moment(dates[0]), _dates });
	};

	renderYears = (handleChange) => {
		return this.state.years.map((d, index) => {
			const isHighlighted = !!this.state._dates.some((m) => {
				return m.year() == d;
			});
			const isSelected = d === this.state.current.year();
			const highlightCls = isHighlighted ? styles.yearHighlighted : "";
			const selectCls = isSelected ? styles.yearSelected : "";
			return (
				<span
					key={index}
					className={`${styles.yearCell} ${highlightCls} ${selectCls}`}
					onClick={() => handleChange(d, "year")}
				>
					{d}
				</span>
			);
		});
	};

	renderMonths = (handleChange) => {
		let monthArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		let curYear = this.state.current.year();
		let filtered = this.state._dates.filter((d) => d.year() === curYear);
		
		return monthArr.map((d, index) => {
			let isHighlighted = !!filtered.some((m) => {
				return m.month() == d;
      });
      const isSelected = d === this.state.current.month();
			const highlightCls = isHighlighted ? styles.monthHighlighted : "";
			const selectCls = isSelected ? styles.monthSelected : "";
			return (
				<span
					key={index}
					className={`${styles.monthCell} ${highlightCls} ${selectCls}`}
					onClick={() => handleChange(d, "month")}
				>
					{d + 1}
				</span>
			);
		});
	};

	renderHeader = ({ value, type, onChange, onTypeChange }) => {
		console.log("value", value.format("YYYY-MM-DD"));
		const handleChange = (d, type) => {
			let cur = this.state.current.clone();
			cur.set(type, d);
			this.setState({ current: cur });
			onChange(cur);
		};
		return (
			<div className={styles.headerWrapper}>
				<div className={styles.header}>
					<div className={styles.yearWrapper}>
						<div className={styles.year}>{this.renderYears(handleChange)}</div>
						<div className={styles.unit}>年</div>
					</div>
					<div className={styles.monthWrapper}>
						<div className={styles.month}>
							{this.renderMonths(handleChange)}
						</div>
						<div className={styles.unit}>月</div>
					</div>
				</div>
			</div>
		);
	};
	renderCell = (date) => {
		let curYear = this.state.current.year();
		let curMonth = this.state.current.month();
		let filtered = this.state._dates.filter(
			(d) => d.year() === curYear && d.month() === curMonth
		);
		let isHighlighted = !!filtered.some((m) => {
			return m.date() === date.date();
		});
		const highlightCls = isHighlighted ? styles.dateHighlighted : "";
		let disabled = date.month() !== this.state.current.get("month");
		const moreCls = disabled ? styles.disabledDate : "";
		return (
			<span className={`${styles.cell} ${moreCls} ${highlightCls}`}>
				{date.date()}
			</span>
		);
	};
	onChange = (date) => {
		this.setState({ current: date });
	};
	onPanelChange = (date) => {
  };
  onSelect = (date) => {
  }
	render() {
		return (
			<div className={styles.wrapper}>
				<Calendar
					mode={"month"}
					fullscreen={false}
					headerRender={this.renderHeader}
					dateFullCellRender={this.renderCell}
          onPanelChange={this.onPanelChange}
          onSelect={this.onSelect}
					value={this.state.current}
				/>
			</div>
		);
	}
}

MyCalendar.defaultProps = {
	dates: ["2014-5-1", "2013-9-2", "2013-9-5"],
};
