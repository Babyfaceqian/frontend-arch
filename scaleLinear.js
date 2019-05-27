(function () {
  /**
   * 定量比例尺
   */
  // 线性比例尺
  let linear = d3.scaleLinear()
    .domain([0, 100]) // 定义域
    .range([0, 1]); // 值域
  console.log(linear(10)) // 0.1
  console.log(linear.invert(0.1)) // 10

  let linearRound = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([0, 1]) // 对输出值进行四舍五入
  console.log(linearRound(10)) // 0

  let linearClamped = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 1])
    .clamp(true) // 默认为false，当该比例尺接收一个超出定义域范围的值时是否仍按照同样的计算方法计算；当设置为true时，输出值都会被限制在值域内。
  console.log(linearClamped(120)); // 1

  // linear.nice() // 将一些float数值精确到合理的数值
  // linear.ticks([count]) // 设定或获取定义域内具有代表性的值的数目，常用于选取坐标轴刻度。默认为10
  console.log(linear.ticks(20));

  // linear.tickFormat(count,[format]) // 用于设置定义域内具有代表性的值得表现形式, 如+、-、%、$
  let ticks = linear.ticks(5);
  let tickFormat = linear.tickFormat(5, '+');
  for (let i = 0; i < ticks.length; i++) {
    ticks[i] = tickFormat(ticks[i]);
  }
  console.log('ticks', ticks)

})()