(function () {
  // 坐标轴
  let svg = d3.select('body').append('svg').attr('width', 400).attr('height', 300);
  let xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 300]) // 实际像素值
  let axis = d3.axisBottom(xScale)
    .ticks(5) // 新建刻度显示在下方的坐标尺，默认分隔数为10
    .tickValues([2, 4, 6, 8]) // 指定显示对应刻度
    .tickSize(10) // 设置或获取刻度线长度
    .tickFormat(d3.format('$')) // 对刻度进行格式化
  let xAxis = svg.append('g');
  axis(xAxis); // 将坐标尺渲染到相应容器内（svg/g)，等于xAxis.call(axis)。
  // 坐标轴包含三种元素，对应关系分别是：path - 坐标轴主线，line - 刻度线， text - 刻度文字
  // 指数比例尺的坐标轴
  let powScale = d3.scalePow()
  .exponent(2)
  .domain([0,1])
  .range([0,500]);
  let xAxis2 = svg.append('g').attr('transform', 'translate(0,200)');
  let axis2 = d3.axisBottom(powScale);
  axis2(xAxis2)
})()