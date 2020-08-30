import React from "react";
import styles from "./index.less";
import moment from "moment";

export default class DateDistribution extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guideDate: moment(),
		};
		this.columns = [
			{
				title: "一",
				key: 1,
			},
			{
				title: "二",
				key: 2,
			},
			{
				title: "三",
				key: 3,
			},
			{
				title: "四",
				key: 4,
			},
			{
				title: "五",
				key: 5,
			},
			{
				title: "六",
				key: 6,
			},
			{
				title: "日",
				key: 7,
			},
		];
	}

	renderDate = (m) => {
		const copyM = moment(m);
		let content;
		if (this.props.dateRender) {
			// 自定义渲染日期单元格
			content = this.props.dateRender(moment(m));
		} else {
			const date = m.get("date");
			const otherMonthCls =
				m.get("month") !== this.state.guideDate.get("month")
					? styles.otherMonth
					: "";
			const highlightCls = this.props.dates.some(
				(d) => moment(d).format("YYYY-MM-DD") == copyM.format("YYYY-MM-DD")
			)
				? styles.highlight
				: "";
			// const selectCls =
			// this.state.guideDate.format("YYYY-MM-DD") == copyM.format("YYYY-MM-DD") ? styles.select : "";
			content = (
				<div
					className={`${styles.cell} ${otherMonthCls} ${highlightCls}`}
					onClick={() => this.onClickDate(copyM)}
				>
					{date}
				</div>
			);
		}
		m.add(1, "days");
		return content;
	};

	renderRow = (m) => {
		return this.columns.map((d, index) => {
			return <td key={index}>{this.renderDate(m)}</td>;
		});
	};

	renderTableBody = () => {
		const m = moment(this.state.guideDate).set("date", 1);
		if (m.get("day") === 0) {
			// 如果1号是星期日，则要倒退一周计算星期一，因为moment认为星期日到星期六为一周
			m.set("day", -7);
		}
		m.set("day", 1);
		const arr = new Array(6).fill(0);
		return arr.map((d, index) => <tr key={index}>{this.renderRow(m)}</tr>);
	};

	renderYears = () => {
		const m = moment();
		const arr = [];
		for (let i = 0; i < 3; i++) {
			arr.unshift(m.get("year"));
			m.subtract(1, "years");
		}
		return arr.map((d, index) => {
			const highlightCls = this.props.dates.some(
				(date) => moment(date).get("year") === d
			)
				? styles.highlight
				: "";
			const selectCls =
				this.state.guideDate.get("year") === d ? styles.select : "";
			return (
				<span
					key={index}
					onClick={() => this.changeDate("year", d)}
					className={`${highlightCls} ${selectCls}`}
				>
					{d}
				</span>
			);
		});
	};

	renderMonths = () => {
		const arr = new Array(12).fill(0).map((d, i) => i);
		return arr.map((d, index) => {
			const highlightCls = this.props.dates.some((date) => {
				const _date = moment(date);
				return (
					_date.get("year") === this.state.guideDate.get("year") &&
					_date.get("month") === d
				);
			})
				? styles.highlight
				: "";
			const selectCls =
				this.state.guideDate.get("month") === d ? styles.select : "";
			return (
				<span
					key={index}
					onClick={() => this.changeDate("month", d)}
					className={`${highlightCls} ${selectCls}`}
				>
					{d + 1}
				</span>
			);
		});
	};

	changeDate = (type, n) => {
		const guideDate = this.state.guideDate.set(type, n);
		this.setState({ guideDate });
		this.props.onChange && this.props.onChange(guideDate);
	};

	onClickDate = (m) => {
		console.log("mmmm", m.format("YYYY-MM-DD"));
	};

	render() {
		console.log("guideDate", this.state.guideDate.format("YYYY-MM-DD"));
		return (
			<div className={styles.dateDistribution}>
				<div className={styles.header}>
					<div className={styles.yearAndMonth}>
						<div>{this.renderYears()}</div>
						<div>{this.renderMonths()}</div>
					</div>
					<div className={styles.unit}>
						<div>年</div>
						<div>月</div>
					</div>
				</div>
				<table>
					<thead>
						<tr>
							{this.columns.map((col) => {
								return <th key={col.key}>{col.title}</th>;
							})}
						</tr>
					</thead>
					<tbody>{this.renderTableBody()}</tbody>
				</table>
			</div>
		);
	}
}

DateDistribution.defaultProps = {
	// dateRender: (m) => {
	// 	return m.get('date');
	// },
	// onChange: () => {
	// }
	dates: ["2020-5-1", "2020-4-30"],
};
