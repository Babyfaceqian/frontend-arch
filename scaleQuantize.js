(function () {
  /**
   * 定量比例尺
   */
  // 量子比例尺
  // 分段值只与定义域的起始值和结束值有关，取其算数平均值，如下，分段值为(10 - 0) / range.length
  let quantize = d3.scaleQuantize()
    .domain([0, 2, 4, 10]) // 定义域
    .range([0, 100, 200]); // 值域
    console.log(quantize(4)); // 100, 获得离散数据
})()