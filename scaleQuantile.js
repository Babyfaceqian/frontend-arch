(function () {
  /**
   * 定量比例尺
   */
  // 分位比例尺，分位值与定义域中存在的数值都有关
  let quantile = d3.scaleQuantile()
    .domain([0, 2, 4, 10]) // 定义域
    .range([0, 100, 200]); // 值域
    console.log(quantile(3)); // 100, 获得离散数据
})()