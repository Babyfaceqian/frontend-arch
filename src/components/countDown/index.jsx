import React, { useEffect, useRef, useState, useMemo } from "react";
import $ from "jquery";
import styles from "./index.less";

const DURATION = 2000; // 动画总时长
function CountDown({ count = 0 }) {
	const ref = useRef(null);
	const [oldCount, setOldCount] = useState(null);
	const countArr = useMemo(() => {
		return count.toString().split("").map(Number);
	}, [count]);

	const play = (start = 0, end = 8, current, ul) => {
		current = current || start;
		// 根据进度计算相应的动画时间
		let duration =
			((current + 1 - start) * (DURATION * 2)) /
			((end - start) * (end - start + 1)) /
			2;
		if (current < end) {
			ul.find(`.${styles["before"]} .${styles["up"]} .${styles["inner"]}`).text(
				"" + current
			);
			ul.find(
				`.${styles["before"]} .${styles["down"]} .${styles["inner"]}`
			).text("" + current);
			ul.find(`.${styles["active"]} .${styles["up"]} .${styles["inner"]}`).text(
				"" + (current + 1)
			);
			ul.find(
				`.${styles["active"]} .${styles["down"]} .${styles["inner"]}`
			).text("" + (current + 1));
		} else if (current == end) {
			ul.find(`.${styles["before"]} .${styles["up"]} .${styles["inner"]}`).text(
				"" + end
			);
			ul.find(
				`.${styles["before"]} .${styles["down"]} .${styles["inner"]}`
			).text("" + end);
			return;
		}
		ul.find(`.${styles["active"]}`).css("z-index", 1);
		ul.find(`.${styles["before"]}`).css("z-index", 2);
		ul.find(`.${styles["before"]} .${styles["up"]}`)
			.css("border-spacing", 0) // 为了能够在step函数内设置transform，实际border-spacing无作用
			.animate(
				{ borderSpacing: 90 },
				{
					step: function (now, fx) {
						$(this).css("transform", `rotateX(${now}deg)`);
					},
					easing: "linear",
					duration: duration,
					complete: function () {
						ul.find(`.${styles["before"]}`).css("z-index", 1);
						ul.find(`.${styles["active"]}`).css("z-index", 2);
						ul.find(`.${styles["active"]} .${styles["down"]}`)
							.css("border-spacing", 90)
							.animate(
								{ borderSpacing: 0 },
								{
									step: function (now, fx) {
										$(this).css("transform", `rotateX(${now}deg)`);
									},
									duration: duration,
									easing: "linear",
									complete: function () {
										play(start, end, current + 1, ul);
									},
								}
							);
					},
				}
			);
	};
	useEffect(() => {
		let oldCountArr = [];
		if (oldCount !== null) {
			oldCountArr = oldCount
				.toString()
				.padStart(countArr.length, "0")
				.split("")
				.map(Number);
		}
		countArr.forEach((d, index) => {
			play(
				oldCountArr[index] || 0,
				d,
				oldCountArr[index] || 0,
				$(`.${styles["container"]} ul`).eq(index)
			);
		});
		setOldCount(count);
	}, [countArr]);
	return (
		<div ref={ref} className={styles["container"]}>
			{countArr.map((d) => (
				<ul>
					<li className={styles["before"]}>
						<div className={styles["up"]}>
							<div></div>
							<div className={styles["inner"]}></div>
						</div>
						<div className={styles["down"]}>
							<div></div>
							<div className={styles["inner"]}></div>
						</div>
					</li>

					<li className={styles["active"]}>
						<div className={styles["up"]}>
							<div></div>
							<div className={styles["inner"]}></div>
						</div>
						<div className={styles["down"]}>
							<div></div>
							<div className={styles["inner"]}></div>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
}

export default CountDown;
