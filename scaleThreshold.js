(function () {
  /**
   * 定量比例尺
   */
  // 阈值比例尺，将连续的定义域根据定义域值进行分割
  let threshold = d3.scaleThreshold()
    .domain([0, 2, 4]) // 定义域
    .range([0, 100, 200]); // 值域
    console.log(threshold(3)); // 200, 获得离散数据
})()