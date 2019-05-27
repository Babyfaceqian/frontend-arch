(function () {
  /**
   * 序数比例尺，定义域与值域都是离散的
   */
  let ordinal = d3.scaleOrdinal()
    .domain([0, 2, 4]) // 定义域
    .range([0, 100, 200]); // 值域
  console.log(ordinal(2)); // 100, 获得离散数据

  let ordinalPoints = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .rangePoints([0, 100], 0) // 接受两个参数：inverval、padding。根据domain的数量对range进行平均值分段并将分段值作为离散值，即[0, 25, 50, 75, 100]；第二个参数padding是指边界部分留下的空白宽度，分段step会根据padding计算
  console.log(ordinal(2)); // 25, 

  // rangeRoundPoints // 对值域进行四舍五入
  // rangeBands，接受三个参数：interval、padding、outerPadding。
  // rangeBoundBands， 对值域进行四舍五入
  

})()